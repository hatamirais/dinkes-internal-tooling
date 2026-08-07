import {
  isDutyRequestKind,
  isDutyRequestScope,
  validateDutyTravelDates,
  type DutyRequestKind,
  type DutyRequestScope
} from "./duty-request-lifecycle";

export type CreateDutyRequestInput = {
  requestKind: DutyRequestKind;
  requestScope: DutyRequestScope;
  title: string;
  basis: string;
  purpose: string;
  expectedOutput: string;
  startsOn: string;
  endsOn: string;
  isUrgent: boolean;
  urgentReason?: string;
};

type ValidationResult<T> =
  | { valid: true; value: T }
  | { valid: false; errors: Array<{ field: string; message: string }> };

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function readRequiredString(
  body: Record<string, unknown>,
  field: string,
  errors: Array<{ field: string; message: string }>
): string {
  const value = body[field];

  if (typeof value !== "string" || value.trim() === "") {
    errors.push({ field, message: `${field} is required.` });
    return "";
  }

  return value.trim();
}

export function validateCreateDutyRequestInput(
  value: unknown
): ValidationResult<CreateDutyRequestInput> {
  const body = asRecord(value);
  const errors: Array<{ field: string; message: string }> = [];

  const requestKindValue = body.requestKind;
  if (!isDutyRequestKind(requestKindValue)) {
    errors.push({
      field: "requestKind",
      message: "requestKind must be task_only or task_with_sppd."
    });
  }

  const requestScopeValue = body.requestScope;
  if (!isDutyRequestScope(requestScopeValue)) {
    errors.push({
      field: "requestScope",
      message: "requestScope must be dinkes or faskes."
    });
  }

  const title = readRequiredString(body, "title", errors);
  const basis = readRequiredString(body, "basis", errors);
  const purpose = readRequiredString(body, "purpose", errors);
  const expectedOutput = readRequiredString(body, "expectedOutput", errors);
  const startsOn = readRequiredString(body, "startsOn", errors);
  const endsOn = readRequiredString(body, "endsOn", errors);
  const isUrgent = typeof body.isUrgent === "boolean" ? body.isUrgent : false;
  const urgentReason =
    typeof body.urgentReason === "string" && body.urgentReason.trim() !== ""
      ? body.urgentReason.trim()
      : undefined;

  const dateValidation = validateDutyTravelDates({ startsOn, endsOn });
  if (!dateValidation.valid) {
    errors.push({ field: "startsOn", message: dateValidation.message });
  }

  if (isUrgent && !urgentReason) {
    errors.push({
      field: "urgentReason",
      message: "urgentReason is required for urgent requests."
    });
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    value: {
      requestKind: requestKindValue as DutyRequestKind,
      requestScope: requestScopeValue as DutyRequestScope,
      title,
      basis,
      purpose,
      expectedOutput,
      startsOn,
      endsOn,
      isUrgent,
      urgentReason
    }
  };
}
