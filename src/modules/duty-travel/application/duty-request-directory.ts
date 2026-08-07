import type {
  DutyRequestKind,
  DutyRequestScope,
  DutyRequestStatus
} from "../domain/duty-request-lifecycle";
import type { CreateDutyRequestInput } from "../domain/duty-request-validation";

export type DutyRequestRow = {
  id: string;
  request_kind: DutyRequestKind;
  request_scope: DutyRequestScope;
  status: DutyRequestStatus;
  title: string;
  basis: string;
  purpose: string;
  expected_output: string;
  is_urgent: boolean;
  urgent_reason: string | null;
  starts_on: string | Date;
  ends_on: string | Date;
  created_at: Date;
  updated_at: Date;
};

export type DutyRequestDto = {
  id: string;
  requestKind: DutyRequestKind;
  requestScope: DutyRequestScope;
  status: DutyRequestStatus;
  title: string;
  basis: string;
  purpose: string;
  expectedOutput: string;
  isUrgent: boolean;
  urgentReason?: string;
  startsOn: string;
  endsOn: string;
  createdAt: string;
  updatedAt: string;
};

function serializeDateOnly(value: string | Date): string {
  if (typeof value === "string") {
    return value.slice(0, 10);
  }

  return value.toISOString().slice(0, 10);
}

export function serializeDutyRequest(row: DutyRequestRow): DutyRequestDto {
  return {
    id: row.id,
    requestKind: row.request_kind,
    requestScope: row.request_scope,
    status: row.status,
    title: row.title,
    basis: row.basis,
    purpose: row.purpose,
    expectedOutput: row.expected_output,
    isUrgent: row.is_urgent,
    urgentReason: row.urgent_reason ?? undefined,
    startsOn: serializeDateOnly(row.starts_on),
    endsOn: serializeDateOnly(row.ends_on),
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString()
  };
}

export async function listDutyRequests(
  tx: Bun.SQL,
  tenantId: string,
  filters: {
    status?: DutyRequestStatus;
    requestKind?: DutyRequestKind;
  } = {}
): Promise<DutyRequestDto[]> {
  const rows = (await tx`
    SELECT id, request_kind, request_scope, status, title, basis, purpose,
      expected_output, is_urgent, urgent_reason, starts_on, ends_on,
      created_at, updated_at
    FROM awcms_duty_requests
    WHERE tenant_id = ${tenantId}
      AND deleted_at IS NULL
      AND (${filters.status ?? null}::text IS NULL OR status = ${filters.status ?? null})
      AND (${filters.requestKind ?? null}::text IS NULL OR request_kind = ${filters.requestKind ?? null})
    ORDER BY created_at DESC, id DESC
    LIMIT 100
  `) as DutyRequestRow[];

  return rows.map(serializeDutyRequest);
}

export async function createDutyRequest(
  tx: Bun.SQL,
  tenantId: string,
  requestedByTenantUserId: string,
  input: CreateDutyRequestInput
): Promise<DutyRequestDto> {
  const rows = (await tx`
    INSERT INTO awcms_duty_requests (
      tenant_id,
      request_kind,
      request_scope,
      title,
      basis,
      purpose,
      expected_output,
      requested_by_tenant_user_id,
      is_urgent,
      urgent_reason,
      starts_on,
      ends_on
    )
    VALUES (
      ${tenantId},
      ${input.requestKind},
      ${input.requestScope},
      ${input.title},
      ${input.basis},
      ${input.purpose},
      ${input.expectedOutput},
      ${requestedByTenantUserId},
      ${input.isUrgent},
      ${input.urgentReason ?? null},
      ${input.startsOn},
      ${input.endsOn}
    )
    RETURNING id, request_kind, request_scope, status, title, basis, purpose,
      expected_output, is_urgent, urgent_reason, starts_on, ends_on,
      created_at, updated_at
  `) as DutyRequestRow[];

  return serializeDutyRequest(rows[0]!);
}

export async function submitDutyRequest(
  tx: Bun.SQL,
  tenantId: string,
  dutyRequestId: string
): Promise<DutyRequestDto | null> {
  const rows = (await tx`
    UPDATE awcms_duty_requests
    SET status = 'submitted',
      submitted_at = now(),
      updated_at = now(),
      version = version + 1
    WHERE tenant_id = ${tenantId}
      AND id = ${dutyRequestId}
      AND deleted_at IS NULL
      AND status IN ('draft', 'returned')
    RETURNING id, request_kind, request_scope, status, title, basis, purpose,
      expected_output, is_urgent, urgent_reason, starts_on, ends_on,
      created_at, updated_at
  `) as DutyRequestRow[];

  return rows[0] ? serializeDutyRequest(rows[0]) : null;
}

export async function getDutyTravelDashboardSummary(
  tx: Bun.SQL,
  tenantId: string
): Promise<{
  totalRequests: number;
  pendingApprovals: number;
  issuedDocuments: number;
  overdueEvidence: number;
}> {
  const rows = (await tx`
    SELECT
      count(*) FILTER (WHERE deleted_at IS NULL)::int AS total_requests,
      count(*) FILTER (
        WHERE deleted_at IS NULL
          AND status IN (
            'submitted',
            'supervisor_verified',
            'technical_verified',
            'secretary_verified',
            'finance_verified'
          )
      )::int AS pending_approvals,
      count(*) FILTER (
        WHERE deleted_at IS NULL AND status IN ('document_issued', 'in_progress')
      )::int AS issued_documents,
      count(*) FILTER (
        WHERE deleted_at IS NULL
          AND status IN ('document_issued', 'in_progress', 'evidence_returned')
          AND ends_on < current_date
      )::int AS overdue_evidence
    FROM awcms_duty_requests
    WHERE tenant_id = ${tenantId}
  `) as Array<{
    total_requests: number;
    pending_approvals: number;
    issued_documents: number;
    overdue_evidence: number;
  }>;

  const row = rows[0] ?? {
    total_requests: 0,
    pending_approvals: 0,
    issued_documents: 0,
    overdue_evidence: 0
  };

  return {
    totalRequests: Number(row.total_requests),
    pendingApprovals: Number(row.pending_approvals),
    issuedDocuments: Number(row.issued_documents),
    overdueEvidence: Number(row.overdue_evidence)
  };
}
