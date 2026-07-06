import {
  STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_VERSION,
  type StreamGiftLedgerOwnerExecutionHandoffApproval222A,
  type StreamGiftLedgerOwnerExecutionHandoffBlocked222A,
  type StreamGiftLedgerOwnerExecutionHandoffInput222A,
  type StreamGiftLedgerOwnerExecutionHandoffResult222A,
  type StreamGiftLedgerOwnerExecutionHandoffSafety222A,
  type StreamGiftLedgerOwnerExecutionHandoffSnapshot222A,
  type StreamGiftLedgerOwnerExecutionHandoffSurface222A,
} from "./types";

export const STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_OWNER_APPROVAL =
  "I_APPROVE_222A_STREAM_GIFTS_OWNER_EXECUTION_HANDOFF_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_APPROVALS: readonly StreamGiftLedgerOwnerExecutionHandoffApproval222A[] = [
  "launch_runtime_enablement_exact_owner_approval_required",
  "provider_credential_lookup_exact_owner_approval_required",
  "provider_binding_exact_owner_approval_required",
  "provider_runtime_exact_owner_approval_required",
  "gift_send_execution_exact_owner_approval_required",
  "gift_ledger_write_exact_owner_approval_required",
  "wallet_payment_exact_owner_approval_required",
  "payout_execution_exact_owner_approval_required",
  "db_read_write_exact_owner_approval_required",
  "admin_runtime_toggle_exact_owner_approval_required",
  "risk_compliance_privacy_runtime_exact_owner_approval_required",
  "report_export_runtime_exact_owner_approval_required",
  "asset_publish_realtime_runtime_exact_owner_approval_required",
  "raw_secret_handling_forbidden",
] as const;

export const STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_SURFACES: readonly StreamGiftLedgerOwnerExecutionHandoffSurface222A[] = [
  "owner_execution_handoff_index",
  "future_exact_approval_template",
  "launch_runtime_gate",
  "provider_credential_gate",
  "provider_runtime_gate",
  "gift_send_execution_gate",
  "wallet_payment_gate",
  "payout_execution_gate",
  "db_read_write_gate",
  "admin_runtime_toggle_gate",
  "risk_compliance_privacy_gate",
  "report_export_gate",
  "asset_publish_realtime_gate",
  "safe_disabled_archive_reference",
] as const;

export const STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_SAFETY: StreamGiftLedgerOwnerExecutionHandoffSafety222A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  ownerHandoffIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
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
});

const blocked = (
  code: StreamGiftLedgerOwnerExecutionHandoffBlocked222A["code"],
  blockedReason: string,
): StreamGiftLedgerOwnerExecutionHandoffBlocked222A => ({
  ok: false,
  version: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_VERSION,
  status: "owner_execution_handoff_blocked_without_runtime_enablement",
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
  safety: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_SAFETY,
});

const containsForbiddenSecretValue = (values: readonly string[]): boolean =>
  values.some((value) => /secret|token=|password=|private_key/i.test(value));

export function normalizeStreamGiftLedgerOwnerExecutionHandoffInput222A(
  input: StreamGiftLedgerOwnerExecutionHandoffInput222A,
): StreamGiftLedgerOwnerExecutionHandoffInput222A {
  return {
    ownerApproval: input.ownerApproval,
    handoffMode: input.handoffMode ?? "owner_execution_handoff_index_only",
    acknowledged221BStage: input.acknowledged221BStage ?? "221B_final_archive_readiness_final_handoff_clean",
    acknowledged220BStage: input.acknowledged220BStage ?? "220B_execution_approval_boundary_final_handoff_clean",
    evidenceReferences: input.evidenceReferences,
    requiredApprovals: input.requiredApprovals,
    requiredSurfaces: input.requiredSurfaces,
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerOwnerExecutionHandoff222ARemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_SAFETY;
  if (
    safety.launchRuntimeEnablementExecuted ||
    safety.providerBindingExecuted ||
    safety.providerRuntimeEnabled ||
    safety.providerCredentialLookupExecuted ||
    safety.providerLiveCallExecuted ||
    safety.providerRiskCallExecuted ||
    safety.providerComplianceCallExecuted ||
    safety.providerPayoutCallExecuted ||
    safety.adminRuntimeToggleExecuted ||
    safety.fraudRiskRuntimeDecisionExecuted ||
    safety.complianceRuntimeDecisionExecuted ||
    safety.privacyRuntimeRedactionExecuted ||
    safety.payoutExecutionExecuted ||
    safety.walletMutationExecuted ||
    safety.paymentCaptureExecuted ||
    safety.sendIntentRuntimeExecutionExecuted ||
    safety.giftReceiptRuntimeWriteExecuted ||
    safety.giftLedgerRuntimeWriteExecuted ||
    safety.giftDeliveryRealtimeEmitExecuted ||
    safety.dbReadExecuted ||
    safety.dbWriteExecuted ||
    safety.realtimeEmitExecuted
  ) {
    throw new Error(`${STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_VERSION} must remain safe-disabled`);
  }
  return true;
}

export function prepareStreamGiftLedgerOwnerExecutionHandoff222A(
  input: StreamGiftLedgerOwnerExecutionHandoffInput222A,
): StreamGiftLedgerOwnerExecutionHandoffResult222A {
  assertStreamGiftLedgerOwnerExecutionHandoff222ARemainsSafe();
  const normalized = normalizeStreamGiftLedgerOwnerExecutionHandoffInput222A(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_OWNER_APPROVAL) {
    return blocked("owner_approval_required", "222A owner handoff index requires the exact no-runtime owner approval phrase.");
  }
  if (normalized.handoffMode !== "owner_execution_handoff_index_only") {
    return blocked("handoff_mode_disabled", "222A is handoff-index-only and cannot enable runtime execution.");
  }
  if (normalized.acknowledged221BStage !== "221B_final_archive_readiness_final_handoff_clean") {
    return blocked("previous_221b_final_archive_required", "221B final archive readiness final handoff must be clean first.");
  }
  if (normalized.acknowledged220BStage !== "220B_execution_approval_boundary_final_handoff_clean") {
    return blocked("previous_220b_execution_boundary_required", "220B execution approval boundary final handoff must be clean first.");
  }
  if (!normalized.evidenceReferences.length) {
    return blocked("evidence_references_required", "222A needs report/handoff evidence references only, not runtime values.");
  }
  if (!normalized.requiredApprovals.length) {
    return blocked("required_approvals_required", "222A requires the exact owner approval matrix to be listed.");
  }
  if (!normalized.requiredSurfaces.length) {
    return blocked("required_surfaces_required", "222A requires the owner handoff surfaces to be listed.");
  }
  if (containsForbiddenSecretValue([...normalized.evidenceReferences, normalized.operatorNote ?? ""])) {
    return blocked("raw_secret_or_provider_value_rejected", "222A rejects raw secrets, provider credentials, tokens, and private keys.");
  }

  for (const requiredApproval of STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_APPROVALS) {
    if (!normalized.requiredApprovals.includes(requiredApproval)) {
      return blocked("missing_required_approval", `Missing required approval boundary: ${requiredApproval}`);
    }
  }
  for (const requiredSurface of STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(requiredSurface)) {
      return blocked("missing_required_surface", `Missing required surface: ${requiredSurface}`);
    }
  }

  return {
    ok: true,
    status: "owner_execution_handoff_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.owner-execution-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_VERSION,
      previousStageRequired:
        "221B_final_archive_readiness_final_handoff_clean_and_220B_execution_approval_boundary_final_handoff_clean",
      requiredApprovals: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_APPROVALS,
      requiredSurfaces: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_SURFACES,
      evidenceReferences: normalized.evidenceReferences,
      handoffPrepared: true,
      providerNotConfiguredVisible: true,
      ownerHandoffIndexOnlyNoRuntime: true,
      finalArchiveReadinessLocked: true,
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
      safety: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_SAFETY,
    },
  };
}

export function getStreamGiftLedgerOwnerExecutionHandoff222A(): StreamGiftLedgerOwnerExecutionHandoffSnapshot222A {
  return {
    version: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_VERSION,
    type: "stream_gifts_owner_execution_handoff_index",
    previousStageRequired: "221B final archive readiness final handoff clean plus TypeScript clean on owner machine",
    ownerHandoffIndexOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    exactOwnerApprovalTemplateVisible: true,
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
    requiredApprovals: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_APPROVALS,
    requiredSurfaces: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_SURFACES,
    safety: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_SAFETY,
  };
}

export function getStreamGiftLedgerOwnerExecutionHandoff222AContract() {
  return {
    contract: "stream.gift.owner-execution-handoff.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_VERSION,
    ownerApproval: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_OWNER_APPROVAL,
    requiredApprovals: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_APPROVALS,
    requiredSurfaces: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_SURFACES,
    providerNotConfiguredVisible: true,
    ownerHandoffIndexOnlyNoRuntime: true,
    rawSecretHandlingForbidden: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    safety: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_SAFETY,
  };
}

export function getStreamGiftLedgerOwnerExecutionHandoff222ARunbook() {
  return {
    version: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_VERSION,
    mode: "owner_execution_handoff_index_only_no_runtime_enablement" as const,
    steps: [
      "Keep 221B final archive readiness final handoff clean.",
      "Keep 220B execution approval boundary final handoff clean.",
      "Use only report/handoff references as evidence.",
      "Never paste raw provider credentials or secret values into this handoff.",
      "For any real launch, provider, DB, Wallet, payout, send, realtime, or Admin runtime action, create a separate exact owner approval package.",
    ] as const,
    sourceOnly: true,
  };
}

const futureExecutionBlocked = (kind: string) => ({
  ok: false as const,
  version: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_VERSION,
  status: "future_execution_requires_new_exact_owner_approval" as const,
  kind,
  providerNotConfiguredVisible: true,
  exactOwnerApprovalRequired: true,
  executedNow: false,
  sourceOnly: true,
  safety: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_SAFETY,
});

export const createStreamGiftLedgerOwnerExecutionHandoff222ALaunchRuntimeEnablementRequest = () =>
  futureExecutionBlocked("launch_runtime_enablement");
export const createStreamGiftLedgerOwnerExecutionHandoff222AProviderCredentialLookupRequest = () =>
  futureExecutionBlocked("provider_credential_lookup");
export const createStreamGiftLedgerOwnerExecutionHandoff222AProviderRuntimeRequest = () =>
  futureExecutionBlocked("provider_runtime");
export const createStreamGiftLedgerOwnerExecutionHandoff222AGiftSendExecutionRequest = () =>
  futureExecutionBlocked("gift_send_execution");
export const createStreamGiftLedgerOwnerExecutionHandoff222AWalletPaymentRequest = () =>
  futureExecutionBlocked("wallet_payment");
export const createStreamGiftLedgerOwnerExecutionHandoff222APayoutExecutionRequest = () =>
  futureExecutionBlocked("payout_execution");
export const createStreamGiftLedgerOwnerExecutionHandoff222ADbReadWriteRequest = () =>
  futureExecutionBlocked("db_read_write");
export const createStreamGiftLedgerOwnerExecutionHandoff222AAdminToggleRequest = () =>
  futureExecutionBlocked("admin_runtime_toggle");
