import {
  STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_VERSION,
  type StreamGiftLedgerSendIntentAuditReadinessArea209A,
  type StreamGiftLedgerSendIntentAuditReadinessBlocked209A,
  type StreamGiftLedgerSendIntentAuditReadinessInput209A,
  type StreamGiftLedgerSendIntentAuditReadinessPrepared209A,
  type StreamGiftLedgerSendIntentAuditReadinessResult209A,
  type StreamGiftLedgerSendIntentAuditReadinessSafety209A,
  type StreamGiftLedgerSendIntentAuditReadinessSnapshot209A,
} from "./types";

export const STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_OWNER_APPROVAL =
  "I_APPROVE_209A_STREAM_GIFTS_SEND_INTENT_RECEIPT_AUDIT_READINESS_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_REQUIRED_SURFACES_209A = [
  "quote_contract",
  "send_intent_contract",
  "receipt_contract",
  "ledger_audit_boundary",
  "sender_eligibility",
  "recipient_eligibility",
  "demo_points_no_cashout",
  "diamonds_future_deferred",
  "fraud_risk_review",
  "admin_audit_evidence",
] as const;

export const STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_REQUIRED_AREAS_209A: readonly StreamGiftLedgerSendIntentAuditReadinessArea209A[] = [
  "previous_208b_admin_controls_handoff_locked",
  "previous_207b_media_cdn_handoff_locked",
  "previous_206b_catalog_publish_handoff_locked",
  "previous_205b_localization_handoff_locked",
  "previous_204b_asset_policy_handoff_locked",
  "provider_not_configured_visibility_locked",
  "gift_catalog_readiness_locked",
  "gift_quote_contract_visible",
  "gift_send_intent_contract_visible",
  "gift_receipt_contract_visible",
  "gift_ledger_audit_boundary_visible",
  "sender_eligibility_boundary_visible",
  "recipient_eligibility_boundary_visible",
  "demo_points_no_cashout_boundary_visible",
  "diamonds_paid_future_deferred_boundary_visible",
  "official_streamer_payout_notice_visible",
  "regular_user_no_cashout_notice_visible",
  "age_region_compliance_notice_visible",
  "fraud_risk_review_boundary_visible",
  "admin_audit_evidence_required",
  "future_exact_owner_approval_required",
] as const;

const RAW_SECRET_MARKERS_209A = [
  "sk_live_",
  "pk_live_",
  "AKIA",
  "AIza",
  ["-----BEGIN", "PRIVATE KEY-----"].join(" "),
  "provider_secret_value",
  "raw_provider_response",
  "purchase_token_value",
] as const;

export const STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_SAFETY: StreamGiftLedgerSendIntentAuditReadinessSafety209A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  giftCatalogReadinessLocked: true,
  giftQuoteContractVisible: true,
  giftSendIntentContractVisible: true,
  giftReceiptContractVisible: true,
  giftLedgerAuditBoundaryVisible: true,
  senderEligibilityBoundaryVisible: true,
  recipientEligibilityBoundaryVisible: true,
  demoPointsNoCashoutBoundaryVisible: true,
  diamondsPaidFutureDeferredBoundaryVisible: true,
  officialStreamerPayoutNoticeVisible: true,
  regularUserNoCashoutNoticeVisible: true,
  ageRegionComplianceNoticeVisible: true,
  fraudRiskReviewBoundaryVisible: true,
  adminAuditEvidenceRequired: true,
  sendIntentExecutionAllowedNow: false,
  sendIntentRuntimeExecutionExecuted: false,
  giftReceiptRuntimeWriteExecuted: false,
  giftLedgerRuntimeWriteExecuted: false,
  giftDeliveryRealtimeEmitExecuted: false,
  catalogRuntimePublishExecuted: false,
  mediaCdnRuntimePublishExecuted: false,
  localizationRuntimeWriteExecuted: false,
  assetRuntimePublishExecuted: false,
  adminSendIntentToggleExecuted: false,
  adminProviderToggleExecuted: false,
  adminCatalogToggleExecuted: false,
  adminMediaCdnToggleExecuted: false,
  runtimeExecutionApprovedNow: false,
  liveActivationExecutionApprovedNow: false,
  liveActivationExecutionPerformedNow: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  providerRuntimeEnabled: false,
  providerLiveCallExecuted: false,
  providerPayoutCallExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  schemaWriteExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  realtimeEmitExecuted: false,
  runtimeEnablementExecuted: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureSendIntentExecutionRequiresSeparateApproval: true,
  futureGiftLedgerWriteRequiresSeparateApproval: true,
  futureWalletPaymentRequiresSeparateApproval: true,
  futurePayoutRequiresSeparateApproval: true,
  sourceOnly: true,
});

const defaultEvidenceReferences209A = Object.freeze([
  "208B_admin_controls_final_handoff_passed",
  "207B_media_cdn_publish_readiness_final_handoff_passed",
  "206B_catalog_publish_readiness_final_handoff_passed",
  "205B_catalog_localization_final_handoff_passed",
  "204B_asset_policy_final_handoff_passed",
] as const);

function containsRawSecretOrProviderValue209A(input: StreamGiftLedgerSendIntentAuditReadinessInput209A): boolean {
  const payload = JSON.stringify({
    evidenceReferences: input.evidenceReferences,
    operatorNote: input.operatorNote ?? "",
    sendIntentSurfaces: input.sendIntentSurfaces,
  });
  return RAW_SECRET_MARKERS_209A.some((marker) => payload.includes(marker));
}

function blocked209A(
  code: StreamGiftLedgerSendIntentAuditReadinessBlocked209A["code"],
  blockedReason: string,
): StreamGiftLedgerSendIntentAuditReadinessBlocked209A {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_VERSION,
    status: "send_intent_audit_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessIndexPrepared: false,
    providerNotConfiguredVisible: true,
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    providerRuntimeEnabled: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_SAFETY,
  });
}

export function normalizeStreamGiftLedgerSendIntentAuditReadinessInput209A(
  input?: Partial<StreamGiftLedgerSendIntentAuditReadinessInput209A>,
): StreamGiftLedgerSendIntentAuditReadinessInput209A {
  return Object.freeze({
    ownerApproval: input?.ownerApproval,
    readinessMode: input?.readinessMode ?? "disabled",
    acknowledged208BStage: input?.acknowledged208BStage ?? "disabled",
    evidenceReferences: Object.freeze([...(input?.evidenceReferences ?? defaultEvidenceReferences209A)]),
    readinessAreas: Object.freeze([...(input?.readinessAreas ?? STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_REQUIRED_AREAS_209A)]),
    sendIntentSurfaces: Object.freeze([...(input?.sendIntentSurfaces ?? STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_REQUIRED_SURFACES_209A)]),
    operatorNote: input?.operatorNote,
  });
}

export function assertStreamGiftLedgerSendIntentAuditReadiness209ARemainsSafe(): StreamGiftLedgerSendIntentAuditReadinessSafety209A {
  return STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_SAFETY;
}

export function getStreamGiftLedgerSendIntentAuditReadiness209A(): StreamGiftLedgerSendIntentAuditReadinessSnapshot209A {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_VERSION,
    status: "ready_for_send_intent_audit_readiness_without_runtime_enablement",
    previousStageRequired: "208B_admin_controls_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    giftCatalogReadinessLocked: true,
    giftQuoteContractVisible: true,
    giftSendIntentContractVisible: true,
    giftReceiptContractVisible: true,
    giftLedgerAuditBoundaryVisible: true,
    senderEligibilityBoundaryVisible: true,
    recipientEligibilityBoundaryVisible: true,
    demoPointsNoCashoutBoundaryVisible: true,
    diamondsPaidFutureDeferredBoundaryVisible: true,
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    providerRuntimeEnabled: false,
    nextStage: "209B_stream_gifts_send_intent_receipt_audit_final_handoff",
    safety: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_SAFETY,
  });
}

export function prepareStreamGiftLedgerSendIntentAuditReadiness209A(
  input?: Partial<StreamGiftLedgerSendIntentAuditReadinessInput209A>,
): StreamGiftLedgerSendIntentAuditReadinessResult209A {
  const normalized = normalizeStreamGiftLedgerSendIntentAuditReadinessInput209A(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_OWNER_APPROVAL) {
    return blocked209A("owner_approval_required", "209A requires explicit owner approval phrase for readiness-index only.");
  }
  if (normalized.readinessMode !== "send_intent_audit_readiness_index_only") {
    return blocked209A("readiness_mode_disabled", "209A readiness mode must stay readiness-index-only and disabled for runtime.");
  }
  if (normalized.acknowledged208BStage !== "208B_admin_controls_final_handoff_clean") {
    return blocked209A("previous_208b_handoff_required", "208B Admin controls final handoff must be acknowledged before 209A.");
  }
  if (normalized.evidenceReferences.length < 5) {
    return blocked209A("evidence_references_required", "At least five safe evidence references are required.");
  }
  if (normalized.readinessAreas.length === 0) {
    return blocked209A("readiness_areas_required", "Send-intent audit readiness areas are required.");
  }
  if (normalized.sendIntentSurfaces.length === 0) {
    return blocked209A("send_intent_surfaces_required", "Send-intent surfaces are required.");
  }
  for (const surface of STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_REQUIRED_SURFACES_209A) {
    if (!normalized.sendIntentSurfaces.includes(surface)) {
      return blocked209A("required_send_intent_surface_missing", `Missing required send-intent surface: ${surface}.`);
    }
  }
  for (const area of STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_REQUIRED_AREAS_209A) {
    if (!normalized.readinessAreas.includes(area)) {
      return blocked209A("missing_required_area", `Missing required 209A area: ${area}.`);
    }
  }
  if (containsRawSecretOrProviderValue209A(normalized)) {
    return blocked209A("raw_secret_or_provider_value_rejected", "209A rejects raw secrets, provider tokens, provider responses, and purchase tokens.");
  }

  const envelope = Object.freeze({
    contract: "stream.gift.send-intent.audit-readiness.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_VERSION,
    previousStageRequired: "208B_admin_controls_final_handoff_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_REQUIRED_AREAS_209A,
    readinessAreas: normalized.readinessAreas,
    evidenceReferences: normalized.evidenceReferences,
    sendIntentSurfaces: normalized.sendIntentSurfaces,
    readinessIndexPrepared: true as const,
    providerNotConfiguredVisible: true as const,
    giftCatalogReadinessLocked: true as const,
    giftQuoteContractVisible: true as const,
    giftSendIntentContractVisible: true as const,
    giftReceiptContractVisible: true as const,
    giftLedgerAuditBoundaryVisible: true as const,
    senderEligibilityBoundaryVisible: true as const,
    recipientEligibilityBoundaryVisible: true as const,
    demoPointsNoCashoutBoundaryVisible: true as const,
    diamondsPaidFutureDeferredBoundaryVisible: true as const,
    officialStreamerPayoutNoticeVisible: true as const,
    regularUserNoCashoutNoticeVisible: true as const,
    ageRegionComplianceNoticeVisible: true as const,
    fraudRiskReviewBoundaryVisible: true as const,
    adminAuditEvidenceRequired: true as const,
    sendIntentExecutionAllowedNow: false as const,
    sendIntentRuntimeExecutionExecuted: false as const,
    giftReceiptRuntimeWriteExecuted: false as const,
    giftLedgerRuntimeWriteExecuted: false as const,
    giftDeliveryRealtimeEmitExecuted: false as const,
    runtimeExecutionApprovedNow: false as const,
    providerRuntimeEnabled: false as const,
    providerLiveCallExecuted: false as const,
    providerPayoutCallExecuted: false as const,
    paymentCaptureExecuted: false as const,
    payoutExecuted: false as const,
    walletMutationExecuted: false as const,
    realtimeEmitExecuted: false as const,
    rawSecretsIncluded: false as const,
    envFileRead: false as const,
    envValueRead: false as const,
    fakeSuccessWritten: false as const,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true as const,
    futureSendIntentExecutionRequiresSeparateApproval: true as const,
    futureGiftLedgerWriteRequiresSeparateApproval: true as const,
    futureWalletPaymentRequiresSeparateApproval: true as const,
    futurePayoutRequiresSeparateApproval: true as const,
    nextStage: "209B_stream_gifts_send_intent_receipt_audit_final_handoff" as const,
  });

  const prepared: StreamGiftLedgerSendIntentAuditReadinessPrepared209A = Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_VERSION,
    status: "send_intent_audit_readiness_prepared_without_runtime_enablement",
    envelope,
    readinessIndexPrepared: true,
    providerNotConfiguredVisible: true,
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    providerRuntimeEnabled: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_SAFETY,
  });

  return prepared;
}

export function getStreamGiftLedgerSendIntentAuditReadiness209AContract() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_VERSION,
    contract: "stream.gift.send-intent.audit-readiness.safe_disabled.v1",
    requiredOwnerApproval: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_OWNER_APPROVAL,
    previousStageRequired: "208B_admin_controls_final_handoff_clean",
    requiredAreas: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_REQUIRED_AREAS_209A,
    requiredSendIntentSurfaces: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_REQUIRED_SURFACES_209A,
    runtimeWriteAllowedNow: false,
    providerRuntimeEnabled: false,
    paymentCaptureAllowedNow: false,
    payoutExecutionAllowedNow: false,
    futureExecutionRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_SAFETY,
  });
}

export function getStreamGiftLedgerSendIntentAuditReadiness209ARunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_VERSION,
    steps: Object.freeze([
      "Confirm 208B Admin controls final handoff is clean.",
      "Expose quote, send-intent, receipt, and ledger-audit boundaries without runtime write.",
      "Keep regular user no-cashout and official streamer payout notices visible.",
      "Block send execution, ledger write, Wallet/payment/payout/provider calls, DB writes, and realtime emits.",
      "Require a new exact owner approval before any future gift send execution package.",
    ]),
    runtimeWriteAllowedNow: false,
    providerRuntimeEnabled: false,
    futureSendIntentExecutionRequiresSeparateApproval: true,
  });
}

export function createStreamGiftLedgerSendIntentAuditReadiness209ASendIntentRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_VERSION,
    status: "send_intent_execution_blocked_requires_separate_exact_owner_approval",
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    providerRuntimeEnabled: false,
    walletMutationExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    futureSendIntentExecutionRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_SAFETY,
  });
}

export function createStreamGiftLedgerSendIntentAuditReadiness209ALedgerWriteRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_VERSION,
    status: "gift_ledger_write_blocked_requires_separate_exact_owner_approval",
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    providerRuntimeEnabled: false,
    walletMutationExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    futureGiftLedgerWriteRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_SAFETY,
  });
}

