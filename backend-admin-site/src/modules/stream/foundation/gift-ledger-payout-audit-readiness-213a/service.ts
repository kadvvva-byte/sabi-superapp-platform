import {
  STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_VERSION,
  STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_REQUIRED_AREAS_213A,
  STREAM_GIFT_LEDGER_PAYOUT_AUDIT_REQUIRED_SURFACES_213A,
  type StreamGiftLedgerPayoutAuditReadinessArea213A,
  type StreamGiftLedgerPayoutAuditReadinessBlocked213A,
  type StreamGiftLedgerPayoutAuditReadinessInput213A,
  type StreamGiftLedgerPayoutAuditReadinessPrepared213A,
  type StreamGiftLedgerPayoutAuditReadinessResult213A,
  type StreamGiftLedgerPayoutAuditReadinessSafety213A,
  type StreamGiftLedgerPayoutAuditReadinessSnapshot213A,
  type StreamGiftLedgerPayoutAuditSurface213A,
} from "./types";

export const STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_OWNER_APPROVAL =
  "I_APPROVE_213A_STREAM_GIFTS_PAYOUT_AUDIT_EVIDENCE_READINESS_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_SAFETY: StreamGiftLedgerPayoutAuditReadinessSafety213A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous212BHandoffRequired: true,
  payoutAuditTrailBoundaryVisible: true,
  providerPayoutEvidenceBoundaryVisible: true,
  walletPayoutEvidenceBoundaryVisible: true,
  taxWithholdingEvidenceBoundaryVisible: true,
  settlementHoldReleaseEvidenceBoundaryVisible: true,
  creatorInvoiceReceiptEvidenceBoundaryVisible: true,
  adminPayoutAuditReviewEvidenceVisible: true,
  auditExportBoundaryLocked: true,
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
  dbReadExecuted: false,
  dbWriteExecuted: false,
  schemaWriteExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  realtimeEmitExecuted: false,
  providerRuntimeEnabled: false,
  providerLiveCallExecuted: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  fakePaymentSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futurePayoutAuditWriteRequiresSeparateApproval: true,
  futurePayoutAuditExportRequiresSeparateApproval: true,
  futureWalletPayoutRequiresSeparateApproval: true,
  futureProviderPayoutRequiresSeparateApproval: true,
  futurePayoutExecutionRequiresSeparateApproval: true,
  sourceOnly: true,
});

const RAW_SECRET_OR_PROVIDER_VALUE_PATTERNS_213A = [
  /sk_live_[a-z0-9_\-]+/i,
  /pk_live_[a-z0-9_\-]+/i,
  /AKIA[0-9A-Z]{16}/,
  /AIza[0-9A-Za-z_\-]{20,}/,
  /-----BEGIN (?:RSA |EC |OPENSSH |)PRIVATE KEY-----/,
  /client_secret\s*[:=]\s*[a-z0-9_\-]{12,}/i,
  /provider[_-]?(?:token|secret|key)\s*[:=]\s*[a-z0-9_\-]{12,}/i,
] as const;

function hasRawSecretOrProviderValue213A(value: unknown): boolean {
  const serialized = typeof value === "string" ? value : JSON.stringify(value ?? "");
  return RAW_SECRET_OR_PROVIDER_VALUE_PATTERNS_213A.some((pattern) => pattern.test(serialized));
}

function toReadonlyStringArray213A(value: unknown): readonly string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : [];
}

function toReadonlyAreaArray213A(value: unknown): readonly StreamGiftLedgerPayoutAuditReadinessArea213A[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_REQUIRED_AREAS_213A);
  return value.filter((item): item is StreamGiftLedgerPayoutAuditReadinessArea213A => typeof item === "string" && allowed.has(item));
}

function toReadonlySurfaceArray213A(value: unknown): readonly StreamGiftLedgerPayoutAuditSurface213A[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_PAYOUT_AUDIT_REQUIRED_SURFACES_213A);
  return value.filter((item): item is StreamGiftLedgerPayoutAuditSurface213A => typeof item === "string" && allowed.has(item));
}

function blocked213A(
  code: StreamGiftLedgerPayoutAuditReadinessBlocked213A["code"],
  blockedReason: string,
): StreamGiftLedgerPayoutAuditReadinessBlocked213A {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_VERSION,
    status: "payout_audit_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessPrepared: false,
    providerNotConfiguredVisible: true,
    payoutAuditRuntimeWriteExecuted: false,
    payoutAuditRuntimeExportExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_SAFETY,
  });
}

export function normalizeStreamGiftLedgerPayoutAuditReadinessInput213A(
  input: Partial<StreamGiftLedgerPayoutAuditReadinessInput213A> | undefined,
): StreamGiftLedgerPayoutAuditReadinessInput213A {
  return Object.freeze({
    ownerApproval: input?.ownerApproval,
    readinessMode: input?.readinessMode,
    acknowledged212BStage: input?.acknowledged212BStage,
    evidenceReferences: toReadonlyStringArray213A(input?.evidenceReferences),
    readinessAreas: toReadonlyAreaArray213A(input?.readinessAreas),
    auditSurfaces: toReadonlySurfaceArray213A(input?.auditSurfaces),
    operatorNote: input?.operatorNote,
  });
}

export function prepareStreamGiftLedgerPayoutAuditReadiness213A(
  input: Partial<StreamGiftLedgerPayoutAuditReadinessInput213A> | undefined,
): StreamGiftLedgerPayoutAuditReadinessResult213A {
  const normalized = normalizeStreamGiftLedgerPayoutAuditReadinessInput213A(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_OWNER_APPROVAL) {
    return blocked213A("owner_approval_required", "213A payout audit readiness requires exact owner approval text.");
  }
  if (normalized.readinessMode !== "payout_audit_readiness_index_only") {
    return blocked213A("readiness_mode_disabled", "213A only prepares payout audit readiness visibility; runtime execution is disabled.");
  }
  if (normalized.acknowledged212BStage !== "212B_settlement_tax_final_handoff_clean") {
    return blocked213A("previous_212b_handoff_required", "212B settlement/tax final handoff must be clean before 213A.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked213A("evidence_references_required", "Payout audit readiness evidence references are required.");
  }
  if (normalized.readinessAreas.length === 0) {
    return blocked213A("readiness_areas_required", "Payout audit readiness areas are required.");
  }
  if (normalized.auditSurfaces.length === 0) {
    return blocked213A("audit_surfaces_required", "Payout audit surfaces are required.");
  }
  const missingArea = STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_REQUIRED_AREAS_213A.find((area) => !normalized.readinessAreas.includes(area));
  if (missingArea) {
    return blocked213A("missing_required_area", `Missing required payout audit readiness area: ${missingArea}`);
  }
  const missingSurface = STREAM_GIFT_LEDGER_PAYOUT_AUDIT_REQUIRED_SURFACES_213A.find((surface) => !normalized.auditSurfaces.includes(surface));
  if (missingSurface) {
    return blocked213A("missing_required_audit_surface", `Missing required payout audit surface: ${missingSurface}`);
  }
  if (hasRawSecretOrProviderValue213A(normalized)) {
    return blocked213A("raw_secret_or_provider_value_rejected", "Raw secrets or provider credential-like values are not accepted in 213A.");
  }

  const envelope = Object.freeze({
    contract: "stream.gift.payout-audit-readiness.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_VERSION,
    previousStageRequired: "212B_settlement_tax_final_handoff_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_REQUIRED_AREAS_213A,
    requiredAuditSurfaces: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_REQUIRED_SURFACES_213A,
    readinessAreas: normalized.readinessAreas,
    auditSurfaces: normalized.auditSurfaces,
    evidenceReferences: normalized.evidenceReferences,
    readinessPrepared: true as const,
    providerNotConfiguredVisible: true as const,
    previous212BHandoffRequired: true as const,
    payoutAuditTrailBoundaryVisible: true as const,
    providerPayoutEvidenceBoundaryVisible: true as const,
    walletPayoutEvidenceBoundaryVisible: true as const,
    taxWithholdingEvidenceBoundaryVisible: true as const,
    settlementHoldReleaseEvidenceBoundaryVisible: true as const,
    creatorInvoiceReceiptEvidenceBoundaryVisible: true as const,
    adminPayoutAuditReviewEvidenceVisible: true as const,
    auditExportBoundaryLocked: true as const,
    regularUserNoCashoutBoundaryLocked: true as const,
    demoPointsNoCashoutBoundaryLocked: true as const,
    payoutAuditRuntimeWriteExecuted: false as const,
    payoutAuditRuntimeExportExecuted: false as const,
    payoutEligibilityRuntimeDecisionExecuted: false as const,
    settlementRuntimeDecisionExecuted: false as const,
    taxWithholdingRuntimeDecisionExecuted: false as const,
    payoutExecuted: false as const,
    providerPayoutCallExecuted: false as const,
    walletMutationExecuted: false as const,
    paymentCaptureExecuted: false as const,
    runtimeExecutionApprovedNow: false as const,
    providerRuntimeEnabled: false as const,
    providerLiveCallExecuted: false as const,
    realtimeEmitExecuted: false as const,
    rawSecretsIncluded: false as const,
    envFileRead: false as const,
    envValueRead: false as const,
    fakeSuccessWritten: false as const,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true as const,
    futurePayoutAuditWriteRequiresSeparateApproval: true as const,
    futurePayoutAuditExportRequiresSeparateApproval: true as const,
    futureWalletPayoutRequiresSeparateApproval: true as const,
    futureProviderPayoutRequiresSeparateApproval: true as const,
    futurePayoutExecutionRequiresSeparateApproval: true as const,
    nextStage: "213B_stream_gifts_payout_audit_evidence_final_handoff" as const,
  });

  return Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_VERSION,
    status: "payout_audit_readiness_prepared_without_runtime_enablement",
    envelope,
    readinessPrepared: true,
    providerNotConfiguredVisible: true,
    payoutAuditRuntimeWriteExecuted: false,
    payoutAuditRuntimeExportExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_SAFETY,
  });
}

export function getStreamGiftLedgerPayoutAuditReadiness213A(): StreamGiftLedgerPayoutAuditReadinessSnapshot213A {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_VERSION,
    status: "ready_for_payout_audit_readiness_without_runtime_enablement",
    previousStageRequired: "212B_settlement_tax_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    payoutAuditTrailBoundaryVisible: true,
    providerPayoutEvidenceBoundaryVisible: true,
    walletPayoutEvidenceBoundaryVisible: true,
    taxWithholdingEvidenceBoundaryVisible: true,
    settlementHoldReleaseEvidenceBoundaryVisible: true,
    creatorInvoiceReceiptEvidenceBoundaryVisible: true,
    adminPayoutAuditReviewEvidenceVisible: true,
    payoutAuditRuntimeWriteExecuted: false,
    payoutAuditRuntimeExportExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    providerRuntimeEnabled: false,
    nextStage: "213B_stream_gifts_payout_audit_evidence_final_handoff",
    safety: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_SAFETY,
  });
}

export function getStreamGiftLedgerPayoutAuditReadiness213AContract() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_VERSION,
    contract: "stream.gift.payout-audit-readiness.safe_disabled.v1",
    ownerApproval: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_OWNER_APPROVAL,
    requiredAreas: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_REQUIRED_AREAS_213A,
    requiredAuditSurfaces: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_REQUIRED_SURFACES_213A,
    noEnvRead: true,
    noRawSecrets: true,
    noPayoutAuditRuntimeWrite: true,
    noPayoutAuditRuntimeExport: true,
    noPayoutExecution: true,
    noProviderPayoutCall: true,
    noWalletMutation: true,
    noDbReadWrite: true,
    noRuntimeEnablement: true,
    futureExactOwnerApprovalRequired: true,
  });
}

export function getStreamGiftLedgerPayoutAuditReadiness213ARunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_VERSION,
    steps: [
      "Confirm 212B settlement/tax/withholding final handoff and TypeScript are clean on owner machine.",
      "Expose payout audit/evidence boundaries to Admin without runtime writes or exports.",
      "Keep provider_not_configured visible until a separate exact owner approval enables a future execution package.",
      "Block payout audit write/export, provider payout call, Wallet payout, DB read/write, and realtime events.",
    ] as const,
    blockedRuntimeOperations: [
      "payout_audit_runtime_write",
      "payout_audit_runtime_export",
      "provider_payout_call",
      "wallet_payout_mutation",
      "payout_execution",
      "db_read_write",
      "provider_runtime_enablement",
    ] as const,
  });
}

export function createStreamGiftLedgerPayoutAuditReadiness213AAuditWriteRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_VERSION,
    status: "payout_audit_runtime_write_blocked_without_exact_owner_approval",
    code: "future_payout_audit_write_requires_separate_approval",
    payoutAuditRuntimeWriteExecuted: false,
    payoutAuditRuntimeExportExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
  });
}

export function createStreamGiftLedgerPayoutAuditReadiness213AAuditExportRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_VERSION,
    status: "payout_audit_runtime_export_blocked_without_exact_owner_approval",
    code: "future_payout_audit_export_requires_separate_approval",
    payoutAuditRuntimeWriteExecuted: false,
    payoutAuditRuntimeExportExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
  });
}

export function createStreamGiftLedgerPayoutAuditReadiness213APayoutExecutionRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_VERSION,
    status: "payout_execution_blocked_without_exact_owner_approval",
    code: "future_payout_execution_requires_separate_approval",
    payoutAuditRuntimeWriteExecuted: false,
    payoutAuditRuntimeExportExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
  });
}

export function assertStreamGiftLedgerPayoutAuditReadiness213ARemainsSafe(): true {
  if (
    STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_SAFETY.envFileReadAllowedNow !== false ||
    STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_SAFETY.payoutAuditRuntimeWriteExecuted !== false ||
    STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_SAFETY.payoutAuditRuntimeExportExecuted !== false ||
    STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_SAFETY.providerPayoutCallExecuted !== false ||
    STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_SAFETY.walletMutationExecuted !== false ||
    STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_SAFETY.payoutExecutionExecuted !== false ||
    STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_SAFETY.dbWriteExecuted !== false ||
    STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_SAFETY.providerRuntimeEnabled !== false
  ) {
    throw new Error("213A payout audit readiness safety invariant failed");
  }
  return true;
}
