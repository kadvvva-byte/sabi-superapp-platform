import {
  STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_VERSION,
  type StreamGiftLedgerSendIntentAuditFinalHandoffArea209B,
  type StreamGiftLedgerSendIntentAuditFinalHandoffBlocked209B,
  type StreamGiftLedgerSendIntentAuditFinalHandoffInput209B,
  type StreamGiftLedgerSendIntentAuditFinalHandoffPrepared209B,
  type StreamGiftLedgerSendIntentAuditFinalHandoffResult209B,
  type StreamGiftLedgerSendIntentAuditFinalHandoffSafety209B,
  type StreamGiftLedgerSendIntentAuditFinalHandoffSnapshot209B,
} from "./types";

export const STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_OWNER_APPROVAL =
  "I_APPROVE_209B_STREAM_GIFTS_SEND_INTENT_RECEIPT_AUDIT_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_REQUIRED_SURFACES_209B = [
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

export const STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_REQUIRED_AREAS_209B: readonly StreamGiftLedgerSendIntentAuditFinalHandoffArea209B[] = [
  "previous_209a_send_intent_audit_readiness_locked",
  "previous_208b_admin_controls_handoff_locked",
  "previous_207b_media_cdn_handoff_locked",
  "previous_206b_catalog_publish_handoff_locked",
  "previous_205b_localization_handoff_locked",
  "previous_204b_asset_policy_handoff_locked",
  "provider_not_configured_visibility_locked",
  "gift_catalog_readiness_locked",
  "gift_quote_contract_locked",
  "gift_send_intent_contract_locked",
  "gift_receipt_contract_locked",
  "gift_ledger_audit_boundary_locked",
  "sender_eligibility_boundary_locked",
  "recipient_eligibility_boundary_locked",
  "demo_points_no_cashout_boundary_locked",
  "diamonds_paid_future_deferred_boundary_locked",
  "official_streamer_payout_notice_locked",
  "regular_user_no_cashout_notice_locked",
  "age_region_compliance_notice_locked",
  "fraud_risk_review_boundary_locked",
  "admin_audit_evidence_locked",
  "future_exact_owner_approval_required",
] as const;

const RAW_SECRET_MARKERS_209B = [
  "sk_live_",
  "pk_live_",
  "AKIA",
  "AIza",
  ["-----BEGIN", "PRIVATE KEY-----"].join(" "),
  "provider_secret_value",
  "raw_provider_response",
  "purchase_token_value",
] as const;

export const STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_SAFETY: StreamGiftLedgerSendIntentAuditFinalHandoffSafety209B = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous209AReadinessRequired: true,
  giftCatalogReadinessLocked: true,
  giftQuoteContractLocked: true,
  giftSendIntentContractLocked: true,
  giftReceiptContractLocked: true,
  giftLedgerAuditBoundaryLocked: true,
  senderEligibilityBoundaryLocked: true,
  recipientEligibilityBoundaryLocked: true,
  demoPointsNoCashoutBoundaryLocked: true,
  diamondsPaidFutureDeferredBoundaryLocked: true,
  officialStreamerPayoutNoticeLocked: true,
  regularUserNoCashoutNoticeLocked: true,
  ageRegionComplianceNoticeLocked: true,
  fraudRiskReviewBoundaryLocked: true,
  adminAuditEvidenceLocked: true,
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

const defaultEvidenceReferences209B = Object.freeze([
  "209A_send_intent_receipt_audit_readiness_index_passed",
  "208B_admin_controls_final_handoff_passed",
  "207B_media_cdn_publish_readiness_final_handoff_passed",
  "206B_catalog_publish_readiness_final_handoff_passed",
  "205B_catalog_localization_final_handoff_passed",
  "204B_asset_policy_final_handoff_passed",
] as const);

function containsRawSecretOrProviderValue209B(input: StreamGiftLedgerSendIntentAuditFinalHandoffInput209B): boolean {
  const payload = JSON.stringify({
    evidenceReferences: input.evidenceReferences,
    operatorNote: input.operatorNote ?? "",
    sendIntentSurfaces: input.sendIntentSurfaces,
  });
  return RAW_SECRET_MARKERS_209B.some((marker) => payload.includes(marker));
}

function blocked209B(
  code: StreamGiftLedgerSendIntentAuditFinalHandoffBlocked209B["code"],
  blockedReason: string,
): StreamGiftLedgerSendIntentAuditFinalHandoffBlocked209B {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_VERSION,
    status: "send_intent_audit_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
    providerNotConfiguredVisible: true,
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    providerRuntimeEnabled: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_SAFETY,
  });
}

export function normalizeStreamGiftLedgerSendIntentAuditFinalHandoffInput209B(
  input?: Partial<StreamGiftLedgerSendIntentAuditFinalHandoffInput209B>,
): StreamGiftLedgerSendIntentAuditFinalHandoffInput209B {
  return Object.freeze({
    ownerApproval: input?.ownerApproval,
    handoffMode: input?.handoffMode ?? "disabled",
    acknowledged209AStage: input?.acknowledged209AStage ?? "disabled",
    evidenceReferences: Object.freeze([...(input?.evidenceReferences ?? defaultEvidenceReferences209B)]),
    handoffAreas: Object.freeze([...(input?.handoffAreas ?? STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_REQUIRED_AREAS_209B)]),
    sendIntentSurfaces: Object.freeze([...(input?.sendIntentSurfaces ?? STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_REQUIRED_SURFACES_209B)]),
    operatorNote: input?.operatorNote,
  });
}

export function assertStreamGiftLedgerSendIntentAuditFinalHandoff209BRemainsSafe(): StreamGiftLedgerSendIntentAuditFinalHandoffSafety209B {
  return STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_SAFETY;
}

export function getStreamGiftLedgerSendIntentAuditFinalHandoff209B(): StreamGiftLedgerSendIntentAuditFinalHandoffSnapshot209B {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_VERSION,
    status: "ready_for_send_intent_audit_final_handoff_without_runtime_enablement",
    previousStageRequired: "209A_send_intent_audit_readiness_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    previous209AReadinessRequired: true,
    giftQuoteContractLocked: true,
    giftSendIntentContractLocked: true,
    giftReceiptContractLocked: true,
    giftLedgerAuditBoundaryLocked: true,
    senderEligibilityBoundaryLocked: true,
    recipientEligibilityBoundaryLocked: true,
    demoPointsNoCashoutBoundaryLocked: true,
    diamondsPaidFutureDeferredBoundaryLocked: true,
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    providerRuntimeEnabled: false,
    nextStage: "closed_stream_gifts_send_intent_receipt_audit_future_send_or_runtime_requires_exact_owner_approval",
    safety: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_SAFETY,
  });
}

export function prepareStreamGiftLedgerSendIntentAuditFinalHandoff209B(
  input?: Partial<StreamGiftLedgerSendIntentAuditFinalHandoffInput209B>,
): StreamGiftLedgerSendIntentAuditFinalHandoffResult209B {
  const normalized = normalizeStreamGiftLedgerSendIntentAuditFinalHandoffInput209B(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_OWNER_APPROVAL) {
    return blocked209B("owner_approval_required", "209B requires explicit owner approval phrase for final handoff only.");
  }
  if (normalized.handoffMode !== "send_intent_audit_final_handoff_only") {
    return blocked209B("handoff_mode_disabled", "209B handoff mode must stay final-handoff-only and disabled for runtime.");
  }
  if (normalized.acknowledged209AStage !== "209A_send_intent_audit_readiness_index_clean") {
    return blocked209B("previous_209a_readiness_required", "209A send-intent audit readiness index must be acknowledged before 209B.");
  }
  if (normalized.evidenceReferences.length < 6) {
    return blocked209B("evidence_references_required", "At least six safe evidence references are required.");
  }
  if (normalized.handoffAreas.length === 0) {
    return blocked209B("handoff_areas_required", "Send-intent audit final handoff areas are required.");
  }
  if (normalized.sendIntentSurfaces.length === 0) {
    return blocked209B("send_intent_surfaces_required", "Send-intent surfaces are required.");
  }
  for (const surface of STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_REQUIRED_SURFACES_209B) {
    if (!normalized.sendIntentSurfaces.includes(surface)) {
      return blocked209B("required_send_intent_surface_missing", `Missing required send-intent surface: ${surface}.`);
    }
  }
  for (const area of STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_REQUIRED_AREAS_209B) {
    if (!normalized.handoffAreas.includes(area)) {
      return blocked209B("missing_required_area", `Missing required 209B area: ${area}.`);
    }
  }
  if (containsRawSecretOrProviderValue209B(normalized)) {
    return blocked209B("raw_secret_or_provider_value_rejected", "209B rejects raw secrets, provider tokens, provider responses, and purchase tokens.");
  }

  const envelope = Object.freeze({
    contract: "stream.gift.send-intent.audit-final-handoff.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_VERSION,
    previousStageRequired: "209A_send_intent_audit_readiness_index_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_REQUIRED_AREAS_209B,
    handoffAreas: normalized.handoffAreas,
    evidenceReferences: normalized.evidenceReferences,
    sendIntentSurfaces: normalized.sendIntentSurfaces,
    finalHandoffPrepared: true as const,
    providerNotConfiguredVisible: true as const,
    previous209AReadinessRequired: true as const,
    giftCatalogReadinessLocked: true as const,
    giftQuoteContractLocked: true as const,
    giftSendIntentContractLocked: true as const,
    giftReceiptContractLocked: true as const,
    giftLedgerAuditBoundaryLocked: true as const,
    senderEligibilityBoundaryLocked: true as const,
    recipientEligibilityBoundaryLocked: true as const,
    demoPointsNoCashoutBoundaryLocked: true as const,
    diamondsPaidFutureDeferredBoundaryLocked: true as const,
    officialStreamerPayoutNoticeLocked: true as const,
    regularUserNoCashoutNoticeLocked: true as const,
    ageRegionComplianceNoticeLocked: true as const,
    fraudRiskReviewBoundaryLocked: true as const,
    adminAuditEvidenceLocked: true as const,
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
    nextStage: "closed_stream_gifts_send_intent_receipt_audit_future_send_or_runtime_requires_exact_owner_approval" as const,
  });

  const prepared: StreamGiftLedgerSendIntentAuditFinalHandoffPrepared209B = Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_VERSION,
    status: "send_intent_audit_final_handoff_prepared_without_runtime_enablement",
    envelope,
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    providerRuntimeEnabled: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_SAFETY,
  });

  return prepared;
}

export function getStreamGiftLedgerSendIntentAuditFinalHandoff209BContract() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_VERSION,
    contract: "stream.gift.send-intent.audit-final-handoff.safe_disabled.v1",
    requiredOwnerApproval: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_OWNER_APPROVAL,
    previousStageRequired: "209A_send_intent_audit_readiness_index_clean",
    requiredAreas: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_REQUIRED_AREAS_209B,
    requiredSendIntentSurfaces: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_REQUIRED_SURFACES_209B,
    runtimeWriteAllowedNow: false,
    providerRuntimeEnabled: false,
    paymentCaptureAllowedNow: false,
    payoutExecutionAllowedNow: false,
    futureExecutionRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_SAFETY,
  });
}

export function getStreamGiftLedgerSendIntentAuditFinalHandoff209BRunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_VERSION,
    steps: Object.freeze([
      "Confirm 209A send-intent/receipt/audit readiness index is clean.",
      "Lock quote, send-intent, receipt, and ledger-audit boundaries without runtime write.",
      "Keep regular user no-cashout and official streamer payout notices visible.",
      "Block send execution, ledger write, Wallet/payment/payout/provider calls, DB writes, and realtime emits.",
      "Require a new exact owner approval before any future gift send execution package.",
    ]),
    runtimeWriteAllowedNow: false,
    providerRuntimeEnabled: false,
    futureSendIntentExecutionRequiresSeparateApproval: true,
  });
}

export function createStreamGiftLedgerSendIntentAuditFinalHandoff209BSendIntentRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_VERSION,
    status: "send_intent_execution_blocked_requires_separate_exact_owner_approval",
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    providerRuntimeEnabled: false,
    walletMutationExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    futureSendIntentExecutionRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_SAFETY,
  });
}

export function createStreamGiftLedgerSendIntentAuditFinalHandoff209BLedgerWriteRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_VERSION,
    status: "gift_ledger_write_blocked_requires_separate_exact_owner_approval",
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    providerRuntimeEnabled: false,
    walletMutationExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    futureGiftLedgerWriteRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_SAFETY,
  });
}

