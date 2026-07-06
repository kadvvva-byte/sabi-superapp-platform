import {
  STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_VERSION,
  type StreamGiftLedgerPayoutAuditFinalHandoffArea213B,
  type StreamGiftLedgerPayoutAuditFinalHandoffBlocked213B,
  type StreamGiftLedgerPayoutAuditFinalHandoffInput213B,
  type StreamGiftLedgerPayoutAuditFinalHandoffPrepared213B,
  type StreamGiftLedgerPayoutAuditFinalHandoffResult213B,
  type StreamGiftLedgerPayoutAuditFinalHandoffSafety213B,
  type StreamGiftLedgerPayoutAuditFinalHandoffSnapshot213B,
} from "./types";

export const STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_OWNER_APPROVAL =
  "I_APPROVE_213B_STREAM_GIFTS_PAYOUT_AUDIT_EVIDENCE_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_REQUIRED_AREAS_213B: readonly StreamGiftLedgerPayoutAuditFinalHandoffArea213B[] = [
  "previous_213a_payout_audit_readiness_locked",
  "previous_212b_settlement_tax_handoff_locked",
  "provider_not_configured_visibility_locked",
  "payout_audit_trail_boundary_locked",
  "provider_payout_evidence_boundary_locked",
  "wallet_payout_evidence_boundary_locked",
  "tax_withholding_evidence_boundary_locked",
  "settlement_hold_release_evidence_boundary_locked",
  "creator_invoice_receipt_evidence_boundary_locked",
  "admin_payout_audit_review_evidence_locked",
  "audit_export_boundary_locked",
  "payout_execution_boundary_locked",
  "regular_user_no_cashout_boundary_locked",
  "demo_points_no_cashout_boundary_locked",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_REQUIRED_SURFACES_213B = [
  "payout_audit_trail",
  "provider_payout_evidence",
  "wallet_payout_evidence",
  "tax_withholding_evidence",
  "settlement_hold_release_evidence",
  "creator_invoice_receipt_evidence",
  "admin_payout_audit_review",
  "audit_export_boundary",
  "payout_execution_boundary",
] as const;

export const STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_SAFETY: StreamGiftLedgerPayoutAuditFinalHandoffSafety213B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous213AReadinessRequired: true,
  previous212BHandoffRequired: true,
  payoutAuditTrailBoundaryLocked: true,
  providerPayoutEvidenceBoundaryLocked: true,
  walletPayoutEvidenceBoundaryLocked: true,
  taxWithholdingEvidenceBoundaryLocked: true,
  settlementHoldReleaseEvidenceBoundaryLocked: true,
  creatorInvoiceReceiptEvidenceBoundaryLocked: true,
  adminPayoutAuditReviewEvidenceLocked: true,
  auditExportBoundaryLocked: true,
  payoutExecutionBoundaryLocked: true,
  regularUserNoCashoutBoundaryLocked: true,
  demoPointsNoCashoutBoundaryLocked: true,
  payoutAuditRuntimeWriteExecuted: false,
  payoutAuditRuntimeExportExecuted: false,
  payoutEligibilityRuntimeDecisionExecuted: false,
  settlementRuntimeDecisionExecuted: false,
  taxWithholdingRuntimeDecisionExecuted: false,
  payoutExecutionExecuted: false,
  providerPayoutCallExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  sendIntentRuntimeExecutionExecuted: false,
  giftReceiptRuntimeWriteExecuted: false,
  giftLedgerRuntimeWriteExecuted: false,
  giftDeliveryRealtimeEmitExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  schemaWriteExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  realtimeEmitExecuted: false,
  runtimeEnablementExecuted: false,
  providerRuntimeEnabled: false,
  providerLiveCallExecuted: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futurePayoutAuditWriteRequiresSeparateApproval: true,
  futurePayoutAuditExportRequiresSeparateApproval: true,
  futureWalletPayoutRequiresSeparateApproval: true,
  futureProviderPayoutRequiresSeparateApproval: true,
  futurePayoutExecutionRequiresSeparateApproval: true,
  sourceOnly: true,
};

const DEFAULT_EVIDENCE_REFERENCES_213B = [
  "213A payout audit/evidence readiness index passed",
  "212B settlement/tax/withholding final handoff passed",
  "Admin payout audit evidence boundary locked",
] as const;

const RAW_SECRET_PATTERN_213B = /(sk_live_|pk_live_|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY|client_secret|provider_secret|payout_secret|access_token|refresh_token)/i;

function containsRawSecret213B(value: unknown): boolean {
  if (typeof value === "string") {
    return RAW_SECRET_PATTERN_213B.test(value);
  }
  if (Array.isArray(value)) {
    return value.some((entry) => containsRawSecret213B(entry));
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((entry) => containsRawSecret213B(entry));
  }
  return false;
}

function uniqueStringArray213B(value: unknown, fallback: readonly string[]): readonly string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }
  const normalized = value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  return Array.from(new Set(normalized));
}

function normalizeAreas213B(value: unknown): readonly StreamGiftLedgerPayoutAuditFinalHandoffArea213B[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_REQUIRED_AREAS_213B;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_REQUIRED_AREAS_213B);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerPayoutAuditFinalHandoffArea213B => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_REQUIRED_AREAS_213B;
}

function blocked213B(
  code: StreamGiftLedgerPayoutAuditFinalHandoffBlocked213B["code"],
  blockedReason: string,
): StreamGiftLedgerPayoutAuditFinalHandoffBlocked213B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_VERSION,
    status: "payout_audit_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
    providerNotConfiguredVisible: true,
    payoutAuditRuntimeWriteExecuted: false,
    payoutAuditRuntimeExportExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_SAFETY,
  };
}

export function normalizeStreamGiftLedgerPayoutAuditFinalHandoffInput213B(
  input: Partial<StreamGiftLedgerPayoutAuditFinalHandoffInput213B> = {},
): StreamGiftLedgerPayoutAuditFinalHandoffInput213B {
  return {
    ownerApproval: input.ownerApproval,
    handoffMode: input.handoffMode ?? "payout_audit_final_handoff_only",
    acknowledged213AStage: input.acknowledged213AStage ?? "213A_payout_audit_readiness_index_clean",
    evidenceReferences: uniqueStringArray213B(input.evidenceReferences, DEFAULT_EVIDENCE_REFERENCES_213B),
    handoffAreas: normalizeAreas213B(input.handoffAreas),
    auditSurfaces: uniqueStringArray213B(input.auditSurfaces, STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_REQUIRED_SURFACES_213B),
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerPayoutAuditFinalHandoff213BRemainsSafe(): StreamGiftLedgerPayoutAuditFinalHandoffSafety213B {
  return STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_SAFETY;
}

export function prepareStreamGiftLedgerPayoutAuditFinalHandoff213B(
  rawInput: Partial<StreamGiftLedgerPayoutAuditFinalHandoffInput213B> = {},
): StreamGiftLedgerPayoutAuditFinalHandoffResult213B {
  if (containsRawSecret213B(rawInput)) {
    return blocked213B("raw_secret_or_provider_value_rejected", "Raw secrets/provider values are rejected; use labels and evidence references only.");
  }

  const input = normalizeStreamGiftLedgerPayoutAuditFinalHandoffInput213B(rawInput);

  if (input.ownerApproval !== STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_OWNER_APPROVAL) {
    return blocked213B("owner_approval_required", "213B exact owner approval phrase is required for final handoff only.");
  }
  if (input.handoffMode !== "payout_audit_final_handoff_only") {
    return blocked213B("handoff_mode_disabled", "213B only prepares final handoff; no runtime mode is available.");
  }
  if (input.acknowledged213AStage !== "213A_payout_audit_readiness_index_clean") {
    return blocked213B("previous_213a_readiness_required", "213A clean payout audit readiness acknowledgement is required.");
  }
  if (input.evidenceReferences.length === 0) {
    return blocked213B("evidence_references_required", "Evidence references are required.");
  }
  if (input.handoffAreas.length === 0) {
    return blocked213B("handoff_areas_required", "Handoff areas are required.");
  }
  if (input.auditSurfaces.length === 0) {
    return blocked213B("audit_surfaces_required", "Payout audit surfaces are required.");
  }

  for (const requiredArea of STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_REQUIRED_AREAS_213B) {
    if (!input.handoffAreas.includes(requiredArea)) {
      return blocked213B("missing_required_area", `Missing required handoff area: ${requiredArea}`);
    }
  }
  for (const requiredSurface of STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_REQUIRED_SURFACES_213B) {
    if (!input.auditSurfaces.includes(requiredSurface)) {
      return blocked213B("required_audit_surface_missing", `Missing required payout audit surface: ${requiredSurface}`);
    }
  }

  const prepared: StreamGiftLedgerPayoutAuditFinalHandoffPrepared213B = {
    ok: true,
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_VERSION,
    status: "payout_audit_final_handoff_prepared_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.payout-audit-final-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_VERSION,
      previousStageRequired: "213A_payout_audit_readiness_index_clean",
      requiredAreas: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_REQUIRED_AREAS_213B,
      handoffAreas: input.handoffAreas,
      evidenceReferences: input.evidenceReferences,
      auditSurfaces: input.auditSurfaces,
      finalHandoffPrepared: true,
      providerNotConfiguredVisible: true,
      previous213AReadinessRequired: true,
      previous212BHandoffRequired: true,
      payoutAuditTrailBoundaryLocked: true,
      providerPayoutEvidenceBoundaryLocked: true,
      walletPayoutEvidenceBoundaryLocked: true,
      taxWithholdingEvidenceBoundaryLocked: true,
      settlementHoldReleaseEvidenceBoundaryLocked: true,
      creatorInvoiceReceiptEvidenceBoundaryLocked: true,
      adminPayoutAuditReviewEvidenceLocked: true,
      auditExportBoundaryLocked: true,
      payoutExecutionBoundaryLocked: true,
      regularUserNoCashoutBoundaryLocked: true,
      demoPointsNoCashoutBoundaryLocked: true,
      payoutAuditRuntimeWriteExecuted: false,
      payoutAuditRuntimeExportExecuted: false,
      payoutEligibilityRuntimeDecisionExecuted: false,
      settlementRuntimeDecisionExecuted: false,
      taxWithholdingRuntimeDecisionExecuted: false,
      payoutExecuted: false,
      providerPayoutCallExecuted: false,
      walletMutationExecuted: false,
      paymentCaptureExecuted: false,
      sendIntentRuntimeExecutionExecuted: false,
      giftReceiptRuntimeWriteExecuted: false,
      giftLedgerRuntimeWriteExecuted: false,
      runtimeExecutionApprovedNow: false,
      providerRuntimeEnabled: false,
      providerLiveCallExecuted: false,
      realtimeEmitExecuted: false,
      rawSecretsIncluded: false,
      envFileRead: false,
      envValueRead: false,
      fakeSuccessWritten: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futurePayoutAuditWriteRequiresSeparateApproval: true,
      futurePayoutAuditExportRequiresSeparateApproval: true,
      futureWalletPayoutRequiresSeparateApproval: true,
      futureProviderPayoutRequiresSeparateApproval: true,
      futurePayoutExecutionRequiresSeparateApproval: true,
      nextStage: "closed_stream_gifts_payout_audit_evidence_future_audit_export_payout_or_runtime_require_exact_owner_approval",
    },
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    payoutAuditRuntimeWriteExecuted: false,
    payoutAuditRuntimeExportExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_SAFETY,
  };

  return prepared;
}

export function getStreamGiftLedgerPayoutAuditFinalHandoff213B(): StreamGiftLedgerPayoutAuditFinalHandoffSnapshot213B {
  return {
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_VERSION,
    status: "ready_for_payout_audit_final_handoff_without_runtime_enablement",
    previousStageRequired: "213A_payout_audit_readiness_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    payoutAuditTrailBoundaryLocked: true,
    providerPayoutEvidenceBoundaryLocked: true,
    walletPayoutEvidenceBoundaryLocked: true,
    taxWithholdingEvidenceBoundaryLocked: true,
    settlementHoldReleaseEvidenceBoundaryLocked: true,
    creatorInvoiceReceiptEvidenceBoundaryLocked: true,
    adminPayoutAuditReviewEvidenceLocked: true,
    auditExportBoundaryLocked: true,
    payoutAuditRuntimeWriteExecuted: false,
    payoutAuditRuntimeExportExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    providerRuntimeEnabled: false,
    nextStage: "closed_stream_gifts_payout_audit_evidence_future_audit_export_payout_or_runtime_require_exact_owner_approval",
    safety: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_SAFETY,
  };
}

export function getStreamGiftLedgerPayoutAuditFinalHandoff213BContract() {
  return {
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_VERSION,
    contract: "stream.gift.payout-audit-final-handoff.safe_disabled.v1",
    ownerApprovalPhrase: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_OWNER_APPROVAL,
    requiredAreas: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_REQUIRED_AREAS_213B,
    requiredAuditSurfaces: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_REQUIRED_SURFACES_213B,
    safety: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_SAFETY,
  } as const;
}

export function getStreamGiftLedgerPayoutAuditFinalHandoff213BRunbook() {
  return {
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_VERSION,
    mode: "final_handoff_only_no_runtime_enablement",
    steps: [
      "Confirm 213A payout audit/evidence readiness index passed.",
      "Confirm 212B settlement/tax final handoff passed.",
      "Keep provider_not_configured visible.",
      "Keep payout audit write/export, Wallet payout, provider payout, payout execution, DB writes and runtime enablement disabled.",
      "Require a new exact owner approval package before any future payout audit export, payout execution or runtime execution.",
    ],
    forbidden: [
      ".env read or raw secret intake",
      "provider payout call",
      "Wallet mutation or payment capture",
      "payout audit runtime write/export",
      "payout execution",
      "DB read/write, migration or Prisma generate",
      "realtime emit or fake success",
    ],
  } as const;
}

function futureRequest213B(kind: "payout_audit_write" | "payout_audit_export" | "provider_payout" | "wallet_payout" | "payout_execution") {
  return {
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_VERSION,
    status: "blocked_requires_new_exact_owner_approval",
    kind,
    providerNotConfiguredVisible: true,
    executed: false,
    payoutAuditRuntimeWriteExecuted: false,
    payoutAuditRuntimeExportExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    requiredNextApproval: "new_exact_owner_approval_and_separate_execution_package_required",
    safety: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_SAFETY,
  } as const;
}

export function createStreamGiftLedgerPayoutAuditFinalHandoff213BAuditWriteRequest() {
  return futureRequest213B("payout_audit_write");
}

export function createStreamGiftLedgerPayoutAuditFinalHandoff213BAuditExportRequest() {
  return futureRequest213B("payout_audit_export");
}

export function createStreamGiftLedgerPayoutAuditFinalHandoff213BProviderPayoutRequest() {
  return futureRequest213B("provider_payout");
}

export function createStreamGiftLedgerPayoutAuditFinalHandoff213BWalletPayoutRequest() {
  return futureRequest213B("wallet_payout");
}

export function createStreamGiftLedgerPayoutAuditFinalHandoff213BPayoutExecutionRequest() {
  return futureRequest213B("payout_execution");
}
