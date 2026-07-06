import {
  STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_VERSION,
  type StreamGiftLedgerLaunchReadinessControlArea219A,
  type StreamGiftLedgerLaunchReadinessControlBlocked219A,
  type StreamGiftLedgerLaunchReadinessControlInput219A,
  type StreamGiftLedgerLaunchReadinessControlPrepared219A,
  type StreamGiftLedgerLaunchReadinessControlResult219A,
  type StreamGiftLedgerLaunchReadinessControlSafety219A,
  type StreamGiftLedgerLaunchReadinessControlSnapshot219A,
  type StreamGiftLedgerLaunchReadinessControlSurface219A,
} from "./types";

export const STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_OWNER_APPROVAL =
  "I_APPROVE_219A_STREAM_GIFTS_LAUNCH_READINESS_CONTROL_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_REQUIRED_AREAS_219A: readonly StreamGiftLedgerLaunchReadinessControlArea219A[] = [
  "previous_218b_admin_enforcement_final_handoff_locked",
  "provider_visibility_boundary_locked",
  "catalog_media_admin_boundary_locked",
  "asset_policy_boundary_locked",
  "catalog_localization_boundary_locked",
  "catalog_publish_boundary_locked",
  "media_cdn_publish_boundary_locked",
  "admin_controls_boundary_locked",
  "send_intent_receipt_audit_boundary_locked",
  "eligibility_risk_compliance_boundary_locked",
  "official_streamer_payout_eligibility_boundary_locked",
  "settlement_tax_withholding_boundary_locked",
  "payout_audit_evidence_boundary_locked",
  "export_report_boundary_locked",
  "privacy_redaction_retention_boundary_locked",
  "compliance_evidence_boundary_locked",
  "fraud_risk_velocity_boundary_locked",
  "admin_enforcement_escalation_boundary_locked",
  "regular_user_no_cashout_boundary_locked",
  "demo_points_no_cashout_boundary_locked",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_REQUIRED_SURFACES_219A: readonly StreamGiftLedgerLaunchReadinessControlSurface219A[] = [
  "launch_readiness_control_index",
  "provider_not_configured_visibility",
  "catalog_and_media_readiness_visibility",
  "gift_send_and_ledger_boundary_visibility",
  "eligibility_risk_compliance_visibility",
  "official_streamer_payout_controls_visibility",
  "privacy_compliance_audit_visibility",
  "admin_enforcement_controls_visibility",
  "future_runtime_execution_lock_visibility",
] as const;

export const STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_SAFETY: StreamGiftLedgerLaunchReadinessControlSafety219A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous218BFinalHandoffRequired: true,
  providerVisibilityBoundaryLocked: true,
  catalogMediaAdminBoundaryLocked: true,
  assetPolicyBoundaryLocked: true,
  catalogLocalizationBoundaryLocked: true,
  catalogPublishBoundaryLocked: true,
  mediaCdnPublishBoundaryLocked: true,
  adminControlsBoundaryLocked: true,
  sendIntentReceiptAuditBoundaryLocked: true,
  eligibilityRiskComplianceBoundaryLocked: true,
  officialStreamerPayoutEligibilityBoundaryLocked: true,
  settlementTaxWithholdingBoundaryLocked: true,
  payoutAuditEvidenceBoundaryLocked: true,
  exportReportBoundaryLocked: true,
  privacyRedactionRetentionBoundaryLocked: true,
  complianceEvidenceBoundaryLocked: true,
  fraudRiskVelocityBoundaryLocked: true,
  adminEnforcementEscalationBoundaryLocked: true,
  regularUserNoCashoutBoundaryLocked: true,
  demoPointsNoCashoutBoundaryLocked: true,
  launchRuntimeEnablementExecuted: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  providerRuntimeEnabled: false,
  providerLiveCallExecuted: false,
  providerRiskCallExecuted: false,
  providerComplianceCallExecuted: false,
  providerPayoutCallExecuted: false,
  adminRuntimeToggleExecuted: false,
  adminEnforcementRuntimeToggleExecuted: false,
  riskHoldRuntimeDecisionExecuted: false,
  fraudRiskRuntimeDecisionExecuted: false,
  velocityRuntimeDecisionExecuted: false,
  abuseRuntimeDecisionExecuted: false,
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
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  sendIntentRuntimeExecutionExecuted: false,
  giftReceiptRuntimeWriteExecuted: false,
  giftLedgerRuntimeWriteExecuted: false,
  giftDeliveryRealtimeEmitExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  realtimeEmitExecuted: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureLaunchRuntimeEnablementRequiresSeparateApproval: true,
  futureProviderBindingRequiresSeparateApproval: true,
  futureProviderRuntimeRequiresSeparateApproval: true,
  futureGiftSendExecutionRequiresSeparateApproval: true,
  futureWalletPaymentRequiresSeparateApproval: true,
  futurePayoutExecutionRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  sourceOnly: true,
});

const CLOSED_BLOCKS_219A = Object.freeze([
  "202B_provider_visibility_final_handoff",
  "203B_catalog_media_admin_final_handoff",
  "204B_asset_policy_final_handoff",
  "205B_catalog_localization_final_handoff",
  "206B_catalog_publish_readiness_final_handoff",
  "207B_media_cdn_publish_readiness_final_handoff",
  "208B_admin_controls_final_handoff",
  "209B_send_intent_receipt_audit_final_handoff",
  "210B_eligibility_risk_compliance_final_handoff",
  "211B_official_streamer_payout_eligibility_final_handoff",
  "212B_settlement_tax_withholding_final_handoff",
  "213B_payout_audit_evidence_final_handoff",
  "214B_export_report_final_handoff",
  "215B_privacy_redaction_retention_final_handoff",
  "216B_compliance_evidence_final_handoff",
  "217B_fraud_risk_velocity_final_handoff",
  "218B_admin_enforcement_escalation_final_handoff",
] as const);

function containsForbiddenValue(values: readonly string[]): boolean {
  return values.some((value) => {
    const normalized = value.trim().toLowerCase();
    return normalized.includes("secret=") ||
      normalized.includes("api_key=") ||
      normalized.includes("apikey=") ||
      normalized.includes("token=") ||
      normalized.includes("password=") ||
      normalized.includes("private_key=") ||
      normalized.includes("bearer ");
  });
}

function missingRequired<T extends string>(required: readonly T[], actual: readonly T[]): T | undefined {
  return required.find((entry) => !actual.includes(entry));
}

function blocked(
  code: StreamGiftLedgerLaunchReadinessControlBlocked219A["code"],
  blockedReason: string,
): StreamGiftLedgerLaunchReadinessControlBlocked219A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_VERSION,
    status: "launch_readiness_control_index_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessPrepared: false,
    providerNotConfiguredVisible: true,
    launchRuntimeEnablementExecuted: false,
    providerRuntimeEnabled: false,
    sendIntentRuntimeExecutionExecuted: false,
    walletMutationExecuted: false,
    payoutExecutionExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_SAFETY,
  };
}

export function normalizeStreamGiftLedgerLaunchReadinessControlInput219A(
  input: Partial<StreamGiftLedgerLaunchReadinessControlInput219A> = {},
): StreamGiftLedgerLaunchReadinessControlInput219A {
  return {
    ownerApproval: input.ownerApproval ?? STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_OWNER_APPROVAL,
    readinessMode: input.readinessMode ?? "launch_readiness_control_index_only",
    acknowledged218BStage: input.acknowledged218BStage ?? "218B_admin_enforcement_final_handoff_clean",
    evidenceReferences: input.evidenceReferences ?? [
      "backend-stream-gifts-ledger-218b-report.json",
      "backend-stream-gifts-ledger-218b-handoff.md",
      "owner-machine-typescript-clean",
    ],
    readinessAreas: input.readinessAreas ?? STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_REQUIRED_AREAS_219A,
    controlSurfaces: input.controlSurfaces ?? STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_REQUIRED_SURFACES_219A,
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerLaunchReadinessControl219ARemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_SAFETY;
  if (
    safety.envFileReadAllowedNow !== false ||
    safety.envValueReadAllowedNow !== false ||
    safety.rawSecretAccepted !== false ||
    safety.launchRuntimeEnablementExecuted !== false ||
    safety.providerBindingExecuted !== false ||
    safety.providerRuntimeEnabled !== false ||
    safety.providerLiveCallExecuted !== false ||
    safety.providerRiskCallExecuted !== false ||
    safety.providerComplianceCallExecuted !== false ||
    safety.providerPayoutCallExecuted !== false ||
    safety.adminRuntimeToggleExecuted !== false ||
    safety.adminEnforcementRuntimeToggleExecuted !== false ||
    safety.riskHoldRuntimeDecisionExecuted !== false ||
    safety.fraudRiskRuntimeDecisionExecuted !== false ||
    safety.velocityRuntimeDecisionExecuted !== false ||
    safety.abuseRuntimeDecisionExecuted !== false ||
    safety.complianceRuntimeDecisionExecuted !== false ||
    safety.kycKybRuntimeDecisionExecuted !== false ||
    safety.amlSanctionsRuntimeDecisionExecuted !== false ||
    safety.privacyRuntimeRedactionExecuted !== false ||
    safety.retentionRuntimePurgeExecuted !== false ||
    safety.dataSubjectRuntimeExportExecuted !== false ||
    safety.giftLedgerExportRuntimeReadExecuted !== false ||
    safety.giftLedgerReportRuntimeReadExecuted !== false ||
    safety.payoutAuditRuntimeExportExecuted !== false ||
    safety.reportRuntimeExportExecuted !== false ||
    safety.exportRuntimeFileWriteExecuted !== false ||
    safety.settlementRuntimeDecisionExecuted !== false ||
    safety.taxWithholdingRuntimeDecisionExecuted !== false ||
    safety.payoutEligibilityRuntimeDecisionExecuted !== false ||
    safety.payoutExecutionExecuted !== false ||
    safety.walletMutationExecuted !== false ||
    safety.paymentCaptureExecuted !== false ||
    safety.sendIntentRuntimeExecutionExecuted !== false ||
    safety.giftReceiptRuntimeWriteExecuted !== false ||
    safety.giftLedgerRuntimeWriteExecuted !== false ||
    safety.giftDeliveryRealtimeEmitExecuted !== false ||
    safety.dbReadExecuted !== false ||
    safety.dbWriteExecuted !== false ||
    safety.migrationExecuted !== false ||
    safety.prismaGenerateExecuted !== false ||
    safety.realtimeEmitExecuted !== false ||
    safety.fakePaymentSuccessAllowed !== false ||
    safety.fakeGiftSendSuccessAllowed !== false ||
    safety.fakePayoutSuccessAllowed !== false ||
    safety.fakeAvailableBalanceAllowed !== false
  ) {
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-219A safety invariant failed");
  }
  return true;
}

export function prepareStreamGiftLedgerLaunchReadinessControl219A(
  rawInput: Partial<StreamGiftLedgerLaunchReadinessControlInput219A> = {},
): StreamGiftLedgerLaunchReadinessControlResult219A {
  assertStreamGiftLedgerLaunchReadinessControl219ARemainsSafe();
  const input = normalizeStreamGiftLedgerLaunchReadinessControlInput219A(rawInput);

  if (input.ownerApproval !== STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_OWNER_APPROVAL) {
    return blocked("owner_approval_required", "Exact 219A owner approval phrase is required; runtime remains disabled.");
  }
  if (input.readinessMode !== "launch_readiness_control_index_only") {
    return blocked("readiness_mode_disabled", "219A only prepares a launch-readiness control index; runtime remains disabled.");
  }
  if (input.acknowledged218BStage !== "218B_admin_enforcement_final_handoff_clean") {
    return blocked("previous_218b_final_handoff_required", "218B clean final handoff is required before 219A.");
  }
  if (input.evidenceReferences.length === 0) {
    return blocked("evidence_references_required", "At least one non-secret evidence reference is required.");
  }
  if (input.readinessAreas.length === 0) {
    return blocked("readiness_areas_required", "Readiness areas are required.");
  }
  if (input.controlSurfaces.length === 0) {
    return blocked("control_surfaces_required", "Control surfaces are required.");
  }
  const missingArea = missingRequired(STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_REQUIRED_AREAS_219A, input.readinessAreas);
  if (missingArea) {
    return blocked("missing_required_area", `Missing required launch-readiness control area: ${missingArea}`);
  }
  const missingSurface = missingRequired(STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_REQUIRED_SURFACES_219A, input.controlSurfaces);
  if (missingSurface) {
    return blocked("missing_required_surface", `Missing required launch-readiness control surface: ${missingSurface}`);
  }
  if (containsForbiddenValue([...input.evidenceReferences, input.operatorNote ?? ""])) {
    return blocked("raw_secret_or_provider_value_rejected", "Raw secret/provider values are rejected; use labels/evidence references only.");
  }

  const prepared: StreamGiftLedgerLaunchReadinessControlPrepared219A = {
    ok: true,
    version: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_VERSION,
    status: "launch_readiness_control_index_prepared_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.launch-readiness-control.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_VERSION,
      previousStageRequired: "218B_admin_enforcement_final_handoff_clean",
      requiredAreas: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_REQUIRED_AREAS_219A,
      requiredSurfaces: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_REQUIRED_SURFACES_219A,
      readinessAreas: input.readinessAreas,
      controlSurfaces: input.controlSurfaces,
      evidenceReferences: input.evidenceReferences,
      readinessIndexPrepared: true,
      providerNotConfiguredVisible: true,
      previous218BFinalHandoffRequired: true,
      providerVisibilityBoundaryLocked: true,
      catalogMediaAdminBoundaryLocked: true,
      assetPolicyBoundaryLocked: true,
      catalogLocalizationBoundaryLocked: true,
      catalogPublishBoundaryLocked: true,
      mediaCdnPublishBoundaryLocked: true,
      adminControlsBoundaryLocked: true,
      sendIntentReceiptAuditBoundaryLocked: true,
      eligibilityRiskComplianceBoundaryLocked: true,
      officialStreamerPayoutEligibilityBoundaryLocked: true,
      settlementTaxWithholdingBoundaryLocked: true,
      payoutAuditEvidenceBoundaryLocked: true,
      exportReportBoundaryLocked: true,
      privacyRedactionRetentionBoundaryLocked: true,
      complianceEvidenceBoundaryLocked: true,
      fraudRiskVelocityBoundaryLocked: true,
      adminEnforcementEscalationBoundaryLocked: true,
      regularUserNoCashoutBoundaryLocked: true,
      demoPointsNoCashoutBoundaryLocked: true,
      launchRuntimeEnablementExecuted: false,
      providerBindingExecuted: false,
      providerRuntimeEnabled: false,
      sendIntentRuntimeExecutionExecuted: false,
      walletMutationExecuted: false,
      payoutExecutionExecuted: false,
      dbReadExecuted: false,
      dbWriteExecuted: false,
      runtimeExecutionApprovedNow: false,
      realtimeEmitExecuted: false,
      rawSecretsIncluded: false,
      envFileRead: false,
      envValueRead: false,
      fakeSuccessWritten: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futureLaunchRuntimeEnablementRequiresSeparateApproval: true,
      futureProviderBindingRequiresSeparateApproval: true,
      futureProviderRuntimeRequiresSeparateApproval: true,
      futureGiftSendExecutionRequiresSeparateApproval: true,
      futureWalletPaymentRequiresSeparateApproval: true,
      futurePayoutExecutionRequiresSeparateApproval: true,
      futureDbReadWriteRequiresSeparateApproval: true,
      nextStage: "219B_stream_gifts_launch_readiness_control_final_handoff",
    },
    readinessIndexPrepared: true,
    providerNotConfiguredVisible: true,
    launchRuntimeEnablementExecuted: false,
    providerRuntimeEnabled: false,
    sendIntentRuntimeExecutionExecuted: false,
    walletMutationExecuted: false,
    payoutExecutionExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_SAFETY,
  };

  return prepared;
}

export function getStreamGiftLedgerLaunchReadinessControl219A(): StreamGiftLedgerLaunchReadinessControlSnapshot219A {
  assertStreamGiftLedgerLaunchReadinessControl219ARemainsSafe();
  return {
    version: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_VERSION,
    status: "ready_for_launch_readiness_control_index_without_runtime_enablement",
    readinessIndexOnlyNoRuntime: true,
    previousStageRequired: "218B_admin_enforcement_final_handoff_clean",
    providerNotConfiguredVisible: true,
    closedBlocks: CLOSED_BLOCKS_219A,
    requiredAreas: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_REQUIRED_AREAS_219A,
    requiredSurfaces: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_REQUIRED_SURFACES_219A,
    safety: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_SAFETY,
    nextStage: "219B_stream_gifts_launch_readiness_control_final_handoff",
  };
}

export function getStreamGiftLedgerLaunchReadinessControl219AContract() {
  return {
    contract: "stream.gift.launch-readiness-control.safe_disabled.v1",
    version: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_VERSION,
    previousStageRequired: "218B_admin_enforcement_final_handoff_clean",
    closedBlocks: CLOSED_BLOCKS_219A,
    requiredAreas: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_REQUIRED_AREAS_219A,
    requiredSurfaces: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_REQUIRED_SURFACES_219A,
    sourceOnly: true,
    runtimeEnablementAllowed: false,
    providerBindingAllowed: false,
    providerRuntimeAllowed: false,
    sendExecutionAllowed: false,
    walletMutationAllowed: false,
    payoutExecutionAllowed: false,
    dbReadWriteAllowed: false,
    fakeSuccessAllowed: false,
  } as const;
}

export function getStreamGiftLedgerLaunchReadinessControl219ARunbook() {
  return {
    version: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_VERSION,
    runbook: [
      "Verify 218B final handoff and owner-machine TypeScript clean evidence.",
      "Keep launch-readiness as visibility/control index only; do not enable runtime.",
      "Show provider_not_configured and all closed blocker boundaries as locked.",
      "Require a separate exact owner approval for any runtime enablement, provider binding, send execution, Wallet/payment, payout, DB read/write, realtime emit, or provider call.",
      "Reject raw secret/provider values; use evidence references only.",
    ],
    safeDisabled: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_SAFETY,
  } as const;
}

function lockedRequest(kind: string) {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_VERSION,
    status: "locked_without_runtime_enablement",
    kind,
    httpStatus: 423,
    providerNotConfiguredVisible: true,
    blockedReason: "219A is a launch-readiness control index only. Runtime execution requires a new exact owner approval and separate execution package.",
    safety: STREAM_GIFT_LEDGER_LAUNCH_READINESS_CONTROL_219A_SAFETY,
  } as const;
}

export function createStreamGiftLedgerLaunchReadiness219ALaunchRuntimeEnablementRequest() {
  return lockedRequest("launch_runtime_enablement_request");
}

export function createStreamGiftLedgerLaunchReadiness219AProviderBindingRequest() {
  return lockedRequest("provider_binding_request");
}

export function createStreamGiftLedgerLaunchReadiness219AGiftSendExecutionRequest() {
  return lockedRequest("gift_send_execution_request");
}

export function createStreamGiftLedgerLaunchReadiness219ADbReadWriteRequest() {
  return lockedRequest("db_read_write_request");
}
