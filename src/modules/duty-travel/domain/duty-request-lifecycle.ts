export type DutyRequestKind = "task_only" | "task_with_sppd";

export const DUTY_REQUEST_KINDS: readonly DutyRequestKind[] = [
  "task_only",
  "task_with_sppd"
];

export type DutyRequestScope = "dinkes" | "faskes";

export const DUTY_REQUEST_SCOPES: readonly DutyRequestScope[] = [
  "dinkes",
  "faskes"
];

export type DutyRequestStatus =
  | "draft"
  | "submitted"
  | "returned"
  | "rejected"
  | "supervisor_verified"
  | "technical_verified"
  | "secretary_verified"
  | "finance_verified"
  | "final_approved"
  | "document_issued"
  | "in_progress"
  | "evidence_submitted"
  | "evidence_returned"
  | "evidence_verified"
  | "completed"
  | "archived"
  | "cancelled";

export const DUTY_REQUEST_STATUSES: readonly DutyRequestStatus[] = [
  "draft",
  "submitted",
  "returned",
  "rejected",
  "supervisor_verified",
  "technical_verified",
  "secretary_verified",
  "finance_verified",
  "final_approved",
  "document_issued",
  "in_progress",
  "evidence_submitted",
  "evidence_returned",
  "evidence_verified",
  "completed",
  "archived",
  "cancelled"
];

const TERMINAL_STATUSES = new Set<DutyRequestStatus>([
  "rejected",
  "completed",
  "archived",
  "cancelled"
]);

const ALLOWED_TRANSITIONS: Record<
  DutyRequestStatus,
  readonly DutyRequestStatus[]
> = {
  draft: ["submitted", "cancelled"],
  submitted: ["returned", "rejected", "supervisor_verified", "cancelled"],
  returned: ["submitted", "cancelled"],
  rejected: [],
  supervisor_verified: [
    "returned",
    "rejected",
    "technical_verified",
    "cancelled"
  ],
  technical_verified: [
    "returned",
    "rejected",
    "secretary_verified",
    "cancelled"
  ],
  secretary_verified: [
    "returned",
    "rejected",
    "finance_verified",
    "final_approved",
    "cancelled"
  ],
  finance_verified: ["returned", "rejected", "final_approved", "cancelled"],
  final_approved: ["document_issued", "cancelled"],
  document_issued: ["in_progress", "evidence_submitted", "cancelled"],
  in_progress: ["evidence_submitted", "cancelled"],
  evidence_submitted: ["evidence_returned", "evidence_verified", "cancelled"],
  evidence_returned: ["evidence_submitted", "cancelled"],
  evidence_verified: ["completed"],
  completed: ["archived"],
  archived: [],
  cancelled: []
};

export function isDutyRequestKind(value: unknown): value is DutyRequestKind {
  return (
    typeof value === "string" &&
    (DUTY_REQUEST_KINDS as readonly string[]).includes(value)
  );
}

export function isDutyRequestScope(value: unknown): value is DutyRequestScope {
  return (
    typeof value === "string" &&
    (DUTY_REQUEST_SCOPES as readonly string[]).includes(value)
  );
}

export function isDutyRequestStatus(
  value: unknown
): value is DutyRequestStatus {
  return (
    typeof value === "string" &&
    (DUTY_REQUEST_STATUSES as readonly string[]).includes(value)
  );
}

export function canTransitionDutyRequest(
  from: DutyRequestStatus,
  to: DutyRequestStatus
): boolean {
  if (from === to) {
    return true;
  }

  return ALLOWED_TRANSITIONS[from].includes(to);
}

export function isDutyRequestTerminal(status: DutyRequestStatus): boolean {
  return TERMINAL_STATUSES.has(status);
}

export function requiresFinanceVerification(kind: DutyRequestKind): boolean {
  return kind === "task_with_sppd";
}

export function canIssueSppd(kind: DutyRequestKind): boolean {
  return kind === "task_with_sppd";
}

export function validateDutyTravelDates(input: {
  startsOn: string;
  endsOn: string;
}): { valid: true } | { valid: false; message: string } {
  const starts = Date.parse(input.startsOn);
  const ends = Date.parse(input.endsOn);

  if (!Number.isFinite(starts) || !Number.isFinite(ends)) {
    return { valid: false, message: "Duty travel dates must be valid dates." };
  }

  if (starts > ends) {
    return {
      valid: false,
      message: "Departure date must not be after return date."
    };
  }

  return { valid: true };
}
