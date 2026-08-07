import { describe, expect, test } from "bun:test";

import { listModules } from "../src/modules";
import { dutyTravelModule } from "../src/modules/duty-travel/module";
import { DUTY_TRAVEL_PERMISSIONS } from "../src/modules/duty-travel/domain/duty-travel-permissions";

const PERMISSION_SEED_PATH = "sql/092_awcms_duty_travel_permissions.sql";
const SCHEMA_PATH = "sql/091_awcms_duty_travel_schema.sql";

async function readRepoFile(path: string): Promise<string> {
  return Bun.file(path).text();
}

describe("duty_travel — registry wiring", () => {
  test("is registered in the base module registry", () => {
    expect(listModules().map((m) => m.key)).toContain("duty_travel");
  });

  test("is a domain module built directly in src/modules", () => {
    expect(dutyTravelModule.type).toBe("domain");
    expect(dutyTravelModule.status).toBe("experimental");
    expect(dutyTravelModule.api?.openApiPath).toBe(
      "openapi/modules/duty-travel.openapi.yaml"
    );
    expect(dutyTravelModule.api?.basePath).toBe("/api/v1/duty-travel");
  });

  test("declares foundation dependencies explicitly", () => {
    expect(dutyTravelModule.dependencies).toEqual([
      "tenant_admin",
      "identity_access",
      "logging",
      "domain_event_runtime",
      "workflow",
      "form_drafts",
      "media_library",
      "reporting"
    ]);
  });
});

describe("duty_travel — permission single-source agreement", () => {
  test("module.ts declares exactly the permissions in the single source", () => {
    const declared = (dutyTravelModule.permissions ?? []).map(
      (p) => `${p.activityCode}.${p.action}`
    );
    const source = DUTY_TRAVEL_PERMISSIONS.map(
      (p) => `${p.activityCode}.${p.action}`
    );

    expect(declared.sort()).toEqual(source.sort());
  });

  test("the SQL catalog seed inserts exactly those same permissions", async () => {
    const sql = await readRepoFile(PERMISSION_SEED_PATH);

    for (const permission of DUTY_TRAVEL_PERMISSIONS) {
      expect(sql).toContain(
        `('duty_travel', '${permission.activityCode}', '${permission.action}', '${permission.description}')`
      );
    }

    const seededTuples = sql.match(/\('duty_travel',/g) ?? [];
    expect(seededTuples).toHaveLength(DUTY_TRAVEL_PERMISSIONS.length);
  });

  test("submit uses request.update instead of a new AccessAction literal", async () => {
    const sql = await readRepoFile(PERMISSION_SEED_PATH);
    const submitRoute = await readRepoFile(
      "src/pages/api/v1/duty-travel/requests/[id]/submit.ts"
    );

    expect(sql).not.toContain("'submit'");
    expect(submitRoute).toContain('action: "update"');
  });
});

describe("duty_travel — schema invariants", () => {
  test("every duty_travel tenant table is ENABLE + FORCE RLS protected", async () => {
    const sql = await readRepoFile(SCHEMA_PATH);
    const tables = [
      "awcms_duty_requests",
      "awcms_duty_request_participants",
      "awcms_duty_request_destinations",
      "awcms_duty_budget_lines",
      "awcms_duty_documents",
      "awcms_duty_evidences",
      "awcms_duty_reports",
      "awcms_duty_numbering_sequences",
      "awcms_duty_templates"
    ];

    for (const table of tables) {
      expect(sql).toContain(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY`);
      expect(sql).toContain(`ALTER TABLE ${table} FORCE ROW LEVEL SECURITY`);
      expect(sql).toContain(`CREATE POLICY ${table}_tenant_isolation`);
    }
  });

  test("core request rules are enforced at the data layer", async () => {
    const sql = await readRepoFile(SCHEMA_PATH);

    expect(sql).toContain(
      "CHECK (request_kind IN ('task_only', 'task_with_sppd'))"
    );
    expect(sql).toContain("CHECK (starts_on <= ends_on)");
    expect(sql).toContain("awcms_duty_requests_urgent_reason_check");
    expect(sql).toContain("awcms_duty_requests_cancel_reason_check");
  });

  test("document numbers and versions are unique per tenant", async () => {
    const sql = await readRepoFile(SCHEMA_PATH);

    expect(sql).toContain("awcms_duty_documents_number_dedup");
    expect(sql).toContain("awcms_duty_documents_version_dedup");
  });
});
