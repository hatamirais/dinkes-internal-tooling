-- duty_travel — permission catalog seed for SiPerdin Dinkes Kobar MVP.
-- Keep in lockstep with
-- src/modules/duty-travel/domain/duty-travel-permissions.ts.

INSERT INTO awcms_permissions (module_key, activity_code, action, description)
VALUES
  ('duty_travel', 'request', 'read', 'Read duty travel requests'),
  ('duty_travel', 'request', 'create', 'Create duty travel requests'),
  ('duty_travel', 'request', 'update', 'Update draft or returned duty travel requests'),
  ('duty_travel', 'request', 'cancel', 'Cancel duty travel requests with a recorded reason'),
  ('duty_travel', 'approval', 'read', 'Read duty travel approval inbox and history'),
  ('duty_travel', 'approval', 'decide', 'Approve, reject, or return duty travel approval tasks'),
  ('duty_travel', 'document', 'read', 'Read issued duty travel document metadata'),
  ('duty_travel', 'document', 'issue', 'Issue locked Surat Tugas and SPPD documents'),
  ('duty_travel', 'budget', 'read', 'Read duty travel budget lines and SPPD costs'),
  ('duty_travel', 'budget', 'update', 'Update duty travel budget lines before finance verification'),
  ('duty_travel', 'budget', 'verify', 'Verify duty travel budget and SPPD cost lines'),
  ('duty_travel', 'evidence', 'read', 'Read duty travel evidence and reports'),
  ('duty_travel', 'evidence', 'upload', 'Upload duty travel evidence and reports'),
  ('duty_travel', 'evidence', 'verify', 'Verify or return duty travel evidence'),
  ('duty_travel', 'settings', 'read', 'Read duty travel settings, numbering, and templates'),
  ('duty_travel', 'settings', 'update', 'Update duty travel settings, numbering, and templates'),
  ('duty_travel', 'dashboard', 'read', 'Read duty travel dashboard summaries'),
  ('duty_travel', 'audit', 'read', 'Read duty travel audit views')
ON CONFLICT (module_key, activity_code, action) DO NOTHING;
