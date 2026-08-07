import type { APIRoute } from "astro";

import { fail, ok } from "../../../../../modules/_shared/api-response";
import { getDatabaseClient } from "../../../../../lib/database/client";
import { withTenant } from "../../../../../lib/database/tenant-context";
import {
  authorizeInTransaction,
  resolveAuthInputs
} from "../../../../../modules/identity-access/application/access-guard";
import { hashSessionToken } from "../../../../../lib/auth/session-token";
import {
  bodyTooLargeResponse,
  readJsonBody
} from "../../../../../lib/security/request-body-limit";
import { recordAuditEvent } from "../../../../../modules/logging/application/audit-log";
import {
  createDutyRequest,
  listDutyRequests
} from "../../../../../modules/duty-travel/application/duty-request-directory";
import {
  isDutyRequestKind,
  isDutyRequestStatus,
  type DutyRequestKind,
  type DutyRequestStatus
} from "../../../../../modules/duty-travel/domain/duty-request-lifecycle";
import { validateCreateDutyRequestInput } from "../../../../../modules/duty-travel/domain/duty-request-validation";

const READ_GUARD = {
  moduleKey: "duty_travel",
  activityCode: "request",
  action: "read" as const
};

const CREATE_GUARD = {
  moduleKey: "duty_travel",
  activityCode: "request",
  action: "create" as const
};

export const GET: APIRoute = async ({ request, cookies, url, locals }) => {
  const { tenantId, token } = resolveAuthInputs(request, cookies);

  if (!tenantId)
    return fail(400, "TENANT_REQUIRED", "Tenant header is required.");
  if (!token) return fail(401, "AUTH_REQUIRED", "Authentication required.");

  const status = url.searchParams.get("status");
  const requestKind = url.searchParams.get("requestKind");

  if (status && !isDutyRequestStatus(status)) {
    return fail(400, "VALIDATION_ERROR", "status is invalid.");
  }

  if (requestKind && !isDutyRequestKind(requestKind)) {
    return fail(400, "VALIDATION_ERROR", "requestKind is invalid.");
  }

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
        READ_GUARD
      );

      if (!auth.allowed) return auth.denied;

      const requests = await listDutyRequests(tx, tenantId, {
        status: (status as DutyRequestStatus | null) || undefined,
        requestKind: (requestKind as DutyRequestKind | null) || undefined
      });

      return ok({ requests }, { correlationId: locals.correlationId });
    },
    { workClass: "interactive" }
  );
};

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const { tenantId, token } = resolveAuthInputs(request, cookies);

  if (!tenantId)
    return fail(400, "TENANT_REQUIRED", "Tenant header is required.");
  if (!token) return fail(401, "AUTH_REQUIRED", "Authentication required.");

  const bodyRead = await readJsonBody(request);
  if (bodyRead.tooLarge) return bodyTooLargeResponse(bodyRead.limitBytes);

  const validation = validateCreateDutyRequestInput(bodyRead.value);
  if (!validation.valid) {
    return fail(
      400,
      "VALIDATION_ERROR",
      "Duty travel request input is invalid.",
      {},
      validation.errors
    );
  }

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
        CREATE_GUARD
      );

      if (!auth.allowed) return auth.denied;

      const dutyRequest = await createDutyRequest(
        tx,
        tenantId,
        auth.context.tenantUserId,
        validation.value
      );

      await recordAuditEvent(tx, {
        tenantId,
        actorTenantUserId: auth.context.tenantUserId,
        moduleKey: "duty_travel",
        action: "create",
        resourceType: "duty_request",
        resourceId: dutyRequest.id,
        severity: "info",
        message: "Duty travel request draft created.",
        attributes: {
          requestKind: dutyRequest.requestKind,
          requestScope: dutyRequest.requestScope,
          isUrgent: dutyRequest.isUrgent
        },
        correlationId: locals.correlationId
      });

      return ok(dutyRequest, { correlationId: locals.correlationId });
    },
    { workClass: "interactive" }
  );
};
