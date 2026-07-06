import {
  STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_218A_VERSION,
  type StreamGiftLedgerAdminEnforcementReadinessArea218A,
  type StreamGiftLedgerAdminEnforcementReadinessBlocked218A,
  type StreamGiftLedgerAdminEnforcementReadinessInput218A,
  type StreamGiftLedgerAdminEnforcementReadinessPrepared218A,
  type StreamGiftLedgerAdminEnforcementReadinessResult218A,
  type StreamGiftLedgerAdminEnforcementReadinessSafety218A,
  type StreamGiftLedgerAdminEnforcementReadinessSnapshot218A,
  type StreamGiftLedgerAdminEnforcementReadinessSurface218A,
  type StreamGiftLedgerAdminEnforcementRuntimeRequest218A,
} from "./types";

export const STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_OWNER_APPROVAL_218A =
  "I_APPROVE_218A_STREAM_GIFTS_ADMIN_ENFORCEMENT_READINESS_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_REQUIRED_AREAS_218A: readonly StreamGiftLedgerAdminEnforcementReadinessArea218A[] = [
  "previous_217b_fraud_risk_velocity_final_handoff_locked",
  "admin_hold_boundary_visible",
  "admin_escalation_boundary_visible",
  "sender_limit_enforcement_boundary_visible",
  "recipient_risk_hold_boundary_visible",
  "gift_spam_lock_boundary_visible",
  "manual_review_queue_boundary_visible",
  "appeal_review_boundary_visible",
  "admin_enforcement_evidence_boundary_visible",
  "regular_user_no_cashout_boundary_locked",
  "demo_points_no_cashout_boundary_locked",
  "future_admin_enforcement_toggle_approval_required",
  "future_risk_hold_runtime_decision_approval_required",
  "future_provider_risk_call_approval_required",
  "future_db_read_approval_required",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_REQUIRED_SURFACES_218A: readonly StreamGiftLedgerAdminEnforcementReadinessSurface218A[] = [
  "admin_enforcement_readiness_snapshot",
  "hold_and_escalation_runbook",
  "sender_recipient_enforcement_review",
  "gift_spam_lock_review",
  "manual_review_queue_readiness",
  "appeal_review_readiness",
  "provider_not_configured_visibility",
] as const;

export const STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_SAFETY_218A: StreamGiftLedgerAdminEnforcementReadinessSafety218A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous217BFinalHandoffRequired: true,
  adminHoldBoundaryVisible: true,
  adminEscalationBoundaryVisible: true,
  senderLimitEnforcementBoundaryVisible: true,
  recipientRiskHoldBoundaryVisible: true,
  giftSpamLockBoundaryVisible: true,
  manualReviewQueueBoundaryVisible: true,
  appealReviewBoundaryVisible: true,
  adminEnforcementEvidenceBoundaryVisible: true,
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

export function containsRawSecret218A(value: string): boolean {
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

function blocked218A(
  code: StreamGiftLedgerAdminEnforcementReadinessBlocked218A["code"],
  blockedReason: string,
): StreamGiftLedgerAdminEnforcementReadinessBlocked218A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_218A_VERSION,
    status: "admin_enforcement_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessPrepared: false,
    providerNotConfiguredVisible: true,
    adminEnforcementRuntimeToggleExecuted: false,
    riskHoldRuntimeDecisionExecuted: false,
    providerRiskCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_SAFETY_218A,
  };
}

export function normalizeStreamGiftLedgerAdminEnforcementReadinessInput218A(
  input: Partial<StreamGiftLedgerAdminEnforcementReadinessInput218A> = {},
): StreamGiftLedgerAdminEnforcementReadinessInput218A {
  return {
    ownerApproval: input.ownerApproval ?? STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_OWNER_APPROVAL_218A,
    readinessMode: input.readinessMode ?? "admin_enforcement_readiness_index_only",
    acknowledged217BStage: input.acknowledged217BStage ?? "217B_fraud_risk_velocity_final_handoff_clean",
    evidenceReferences: input.evidenceReferences ?? [
      "217B_fraud_risk_velocity_final_handoff_clean",
      "admin_enforcement_readiness_index_source_only",
      "provider_not_configured_visible",
      "no_runtime_toggle_no_db_no_provider_no_wallet_no_payout",
    ],
    readinessAreas: input.readinessAreas ?? STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_REQUIRED_AREAS_218A,
    enforcementSurfaces: input.enforcementSurfaces ?? STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_REQUIRED_SURFACES_218A,
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerAdminEnforcementReadiness218ARemainsSafe(): StreamGiftLedgerAdminEnforcementReadinessSafety218A {
  return STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_SAFETY_218A;
}

export function getStreamGiftLedgerAdminEnforcementReadiness218A(): StreamGiftLedgerAdminEnforcementReadinessSnapshot218A {
  return {
    version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_218A_VERSION,
    status: "ready_for_admin_enforcement_readiness_without_runtime_enablement",
    previousStageRequired: "217B_fraud_risk_velocity_final_handoff_clean",
    providerNotConfiguredVisible: true,
    readinessAreas: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_REQUIRED_AREAS_218A,
    enforcementSurfaces: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_REQUIRED_SURFACES_218A,
    safety: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_SAFETY_218A,
  };
}

export function getStreamGiftLedgerAdminEnforcementReadiness218AContract() {
  return {
    contract: "stream.gift.admin-enforcement-readiness.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_218A_VERSION,
    previousStageRequired: "217B_fraud_risk_velocity_final_handoff_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_REQUIRED_AREAS_218A,
    requiredSurfaces: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_REQUIRED_SURFACES_218A,
    providerNotConfiguredVisible: true,
    readinessIndexOnlyNoRuntime: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    futureAdminEnforcementToggleRequiresSeparateApproval: true,
    futureRiskHoldDecisionRequiresSeparateApproval: true,
    futureProviderRiskCallRequiresSeparateApproval: true,
    futureDbReadRequiresSeparateApproval: true,
  } as const;
}

export function getStreamGiftLedgerAdminEnforcementReadiness218ARunbook() {
  return {
    version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_218A_VERSION,
    title: "Stream Gifts admin enforcement readiness runbook - safe disabled",
    previousStageRequired: "217B fraud/risk/velocity final handoff clean",
    operatorSteps: [
      "Confirm fraud/risk/velocity boundaries are closed in 217B.",
      "Review Admin hold/escalation/manual-review/appeal surfaces as evidence-only boundaries.",
      "Keep all enforcement toggles, risk-hold decisions, provider risk calls, DB reads, Wallet and payout actions disabled.",
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
    safety: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_SAFETY_218A,
  } as const;
}

export function prepareStreamGiftLedgerAdminEnforcementReadiness218A(
  input: Partial<StreamGiftLedgerAdminEnforcementReadinessInput218A> = {},
): StreamGiftLedgerAdminEnforcementReadinessResult218A {
  const normalized = normalizeStreamGiftLedgerAdminEnforcementReadinessInput218A(input);
  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_OWNER_APPROVAL_218A) {
    return blocked218A("owner_approval_required", "218A requires the exact owner approval string for source-only readiness preparation.");
  }
  if (normalized.readinessMode !== "admin_enforcement_readiness_index_only") {
    return blocked218A("readiness_mode_disabled", "218A only prepares the admin enforcement readiness index; runtime is disabled.");
  }
  if (normalized.acknowledged217BStage !== "217B_fraud_risk_velocity_final_handoff_clean") {
    return blocked218A("previous_217b_final_handoff_required", "217B clean final handoff must be acknowledged before 218A.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked218A("evidence_references_required", "At least one non-secret evidence reference is required.");
  }
  if (normalized.evidenceReferences.some(containsRawSecret218A) || (normalized.operatorNote && containsRawSecret218A(normalized.operatorNote))) {
    return blocked218A("raw_secret_or_provider_value_rejected", "Raw secrets or provider credential values are not accepted in 218A.");
  }
  if (normalized.readinessAreas.length === 0) {
    return blocked218A("readiness_areas_required", "Readiness areas are required.");
  }
  if (normalized.enforcementSurfaces.length === 0) {
    return blocked218A("enforcement_surfaces_required", "Enforcement surfaces are required.");
  }
  const missingArea = STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_REQUIRED_AREAS_218A.find(
    (area) => !normalized.readinessAreas.includes(area),
  );
  if (missingArea) {
    return blocked218A("missing_required_area", `Missing required 218A readiness area: ${missingArea}`);
  }
  const missingSurface = STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_REQUIRED_SURFACES_218A.find(
    (surface) => !normalized.enforcementSurfaces.includes(surface),
  );
  if (missingSurface) {
    return blocked218A("missing_required_surface", `Missing required 218A enforcement surface: ${missingSurface}`);
  }

  const prepared: StreamGiftLedgerAdminEnforcementReadinessPrepared218A = {
    ok: true,
    version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_218A_VERSION,
    status: "admin_enforcement_readiness_prepared_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.admin-enforcement-readiness.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_218A_VERSION,
      previousStageRequired: "217B_fraud_risk_velocity_final_handoff_clean",
      requiredAreas: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_REQUIRED_AREAS_218A,
      requiredSurfaces: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_REQUIRED_SURFACES_218A,
      readinessAreas: normalized.readinessAreas,
      enforcementSurfaces: normalized.enforcementSurfaces,
      evidenceReferences: normalized.evidenceReferences,
      readinessPrepared: true,
      providerNotConfiguredVisible: true,
      previous217BFinalHandoffRequired: true,
      adminHoldBoundaryVisible: true,
      adminEscalationBoundaryVisible: true,
      senderLimitEnforcementBoundaryVisible: true,
      recipientRiskHoldBoundaryVisible: true,
      giftSpamLockBoundaryVisible: true,
      manualReviewQueueBoundaryVisible: true,
      appealReviewBoundaryVisible: true,
      adminEnforcementEvidenceBoundaryVisible: true,
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
      nextStage: "218B_stream_gifts_admin_enforcement_final_handoff",
    },
    readinessPrepared: true,
    providerNotConfiguredVisible: true,
    adminEnforcementRuntimeToggleExecuted: false,
    riskHoldRuntimeDecisionExecuted: false,
    providerRiskCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_SAFETY_218A,
  };
  return prepared;
}

function blockedRuntimeRequest218A(): StreamGiftLedgerAdminEnforcementRuntimeRequest218A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ADMIN_ENFORCEMENT_READINESS_218A_VERSION,
    status: "admin_enforcement_runtime_request_blocked",
    blockedReason: "runtime_not_approved_in_218a",
    requiresNewExactOwnerApproval: true,
    adminEnforcementRuntimeToggleExecuted: false,
    riskHoldRuntimeDecisionExecuted: false,
    providerRiskCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
  };
}

export function createStreamGiftLedgerAdminEnforcement218ARiskHoldRuntimeDecisionRequest(): StreamGiftLedgerAdminEnforcementRuntimeRequest218A {
  return blockedRuntimeRequest218A();
}

export function createStreamGiftLedgerAdminEnforcement218AAdminRuntimeToggleRequest(): StreamGiftLedgerAdminEnforcementRuntimeRequest218A {
  return blockedRuntimeRequest218A();
}

export function createStreamGiftLedgerAdminEnforcement218AProviderRiskCallRequest(): StreamGiftLedgerAdminEnforcementRuntimeRequest218A {
  return blockedRuntimeRequest218A();
}

export function createStreamGiftLedgerAdminEnforcement218ADbReadRequest(): StreamGiftLedgerAdminEnforcementRuntimeRequest218A {
  return blockedRuntimeRequest218A();
}
