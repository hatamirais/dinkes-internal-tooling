import type { APIRoute } from "astro";

import { fail, ok } from "../../../../../modules/_shared/api-response";
import { getDatabaseClient } from "../../../../../lib/database/client";
import { withTenant } from "../../../../../lib/database/tenant-context";
import {
  authorizeInTransaction,
  resolveAuthInputs
} from "../../../../../modules/identity-access/application/access-guard";
import { hashSessionToken } from "../../../../../lib/auth/session-token";
import { getDutyTravelDashboardSummary } from "../../../../../modules/duty-travel/application/duty-request-directory";

const DASHBOARD_GUARD = {
  moduleKey: "duty_travel",
  activityCode: "dashboard",
  action: "read" as const
};

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const { tenantId, token } = resolveAuthInputs(request, cookies);

  if (!tenantId)
    return fail(400, "TENANT_REQUIRED", "Tenant header is required.");
  if (!token) return fail(401, "AUTH_REQUIRED", "Authentication required.");

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
        DASHBOARD_GUARD
      );

      if (!auth.allowed) return auth.denied;

      const summary = await getDutyTravelDashboardSummary(tx, tenantId);
      return ok(summary, { correlationId: locals.correlationId });
    },
    { workClass: "interactive" }
  );
};
