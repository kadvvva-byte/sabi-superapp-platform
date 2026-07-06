import {
  STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_VERSION,
  type StreamGiftLedgerSettlementTaxFinalHandoffArea212B,
  type StreamGiftLedgerSettlementTaxFinalHandoffBlocked212B,
  type StreamGiftLedgerSettlementTaxFinalHandoffInput212B,
  type StreamGiftLedgerSettlementTaxFinalHandoffPrepared212B,
  type StreamGiftLedgerSettlementTaxFinalHandoffResult212B,
  type StreamGiftLedgerSettlementTaxFinalHandoffSafety212B,
  type StreamGiftLedgerSettlementTaxFinalHandoffSnapshot212B,
} from "./types";

export const STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_OWNER_APPROVAL =
  "I_APPROVE_212B_STREAM_GIFTS_SETTLEMENT_TAX_WITHHOLDING_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_REQUIRED_AREAS_212B: readonly StreamGiftLedgerSettlementTaxFinalHandoffArea212B[] = [
  "previous_212a_settlement_tax_readiness_locked",
  "previous_211b_payout_eligibility_handoff_locked",
  "provider_not_configured_visibility_locked",
  "official_streamer_agreement_boundary_locked",
  "tax_withholding_policy_boundary_locked",
  "settlement_hold_policy_boundary_locked",
  "creator_country_tax_profile_boundary_locked",
  "invoice_receipt_evidence_boundary_locked",
  "admin_settlement_review_evidence_locked",
  "wallet_payout_boundary_locked",
  "provider_payout_boundary_locked",
  "payout_execution_boundary_locked",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_REQUIRED_SURFACES_212B = [
  "official_streamer_agreement",
  "tax_withholding_policy",
  "settlement_hold_policy",
  "creator_country_tax_profile",
  "invoice_receipt_evidence",
  "admin_settlement_review_evidence",
  "wallet_payout_boundary",
  "provider_payout_boundary",
  "payout_execution_boundary",
] as const;

export const STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_SAFETY: StreamGiftLedgerSettlementTaxFinalHandoffSafety212B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous212AReadinessRequired: true,
  previous211BHandoffRequired: true,
  officialStreamerAgreementBoundaryLocked: true,
  taxWithholdingPolicyBoundaryLocked: true,
  settlementHoldPolicyBoundaryLocked: true,
  creatorCountryTaxProfileBoundaryLocked: true,
  invoiceReceiptEvidenceBoundaryLocked: true,
  adminSettlementReviewEvidenceLocked: true,
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
  futureSettlementDecisionRequiresSeparateApproval: true,
  futureTaxWithholdingDecisionRequiresSeparateApproval: true,
  futureWalletPayoutRequiresSeparateApproval: true,
  futureProviderPayoutRequiresSeparateApproval: true,
  futurePayoutExecutionRequiresSeparateApproval: true,
  sourceOnly: true,
};

const DEFAULT_EVIDENCE_REFERENCES_212B = [
  "212A settlement/tax/withholding readiness index passed",
  "211B payout eligibility final handoff passed",
  "Admin settlement review evidence boundary visible",
] as const;

const RAW_SECRET_PATTERN_212B = /(sk_live_|pk_live_|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY|client_secret|provider_secret|payout_secret|access_token|refresh_token)/i;

function containsRawSecret212B(value: unknown): boolean {
  if (typeof value === "string") {
    return RAW_SECRET_PATTERN_212B.test(value);
  }
  if (Array.isArray(value)) {
    return value.some((entry) => containsRawSecret212B(entry));
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((entry) => containsRawSecret212B(entry));
  }
  return false;
}

function uniqueStringArray212B(value: unknown, fallback: readonly string[]): readonly string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }
  const normalized = value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  return Array.from(new Set(normalized));
}

function normalizeAreas212B(value: unknown): readonly StreamGiftLedgerSettlementTaxFinalHandoffArea212B[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_REQUIRED_AREAS_212B;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_REQUIRED_AREAS_212B);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerSettlementTaxFinalHandoffArea212B => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_REQUIRED_AREAS_212B;
}

function blocked212B(
  code: StreamGiftLedgerSettlementTaxFinalHandoffBlocked212B["code"],
  blockedReason: string,
): StreamGiftLedgerSettlementTaxFinalHandoffBlocked212B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_VERSION,
    status: "settlement_tax_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
    providerNotConfiguredVisible: true,
    settlementRuntimeDecisionExecuted: false,
    taxWithholdingRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_SAFETY,
  };
}

export function normalizeStreamGiftLedgerSettlementTaxFinalHandoffInput212B(
  input: Partial<StreamGiftLedgerSettlementTaxFinalHandoffInput212B> = {},
): StreamGiftLedgerSettlementTaxFinalHandoffInput212B {
  return {
    ownerApproval: input.ownerApproval,
    handoffMode: input.handoffMode ?? "settlement_tax_final_handoff_only",
    acknowledged212AStage: input.acknowledged212AStage ?? "212A_settlement_tax_readiness_index_clean",
    evidenceReferences: uniqueStringArray212B(input.evidenceReferences, DEFAULT_EVIDENCE_REFERENCES_212B),
    handoffAreas: normalizeAreas212B(input.handoffAreas),
    settlementSurfaces: uniqueStringArray212B(
      input.settlementSurfaces,
      STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_REQUIRED_SURFACES_212B,
    ),
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerSettlementTaxFinalHandoff212BRemainsSafe(): StreamGiftLedgerSettlementTaxFinalHandoffSafety212B {
  return STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_SAFETY;
}

export function prepareStreamGiftLedgerSettlementTaxFinalHandoff212B(
  rawInput: Partial<StreamGiftLedgerSettlementTaxFinalHandoffInput212B> = {},
): StreamGiftLedgerSettlementTaxFinalHandoffResult212B {
  if (containsRawSecret212B(rawInput)) {
    return blocked212B("raw_secret_or_provider_value_rejected", "Raw secrets/provider values are rejected; use labels and evidence references only.");
  }

  const input = normalizeStreamGiftLedgerSettlementTaxFinalHandoffInput212B(rawInput);

  if (input.ownerApproval !== STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_OWNER_APPROVAL) {
    return blocked212B("owner_approval_required", "212B exact owner approval phrase is required for final handoff only.");
  }
  if (input.handoffMode !== "settlement_tax_final_handoff_only") {
    return blocked212B("handoff_mode_disabled", "212B only prepares final handoff; no runtime mode is available.");
  }
  if (input.acknowledged212AStage !== "212A_settlement_tax_readiness_index_clean") {
    return blocked212B("previous_212a_readiness_required", "212A clean readiness acknowledgement is required.");
  }
  if (input.evidenceReferences.length === 0) {
    return blocked212B("evidence_references_required", "Evidence references are required.");
  }
  if (input.handoffAreas.length === 0) {
    return blocked212B("handoff_areas_required", "Handoff areas are required.");
  }
  if (input.settlementSurfaces.length === 0) {
    return blocked212B("settlement_surfaces_required", "Settlement/tax/withholding surfaces are required.");
  }

  for (const requiredArea of STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_REQUIRED_AREAS_212B) {
    if (!input.handoffAreas.includes(requiredArea)) {
      return blocked212B("missing_required_area", `Missing required handoff area: ${requiredArea}`);
    }
  }
  for (const requiredSurface of STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_REQUIRED_SURFACES_212B) {
    if (!input.settlementSurfaces.includes(requiredSurface)) {
      return blocked212B("required_settlement_surface_missing", `Missing required settlement/tax/withholding surface: ${requiredSurface}`);
    }
  }

  const prepared: StreamGiftLedgerSettlementTaxFinalHandoffPrepared212B = {
    ok: true,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_VERSION,
    status: "settlement_tax_final_handoff_prepared_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.settlement-tax-final-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_VERSION,
      previousStageRequired: "212A_settlement_tax_readiness_index_clean",
      requiredAreas: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_REQUIRED_AREAS_212B,
      handoffAreas: input.handoffAreas,
      evidenceReferences: input.evidenceReferences,
      settlementSurfaces: input.settlementSurfaces,
      finalHandoffPrepared: true,
      providerNotConfiguredVisible: true,
      previous212AReadinessRequired: true,
      previous211BHandoffRequired: true,
      officialStreamerAgreementBoundaryLocked: true,
      taxWithholdingPolicyBoundaryLocked: true,
      settlementHoldPolicyBoundaryLocked: true,
      creatorCountryTaxProfileBoundaryLocked: true,
      invoiceReceiptEvidenceBoundaryLocked: true,
      adminSettlementReviewEvidenceLocked: true,
      walletPayoutBoundaryLocked: true,
      providerPayoutBoundaryLocked: true,
      payoutExecutionBoundaryLocked: true,
      settlementRuntimeDecisionExecuted: false,
      taxWithholdingRuntimeDecisionExecuted: false,
      payoutEligibilityRuntimeDecisionExecuted: false,
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
      futureSettlementDecisionRequiresSeparateApproval: true,
      futureTaxWithholdingDecisionRequiresSeparateApproval: true,
      futureWalletPayoutRequiresSeparateApproval: true,
      futureProviderPayoutRequiresSeparateApproval: true,
      futurePayoutExecutionRequiresSeparateApproval: true,
      nextStage: "closed_stream_gifts_settlement_tax_withholding_future_decisions_payout_or_runtime_require_exact_owner_approval",
    },
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    settlementRuntimeDecisionExecuted: false,
    taxWithholdingRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_SAFETY,
  };

  return prepared;
}

export function getStreamGiftLedgerSettlementTaxFinalHandoff212B(): StreamGiftLedgerSettlementTaxFinalHandoffSnapshot212B {
  return {
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_VERSION,
    status: "ready_for_settlement_tax_final_handoff_without_runtime_enablement",
    previousStageRequired: "212A_settlement_tax_readiness_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    officialStreamerAgreementBoundaryLocked: true,
    taxWithholdingPolicyBoundaryLocked: true,
    settlementHoldPolicyBoundaryLocked: true,
    creatorCountryTaxProfileBoundaryLocked: true,
    invoiceReceiptEvidenceBoundaryLocked: true,
    adminSettlementReviewEvidenceLocked: true,
    settlementRuntimeDecisionExecuted: false,
    taxWithholdingRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    providerRuntimeEnabled: false,
    nextStage: "closed_stream_gifts_settlement_tax_withholding_future_decisions_payout_or_runtime_require_exact_owner_approval",
    safety: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_SAFETY,
  };
}

export function getStreamGiftLedgerSettlementTaxFinalHandoff212BContract() {
  return {
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_VERSION,
    contract: "stream.gift.settlement-tax-final-handoff.safe_disabled.v1",
    ownerApproval: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_OWNER_APPROVAL,
    requiredPreviousStage: "212A_settlement_tax_readiness_index_clean",
    requiredAreas: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_REQUIRED_AREAS_212B,
    requiredSettlementSurfaces: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_REQUIRED_SURFACES_212B,
    safeDisabledGuarantees: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_SAFETY,
  } as const;
}

export function getStreamGiftLedgerSettlementTaxFinalHandoff212BRunbook() {
  return {
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_VERSION,
    steps: [
      "Confirm 212A readiness index and TypeScript are clean on owner machine.",
      "Keep settlement/tax/withholding as final handoff only; do not execute runtime decisions.",
      "Keep provider_not_configured visible until separate exact approvals are granted.",
      "Require separate exact owner approval for settlement decisions, tax/withholding decisions, Wallet payout, provider payout, payout execution, or runtime execution.",
    ],
    prohibitedNow: [
      ".env read or raw secret intake",
      "settlement/tax runtime decision",
      "provider payout call",
      "Wallet mutation",
      "payout execution",
      "DB read/write, migration, Prisma generate",
      "realtime emit or fake success",
    ],
  } as const;
}

function futureBlocked212B(action: string) {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_VERSION,
    status: "future_exact_owner_approval_required",
    action,
    blockedReason: `${action} requires a new exact owner approval and separate execution package.`,
    providerNotConfiguredVisible: true,
    settlementRuntimeDecisionExecuted: false,
    taxWithholdingRuntimeDecisionExecuted: false,
    payoutExecutionExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_SAFETY,
  } as const;
}

export function createStreamGiftLedgerSettlementTaxFinalHandoff212BSettlementDecisionRequest() {
  return futureBlocked212B("settlement_runtime_decision");
}

export function createStreamGiftLedgerSettlementTaxFinalHandoff212BTaxDecisionRequest() {
  return futureBlocked212B("tax_withholding_runtime_decision");
}

export function createStreamGiftLedgerSettlementTaxFinalHandoff212BPayoutExecutionRequest() {
  return futureBlocked212B("payout_execution");
}
