import {
  STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_VERSION,
  type StreamGiftLedgerExecutionApprovalFinalHandoffBlocked220B,
  type StreamGiftLedgerExecutionApprovalFinalHandoffInput220B,
  type StreamGiftLedgerExecutionApprovalFinalHandoffLock220B,
  type StreamGiftLedgerExecutionApprovalFinalHandoffResult220B,
  type StreamGiftLedgerExecutionApprovalFinalHandoffRunbook220B,
  type StreamGiftLedgerExecutionApprovalFinalHandoffSafety220B,
  type StreamGiftLedgerExecutionApprovalFinalHandoffSnapshot220B,
  type StreamGiftLedgerExecutionApprovalFinalHandoffSurface220B,
} from "./types";

export const STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_OWNER_APPROVAL =
  "I_APPROVE_220B_STREAM_GIFTS_EXECUTION_APPROVAL_BOUNDARY_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_LOCKS_220B = Object.freeze([
  "previous_220a_execution_approval_boundary_index_locked",
  "exact_owner_approval_matrix_locked",
  "launch_runtime_enablement_boundary_locked",
  "provider_binding_runtime_boundary_locked",
  "provider_credential_lookup_boundary_locked",
  "gift_send_execution_boundary_locked",
  "gift_ledger_write_boundary_locked",
  "wallet_payment_boundary_locked",
  "payout_execution_boundary_locked",
  "db_read_write_boundary_locked",
  "admin_runtime_toggle_boundary_locked",
  "risk_compliance_privacy_report_boundaries_locked",
  "realtime_delivery_boundary_locked",
  "asset_publish_boundary_locked",
  "raw_secret_handling_forbidden",
] as const satisfies readonly StreamGiftLedgerExecutionApprovalFinalHandoffLock220B[]);

export const STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_SURFACES_220B = Object.freeze([
  "final_execution_approval_handoff",
  "closed_220a_approval_index_visibility",
  "provider_not_configured_visibility",
  "future_exact_owner_approval_matrix",
  "launch_runtime_lock_visibility",
  "provider_lock_visibility",
  "db_lock_visibility",
  "wallet_payment_lock_visibility",
  "payout_lock_visibility",
  "gift_send_lock_visibility",
  "admin_toggle_lock_visibility",
  "future_execution_package_visibility",
] as const satisfies readonly StreamGiftLedgerExecutionApprovalFinalHandoffSurface220B[]);

export const STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_SAFETY: StreamGiftLedgerExecutionApprovalFinalHandoffSafety220B = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous220ABoundaryIndexRequired: true,
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
  code: StreamGiftLedgerExecutionApprovalFinalHandoffBlocked220B["code"],
  blockedReason: string,
): StreamGiftLedgerExecutionApprovalFinalHandoffBlocked220B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_VERSION,
    status: "execution_approval_boundary_final_handoff_blocked_without_runtime_enablement",
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
    safety: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_SAFETY,
  };
}

export function normalizeStreamGiftLedgerExecutionApprovalFinalHandoffInput220B(
  input: Partial<StreamGiftLedgerExecutionApprovalFinalHandoffInput220B> = {},
): StreamGiftLedgerExecutionApprovalFinalHandoffInput220B {
  return {
    ownerApproval: input.ownerApproval ?? STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_OWNER_APPROVAL,
    handoffMode: input.handoffMode ?? "execution_approval_boundary_final_handoff_only",
    acknowledged220AStage: input.acknowledged220AStage ?? "220A_execution_approval_boundary_index_clean",
    evidenceReferences: input.evidenceReferences ?? [
      "backend-stream-gifts-ledger-220a-report.json",
      "backend-stream-gifts-ledger-220a-handoff.md",
      "owner-machine-typescript-clean",
    ],
    lockedBoundaries: input.lockedBoundaries ?? STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_LOCKS_220B,
    controlSurfaces: input.controlSurfaces ?? STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_SURFACES_220B,
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerExecutionApprovalFinalHandoff220BRemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_SAFETY;
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
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-220B safety invariant failed");
  }
  return true;
}

export function prepareStreamGiftLedgerExecutionApprovalFinalHandoff220B(
  input: Partial<StreamGiftLedgerExecutionApprovalFinalHandoffInput220B> = {},
): StreamGiftLedgerExecutionApprovalFinalHandoffResult220B {
  assertStreamGiftLedgerExecutionApprovalFinalHandoff220BRemainsSafe();
  const normalized = normalizeStreamGiftLedgerExecutionApprovalFinalHandoffInput220B(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_OWNER_APPROVAL) {
    return blocked("owner_approval_required", "220B requires exact source-only final handoff approval text.");
  }
  if (normalized.handoffMode !== "execution_approval_boundary_final_handoff_only") {
    return blocked("handoff_mode_disabled", "220B is only a final handoff, not runtime enablement.");
  }
  if (normalized.acknowledged220AStage !== "220A_execution_approval_boundary_index_clean") {
    return blocked("previous_220a_boundary_index_required", "220B requires clean 220A execution approval boundary index and owner-machine TypeScript pass.");
  }
  if (normalized.evidenceReferences.length === 0) return blocked("evidence_references_required", "220B requires 220A report/handoff references.");
  if (containsForbiddenValue(normalized.evidenceReferences)) return blocked("raw_secret_or_provider_value_rejected", "220B rejects raw secret/provider credential values in evidence references.");
  if (normalized.lockedBoundaries.length === 0) return blocked("locked_boundaries_required", "220B requires locked execution approval boundaries.");
  if (normalized.controlSurfaces.length === 0) return blocked("control_surfaces_required", "220B requires final handoff control surfaces.");

  const missingLock = missingRequired(STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_LOCKS_220B, normalized.lockedBoundaries);
  if (missingLock) return blocked("missing_locked_boundary", `220B missing locked boundary: ${missingLock}`);
  const missingSurface = missingRequired(STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_SURFACES_220B, normalized.controlSurfaces);
  if (missingSurface) return blocked("missing_required_surface", `220B missing control surface: ${missingSurface}`);

  return {
    ok: true,
    status: "execution_approval_boundary_final_handoff_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.execution-approval-boundary-final-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_VERSION,
      previousStageRequired: "220A_execution_approval_boundary_index_clean",
      lockedBoundaries: normalized.lockedBoundaries,
      requiredSurfaces: normalized.controlSurfaces,
      evidenceReferences: normalized.evidenceReferences,
      handoffPrepared: true,
      providerNotConfiguredVisible: true,
      finalHandoffOnlyNoRuntime: true,
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
      safety: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_SAFETY,
    },
  };
}

export function getStreamGiftLedgerExecutionApprovalFinalHandoff220B(): StreamGiftLedgerExecutionApprovalFinalHandoffSnapshot220B {
  assertStreamGiftLedgerExecutionApprovalFinalHandoff220BRemainsSafe();
  return {
    version: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_VERSION,
    type: "stream_gifts_execution_approval_boundary_final_handoff",
    previousStageRequired: "220A execution approval boundary index clean plus TypeScript clean on owner machine",
    finalHandoffOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    allExecutionApprovalBoundariesLocked: true,
    lockedBoundaries: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_LOCKS_220B,
    controlSurfaces: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_SURFACES_220B,
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
    safety: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_SAFETY,
  };
}

export function getStreamGiftLedgerExecutionApprovalFinalHandoff220BContract() {
  return {
    contract: "stream.gift.execution-approval-boundary-final-handoff.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_VERSION,
    ownerApproval: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_OWNER_APPROVAL,
    lockedBoundaries: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_LOCKS_220B,
    requiredSurfaces: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_SURFACES_220B,
    runtimeEnablement: "blocked_requires_new_exact_owner_approval" as const,
    sourceOnly: true,
  };
}

export function getStreamGiftLedgerExecutionApprovalFinalHandoff220BRunbook(): StreamGiftLedgerExecutionApprovalFinalHandoffRunbook220B {
  return {
    version: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_VERSION,
    steps: [
      "Keep 220A execution approval boundary index evidence attached.",
      "Treat launch/runtime/provider/DB/Wallet/payout/send/realtime actions as locked until a new exact owner approval exists.",
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
    ],
    nextStage: "closed_stream_gifts_execution_approval_boundary_future_execution_requires_exact_owner_approval",
  };
}

function lockedRequest(action: string) {
  return {
    ok: false as const,
    version: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_VERSION,
    status: "locked_requires_new_exact_owner_approval" as const,
    action,
    blockedReason: "220B is a source-only final handoff. Future runtime execution requires a separate exact owner approval and a separate execution package.",
    launchRuntimeEnablementExecuted: false,
    providerRuntimeEnabled: false,
    providerCredentialLookupExecuted: false,
    sendIntentRuntimeExecutionExecuted: false,
    walletMutationExecuted: false,
    payoutExecutionExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_FINAL_HANDOFF_220B_SAFETY,
  };
}

export const createStreamGiftLedgerExecutionApprovalFinalHandoff220BLaunchRuntimeEnablementRequest = () => lockedRequest("launch_runtime_enablement");
export const createStreamGiftLedgerExecutionApprovalFinalHandoff220BProviderBindingRequest = () => lockedRequest("provider_binding");
export const createStreamGiftLedgerExecutionApprovalFinalHandoff220BProviderRuntimeRequest = () => lockedRequest("provider_runtime");
export const createStreamGiftLedgerExecutionApprovalFinalHandoff220BGiftSendExecutionRequest = () => lockedRequest("gift_send_execution");
export const createStreamGiftLedgerExecutionApprovalFinalHandoff220BWalletPaymentRequest = () => lockedRequest("wallet_payment");
export const createStreamGiftLedgerExecutionApprovalFinalHandoff220BPayoutExecutionRequest = () => lockedRequest("payout_execution");
export const createStreamGiftLedgerExecutionApprovalFinalHandoff220BDbReadWriteRequest = () => lockedRequest("db_read_write");
export const createStreamGiftLedgerExecutionApprovalFinalHandoff220BAdminRuntimeToggleRequest = () => lockedRequest("admin_runtime_toggle");
