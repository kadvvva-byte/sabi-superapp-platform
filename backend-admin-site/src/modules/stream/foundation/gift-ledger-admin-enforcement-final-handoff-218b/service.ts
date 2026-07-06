import {
  STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_VERSION,
  type StreamGiftLedgerAdminEnforcementFinalHandoffArea218B,
  type StreamGiftLedgerAdminEnforcementFinalHandoffBlocked218B,
  type StreamGiftLedgerAdminEnforcementFinalHandoffInput218B,
  type StreamGiftLedgerAdminEnforcementFinalHandoffPrepared218B,
  type StreamGiftLedgerAdminEnforcementFinalHandoffResult218B,
  type StreamGiftLedgerAdminEnforcementFinalHandoffSafety218B,
  type StreamGiftLedgerAdminEnforcementFinalHandoffSnapshot218B,
  type StreamGiftLedgerAdminEnforcementFinalHandoffSurface218B,
  type StreamGiftLedgerAdminEnforcementRuntimeRequest218B,
} from "./types";

export const STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_OWNER_APPROVAL =
  "I_APPROVE_218B_STREAM_GIFTS_ADMIN_ENFORCEMENT_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_REQUIRED_AREAS_218B: readonly StreamGiftLedgerAdminEnforcementFinalHandoffArea218B[] = [
  "previous_218a_admin_enforcement_readiness_locked",
  "admin_hold_boundary_locked",
  "admin_escalation_boundary_locked",
  "sender_limit_enforcement_boundary_locked",
  "recipient_risk_hold_boundary_locked",
  "gift_spam_lock_boundary_locked",
  "manual_review_queue_boundary_locked",
  "appeal_review_boundary_locked",
  "admin_enforcement_evidence_locked",
  "regular_user_no_cashout_boundary_locked",
  "demo_points_no_cashout_boundary_locked",
  "future_admin_enforcement_toggle_approval_required",
  "future_risk_hold_runtime_decision_approval_required",
  "future_provider_risk_call_approval_required",
  "future_db_read_approval_required",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_REQUIRED_SURFACES_218B: readonly StreamGiftLedgerAdminEnforcementFinalHandoffSurface218B[] = [
  "admin_enforcement_final_handoff_snapshot",
  "hold_and_escalation_final_handoff",
  "sender_recipient_enforcement_final_handoff",
  "gift_spam_lock_final_handoff",
  "manual_review_queue_final_handoff",
  "appeal_review_final_handoff",
  "provider_not_configured_final_visibility",
] as const;

export const STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_SAFETY: StreamGiftLedgerAdminEnforcementFinalHandoffSafety218B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous218AReadinessRequired: true,
  adminHoldBoundaryLocked: true,
  adminEscalationBoundaryLocked: true,
  senderLimitEnforcementBoundaryLocked: true,
  recipientRiskHoldBoundaryLocked: true,
  giftSpamLockBoundaryLocked: true,
  manualReviewQueueBoundaryLocked: true,
  appealReviewBoundaryLocked: true,
  adminEnforcementEvidenceLocked: true,
  regularUserNoCashoutBoundaryLocked: true,
  demoPointsNoCashoutBoundaryLocked: true,
  adminEnforcementRuntimeToggleExecuted: false,
  riskHoldRuntimeDecisionExecuted: false,
  fraudRiskRuntimeDecisionExecuted: false,
  velocityRuntimeDecisionExecuted: false,
  abuseRuntimeDecisionExecuted: false,
  providerRiskCallExecuted: false,
  providerComplianceCallExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  complianceRuntimeDecisionExecuted: false,
  kycKybRuntimeDecisionExecuted: false,
  amlSanctionsRuntimeDecisionExecuted: false,
  privacyRuntimeRedactionExecuted: false,
  retentionRuntimePurgeExecuted: false,
  dataSubjectRuntimeExportExecuted: false,
  giftLedgerExportRuntimeReadExecuted: false,
  giftLedgerReportRuntimeReadExecuted: false,
  payoutAuditRuntimeExportExecuted: false,
  reportRuntimeExportExecuted: false,
  exportRuntimeFileWriteExecuted: false,
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
  futureAdminEnforcementToggleRequiresSeparateApproval: true,
  futureRiskHoldDecisionRequiresSeparateApproval: true,
  futureProviderRiskCallRequiresSeparateApproval: true,
  futureDbReadRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

export function containsRawSecret218B(value: string): boolean {
  const normalized = value.trim();
  if (!normalized) return false;
  const forbidden = [
    "sk_live_",
    "sk_test_",
    "rk_live_",
    "pk_live_",
    "AIza",
    "PRIVATE_KEY_HEADER",
    "RSA_PRIVATE_KEY_HEADER",
    "access_token",
    "refresh_token",
    "client_secret",
    "webhook_secret",
    "provider_secret",
  ];
  return forbidden.some((needle) => normalized.includes(needle));
}

function blocked218B(
  code: StreamGiftLedgerAdminEnforcementFinalHandoffBlocked218B["code"],
  blockedReason: string,
): StreamGiftLedgerAdminEnforcementFinalHandoffBlocked218B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_VERSION,
    status: "admin_enforcement_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
    providerNotConfiguredVisible: true,
    adminEnforcementRuntimeToggleExecuted: false,
    riskHoldRuntimeDecisionExecuted: false,
    providerRiskCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_SAFETY,
  };
}

export function normalizeStreamGiftLedgerAdminEnforcementFinalHandoffInput218B(
  input: Partial<StreamGiftLedgerAdminEnforcementFinalHandoffInput218B> = {},
): StreamGiftLedgerAdminEnforcementFinalHandoffInput218B {
  return {
    ownerApproval: input.ownerApproval ?? STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_OWNER_APPROVAL,
    handoffMode: input.handoffMode ?? "admin_enforcement_final_handoff_only",
    acknowledged218AStage: input.acknowledged218AStage ?? "218A_admin_enforcement_readiness_index_clean",
    evidenceReferences: input.evidenceReferences ?? [
      "218A_admin_enforcement_readiness_index_clean",
      "admin_enforcement_final_handoff_source_only",
      "provider_not_configured_visible",
      "no_runtime_toggle_no_risk_hold_no_db_no_provider_no_wallet_no_payout",
    ],
    handoffAreas: input.handoffAreas ?? STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_REQUIRED_AREAS_218B,
    enforcementSurfaces: input.enforcementSurfaces ?? STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_REQUIRED_SURFACES_218B,
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerAdminEnforcementFinalHandoff218BRemainsSafe(): StreamGiftLedgerAdminEnforcementFinalHandoffSafety218B {
  return STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_SAFETY;
}

export function getStreamGiftLedgerAdminEnforcementFinalHandoff218B(): StreamGiftLedgerAdminEnforcementFinalHandoffSnapshot218B {
  return {
    version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_VERSION,
    status: "ready_for_admin_enforcement_final_handoff_without_runtime_enablement",
    previousStageRequired: "218A_admin_enforcement_readiness_index_clean",
    providerNotConfiguredVisible: true,
    handoffAreas: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_REQUIRED_AREAS_218B,
    enforcementSurfaces: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_REQUIRED_SURFACES_218B,
    safety: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_SAFETY,
  };
}

export function getStreamGiftLedgerAdminEnforcementFinalHandoff218BContract() {
  return {
    contract: "stream.gift.admin-enforcement-final-handoff.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_VERSION,
    previousStageRequired: "218A_admin_enforcement_readiness_index_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_REQUIRED_AREAS_218B,
    requiredSurfaces: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_REQUIRED_SURFACES_218B,
    providerNotConfiguredVisible: true,
    finalHandoffOnlyNoRuntime: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    futureAdminEnforcementToggleRequiresSeparateApproval: true,
    futureRiskHoldDecisionRequiresSeparateApproval: true,
    futureProviderRiskCallRequiresSeparateApproval: true,
    futureDbReadRequiresSeparateApproval: true,
  } as const;
}

export function getStreamGiftLedgerAdminEnforcementFinalHandoff218BRunbook() {
  return {
    version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_VERSION,
    title: "Stream Gifts admin enforcement final handoff - safe disabled",
    previousStageRequired: "218A admin enforcement readiness index clean",
    operatorSteps: [
      "Confirm 218A admin hold/escalation/manual-review/appeal readiness is clean.",
      "Keep Admin enforcement toggles, risk-hold decisions, provider risk calls, DB reads, Wallet and payout actions disabled.",
      "Treat this stage as final handoff only for future controlled implementation planning.",
      "Require a new exact owner approval and a separate execution package before any runtime action.",
    ] as const,
    blockedRuntimeActions: [
      "admin enforcement runtime toggle",
      "risk hold runtime decision",
      "provider risk call",
      "DB read or write",
      "Wallet mutation",
      "payout execution",
      "gift send execution",
      "realtime emit",
    ] as const,
    safety: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_SAFETY,
  } as const;
}

export function prepareStreamGiftLedgerAdminEnforcementFinalHandoff218B(
  input: Partial<StreamGiftLedgerAdminEnforcementFinalHandoffInput218B> = {},
): StreamGiftLedgerAdminEnforcementFinalHandoffResult218B {
  const normalized = normalizeStreamGiftLedgerAdminEnforcementFinalHandoffInput218B(input);
  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_OWNER_APPROVAL) {
    return blocked218B("owner_approval_required", "218B requires the exact owner approval string for source-only final handoff preparation.");
  }
  if (normalized.handoffMode !== "admin_enforcement_final_handoff_only") {
    return blocked218B("handoff_mode_disabled", "218B only prepares the admin enforcement final handoff; runtime is disabled.");
  }
  if (normalized.acknowledged218AStage !== "218A_admin_enforcement_readiness_index_clean") {
    return blocked218B("previous_218a_readiness_required", "218A clean readiness index must be acknowledged before 218B.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked218B("evidence_references_required", "At least one non-secret evidence reference is required.");
  }
  if (normalized.evidenceReferences.some(containsRawSecret218B) || (normalized.operatorNote && containsRawSecret218B(normalized.operatorNote))) {
    return blocked218B("raw_secret_or_provider_value_rejected", "Raw secrets or provider credential values are not accepted in 218B.");
  }
  if (normalized.handoffAreas.length === 0) {
    return blocked218B("handoff_areas_required", "Final handoff areas are required.");
  }
  if (normalized.enforcementSurfaces.length === 0) {
    return blocked218B("enforcement_surfaces_required", "Enforcement surfaces are required.");
  }
  const missingArea = STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_REQUIRED_AREAS_218B.find(
    (area) => !normalized.handoffAreas.includes(area),
  );
  if (missingArea) {
    return blocked218B("missing_required_area", `Missing required 218B final handoff area: ${missingArea}`);
  }
  const missingSurface = STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_REQUIRED_SURFACES_218B.find(
    (surface) => !normalized.enforcementSurfaces.includes(surface),
  );
  if (missingSurface) {
    return blocked218B("missing_required_surface", `Missing required 218B enforcement surface: ${missingSurface}`);
  }

  const prepared: StreamGiftLedgerAdminEnforcementFinalHandoffPrepared218B = {
    ok: true,
    version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_VERSION,
    status: "admin_enforcement_final_handoff_prepared_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.admin-enforcement-final-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_VERSION,
      previousStageRequired: "218A_admin_enforcement_readiness_index_clean",
      requiredAreas: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_REQUIRED_AREAS_218B,
      requiredSurfaces: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_REQUIRED_SURFACES_218B,
      handoffAreas: normalized.handoffAreas,
      enforcementSurfaces: normalized.enforcementSurfaces,
      evidenceReferences: normalized.evidenceReferences,
      finalHandoffPrepared: true,
      providerNotConfiguredVisible: true,
      previous218AReadinessRequired: true,
      adminHoldBoundaryLocked: true,
      adminEscalationBoundaryLocked: true,
      senderLimitEnforcementBoundaryLocked: true,
      recipientRiskHoldBoundaryLocked: true,
      giftSpamLockBoundaryLocked: true,
      manualReviewQueueBoundaryLocked: true,
      appealReviewBoundaryLocked: true,
      adminEnforcementEvidenceLocked: true,
      regularUserNoCashoutBoundaryLocked: true,
      demoPointsNoCashoutBoundaryLocked: true,
      adminEnforcementRuntimeToggleExecuted: false,
      riskHoldRuntimeDecisionExecuted: false,
      fraudRiskRuntimeDecisionExecuted: false,
      velocityRuntimeDecisionExecuted: false,
      abuseRuntimeDecisionExecuted: false,
      providerRiskCallExecuted: false,
      dbReadExecuted: false,
      dbWriteExecuted: false,
      payoutExecuted: false,
      walletMutationExecuted: false,
      runtimeExecutionApprovedNow: false,
      providerRuntimeEnabled: false,
      realtimeEmitExecuted: false,
      rawSecretsIncluded: false,
      envFileRead: false,
      envValueRead: false,
      fakeSuccessWritten: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futureAdminEnforcementToggleRequiresSeparateApproval: true,
      futureRiskHoldDecisionRequiresSeparateApproval: true,
      futureProviderRiskCallRequiresSeparateApproval: true,
      futureDbReadRequiresSeparateApproval: true,
      nextStage: "closed_stream_gifts_admin_enforcement_future_toggles_risk_holds_provider_db_or_runtime_require_exact_owner_approval",
    },
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    adminEnforcementRuntimeToggleExecuted: false,
    riskHoldRuntimeDecisionExecuted: false,
    providerRiskCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_SAFETY,
  };
  return prepared;
}

function blockedRuntimeRequest218B(): StreamGiftLedgerAdminEnforcementRuntimeRequest218B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_FINAL_HANDOFF_218B_VERSION,
    status: "admin_enforcement_runtime_request_blocked",
    blockedReason: "runtime_not_approved_in_218b",
    requiresNewExactOwnerApproval: true,
    adminEnforcementRuntimeToggleExecuted: false,
    riskHoldRuntimeDecisionExecuted: false,
    providerRiskCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
  };
}

export function createStreamGiftLedgerAdminEnforcement218BRiskHoldRuntimeDecisionRequest(): StreamGiftLedgerAdminEnforcementRuntimeRequest218B {
  return blockedRuntimeRequest218B();
}

export function createStreamGiftLedgerAdminEnforcement218BAdminRuntimeToggleRequest(): StreamGiftLedgerAdminEnforcementRuntimeRequest218B {
  return blockedRuntimeRequest218B();
}

export function createStreamGiftLedgerAdminEnforcement218BProviderRiskCallRequest(): StreamGiftLedgerAdminEnforcementRuntimeRequest218B {
  return blockedRuntimeRequest218B();
}

export function createStreamGiftLedgerAdminEnforcement218BDbReadRequest(): StreamGiftLedgerAdminEnforcementRuntimeRequest218B {
  return blockedRuntimeRequest218B();
}
