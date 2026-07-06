import {
  STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_VERSION,
  type StreamGiftLedgerFinalOwnerArchiveFinalHandoffArtifact223B,
  type StreamGiftLedgerFinalOwnerArchiveFinalHandoffBlocked223B,
  type StreamGiftLedgerFinalOwnerArchiveFinalHandoffInput223B,
  type StreamGiftLedgerFinalOwnerArchiveFinalHandoffResult223B,
  type StreamGiftLedgerFinalOwnerArchiveFinalHandoffRunbook223B,
  type StreamGiftLedgerFinalOwnerArchiveFinalHandoffSafety223B,
  type StreamGiftLedgerFinalOwnerArchiveFinalHandoffSnapshot223B,
  type StreamGiftLedgerFinalOwnerArchiveFinalHandoffSurface223B,
} from "./types";

export const STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_OWNER_APPROVAL =
  "I_APPROVE_223B_STREAM_GIFTS_FINAL_OWNER_ARCHIVE_PACKAGE_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_ARTIFACTS: readonly StreamGiftLedgerFinalOwnerArchiveFinalHandoffArtifact223B[] = [
  "223a_final_owner_archive_package_index_locked",
  "222b_owner_execution_handoff_final_handoff_locked",
  "221b_final_archive_readiness_final_handoff_locked",
  "220b_execution_approval_boundary_final_handoff_locked",
  "219b_launch_readiness_control_final_handoff_locked",
  "200f_to_223a_safe_disabled_chain_archived",
  "provider_not_configured_visibility_locked",
  "exact_owner_approval_matrix_locked",
  "future_launch_runtime_enablement_gate_locked",
  "future_provider_credential_lookup_gate_locked",
  "future_provider_binding_runtime_gate_locked",
  "future_gift_send_execution_gate_locked",
  "future_wallet_payment_gate_locked",
  "future_payout_execution_gate_locked",
  "future_db_read_write_gate_locked",
  "future_admin_toggle_gate_locked",
  "raw_secret_handling_forbidden",
];

export const STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_SURFACES: readonly StreamGiftLedgerFinalOwnerArchiveFinalHandoffSurface223B[] = [
  "final_owner_archive_package_final_handoff",
  "owner_archive_index_reference",
  "owner_execution_handoff_reference",
  "final_archive_readiness_reference",
  "execution_approval_boundary_reference",
  "launch_readiness_reference",
  "provider_gate_reference",
  "gift_send_gate_reference",
  "wallet_payment_gate_reference",
  "payout_gate_reference",
  "db_gate_reference",
  "admin_toggle_gate_reference",
  "safe_disabled_future_execution_reference",
];

export const STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_SAFETY: StreamGiftLedgerFinalOwnerArchiveFinalHandoffSafety223B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous223AFinalOwnerArchivePackageIndexRequired: true,
  previous222BOwnerExecutionFinalHandoffRequired: true,
  previous221BFinalArchiveHandoffRequired: true,
  previous220BExecutionApprovalBoundaryRequired: true,
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
};

const forbiddenRuntimeValuePatterns = [
  "secret_access_key",
  "client_secret",
  "refresh_token",
  "access_token",
  "provider_api_key",
  "payment_token",
  "purchase_token",
  "card_number",
  "wallet_private",
  "payout_secret",
] as const;

function containsForbiddenRawSecret(value: string | undefined): boolean {
  const normalized = `${value ?? ""}`.toLowerCase();
  return forbiddenRuntimeValuePatterns.some((pattern) => normalized.includes(pattern.toLowerCase()));
}

function blocked(
  code: StreamGiftLedgerFinalOwnerArchiveFinalHandoffBlocked223B["code"],
  blockedReason: string,
): StreamGiftLedgerFinalOwnerArchiveFinalHandoffBlocked223B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_VERSION,
    status: "final_owner_archive_package_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
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
    safety: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_SAFETY,
  };
}

export function normalizeStreamGiftLedgerFinalOwnerArchiveFinalHandoffInput223B(
  input: StreamGiftLedgerFinalOwnerArchiveFinalHandoffInput223B,
): StreamGiftLedgerFinalOwnerArchiveFinalHandoffInput223B {
  return {
    ownerApproval: input.ownerApproval?.trim(),
    finalHandoffMode: input.finalHandoffMode ?? "disabled",
    acknowledged223AStage: input.acknowledged223AStage ?? "disabled",
    acknowledged222BStage: input.acknowledged222BStage ?? "disabled",
    acknowledged221BStage: input.acknowledged221BStage ?? "disabled",
    acknowledged220BStage: input.acknowledged220BStage ?? "disabled",
    evidenceReferences: [...new Set(input.evidenceReferences.map((value) => value.trim()).filter(Boolean))],
    requiredArtifacts: [...new Set(input.requiredArtifacts)],
    requiredSurfaces: [...new Set(input.requiredSurfaces)],
    operatorNote: input.operatorNote?.trim(),
  };
}

export function assertStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BRemainsSafe(): StreamGiftLedgerFinalOwnerArchiveFinalHandoffSafety223B {
  return STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_SAFETY;
}

export function prepareStreamGiftLedgerFinalOwnerArchiveFinalHandoff223B(
  input: StreamGiftLedgerFinalOwnerArchiveFinalHandoffInput223B,
): StreamGiftLedgerFinalOwnerArchiveFinalHandoffResult223B {
  const normalized = normalizeStreamGiftLedgerFinalOwnerArchiveFinalHandoffInput223B(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_OWNER_APPROVAL) {
    return blocked("owner_approval_required", "223B final owner archive package final handoff requires the exact owner approval phrase.");
  }
  if (normalized.finalHandoffMode !== "final_owner_archive_package_final_handoff_only") {
    return blocked("final_handoff_mode_disabled", "223B is a final owner archive handoff only and cannot enable runtime execution.");
  }
  if (normalized.acknowledged223AStage !== "223A_final_owner_archive_package_index_clean") {
    return blocked("previous_223a_owner_archive_index_required", "223A final owner archive package index must be clean first.");
  }
  if (normalized.acknowledged222BStage !== "222B_owner_execution_handoff_final_handoff_clean") {
    return blocked("previous_222b_owner_final_handoff_required", "222B owner execution handoff final handoff must be clean first.");
  }
  if (normalized.acknowledged221BStage !== "221B_final_archive_readiness_final_handoff_clean") {
    return blocked("previous_221b_final_archive_required", "221B final archive readiness final handoff must be clean first.");
  }
  if (normalized.acknowledged220BStage !== "220B_execution_approval_boundary_final_handoff_clean") {
    return blocked("previous_220b_execution_boundary_required", "220B execution approval boundary final handoff must be clean first.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked("evidence_references_required", "223B requires final owner archive package report and handoff evidence references.");
  }
  if (normalized.evidenceReferences.some(containsForbiddenRawSecret) || containsForbiddenRawSecret(normalized.operatorNote)) {
    return blocked("raw_secret_or_provider_value_rejected", "223B rejects raw secrets, provider values, tokens, payment data, and payout credentials.");
  }
  if (normalized.requiredArtifacts.length === 0) {
    return blocked("required_artifacts_required", "223B requires the complete final owner archive package handoff artifact list.");
  }
  if (normalized.requiredSurfaces.length === 0) {
    return blocked("required_surfaces_required", "223B requires the owner-facing final handoff surface list.");
  }
  for (const requiredArtifact of STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(requiredArtifact)) {
      return blocked("missing_required_artifact", `Missing required artifact: ${requiredArtifact}`);
    }
  }
  for (const requiredSurface of STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(requiredSurface)) {
      return blocked("missing_required_surface", `Missing required surface: ${requiredSurface}`);
    }
  }

  return {
    ok: true,
    status: "final_owner_archive_package_final_handoff_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.final-owner-archive-final-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_VERSION,
      previousStageRequired:
        "223A_final_owner_archive_package_index_clean_and_222B_owner_execution_handoff_final_handoff_clean_and_221B_final_archive_readiness_final_handoff_clean_and_220B_execution_approval_boundary_final_handoff_clean",
      requiredArtifacts: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_SURFACES,
      evidenceReferences: normalized.evidenceReferences,
      finalHandoffPrepared: true,
      providerNotConfiguredVisible: true,
      finalOwnerArchivePackageIndexLocked: true,
      ownerExecutionFinalHandoffLocked: true,
      finalArchiveReadinessLocked: true,
      finalExecutionApprovalBoundaryLocked: true,
      allPriorSafeDisabledBlocksArchived: true,
      exactOwnerApprovalMatrixLocked: true,
      rawSecretHandlingForbidden: true,
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
      safety: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_SAFETY,
    },
  };
}

export function getStreamGiftLedgerFinalOwnerArchiveFinalHandoff223B(): StreamGiftLedgerFinalOwnerArchiveFinalHandoffSnapshot223B {
  return {
    version: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_VERSION,
    type: "stream_gifts_final_owner_archive_package_final_handoff",
    previousStageRequired: "223A final owner archive package index clean plus TypeScript clean on owner machine",
    finalHandoffOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    finalOwnerArchivePackageIndexLocked: true,
    ownerExecutionFinalHandoffLocked: true,
    finalArchiveReadinessLocked: true,
    finalExecutionApprovalBoundaryLocked: true,
    allPriorSafeDisabledBlocksArchived: true,
    exactOwnerApprovalMatrixLocked: true,
    rawSecretHandlingForbidden: true,
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
    requiredArtifacts: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_SURFACES,
    safety: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_SAFETY,
  };
}

export function getStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BContract() {
  return {
    contract: "stream.gift.final-owner-archive-final-handoff.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_VERSION,
    ownerApproval: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_OWNER_APPROVAL,
    requiredArtifacts: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_SURFACES,
    runtimeEnablement: false,
    providerNotConfiguredVisible: true,
    futureExactOwnerApprovalRequired: true,
    rawSecretHandlingForbidden: true,
    safety: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_SAFETY,
  };
}

export function getStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BRunbook(): StreamGiftLedgerFinalOwnerArchiveFinalHandoffRunbook223B {
  return {
    version: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_VERSION,
    title: "Stream Gifts final owner archive package final handoff",
    mode: "source_only_safe_disabled_final_owner_archive_handoff",
    steps: [
      "Confirm 223A final owner archive package index is clean.",
      "Confirm 222B owner execution handoff final handoff is clean.",
      "Confirm 221B final archive readiness final handoff is clean.",
      "Confirm 220B execution approval boundary final handoff is clean.",
      "Keep provider_not_configured visible until a future exact owner approval unlocks a separate execution package.",
      "Archive the owner-facing evidence without reading secrets, DB data, provider values, Wallet balances, payout credentials, or runtime state.",
    ],
    forbidden: [
      "No .env file read or env value read.",
      "No provider credential lookup, provider binding, provider runtime enablement, or provider calls.",
      "No DB read/write, migration, or Prisma generate.",
      "No Wallet mutation, payment capture, payout execution, gift send execution, gift ledger write, or realtime emit.",
      "No fake success, fake balance, fake payout, or fake launch-ready state.",
    ],
    nextStage: "closed_stream_gifts_final_owner_archive_package_future_execution_requires_exact_owner_approval",
  };
}

function lockedRequest(reason: string) {
  return {
    ok: false,
    status: "future_exact_owner_approval_required" as const,
    reason,
    version: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_VERSION,
    providerNotConfiguredVisible: true,
    runtimeExecutionApprovedNow: false,
    launchRuntimeEnablementExecuted: false,
    providerCredentialLookupExecuted: false,
    providerRuntimeEnabled: false,
    sendIntentRuntimeExecutionExecuted: false,
    walletMutationExecuted: false,
    payoutExecutionExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
  };
}

export const createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BLaunchRuntimeEnablementRequest = () =>
  lockedRequest("Launch runtime enablement is outside 223B and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BProviderCredentialLookupRequest = () =>
  lockedRequest("Provider credential lookup is outside 223B and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BProviderRuntimeRequest = () =>
  lockedRequest("Provider binding/runtime is outside 223B and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BGiftSendExecutionRequest = () =>
  lockedRequest("Gift send execution is outside 223B and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BWalletPaymentRequest = () =>
  lockedRequest("Wallet payment is outside 223B and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BPayoutExecutionRequest = () =>
  lockedRequest("Payout execution is outside 223B and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BDbReadWriteRequest = () =>
  lockedRequest("DB read/write is outside 223B and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BAdminToggleRequest = () =>
  lockedRequest("Admin runtime toggles are outside 223B and require a new exact owner approval plus a separate execution package.");
