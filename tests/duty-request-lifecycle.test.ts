import { describe, expect, test } from "bun:test";

import {
  canIssueSppd,
  canTransitionDutyRequest,
  isDutyRequestKind,
  isDutyRequestScope,
  isDutyRequestStatus,
  isDutyRequestTerminal,
  requiresFinanceVerification,
  validateDutyTravelDates
} from "../src/modules/duty-travel/domain/duty-request-lifecycle";

describe("duty request lifecycle", () => {
  test("recognizes PRD request kinds, scopes, and statuses", () => {
    expect(isDutyRequestKind("task_only")).toBe(true);
    expect(isDutyRequestKind("task_with_sppd")).toBe(true);
    expect(isDutyRequestKind("sppd_only")).toBe(false);

    expect(isDutyRequestScope("dinkes")).toBe(true);
    expect(isDutyRequestScope("faskes")).toBe(true);
    expect(isDutyRequestScope("platform")).toBe(false);

    expect(isDutyRequestStatus("evidence_verified")).toBe(true);
    expect(isDutyRequestStatus("done")).toBe(false);
  });

  test("blocks SPPD behavior for Surat Tugas without cost", () => {
    expect(requiresFinanceVerification("task_only")).toBe(false);
    expect(canIssueSppd("task_only")).toBe(false);

    expect(requiresFinanceVerification("task_with_sppd")).toBe(true);
    expect(canIssueSppd("task_with_sppd")).toBe(true);
  });

  test("allows the normal PRD path through document and evidence completion", () => {
    expect(canTransitionDutyRequest("draft", "submitted")).toBe(true);
    expect(canTransitionDutyRequest("submitted", "supervisor_verified")).toBe(
      true
    );
    expect(
      canTransitionDutyRequest("supervisor_verified", "technical_verified")
    ).toBe(true);
    expect(
      canTransitionDutyRequest("technical_verified", "secretary_verified")
    ).toBe(true);
    expect(
      canTransitionDutyRequest("secretary_verified", "final_approved")
    ).toBe(true);
    expect(canTransitionDutyRequest("final_approved", "document_issued")).toBe(
      true
    );
    expect(canTransitionDutyRequest("document_issued", "in_progress")).toBe(
      true
    );
    expect(canTransitionDutyRequest("in_progress", "evidence_submitted")).toBe(
      true
    );
    expect(
      canTransitionDutyRequest("evidence_submitted", "evidence_verified")
    ).toBe(true);
    expect(canTransitionDutyRequest("evidence_verified", "completed")).toBe(
      true
    );
  });

  test("requires evidence verification before completion", () => {
    expect(canTransitionDutyRequest("document_issued", "completed")).toBe(
      false
    );
    expect(canTransitionDutyRequest("evidence_submitted", "completed")).toBe(
      false
    );
    expect(canTransitionDutyRequest("evidence_returned", "completed")).toBe(
      false
    );
  });

  test("treats rejected, completed, archived, and cancelled as terminal", () => {
    expect(isDutyRequestTerminal("rejected")).toBe(true);
    expect(isDutyRequestTerminal("completed")).toBe(true);
    expect(isDutyRequestTerminal("archived")).toBe(true);
    expect(isDutyRequestTerminal("cancelled")).toBe(true);
    expect(isDutyRequestTerminal("submitted")).toBe(false);
  });

  test("validates travel date order", () => {
    expect(
      validateDutyTravelDates({ startsOn: "2026-08-01", endsOn: "2026-08-02" })
    ).toEqual({ valid: true });

    expect(
      validateDutyTravelDates({ startsOn: "2026-08-02", endsOn: "2026-08-01" })
    ).toMatchObject({ valid: false });
  });
});
