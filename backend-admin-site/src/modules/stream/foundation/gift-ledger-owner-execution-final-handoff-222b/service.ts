import {
  STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_VERSION,
  type StreamGiftLedgerOwnerExecutionFinalHandoffArtifact222B,
  type StreamGiftLedgerOwnerExecutionFinalHandoffBlocked222B,
  type StreamGiftLedgerOwnerExecutionFinalHandoffInput222B,
  type StreamGiftLedgerOwnerExecutionFinalHandoffResult222B,
  type StreamGiftLedgerOwnerExecutionFinalHandoffRunbook222B,
  type StreamGiftLedgerOwnerExecutionFinalHandoffSafety222B,
  type StreamGiftLedgerOwnerExecutionFinalHandoffSnapshot222B,
  type StreamGiftLedgerOwnerExecutionFinalHandoffSurface222B,
} from "./types";

export const STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_OWNER_APPROVAL =
  "I_APPROVE_222B_STREAM_GIFTS_OWNER_EXECUTION_HANDOFF_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_ARTIFACTS: readonly StreamGiftLedgerOwnerExecutionFinalHandoffArtifact222B[] = [
  "222a_owner_execution_handoff_index_locked",
  "221b_final_archive_readiness_final_handoff_locked",
  "220b_execution_approval_boundary_final_handoff_locked",
  "219b_launch_readiness_control_final_handoff_locked",
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

export const STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_SURFACES: readonly StreamGiftLedgerOwnerExecutionFinalHandoffSurface222B[] = [
  "owner_execution_final_handoff",
  "owner_approval_template_archive",
  "final_archive_readiness_reference",
  "execution_approval_boundary_reference",
  "launch_gate_reference",
  "provider_gate_reference",
  "gift_send_gate_reference",
  "wallet_payment_gate_reference",
  "payout_gate_reference",
  "db_gate_reference",
  "admin_toggle_gate_reference",
  "safe_disabled_future_execution_reference",
];

export const STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_SAFETY: StreamGiftLedgerOwnerExecutionFinalHandoffSafety222B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous222AOwnerHandoffIndexRequired: true,
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
  code: StreamGiftLedgerOwnerExecutionFinalHandoffBlocked222B["code"],
  blockedReason: string,
): StreamGiftLedgerOwnerExecutionFinalHandoffBlocked222B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_VERSION,
    status: "owner_execution_final_handoff_blocked_without_runtime_enablement",
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
    safety: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_SAFETY,
  };
}

export function normalizeStreamGiftLedgerOwnerExecutionFinalHandoffInput222B(
  input: StreamGiftLedgerOwnerExecutionFinalHandoffInput222B,
): StreamGiftLedgerOwnerExecutionFinalHandoffInput222B {
  return {
    ownerApproval: input.ownerApproval?.trim(),
    finalHandoffMode: input.finalHandoffMode ?? "disabled",
    acknowledged222AStage: input.acknowledged222AStage ?? "disabled",
    acknowledged221BStage: input.acknowledged221BStage ?? "disabled",
    acknowledged220BStage: input.acknowledged220BStage ?? "disabled",
    evidenceReferences: [...new Set(input.evidenceReferences.map((value) => value.trim()).filter(Boolean))],
    requiredArtifacts: [...new Set(input.requiredArtifacts)],
    requiredSurfaces: [...new Set(input.requiredSurfaces)],
    operatorNote: input.operatorNote?.trim(),
  };
}

export function assertStreamGiftLedgerOwnerExecutionFinalHandoff222BRemainsSafe(): StreamGiftLedgerOwnerExecutionFinalHandoffSafety222B {
  return STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_SAFETY;
}

export function prepareStreamGiftLedgerOwnerExecutionFinalHandoff222B(
  input: StreamGiftLedgerOwnerExecutionFinalHandoffInput222B,
): StreamGiftLedgerOwnerExecutionFinalHandoffResult222B {
  const normalized = normalizeStreamGiftLedgerOwnerExecutionFinalHandoffInput222B(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_OWNER_APPROVAL) {
    return blocked("owner_approval_required", "222B owner execution final handoff requires the exact owner approval phrase.");
  }
  if (normalized.finalHandoffMode !== "owner_execution_final_handoff_only") {
    return blocked("final_handoff_mode_disabled", "222B is a final handoff-only package and cannot enable runtime execution.");
  }
  if (normalized.acknowledged222AStage !== "222A_owner_execution_handoff_index_clean") {
    return blocked("previous_222a_owner_handoff_required", "222A owner execution handoff index must be clean first.");
  }
  if (normalized.acknowledged221BStage !== "221B_final_archive_readiness_final_handoff_clean") {
    return blocked("previous_221b_final_archive_required", "221B final archive readiness final handoff must be clean first.");
  }
  if (normalized.acknowledged220BStage !== "220B_execution_approval_boundary_final_handoff_clean") {
    return blocked("previous_220b_execution_boundary_required", "220B execution approval boundary final handoff must be clean first.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked("evidence_references_required", "222B requires owner-facing report and handoff evidence references.");
  }
  if (normalized.evidenceReferences.some(containsForbiddenRawSecret) || containsForbiddenRawSecret(normalized.operatorNote)) {
    return blocked("raw_secret_or_provider_value_rejected", "222B rejects raw secrets, provider values, tokens, payment data, and payout credentials.");
  }
  if (normalized.requiredArtifacts.length === 0) {
    return blocked("required_artifacts_required", "222B requires the complete owner execution final handoff artifact list.");
  }
  if (normalized.requiredSurfaces.length === 0) {
    return blocked("required_surfaces_required", "222B requires the owner-facing final handoff surface list.");
  }
  for (const requiredArtifact of STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(requiredArtifact)) {
      return blocked("missing_required_artifact", `Missing required artifact: ${requiredArtifact}`);
    }
  }
  for (const requiredSurface of STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(requiredSurface)) {
      return blocked("missing_required_surface", `Missing required surface: ${requiredSurface}`);
    }
  }

  return {
    ok: true,
    status: "owner_execution_final_handoff_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.owner-execution-final-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_VERSION,
      previousStageRequired:
        "222A_owner_execution_handoff_index_clean_and_221B_final_archive_readiness_final_handoff_clean_and_220B_execution_approval_boundary_final_handoff_clean",
      requiredArtifacts: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_SURFACES,
      evidenceReferences: normalized.evidenceReferences,
      finalHandoffPrepared: true,
      providerNotConfiguredVisible: true,
      ownerExecutionHandoffIndexLocked: true,
      finalArchiveReadinessLocked: true,
      finalExecutionApprovalBoundaryLocked: true,
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
      safety: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_SAFETY,
    },
  };
}

export function getStreamGiftLedgerOwnerExecutionFinalHandoff222B(): StreamGiftLedgerOwnerExecutionFinalHandoffSnapshot222B {
  return {
    version: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_VERSION,
    type: "stream_gifts_owner_execution_handoff_final_handoff",
    previousStageRequired: "222A owner execution handoff index clean plus TypeScript clean on owner machine",
    finalHandoffOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    ownerExecutionHandoffIndexLocked: true,
    finalArchiveReadinessLocked: true,
    finalExecutionApprovalBoundaryLocked: true,
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
    requiredArtifacts: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_SURFACES,
    safety: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_SAFETY,
  };
}

export function getStreamGiftLedgerOwnerExecutionFinalHandoff222BContract() {
  return {
    contract: "stream.gift.owner-execution-final-handoff.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_VERSION,
    ownerApprovalRequired: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_OWNER_APPROVAL,
    finalHandoffOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    requiredArtifacts: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_SURFACES,
    safety: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_SAFETY,
  };
}

export function getStreamGiftLedgerOwnerExecutionFinalHandoff222BRunbook(): StreamGiftLedgerOwnerExecutionFinalHandoffRunbook222B {
  return {
    version: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_VERSION,
    title: "Stream Gifts owner execution handoff final handoff",
    steps: [
      "Keep Stream Gifts Ledger safe-disabled until a new exact owner execution approval is provided.",
      "Use 222A and 222B as the owner-facing approval template and final handoff reference.",
      "Do not perform provider credential lookup, provider binding, runtime enablement, DB access, Wallet payment, payout, gift send, or realtime delivery from this package.",
      "Prepare any future execution package separately with its own exact owner approval and safety checker.",
    ],
    forbiddenActions: [
      "launch runtime enablement",
      "provider credential lookup",
      "provider binding or provider runtime calls",
      "DB read or write",
      "Wallet mutation or payment capture",
      "payout execution",
      "gift send execution or ledger write",
      "Admin runtime toggle",
      "realtime delivery emit",
      "raw secret handling",
      "fake success",
    ],
    nextAction: "closed_until_new_exact_owner_execution_approval",
  };
}

function createFutureExecutionRequest(boundary: string) {
  return {
    ok: false as const,
    version: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_VERSION,
    status: "locked_requires_new_exact_owner_execution_approval" as const,
    boundary,
    finalHandoffOnlyNoRuntime: true as const,
    providerNotConfiguredVisible: true as const,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true as const,
    launchRuntimeEnablementExecuted: false as const,
    providerRuntimeEnabled: false as const,
    providerCredentialLookupExecuted: false as const,
    sendIntentRuntimeExecutionExecuted: false as const,
    walletMutationExecuted: false as const,
    payoutExecutionExecuted: false as const,
    dbReadExecuted: false as const,
    dbWriteExecuted: false as const,
    realtimeEmitExecuted: false as const,
    fakeSuccessWritten: false as const,
    safety: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_SAFETY,
  };
}

export const createStreamGiftLedgerOwnerExecutionFinalHandoff222BLaunchRuntimeEnablementRequest = () =>
  createFutureExecutionRequest("launch_runtime_enablement_requires_separate_exact_owner_approval");
export const createStreamGiftLedgerOwnerExecutionFinalHandoff222BProviderCredentialLookupRequest = () =>
  createFutureExecutionRequest("provider_credential_lookup_requires_separate_exact_owner_approval");
export const createStreamGiftLedgerOwnerExecutionFinalHandoff222BProviderRuntimeRequest = () =>
  createFutureExecutionRequest("provider_binding_runtime_requires_separate_exact_owner_approval");
export const createStreamGiftLedgerOwnerExecutionFinalHandoff222BGiftSendExecutionRequest = () =>
  createFutureExecutionRequest("gift_send_execution_requires_separate_exact_owner_approval");
export const createStreamGiftLedgerOwnerExecutionFinalHandoff222BWalletPaymentRequest = () =>
  createFutureExecutionRequest("wallet_payment_requires_separate_exact_owner_approval");
export const createStreamGiftLedgerOwnerExecutionFinalHandoff222BPayoutExecutionRequest = () =>
  createFutureExecutionRequest("payout_execution_requires_separate_exact_owner_approval");
export const createStreamGiftLedgerOwnerExecutionFinalHandoff222BDbReadWriteRequest = () =>
  createFutureExecutionRequest("db_read_write_requires_separate_exact_owner_approval");
export const createStreamGiftLedgerOwnerExecutionFinalHandoff222BAdminToggleRequest = () =>
  createFutureExecutionRequest("admin_runtime_toggle_requires_separate_exact_owner_approval");
