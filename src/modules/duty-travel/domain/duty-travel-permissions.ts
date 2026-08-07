export const DUTY_TRAVEL_PERMISSIONS = [
  {
    activityCode: "request",
    action: "read",
    description: "Read duty travel requests"
  },
  {
    activityCode: "request",
    action: "create",
    description: "Create duty travel requests"
  },
  {
    activityCode: "request",
    action: "update",
    description: "Update draft or returned duty travel requests"
  },
  {
    activityCode: "request",
    action: "cancel",
    description: "Cancel duty travel requests with a recorded reason"
  },
  {
    activityCode: "approval",
    action: "read",
    description: "Read duty travel approval inbox and history"
  },
  {
    activityCode: "approval",
    action: "decide",
    description: "Approve, reject, or return duty travel approval tasks"
  },
  {
    activityCode: "document",
    action: "read",
    description: "Read issued duty travel document metadata"
  },
  {
    activityCode: "document",
    action: "issue",
    description: "Issue locked Surat Tugas and SPPD documents"
  },
  {
    activityCode: "budget",
    action: "read",
    description: "Read duty travel budget lines and SPPD costs"
  },
  {
    activityCode: "budget",
    action: "update",
    description: "Update duty travel budget lines before finance verification"
  },
  {
    activityCode: "budget",
    action: "verify",
    description: "Verify duty travel budget and SPPD cost lines"
  },
  {
    activityCode: "evidence",
    action: "read",
    description: "Read duty travel evidence and reports"
  },
  {
    activityCode: "evidence",
    action: "upload",
    description: "Upload duty travel evidence and reports"
  },
  {
    activityCode: "evidence",
    action: "verify",
    description: "Verify or return duty travel evidence"
  },
  {
    activityCode: "settings",
    action: "read",
    description: "Read duty travel settings, numbering, and templates"
  },
  {
    activityCode: "settings",
    action: "update",
    description: "Update duty travel settings, numbering, and templates"
  },
  {
    activityCode: "dashboard",
    action: "read",
    description: "Read duty travel dashboard summaries"
  },
  {
    activityCode: "audit",
    action: "read",
    description: "Read duty travel audit views"
  }
] as const;
