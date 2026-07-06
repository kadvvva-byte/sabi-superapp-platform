import {
  STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION,
  type StreamGiftLedgerSettlementTaxReadinessArea212A,
  type StreamGiftLedgerSettlementTaxReadinessBlocked212A,
  type StreamGiftLedgerSettlementTaxReadinessInput212A,
  type StreamGiftLedgerSettlementTaxReadinessPrepared212A,
  type StreamGiftLedgerSettlementTaxReadinessResult212A,
  type StreamGiftLedgerSettlementTaxReadinessSafety212A,
  type StreamGiftLedgerSettlementTaxReadinessSnapshot212A,
} from "./types";

export const STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_OWNER_APPROVAL =
  "I_APPROVE_212A_STREAM_GIFTS_SETTLEMENT_TAX_READINESS_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_REQUIRED_AREAS_212A: readonly StreamGiftLedgerSettlementTaxReadinessArea212A[] = [
  "previous_211b_payout_eligibility_handoff_locked",
  "official_streamer_agreement_boundary_visible",
  "tax_withholding_policy_boundary_visible",
  "settlement_hold_policy_boundary_visible",
  "creator_country_tax_profile_boundary_visible",
  "invoice_receipt_evidence_boundary_visible",
  "admin_settlement_review_evidence_visible",
  "provider_not_configured_visibility_locked",
  "wallet_payout_boundary_locked",
  "provider_payout_boundary_locked",
  "payout_execution_boundary_locked",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_REQUIRED_SURFACES_212A = [
  "official_streamer_agreement",
  "tax_withholding_policy",
  "settlement_hold_policy",
  "creator_country_tax_profile",
  "invoice_receipt_evidence",
  "admin_settlement_review",
  "wallet_payout_boundary",
  "provider_payout_boundary",
  "payout_execution_boundary",
] as const;

export const STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_SAFETY: StreamGiftLedgerSettlementTaxReadinessSafety212A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous211BHandoffRequired: true,
  taxWithholdingPolicyBoundaryVisible: true,
  settlementHoldPolicyBoundaryVisible: true,
  creatorCountryTaxProfileBoundaryVisible: true,
  invoiceReceiptEvidenceBoundaryVisible: true,
  adminSettlementReviewEvidenceVisible: true,
  walletPayoutBoundaryLocked: true,
  providerPayoutBoundaryLocked: true,
  payoutExecutionBoundaryLocked: true,
  settlementRuntimeDecisionExecuted: false,
  taxWithholdingRuntimeDecisionExecuted: false,
  payoutEligibilityRuntimeDecisionExecuted: false,
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
  futureSettlementDecisionRequiresSeparateApproval: true,
  futureTaxWithholdingDecisionRequiresSeparateApproval: true,
  futureWalletPayoutRequiresSeparateApproval: true,
  futureProviderPayoutRequiresSeparateApproval: true,
  futurePayoutExecutionRequiresSeparateApproval: true,
  sourceOnly: true,
});

const RAW_SECRET_OR_PROVIDER_VALUE_PATTERNS_212A = [
  /sk_live_[a-z0-9_\-]+/i,
  /pk_live_[a-z0-9_\-]+/i,
  /AKIA[0-9A-Z]{16}/,
  /AIza[0-9A-Za-z_\-]{20,}/,
  /-----BEGIN (?:RSA |EC |OPENSSH |)PRIVATE KEY-----/,
  /client_secret\s*[:=]\s*[a-z0-9_\-]{12,}/i,
  /provider[_-]?(?:token|secret|key)\s*[:=]\s*[a-z0-9_\-]{12,}/i,
] as const;

function hasRawSecretOrProviderValue212A(value: unknown): boolean {
  const serialized = typeof value === "string" ? value : JSON.stringify(value ?? "");
  return RAW_SECRET_OR_PROVIDER_VALUE_PATTERNS_212A.some((pattern) => pattern.test(serialized));
}

function toReadonlyStringArray212A(value: unknown): readonly string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : [];
}

function toReadonlyAreaArray212A(value: unknown): readonly StreamGiftLedgerSettlementTaxReadinessArea212A[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_REQUIRED_AREAS_212A);
  return value.filter((item): item is StreamGiftLedgerSettlementTaxReadinessArea212A => typeof item === "string" && allowed.has(item));
}

function blocked212A(
  code: StreamGiftLedgerSettlementTaxReadinessBlocked212A["code"],
  blockedReason: string,
): StreamGiftLedgerSettlementTaxReadinessBlocked212A {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION,
    status: "settlement_tax_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessPrepared: false,
    providerNotConfiguredVisible: true,
    settlementRuntimeDecisionExecuted: false,
    taxWithholdingRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_SAFETY,
  });
}

export function normalizeStreamGiftLedgerSettlementTaxReadinessInput212A(
  input: Partial<StreamGiftLedgerSettlementTaxReadinessInput212A> | undefined,
): StreamGiftLedgerSettlementTaxReadinessInput212A {
  return Object.freeze({
    ownerApproval: input?.ownerApproval,
    readinessMode: input?.readinessMode,
    acknowledged211BStage: input?.acknowledged211BStage,
    evidenceReferences: toReadonlyStringArray212A(input?.evidenceReferences),
    readinessAreas: toReadonlyAreaArray212A(input?.readinessAreas),
    settlementSurfaces: toReadonlyStringArray212A(input?.settlementSurfaces),
    operatorNote: input?.operatorNote,
  });
}

export function prepareStreamGiftLedgerSettlementTaxReadiness212A(
  input: Partial<StreamGiftLedgerSettlementTaxReadinessInput212A> | undefined,
): StreamGiftLedgerSettlementTaxReadinessResult212A {
  const normalized = normalizeStreamGiftLedgerSettlementTaxReadinessInput212A(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_OWNER_APPROVAL) {
    return blocked212A("owner_approval_required", "212A settlement/tax readiness requires exact owner approval text.");
  }
  if (normalized.readinessMode !== "settlement_tax_readiness_index_only") {
    return blocked212A("readiness_mode_disabled", "212A only prepares readiness visibility; runtime execution is disabled.");
  }
  if (normalized.acknowledged211BStage !== "211B_payout_eligibility_final_handoff_clean") {
    return blocked212A("previous_211b_handoff_required", "211B payout eligibility final handoff must be clean before 212A.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked212A("evidence_references_required", "Settlement/tax readiness evidence references are required.");
  }
  if (normalized.readinessAreas.length === 0) {
    return blocked212A("readiness_areas_required", "Settlement/tax readiness areas are required.");
  }
  if (normalized.settlementSurfaces.length === 0) {
    return blocked212A("settlement_surfaces_required", "Settlement/tax surfaces are required.");
  }
  const missingArea = STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_REQUIRED_AREAS_212A.find((area) => !normalized.readinessAreas.includes(area));
  if (missingArea) {
    return blocked212A("missing_required_area", `Missing required settlement/tax readiness area: ${missingArea}`);
  }
  const missingSurface = STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_REQUIRED_SURFACES_212A.find((surface) => !normalized.settlementSurfaces.includes(surface));
  if (missingSurface) {
    return blocked212A("required_settlement_surface_missing", `Missing required settlement/tax surface: ${missingSurface}`);
  }
  if (hasRawSecretOrProviderValue212A(normalized)) {
    return blocked212A("raw_secret_or_provider_value_rejected", "Raw secrets or provider credential-like values are not accepted in 212A.");
  }

  const envelope = Object.freeze({
    contract: "stream.gift.settlement-tax-readiness.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION,
    previousStageRequired: "211B_payout_eligibility_final_handoff_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_REQUIRED_AREAS_212A,
    readinessAreas: normalized.readinessAreas,
    evidenceReferences: normalized.evidenceReferences,
    settlementSurfaces: normalized.settlementSurfaces,
    readinessPrepared: true as const,
    providerNotConfiguredVisible: true as const,
    previous211BHandoffRequired: true as const,
    officialStreamerAgreementBoundaryVisible: true as const,
    taxWithholdingPolicyBoundaryVisible: true as const,
    settlementHoldPolicyBoundaryVisible: true as const,
    creatorCountryTaxProfileBoundaryVisible: true as const,
    invoiceReceiptEvidenceBoundaryVisible: true as const,
    adminSettlementReviewEvidenceVisible: true as const,
    walletPayoutBoundaryLocked: true as const,
    providerPayoutBoundaryLocked: true as const,
    payoutExecutionBoundaryLocked: true as const,
    settlementRuntimeDecisionExecuted: false as const,
    taxWithholdingRuntimeDecisionExecuted: false as const,
    payoutEligibilityRuntimeDecisionExecuted: false as const,
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
    futureSettlementDecisionRequiresSeparateApproval: true as const,
    futureTaxWithholdingDecisionRequiresSeparateApproval: true as const,
    futureWalletPayoutRequiresSeparateApproval: true as const,
    futureProviderPayoutRequiresSeparateApproval: true as const,
    futurePayoutExecutionRequiresSeparateApproval: true as const,
    nextStage: "212B_stream_gifts_settlement_tax_withholding_final_handoff" as const,
  });

  return Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION,
    status: "settlement_tax_readiness_prepared_without_runtime_enablement",
    envelope,
    readinessPrepared: true,
    providerNotConfiguredVisible: true,
    settlementRuntimeDecisionExecuted: false,
    taxWithholdingRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_SAFETY,
  });
}

export function getStreamGiftLedgerSettlementTaxReadiness212A(): StreamGiftLedgerSettlementTaxReadinessSnapshot212A {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION,
    status: "ready_for_settlement_tax_readiness_without_runtime_enablement",
    previousStageRequired: "211B_payout_eligibility_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    officialStreamerAgreementBoundaryVisible: true,
    taxWithholdingPolicyBoundaryVisible: true,
    settlementHoldPolicyBoundaryVisible: true,
    creatorCountryTaxProfileBoundaryVisible: true,
    invoiceReceiptEvidenceBoundaryVisible: true,
    adminSettlementReviewEvidenceVisible: true,
    settlementRuntimeDecisionExecuted: false,
    taxWithholdingRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    providerRuntimeEnabled: false,
    nextStage: "212B_stream_gifts_settlement_tax_withholding_final_handoff",
    safety: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_SAFETY,
  });
}

export function getStreamGiftLedgerSettlementTaxReadiness212AContract() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION,
    contract: "stream.gift.settlement-tax-readiness.safe_disabled.v1",
    ownerApproval: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_OWNER_APPROVAL,
    requiredAreas: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_REQUIRED_AREAS_212A,
    requiredSurfaces: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_REQUIRED_SURFACES_212A,
    noEnvRead: true,
    noRawSecrets: true,
    noSettlementRuntimeDecision: true,
    noTaxWithholdingRuntimeDecision: true,
    noPayoutExecution: true,
    noProviderPayoutCall: true,
    noWalletMutation: true,
    noDbReadWrite: true,
    noRuntimeEnablement: true,
    futureExactOwnerApprovalRequired: true,
  });
}

export function getStreamGiftLedgerSettlementTaxReadiness212ARunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION,
    steps: [
      "Confirm 211B payout eligibility final handoff and TypeScript are clean on owner machine.",
      "Expose settlement/tax/withholding boundaries to Admin without runtime decisions.",
      "Keep provider_not_configured visible until a separate exact owner approval enables a future execution package.",
      "Block payout execution, provider payout call, Wallet payout, DB write/read, and realtime events.",
    ] as const,
    blockedRuntimeOperations: [
      "settlement_runtime_decision",
      "tax_withholding_runtime_decision",
      "provider_payout_call",
      "wallet_payout_mutation",
      "payout_execution",
      "db_read_write",
      "provider_runtime_enablement",
    ] as const,
  });
}

export function createStreamGiftLedgerSettlementTaxReadiness212ASettlementDecisionRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION,
    status: "settlement_runtime_decision_blocked_without_exact_owner_approval",
    code: "future_settlement_decision_requires_separate_approval",
    settlementRuntimeDecisionExecuted: false,
    taxWithholdingRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
  });
}

export function createStreamGiftLedgerSettlementTaxReadiness212ATaxDecisionRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION,
    status: "tax_withholding_runtime_decision_blocked_without_exact_owner_approval",
    code: "future_tax_withholding_decision_requires_separate_approval",
    settlementRuntimeDecisionExecuted: false,
    taxWithholdingRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
  });
}

export function createStreamGiftLedgerSettlementTaxReadiness212APayoutExecutionRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION,
    status: "payout_execution_blocked_without_exact_owner_approval",
    code: "future_payout_execution_requires_separate_approval",
    settlementRuntimeDecisionExecuted: false,
    taxWithholdingRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
  });
}

export function assertStreamGiftLedgerSettlementTaxReadiness212ARemainsSafe(): true {
  if (
    STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_SAFETY.envFileReadAllowedNow !== false ||
    STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_SAFETY.providerPayoutCallExecuted !== false ||
    STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_SAFETY.walletMutationExecuted !== false ||
    STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_SAFETY.payoutExecutionExecuted !== false ||
    STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_SAFETY.dbWriteExecuted !== false ||
    STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_SAFETY.providerRuntimeEnabled !== false
  ) {
    throw new Error("212A settlement/tax readiness safety invariant failed");
  }
  return true;
}
