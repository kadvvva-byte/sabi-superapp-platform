import {
  STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_VERSION,
  type StreamGiftLedgerFinalArchiveFinalHandoffArtifact221B,
  type StreamGiftLedgerFinalArchiveFinalHandoffBlocked221B,
  type StreamGiftLedgerFinalArchiveFinalHandoffInput221B,
  type StreamGiftLedgerFinalArchiveFinalHandoffResult221B,
  type StreamGiftLedgerFinalArchiveFinalHandoffRunbook221B,
  type StreamGiftLedgerFinalArchiveFinalHandoffSafety221B,
  type StreamGiftLedgerFinalArchiveFinalHandoffSnapshot221B,
  type StreamGiftLedgerFinalArchiveFinalHandoffSurface221B,
} from "./types";

export const STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_OWNER_APPROVAL =
  "I_APPROVE_221B_STREAM_GIFTS_FINAL_ARCHIVE_READINESS_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_REQUIRED_ARTIFACTS = Object.freeze([
  "221a_final_archive_readiness_index_locked",
  "219b_launch_readiness_final_handoff_locked",
  "220b_execution_approval_boundary_final_handoff_locked",
  "200f_to_221a_safe_disabled_chain_archived",
  "provider_not_configured_visibility_locked",
  "catalog_media_asset_localization_publish_boundaries_locked",
  "send_intent_receipt_audit_boundaries_locked",
  "eligibility_risk_compliance_boundaries_locked",
  "official_streamer_payout_eligibility_boundaries_locked",
  "settlement_tax_withholding_boundaries_locked",
  "payout_audit_evidence_boundaries_locked",
  "export_report_privacy_retention_boundaries_locked",
  "compliance_fraud_admin_enforcement_boundaries_locked",
  "future_exact_owner_approval_boundaries_locked",
  "raw_secret_handling_forbidden",
] as const satisfies readonly StreamGiftLedgerFinalArchiveFinalHandoffArtifact221B[]);

export const STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_REQUIRED_SURFACES = Object.freeze([
  "final_archive_handoff",
  "closed_handoff_chain_archive",
  "report_chain_archive",
  "future_execution_approval_archive",
  "provider_lock_archive",
  "db_lock_archive",
  "wallet_payment_lock_archive",
  "payout_lock_archive",
  "gift_send_lock_archive",
  "realtime_delivery_lock_archive",
  "admin_toggle_lock_archive",
  "owner_final_archive_handoff",
] as const satisfies readonly StreamGiftLedgerFinalArchiveFinalHandoffSurface221B[]);

export const STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_SAFETY: StreamGiftLedgerFinalArchiveFinalHandoffSafety221B = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous221AFinalArchiveReadinessRequired: true,
  previous219BFinalHandoffRequired: true,
  previous220BFinalHandoffRequired: true,
  launchRuntimeEnablementExecuted: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  providerRuntimeEnabled: false,
  providerCredentialLookupExecuted: false,
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
  assetPublishExecuted: false,
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
  futureProviderCredentialLookupRequiresSeparateApproval: true,
  futureGiftSendExecutionRequiresSeparateApproval: true,
  futureWalletPaymentRequiresSeparateApproval: true,
  futurePayoutExecutionRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  futureAdminToggleRequiresSeparateApproval: true,
  sourceOnly: true,
});

function containsForbiddenValue(values: readonly string[]): boolean {
  for (const value of values) {
    const normalized = value.trim().toLowerCase();
    if (
      normalized.includes("secret=") ||
      normalized.includes("api_key=") ||
      normalized.includes("apikey=") ||
      normalized.includes("token=") ||
      normalized.includes("password=") ||
      normalized.includes("private_key=") ||
      normalized.includes("bearer ") ||
      normalized.includes("sk_live") ||
      normalized.includes("sk_test")
    ) return true;
  }
  return false;
}

function missingRequired<T extends string>(required: readonly T[], actual: readonly T[]): T | undefined {
  for (const entry of required) {
    if (!actual.includes(entry)) return entry;
  }
  return undefined;
}

function blocked(
  code: StreamGiftLedgerFinalArchiveFinalHandoffBlocked221B["code"],
  blockedReason: string,
): StreamGiftLedgerFinalArchiveFinalHandoffBlocked221B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_VERSION,
    status: "final_archive_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    handoffPrepared: false,
    providerNotConfiguredVisible: true,
    launchRuntimeEnablementExecuted: false,
    providerRuntimeEnabled: false,
    providerCredentialLookupExecuted: false,
    sendIntentRuntimeExecutionExecuted: false,
    walletMutationExecuted: false,
    payoutExecutionExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_SAFETY,
  };
}

export function normalizeStreamGiftLedgerFinalArchiveFinalHandoffInput221B(
  input: Partial<StreamGiftLedgerFinalArchiveFinalHandoffInput221B> = {},
): StreamGiftLedgerFinalArchiveFinalHandoffInput221B {
  return {
    ownerApproval: input.ownerApproval ?? STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_OWNER_APPROVAL,
    handoffMode: input.handoffMode ?? "final_archive_handoff_only",
    acknowledged221AStage: input.acknowledged221AStage ?? "221A_final_archive_readiness_index_clean",
    acknowledged219BStage: input.acknowledged219BStage ?? "219B_launch_readiness_control_final_handoff_clean",
    acknowledged220BStage: input.acknowledged220BStage ?? "220B_execution_approval_boundary_final_handoff_clean",
    evidenceReferences: input.evidenceReferences ?? [
      "backend-stream-gifts-ledger-221a-report.json",
      "backend-stream-gifts-ledger-221a-handoff.md",
      "backend-stream-gifts-ledger-219b-report.json",
      "backend-stream-gifts-ledger-220b-report.json",
      "owner-machine-typescript-clean",
    ],
    requiredArtifacts: input.requiredArtifacts ?? STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_REQUIRED_ARTIFACTS,
    requiredSurfaces: input.requiredSurfaces ?? STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_REQUIRED_SURFACES,
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerFinalArchiveFinalHandoff221BRemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_SAFETY;
  if (
    safety.envFileReadAllowedNow !== false ||
    safety.envValueReadAllowedNow !== false ||
    safety.rawSecretAccepted !== false ||
    safety.launchRuntimeEnablementExecuted !== false ||
    safety.providerBindingExecuted !== false ||
    safety.providerBindingActivationExecuted !== false ||
    safety.providerRuntimeEnabled !== false ||
    safety.providerCredentialLookupExecuted !== false ||
    safety.providerLiveCallExecuted !== false ||
    safety.providerRiskCallExecuted !== false ||
    safety.providerComplianceCallExecuted !== false ||
    safety.providerPayoutCallExecuted !== false ||
    safety.adminRuntimeToggleExecuted !== false ||
    safety.adminEnforcementRuntimeToggleExecuted !== false ||
    safety.fraudRiskRuntimeDecisionExecuted !== false ||
    safety.complianceRuntimeDecisionExecuted !== false ||
    safety.privacyRuntimeRedactionExecuted !== false ||
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
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-221B safety invariant failed");
  }
  return true;
}

export function prepareStreamGiftLedgerFinalArchiveFinalHandoff221B(
  input: Partial<StreamGiftLedgerFinalArchiveFinalHandoffInput221B> = {},
): StreamGiftLedgerFinalArchiveFinalHandoffResult221B {
  assertStreamGiftLedgerFinalArchiveFinalHandoff221BRemainsSafe();
  const normalized = normalizeStreamGiftLedgerFinalArchiveFinalHandoffInput221B(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_OWNER_APPROVAL) {
    return blocked("owner_approval_required", "221B requires exact source-only final archive handoff approval text.");
  }
  if (normalized.handoffMode !== "final_archive_handoff_only") {
    return blocked("handoff_mode_disabled", "221B is only a final archive handoff, not runtime enablement.");
  }
  if (normalized.acknowledged221AStage !== "221A_final_archive_readiness_index_clean") {
    return blocked("previous_221a_archive_readiness_required", "221B requires clean 221A final archive readiness index.");
  }
  if (normalized.acknowledged219BStage !== "219B_launch_readiness_control_final_handoff_clean") {
    return blocked("previous_219b_final_handoff_required", "221B requires clean 219B launch-readiness final handoff.");
  }
  if (normalized.acknowledged220BStage !== "220B_execution_approval_boundary_final_handoff_clean") {
    return blocked("previous_220b_final_handoff_required", "221B requires clean 220B execution approval boundary final handoff.");
  }
  if (normalized.evidenceReferences.length === 0) return blocked("evidence_references_required", "221B requires report/handoff references.");
  if (normalized.requiredArtifacts.length === 0) return blocked("required_artifacts_required", "221B requires archive artifacts.");
  if (normalized.requiredSurfaces.length === 0) return blocked("required_surfaces_required", "221B requires archive surfaces.");
  if (containsForbiddenValue([...normalized.evidenceReferences, normalized.operatorNote ?? ""])) {
    return blocked("raw_secret_or_provider_value_rejected", "221B rejects raw secrets, env values, tokens, passwords, or provider credentials.");
  }
  const missingArtifact = missingRequired(STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_REQUIRED_ARTIFACTS, normalized.requiredArtifacts);
  if (missingArtifact) return blocked("missing_required_artifact", `221B missing required artifact: ${missingArtifact}`);
  const missingSurface = missingRequired(STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_REQUIRED_SURFACES, normalized.requiredSurfaces);
  if (missingSurface) return blocked("missing_required_surface", `221B missing required surface: ${missingSurface}`);

  return {
    ok: true,
    status: "final_archive_handoff_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.final-archive-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_VERSION,
      previousStageRequired: "221A_final_archive_readiness_index_clean_and_219B_220B_final_handoffs_clean",
      requiredArtifacts: normalized.requiredArtifacts,
      requiredSurfaces: normalized.requiredSurfaces,
      evidenceReferences: normalized.evidenceReferences,
      handoffPrepared: true,
      providerNotConfiguredVisible: true,
      finalHandoffOnlyNoRuntime: true,
      allPriorSafeDisabledBlocksArchived: true,
      finalExecutionApprovalBoundaryLocked: true,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futureLaunchRuntimeEnablementRequiresSeparateApproval: true,
      futureProviderBindingRequiresSeparateApproval: true,
      futureProviderRuntimeRequiresSeparateApproval: true,
      futureProviderCredentialLookupRequiresSeparateApproval: true,
      futureGiftSendExecutionRequiresSeparateApproval: true,
      futureWalletPaymentRequiresSeparateApproval: true,
      futurePayoutExecutionRequiresSeparateApproval: true,
      futureDbReadWriteRequiresSeparateApproval: true,
      futureAdminToggleRequiresSeparateApproval: true,
      sourceOnly: true,
      safety: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_SAFETY,
    },
  };
}

export function getStreamGiftLedgerFinalArchiveFinalHandoff221B(): StreamGiftLedgerFinalArchiveFinalHandoffSnapshot221B {
  assertStreamGiftLedgerFinalArchiveFinalHandoff221BRemainsSafe();
  return {
    version: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_VERSION,
    type: "stream_gifts_final_archive_readiness_final_handoff",
    previousStageRequired: "221A final archive readiness index clean plus TypeScript clean on owner machine",
    finalHandoffOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    allPriorSafeDisabledBlocksArchived: true,
    finalExecutionApprovalBoundaryLocked: true,
    requiredArtifacts: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_REQUIRED_SURFACES,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    futureLaunchRuntimeEnablementRequiresSeparateApproval: true,
    futureProviderBindingRequiresSeparateApproval: true,
    futureProviderRuntimeRequiresSeparateApproval: true,
    futureProviderCredentialLookupRequiresSeparateApproval: true,
    futureGiftSendExecutionRequiresSeparateApproval: true,
    futureWalletPaymentRequiresSeparateApproval: true,
    futurePayoutExecutionRequiresSeparateApproval: true,
    futureDbReadWriteRequiresSeparateApproval: true,
    futureAdminToggleRequiresSeparateApproval: true,
    sourceOnly: true,
    safety: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_SAFETY,
  };
}

export function getStreamGiftLedgerFinalArchiveFinalHandoff221BContract() {
  return {
    contract: "stream.gift.final-archive-handoff.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_VERSION,
    ownerApproval: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_OWNER_APPROVAL,
    requiredArtifacts: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_REQUIRED_SURFACES,
    runtimeEnablement: "blocked_requires_new_exact_owner_approval" as const,
    sourceOnly: true,
  };
}

export function getStreamGiftLedgerFinalArchiveFinalHandoff221BRunbook(): StreamGiftLedgerFinalArchiveFinalHandoffRunbook221B {
  return {
    version: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_VERSION,
    steps: [
      "Keep 221A, 220B, and 219B report/handoff evidence attached to the final owner archive.",
      "Treat all launch, provider, DB, Wallet, payout, send, realtime, Admin toggle, and asset publish actions as locked.",
      "Reject raw secrets, env values, provider tokens, purchase tokens, payout tokens, or credential values.",
      "Prepare a separate execution package only after exact owner approval is given for the specific future action.",
    ],
    blockedRuntimeActions: [
      "launch runtime enablement",
      "provider credential lookup, binding, runtime, or call",
      "gift send execution or ledger write",
      "Wallet payment or payout execution",
      "DB read/write, migration, Prisma generate",
      "Admin runtime toggle and realtime emit",
      "report export, data-subject export, privacy redaction, retention purge, or asset publish",
    ],
    nextStage: "closed_stream_gifts_final_archive_readiness_future_runtime_requires_exact_owner_approval",
  };
}

function lockedRequest(action: string) {
  return {
    ok: false as const,
    version: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_VERSION,
    status: "locked_requires_new_exact_owner_approval" as const,
    action,
    blockedReason: "221B is a source-only final archive handoff. Future runtime execution requires a separate exact owner approval and a separate execution package.",
    launchRuntimeEnablementExecuted: false,
    providerRuntimeEnabled: false,
    providerCredentialLookupExecuted: false,
    sendIntentRuntimeExecutionExecuted: false,
    walletMutationExecuted: false,
    payoutExecutionExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_FINAL_ARCHIVE_FINAL_HANDOFF_221B_SAFETY,
  };
}

export const createStreamGiftLedgerFinalArchiveFinalHandoff221BLaunchRuntimeEnablementRequest = () => lockedRequest("launch_runtime_enablement");
export const createStreamGiftLedgerFinalArchiveFinalHandoff221BProviderCredentialLookupRequest = () => lockedRequest("provider_credential_lookup");
export const createStreamGiftLedgerFinalArchiveFinalHandoff221BProviderRuntimeRequest = () => lockedRequest("provider_runtime");
export const createStreamGiftLedgerFinalArchiveFinalHandoff221BGiftSendExecutionRequest = () => lockedRequest("gift_send_execution");
export const createStreamGiftLedgerFinalArchiveFinalHandoff221BWalletPaymentRequest = () => lockedRequest("wallet_payment");
export const createStreamGiftLedgerFinalArchiveFinalHandoff221BPayoutExecutionRequest = () => lockedRequest("payout_execution");
export const createStreamGiftLedgerFinalArchiveFinalHandoff221BDbReadWriteRequest = () => lockedRequest("db_read_write");
