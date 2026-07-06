import {
  STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_VERSION,
  type StreamGiftLedgerFinalOwnerArchivePackageArtifact223A,
  type StreamGiftLedgerFinalOwnerArchivePackageBlocked223A,
  type StreamGiftLedgerFinalOwnerArchivePackageInput223A,
  type StreamGiftLedgerFinalOwnerArchivePackageResult223A,
  type StreamGiftLedgerFinalOwnerArchivePackageRunbook223A,
  type StreamGiftLedgerFinalOwnerArchivePackageSafety223A,
  type StreamGiftLedgerFinalOwnerArchivePackageSnapshot223A,
  type StreamGiftLedgerFinalOwnerArchivePackageSurface223A,
} from "./types";

export const STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_OWNER_APPROVAL =
  "I_APPROVE_223A_STREAM_GIFTS_FINAL_OWNER_ARCHIVE_PACKAGE_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_ARTIFACTS: readonly StreamGiftLedgerFinalOwnerArchivePackageArtifact223A[] = [
  "222b_owner_execution_handoff_final_handoff_locked",
  "221b_final_archive_readiness_final_handoff_locked",
  "220b_execution_approval_boundary_final_handoff_locked",
  "219b_launch_readiness_control_final_handoff_locked",
  "200f_to_222b_safe_disabled_chain_indexed",
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

export const STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_SURFACES: readonly StreamGiftLedgerFinalOwnerArchivePackageSurface223A[] = [
  "final_owner_archive_package_index",
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

export const STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_SAFETY: StreamGiftLedgerFinalOwnerArchivePackageSafety223A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  ownerArchiveIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
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
  code: StreamGiftLedgerFinalOwnerArchivePackageBlocked223A["code"],
  blockedReason: string,
): StreamGiftLedgerFinalOwnerArchivePackageBlocked223A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_VERSION,
    status: "final_owner_archive_package_blocked_without_runtime_enablement",
    code,
    blockedReason,
    ownerArchivePrepared: false,
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
    safety: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_SAFETY,
  };
}

export function normalizeStreamGiftLedgerFinalOwnerArchivePackageInput223A(
  input: StreamGiftLedgerFinalOwnerArchivePackageInput223A,
): StreamGiftLedgerFinalOwnerArchivePackageInput223A {
  return {
    ownerApproval: input.ownerApproval?.trim(),
    ownerArchiveMode: input.ownerArchiveMode ?? "disabled",
    acknowledged222BStage: input.acknowledged222BStage ?? "disabled",
    acknowledged221BStage: input.acknowledged221BStage ?? "disabled",
    acknowledged220BStage: input.acknowledged220BStage ?? "disabled",
    evidenceReferences: [...new Set(input.evidenceReferences.map((value) => value.trim()).filter(Boolean))],
    requiredArtifacts: [...new Set(input.requiredArtifacts)],
    requiredSurfaces: [...new Set(input.requiredSurfaces)],
    operatorNote: input.operatorNote?.trim(),
  };
}

export function assertStreamGiftLedgerFinalOwnerArchivePackage223ARemainsSafe(): StreamGiftLedgerFinalOwnerArchivePackageSafety223A {
  return STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_SAFETY;
}

export function prepareStreamGiftLedgerFinalOwnerArchivePackage223A(
  input: StreamGiftLedgerFinalOwnerArchivePackageInput223A,
): StreamGiftLedgerFinalOwnerArchivePackageResult223A {
  const normalized = normalizeStreamGiftLedgerFinalOwnerArchivePackageInput223A(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_OWNER_APPROVAL) {
    return blocked("owner_approval_required", "223A final owner archive package index requires the exact owner approval phrase.");
  }
  if (normalized.ownerArchiveMode !== "final_owner_archive_package_index_only") {
    return blocked("owner_archive_mode_disabled", "223A is an owner archive package index only and cannot enable runtime execution.");
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
    return blocked("evidence_references_required", "223A requires owner archive report and handoff evidence references.");
  }
  if (normalized.evidenceReferences.some(containsForbiddenRawSecret) || containsForbiddenRawSecret(normalized.operatorNote)) {
    return blocked("raw_secret_or_provider_value_rejected", "223A rejects raw secrets, provider values, tokens, payment data, and payout credentials.");
  }
  if (normalized.requiredArtifacts.length === 0) {
    return blocked("required_artifacts_required", "223A requires the complete final owner archive package artifact list.");
  }
  if (normalized.requiredSurfaces.length === 0) {
    return blocked("required_surfaces_required", "223A requires the owner-facing archive surface list.");
  }
  for (const requiredArtifact of STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(requiredArtifact)) {
      return blocked("missing_required_artifact", `Missing required artifact: ${requiredArtifact}`);
    }
  }
  for (const requiredSurface of STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(requiredSurface)) {
      return blocked("missing_required_surface", `Missing required surface: ${requiredSurface}`);
    }
  }

  return {
    ok: true,
    status: "final_owner_archive_package_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.final-owner-archive-package.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_VERSION,
      previousStageRequired:
        "222B_owner_execution_handoff_final_handoff_clean_and_221B_final_archive_readiness_final_handoff_clean_and_220B_execution_approval_boundary_final_handoff_clean",
      requiredArtifacts: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_SURFACES,
      evidenceReferences: normalized.evidenceReferences,
      ownerArchivePrepared: true,
      providerNotConfiguredVisible: true,
      ownerExecutionFinalHandoffLocked: true,
      finalArchiveReadinessLocked: true,
      finalExecutionApprovalBoundaryLocked: true,
      allPriorSafeDisabledBlocksIndexed: true,
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
      safety: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_SAFETY,
    },
  };
}

export function getStreamGiftLedgerFinalOwnerArchivePackage223A(): StreamGiftLedgerFinalOwnerArchivePackageSnapshot223A {
  return {
    version: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_VERSION,
    type: "stream_gifts_final_owner_archive_package_index",
    previousStageRequired: "222B owner execution handoff final handoff clean plus TypeScript clean on owner machine",
    ownerArchiveIndexOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    ownerExecutionFinalHandoffLocked: true,
    finalArchiveReadinessLocked: true,
    finalExecutionApprovalBoundaryLocked: true,
    allPriorSafeDisabledBlocksIndexed: true,
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
    requiredArtifacts: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_SURFACES,
    safety: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_SAFETY,
  };
}

export function getStreamGiftLedgerFinalOwnerArchivePackage223AContract() {
  return {
    contract: "stream.gift.final-owner-archive-package.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_VERSION,
    ownerApproval: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_OWNER_APPROVAL,
    requiredArtifacts: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_SURFACES,
    runtimeEnablement: false,
    providerNotConfiguredVisible: true,
    futureExactOwnerApprovalRequired: true,
    rawSecretHandlingForbidden: true,
    safety: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_SAFETY,
  };
}

export function getStreamGiftLedgerFinalOwnerArchivePackage223ARunbook(): StreamGiftLedgerFinalOwnerArchivePackageRunbook223A {
  return {
    version: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_VERSION,
    title: "Stream Gifts final owner archive package index",
    mode: "source_only_safe_disabled_owner_archive_index",
    steps: [
      "Confirm 222B owner execution handoff final handoff is clean.",
      "Confirm 221B final archive readiness final handoff is clean.",
      "Confirm 220B execution approval boundary final handoff is clean.",
      "Keep provider_not_configured visible until a future exact owner approval unlocks a separate execution package.",
      "Reject raw secrets, provider values, payment tokens, payout credentials, Wallet mutations, DB reads/writes, and realtime sends in this stage.",
    ],
    forbidden: [
      "No .env file read or env value read.",
      "No provider credential lookup, provider binding, provider runtime enablement, or provider calls.",
      "No DB read/write, migration, or Prisma generate.",
      "No Wallet mutation, payment capture, payout execution, gift send execution, gift ledger write, or realtime emit.",
      "No fake success, fake balance, fake payout, or fake launch-ready state.",
    ],
    nextStage: "223B_stream_gifts_final_owner_archive_package_final_handoff",
  };
}

function lockedRequest(reason: string) {
  return {
    ok: false,
    status: "future_exact_owner_approval_required" as const,
    reason,
    version: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_VERSION,
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

export const createStreamGiftLedgerFinalOwnerArchivePackage223ALaunchRuntimeEnablementRequest = () =>
  lockedRequest("Launch runtime enablement is outside 223A and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchivePackage223AProviderCredentialLookupRequest = () =>
  lockedRequest("Provider credential lookup is outside 223A and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchivePackage223AProviderRuntimeRequest = () =>
  lockedRequest("Provider binding/runtime is outside 223A and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchivePackage223AGiftSendExecutionRequest = () =>
  lockedRequest("Gift send execution is outside 223A and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchivePackage223AWalletPaymentRequest = () =>
  lockedRequest("Wallet payment is outside 223A and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchivePackage223APayoutExecutionRequest = () =>
  lockedRequest("Payout execution is outside 223A and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchivePackage223ADbReadWriteRequest = () =>
  lockedRequest("DB read/write is outside 223A and requires a new exact owner approval plus a separate execution package.");
export const createStreamGiftLedgerFinalOwnerArchivePackage223AAdminToggleRequest = () =>
  lockedRequest("Admin runtime toggles are outside 223A and require a new exact owner approval plus a separate execution package.");
