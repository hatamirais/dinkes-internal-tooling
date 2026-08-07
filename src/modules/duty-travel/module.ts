import { defineModule } from "../_shared/module-contract";
import { DUTY_TRAVEL_PERMISSIONS } from "./domain/duty-travel-permissions";

export const dutyTravelModule = defineModule({
  key: "duty_travel",
  name: "Duty Travel",
  version: "0.1.0",
  status: "experimental",
  description:
    "SiPerdin Dinkes Kobar domain module for Surat Tugas and SPPD workflows: tenant-scoped duty requests, Dinas/Faskes approval routing, locked document issuance, budget verification for SPPD, evidence/report submission, dashboard-ready status tracking, and audited high-risk state transitions. Built directly in src/modules per ADR-0034/0035/0047; not a packages/plugins awcms-micro plugin.",
  dependencies: [
    "tenant_admin",
    "identity_access",
    "logging",
    "domain_event_runtime",
    "workflow",
    "form_drafts",
    "media_library",
    "reporting"
  ],
  type: "domain",
  capabilities: {
    consumes: [
      {
        capability: "media_library",
        providedBy: "media_library",
        optional: true
      }
    ]
  },
  api: {
    openApiPath: "openapi/modules/duty-travel.openapi.yaml",
    basePath: "/api/v1/duty-travel"
  },
  permissions: DUTY_TRAVEL_PERMISSIONS.map((permission) => ({
    activityCode: permission.activityCode,
    action: permission.action,
    description: permission.description
  })),
  compatibility: {
    deploymentProfiles: ["development", "staging", "production", "offline-lan"]
  },
  maintainers: ["@ahliweb"]
});
