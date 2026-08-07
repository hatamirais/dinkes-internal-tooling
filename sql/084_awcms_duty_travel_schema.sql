-- duty_travel — SiPerdin Dinkes Kobar MVP domain schema.
--
-- This module is built directly in `src/modules/` per ADR-0034/0035/0047.
-- Every business table below is tenant-scoped and FORCE RLS-protected. Final
-- Surat Tugas/SPPD rows are immutable by convention: revisions/addenda create a
-- new version row rather than editing a locked row.

CREATE TABLE IF NOT EXISTS awcms_duty_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES awcms_tenants (id),
  request_number text,
  request_kind text NOT NULL,
  request_scope text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  title text NOT NULL,
  basis text NOT NULL,
  purpose text NOT NULL,
  expected_output text NOT NULL,
  origin_unit_id uuid,
  health_facility_id uuid,
  requested_by_tenant_user_id uuid NOT NULL,
  workflow_instance_id uuid,
  is_urgent boolean NOT NULL DEFAULT false,
  urgent_reason text,
  starts_on date NOT NULL,
  ends_on date NOT NULL,
  version integer NOT NULL DEFAULT 1,
  submitted_at timestamptz,
  final_approved_at timestamptz,
  cancelled_at timestamptz,
  cancelled_by_tenant_user_id uuid,
  cancel_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  deleted_by uuid,
  delete_reason text,
  CONSTRAINT awcms_duty_requests_kind_check
    CHECK (request_kind IN ('task_only', 'task_with_sppd')),
  CONSTRAINT awcms_duty_requests_scope_check
    CHECK (request_scope IN ('dinkes', 'faskes')),
  CONSTRAINT awcms_duty_requests_status_check
    CHECK (status IN (
      'draft',
      'submitted',
      'returned',
      'rejected',
      'supervisor_verified',
      'technical_verified',
      'secretary_verified',
      'finance_verified',
      'final_approved',
      'document_issued',
      'in_progress',
      'evidence_submitted',
      'evidence_returned',
      'evidence_verified',
      'completed',
      'archived',
      'cancelled'
    )),
  CONSTRAINT awcms_duty_requests_date_order_check
    CHECK (starts_on <= ends_on),
  CONSTRAINT awcms_duty_requests_urgent_reason_check
    CHECK (is_urgent = false OR nullif(trim(urgent_reason), '') IS NOT NULL),
  CONSTRAINT awcms_duty_requests_cancel_reason_check
    CHECK (cancelled_at IS NULL OR nullif(trim(cancel_reason), '') IS NOT NULL),
  CONSTRAINT awcms_duty_requests_version_check
    CHECK (version >= 1)
);

CREATE UNIQUE INDEX IF NOT EXISTS awcms_duty_requests_number_dedup
  ON awcms_duty_requests (tenant_id, request_number)
  WHERE request_number IS NOT NULL AND deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS awcms_duty_requests_tenant_status_idx
  ON awcms_duty_requests (tenant_id, status, created_at);

CREATE INDEX IF NOT EXISTS awcms_duty_requests_requested_by_idx
  ON awcms_duty_requests (tenant_id, requested_by_tenant_user_id, created_at);

CREATE INDEX IF NOT EXISTS awcms_duty_requests_schedule_idx
  ON awcms_duty_requests (tenant_id, starts_on, ends_on);

ALTER TABLE awcms_duty_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE awcms_duty_requests FORCE ROW LEVEL SECURITY;

CREATE POLICY awcms_duty_requests_tenant_isolation
  ON awcms_duty_requests
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

CREATE TABLE IF NOT EXISTS awcms_duty_request_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES awcms_tenants (id),
  duty_request_id uuid NOT NULL REFERENCES awcms_duty_requests (id),
  tenant_user_id uuid,
  employee_external_id text,
  name text NOT NULL,
  nip_masked text,
  rank_grade text,
  position_title text,
  participant_role text NOT NULL DEFAULT 'member',
  created_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT awcms_duty_participants_role_check
    CHECK (participant_role IN ('lead', 'member', 'support'))
);

CREATE INDEX IF NOT EXISTS awcms_duty_participants_request_idx
  ON awcms_duty_request_participants (tenant_id, duty_request_id);

CREATE INDEX IF NOT EXISTS awcms_duty_participants_user_idx
  ON awcms_duty_request_participants (tenant_id, tenant_user_id);

ALTER TABLE awcms_duty_request_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE awcms_duty_request_participants FORCE ROW LEVEL SECURITY;

CREATE POLICY awcms_duty_request_participants_tenant_isolation
  ON awcms_duty_request_participants
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

CREATE TABLE IF NOT EXISTS awcms_duty_request_destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES awcms_tenants (id),
  duty_request_id uuid NOT NULL REFERENCES awcms_duty_requests (id),
  destination_name text NOT NULL,
  address text,
  region_code text,
  transport_mode text,
  starts_on date NOT NULL,
  ends_on date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT awcms_duty_destinations_date_order_check
    CHECK (starts_on <= ends_on)
);

CREATE INDEX IF NOT EXISTS awcms_duty_destinations_request_idx
  ON awcms_duty_request_destinations (tenant_id, duty_request_id);

ALTER TABLE awcms_duty_request_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE awcms_duty_request_destinations FORCE ROW LEVEL SECURITY;

CREATE POLICY awcms_duty_request_destinations_tenant_isolation
  ON awcms_duty_request_destinations
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

CREATE TABLE IF NOT EXISTS awcms_duty_budget_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES awcms_tenants (id),
  duty_request_id uuid NOT NULL REFERENCES awcms_duty_requests (id),
  funding_source text NOT NULL,
  program_code text,
  activity_code text,
  sub_activity_code text,
  account_code text,
  cost_component text NOT NULL,
  quantity numeric(14, 2) NOT NULL DEFAULT 1,
  unit_amount numeric(18, 2) NOT NULL DEFAULT 0,
  total_amount numeric(18, 2) GENERATED ALWAYS AS (quantity * unit_amount) STORED,
  notes text,
  verified_at timestamptz,
  verified_by_tenant_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT awcms_duty_budget_non_negative_check
    CHECK (quantity >= 0 AND unit_amount >= 0)
);

CREATE INDEX IF NOT EXISTS awcms_duty_budget_lines_request_idx
  ON awcms_duty_budget_lines (tenant_id, duty_request_id);

ALTER TABLE awcms_duty_budget_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE awcms_duty_budget_lines FORCE ROW LEVEL SECURITY;

CREATE POLICY awcms_duty_budget_lines_tenant_isolation
  ON awcms_duty_budget_lines
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

CREATE TABLE IF NOT EXISTS awcms_duty_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES awcms_tenants (id),
  duty_request_id uuid NOT NULL REFERENCES awcms_duty_requests (id),
  document_type text NOT NULL,
  document_number text NOT NULL,
  document_version integer NOT NULL DEFAULT 1,
  validation_token_hash text NOT NULL,
  file_object_id uuid,
  issued_at timestamptz NOT NULL DEFAULT now(),
  issued_by_tenant_user_id uuid NOT NULL,
  locked_at timestamptz NOT NULL DEFAULT now(),
  superseded_at timestamptz,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT awcms_duty_documents_type_check
    CHECK (document_type IN ('surat_tugas', 'sppd')),
  CONSTRAINT awcms_duty_documents_version_check
    CHECK (document_version >= 1)
);

CREATE UNIQUE INDEX IF NOT EXISTS awcms_duty_documents_number_dedup
  ON awcms_duty_documents (tenant_id, document_type, document_number);

CREATE UNIQUE INDEX IF NOT EXISTS awcms_duty_documents_version_dedup
  ON awcms_duty_documents (tenant_id, duty_request_id, document_type, document_version);

CREATE INDEX IF NOT EXISTS awcms_duty_documents_request_idx
  ON awcms_duty_documents (tenant_id, duty_request_id);

ALTER TABLE awcms_duty_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE awcms_duty_documents FORCE ROW LEVEL SECURITY;

CREATE POLICY awcms_duty_documents_tenant_isolation
  ON awcms_duty_documents
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

CREATE TABLE IF NOT EXISTS awcms_duty_evidences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES awcms_tenants (id),
  duty_request_id uuid NOT NULL REFERENCES awcms_duty_requests (id),
  evidence_type text NOT NULL,
  title text NOT NULL,
  description text,
  media_object_id uuid,
  submitted_by_tenant_user_id uuid NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  verification_status text NOT NULL DEFAULT 'submitted',
  verified_at timestamptz,
  verified_by_tenant_user_id uuid,
  return_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT awcms_duty_evidences_status_check
    CHECK (verification_status IN ('submitted', 'returned', 'verified'))
);

CREATE INDEX IF NOT EXISTS awcms_duty_evidences_request_idx
  ON awcms_duty_evidences (tenant_id, duty_request_id, verification_status);

ALTER TABLE awcms_duty_evidences ENABLE ROW LEVEL SECURITY;
ALTER TABLE awcms_duty_evidences FORCE ROW LEVEL SECURITY;

CREATE POLICY awcms_duty_evidences_tenant_isolation
  ON awcms_duty_evidences
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

CREATE TABLE IF NOT EXISTS awcms_duty_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES awcms_tenants (id),
  duty_request_id uuid NOT NULL REFERENCES awcms_duty_requests (id),
  summary text NOT NULL,
  result text NOT NULL,
  obstacles text,
  follow_up text,
  submitted_by_tenant_user_id uuid NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  verified_at timestamptz,
  verified_by_tenant_user_id uuid,
  return_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS awcms_duty_reports_request_idx
  ON awcms_duty_reports (tenant_id, duty_request_id);

ALTER TABLE awcms_duty_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE awcms_duty_reports FORCE ROW LEVEL SECURITY;

CREATE POLICY awcms_duty_reports_tenant_isolation
  ON awcms_duty_reports
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

CREATE TABLE IF NOT EXISTS awcms_duty_numbering_sequences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES awcms_tenants (id),
  sequence_key text NOT NULL,
  prefix_template text NOT NULL,
  current_value bigint NOT NULL DEFAULT 0,
  reset_period text NOT NULL DEFAULT 'yearly',
  active_from date NOT NULL DEFAULT current_date,
  active_until date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT awcms_duty_numbering_reset_check
    CHECK (reset_period IN ('never', 'yearly', 'monthly'))
);

CREATE UNIQUE INDEX IF NOT EXISTS awcms_duty_numbering_key_dedup
  ON awcms_duty_numbering_sequences (tenant_id, sequence_key)
  WHERE deleted_at IS NULL;

ALTER TABLE awcms_duty_numbering_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE awcms_duty_numbering_sequences FORCE ROW LEVEL SECURITY;

CREATE POLICY awcms_duty_numbering_sequences_tenant_isolation
  ON awcms_duty_numbering_sequences
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

CREATE TABLE IF NOT EXISTS awcms_duty_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES awcms_tenants (id),
  template_key text NOT NULL,
  document_type text NOT NULL,
  name text NOT NULL,
  body_template text NOT NULL,
  schema_version integer NOT NULL DEFAULT 1,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT awcms_duty_templates_type_check
    CHECK (document_type IN ('surat_tugas', 'sppd', 'duty_report')),
  CONSTRAINT awcms_duty_templates_schema_version_check
    CHECK (schema_version >= 1)
);

CREATE UNIQUE INDEX IF NOT EXISTS awcms_duty_templates_key_dedup
  ON awcms_duty_templates (tenant_id, template_key)
  WHERE deleted_at IS NULL;

ALTER TABLE awcms_duty_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE awcms_duty_templates FORCE ROW LEVEL SECURITY;

CREATE POLICY awcms_duty_templates_tenant_isolation
  ON awcms_duty_templates
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

