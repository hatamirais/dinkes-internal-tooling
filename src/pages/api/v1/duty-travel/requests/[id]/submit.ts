import type { APIRoute } from "astro";

import {
  fail,
  jsonResponse,
  ok
} from "../../../../../../modules/_shared/api-response";
import { getDatabaseClient } from "../../../../../../lib/database/client";
import { withTenant } from "../../../../../../lib/database/tenant-context";
import {
  authorizeInTransaction,
  resolveAuthInputs
} from "../../../../../../modules/identity-access/application/access-guard";
import { hashSessionToken } from "../../../../../../lib/auth/session-token";
import { recordAuditEvent } from "../../../../../../modules/logging/application/audit-log";
import { submitDutyRequest } from "../../../../../../modules/duty-travel/application/duty-request-directory";
import {
  computeRequestHash,
  findIdempotencyRecord,
  saveIdempotencyRecord
} from "../../../../../../modules/_shared/idempotency";

const SUBMIT_GUARD = {
  moduleKey: "duty_travel",
  activityCode: "request",
  action: "update" as const
};

const IDEMPOTENCY_SCOPE = "duty_travel_request_submit";

export const POST: APIRoute = async ({ request, params, cookies, locals }) => {
  const { tenantId, token } = resolveAuthInputs(request, cookies);
  const dutyRequestId = params.id;

  if (!tenantId)
    return fail(400, "TENANT_REQUIRED", "Tenant header is required.");
  if (!dutyRequestId) {
    return fail(400, "VALIDATION_ERROR", "Duty request id is required.");
  }
  if (!token) return fail(401, "AUTH_REQUIRED", "Authentication required.");

  const idempotencyKey = request.headers.get("idempotency-key");
  if (!idempotencyKey) {
    return fail(
      400,
      "IDEMPOTENCY_REQUIRED",
      "Idempotency-Key header is required."
    );
  }

  const requestHash = computeRequestHash({ dutyRequestId });
  const sql = getDatabaseClient();
  const tokenHash = hashSessionToken(token);
  const now = new Date();

  return withTenant(
    sql,
    tenantId,
    async (tx) => {
      const auth = await authorizeInTransaction(
        tx,
        tenantId,
        tokenHash,
        now,
        SUBMIT_GUARD
      );

      if (!auth.allowed) return auth.denied;

      const existingIdempotency = await findIdempotencyRecord(
        tx,
        tenantId,
        IDEMPOTENCY_SCOPE,
        idempotencyKey
      );

      if (existingIdempotency) {
        if (existingIdempotency.requestHash !== requestHash) {
          return fail(
            409,
            "IDEMPOTENCY_CONFLICT",
            "Idempotency-Key was already used with a different request."
          );
        }

        return jsonResponse(existingIdempotency.responseBody, {
          status: existingIdempotency.responseStatus
        });
      }

      const dutyRequest = await submitDutyRequest(tx, tenantId, dutyRequestId);
      if (!dutyRequest) {
        return fail(
          404,
          "RESOURCE_NOT_FOUND",
          "Duty travel request not found or not submit-ready."
        );
      }

      await recordAuditEvent(tx, {
        tenantId,
        actorTenantUserId: auth.context.tenantUserId,
        moduleKey: "duty_travel",
        action: "submit",
        resourceType: "duty_request",
        resourceId: dutyRequest.id,
        severity: "warning",
        message: "Duty travel request submitted for approval.",
        attributes: {
          requestKind: dutyRequest.requestKind,
          requestScope: dutyRequest.requestScope
        },
        correlationId: locals.correlationId
      });

      const successResponse = ok(dutyRequest, {
        correlationId: locals.correlationId
      });
      const successBody = await successResponse.clone().json();

      await saveIdempotencyRecord(
        tx,
        tenantId,
        IDEMPOTENCY_SCOPE,
        idempotencyKey,
        requestHash,
        200,
        successBody
      );

      return successResponse;
    },
    { workClass: "interactive" }
  );
};
