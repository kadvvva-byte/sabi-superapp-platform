import {
  STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_OWNER_APPROVAL,
  STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_VERSION,
  type StreamGiftLedgerClosureMarkerArtifact224A,
  type StreamGiftLedgerClosureMarkerBlocked224A,
  type StreamGiftLedgerClosureMarkerBlockedCode224A,
  type StreamGiftLedgerClosureMarkerInput224A,
  type StreamGiftLedgerClosureMarkerResult224A,
  type StreamGiftLedgerClosureMarkerSafety224A,
  type StreamGiftLedgerClosureMarkerSnapshot224A,
  type StreamGiftLedgerClosureMarkerSurface224A,
} from "./types";

export { STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_OWNER_APPROVAL, STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_VERSION } from "./types";

export const STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_REQUIRED_ARTIFACTS: readonly StreamGiftLedgerClosureMarkerArtifact224A[] = [
  "223b_final_owner_archive_package_final_handoff_passed",
  "222b_owner_execution_handoff_final_handoff_passed",
  "221b_final_archive_readiness_final_handoff_passed",
  "220b_execution_approval_boundary_final_handoff_passed",
  "219b_launch_readiness_control_final_handoff_passed",
  "200f_to_223b_safe_disabled_chain_closed",
  "no_more_gift_ledger_archive_layers",
  "next_stream_foundation_rooms_lifecycle_225a",
  "provider_not_configured_visibility_preserved",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_REQUIRED_SURFACES: readonly StreamGiftLedgerClosureMarkerSurface224A[] = [
  "gift_ledger_closure_marker",
  "owner_archive_closed_reference",
  "execution_approval_boundary_reference",
  "launch_readiness_reference",
  "no_more_archive_layers_reference",
  "next_stream_rooms_foundation_reference",
  "safe_disabled_future_execution_reference",
] as const;

export const STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_SAFETY: StreamGiftLedgerClosureMarkerSafety224A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  closureMarkerOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  noMoreGiftLedgerArchiveLayers: true,
  nextStageIsStreamFoundationRoomsLifecycle: true,
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
  fraudRiskRuntimeDecisionExecuted: false,
  complianceRuntimeDecisionExecuted: false,
  privacyRuntimeRedactionExecuted: false,
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
  futureProviderCredentialLookupRequiresSeparateApproval: true,
  futureGiftSendExecutionRequiresSeparateApproval: true,
  futureWalletPaymentRequiresSeparateApproval: true,
  futurePayoutExecutionRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  futureAdminToggleRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

function containsForbiddenRawSecret(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.toLowerCase();
  return [
    "secret=",
    "api_key=",
    "apikey=",
    "private_key",
    "access_token",
    "refresh_token",
    "bearer ",
    "password=",
    "credential=",
    "provider_secret",
    "payment_token",
    "payout_token",
  ].some((pattern) => normalized.includes(pattern));
}

function blocked(
  code: StreamGiftLedgerClosureMarkerBlockedCode224A,
  blockedReason: string,
): StreamGiftLedgerClosureMarkerBlocked224A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_VERSION,
    status: "gift_ledger_closure_marker_blocked_without_runtime_enablement",
    code,
    blockedReason,
    closureMarkerPrepared: false,
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
    safety: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_SAFETY,
  };
}

export function normalizeStreamGiftLedgerClosureMarkerInput224A(
  input: StreamGiftLedgerClosureMarkerInput224A,
): StreamGiftLedgerClosureMarkerInput224A {
  return {
    ownerApproval: input.ownerApproval?.trim(),
    closureMode: input.closureMode ?? "disabled",
    acknowledged223BStage: input.acknowledged223BStage ?? "disabled",
    acknowledged222BStage: input.acknowledged222BStage ?? "disabled",
    acknowledged221BStage: input.acknowledged221BStage ?? "disabled",
    evidenceReferences: [...new Set(input.evidenceReferences.map((value) => value.trim()).filter(Boolean))],
    requiredArtifacts: [...new Set(input.requiredArtifacts)],
    requiredSurfaces: [...new Set(input.requiredSurfaces)],
    operatorNote: input.operatorNote?.trim(),
  };
}

export function assertStreamGiftLedgerClosureMarker224ARemainsSafe(): StreamGiftLedgerClosureMarkerSafety224A {
  return STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_SAFETY;
}

export function prepareStreamGiftLedgerClosureMarker224A(
  input: StreamGiftLedgerClosureMarkerInput224A,
): StreamGiftLedgerClosureMarkerResult224A {
  const normalized = normalizeStreamGiftLedgerClosureMarkerInput224A(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_OWNER_APPROVAL) {
    return blocked("owner_approval_required", "224A closure marker requires the exact owner approval phrase.");
  }
  if (normalized.closureMode !== "gift_ledger_closed_no_more_archive_layers") {
    return blocked("closure_mode_disabled", "224A is only a closure marker and cannot enable runtime execution.");
  }
  if (normalized.acknowledged223BStage !== "223B_final_owner_archive_package_final_handoff_clean") {
    return blocked("previous_223b_owner_archive_required", "223B final owner archive package final handoff must be clean first.");
  }
  if (normalized.acknowledged222BStage !== "222B_owner_execution_handoff_final_handoff_clean") {
    return blocked("previous_222b_owner_execution_required", "222B owner execution handoff final handoff must be clean first.");
  }
  if (normalized.acknowledged221BStage !== "221B_final_archive_readiness_final_handoff_clean") {
    return blocked("previous_221b_final_archive_required", "221B final archive readiness final handoff must be clean first.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked("evidence_references_required", "224A requires 223B/222B/221B closure evidence references.");
  }
  if (normalized.evidenceReferences.some(containsForbiddenRawSecret) || containsForbiddenRawSecret(normalized.operatorNote)) {
    return blocked("raw_secret_or_provider_value_rejected", "224A rejects raw secrets, provider values, tokens, payment data, and payout credentials.");
  }
  if (normalized.requiredArtifacts.length === 0) {
    return blocked("required_artifacts_required", "224A requires closure artifacts.");
  }
  if (normalized.requiredSurfaces.length === 0) {
    return blocked("required_surfaces_required", "224A requires closure surfaces.");
  }
  for (const requiredArtifact of STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(requiredArtifact)) {
      return blocked("missing_required_artifact", `Missing required artifact: ${requiredArtifact}`);
    }
  }
  for (const requiredSurface of STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(requiredSurface)) {
      return blocked("missing_required_surface", `Missing required surface: ${requiredSurface}`);
    }
  }

  return {
    ok: true,
    status: "gift_ledger_closure_marker_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.closure-marker.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_VERSION,
      previousStageRequired: "223B_final_owner_archive_package_final_handoff_clean",
      requiredArtifacts: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_REQUIRED_SURFACES,
      evidenceReferences: normalized.evidenceReferences,
      closureMarkerPrepared: true,
      providerNotConfiguredVisible: true,
      giftLedgerSafeDisabledChainClosed: true,
      noMoreGiftLedgerArchiveLayers: true,
      nextStageIsStreamFoundationRoomsLifecycle225A: true,
      finalOwnerArchivePackageFinalHandoffLocked: true,
      ownerExecutionFinalHandoffLocked: true,
      finalArchiveReadinessLocked: true,
      executionApprovalBoundaryLocked: true,
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
      safety: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_SAFETY,
    },
  };
}

export function getStreamGiftLedgerClosureMarker224A(): StreamGiftLedgerClosureMarkerSnapshot224A {
  return {
    version: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_VERSION,
    type: "stream_gifts_ledger_closure_marker",
    previousStageRequired: "223B final owner archive package final handoff clean plus TypeScript clean on owner machine",
    closureMarkerOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    giftLedgerSafeDisabledChainClosed: true,
    noMoreGiftLedgerArchiveLayers: true,
    nextStageIsStreamFoundationRoomsLifecycle225A: true,
    finalOwnerArchivePackageFinalHandoffLocked: true,
    ownerExecutionFinalHandoffLocked: true,
    finalArchiveReadinessLocked: true,
    executionApprovalBoundaryLocked: true,
    rawSecretHandlingForbidden: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    requiredArtifacts: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_REQUIRED_SURFACES,
    safety: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_SAFETY,
  };
}

export function getStreamGiftLedgerClosureMarker224AContract() {
  return {
    contract: "stream.gift.closure-marker.safe_disabled.v1",
    version: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_VERSION,
    purpose: "Stop further Gift Ledger archive/readiness layers and hand off to Stream foundation rooms lifecycle 225A.",
    allowedNow: ["source_only_closure_marker", "owner_visible_handoff", "safe_disabled_next_stage_pointer"],
    blockedNow: [
      "env_file_read",
      "raw_secret_read_or_print",
      "launch_runtime_enablement",
      "provider_credential_lookup",
      "provider_binding_or_call",
      "db_read_write",
      "wallet_mutation",
      "payment_capture",
      "payout_execution",
      "gift_send_execution",
      "gift_ledger_write",
      "realtime_emit",
      "fake_success",
    ],
    nextPlannedStage: "225A_stream_rooms_lifecycle_readiness",
  } as const;
}

export function getStreamGiftLedgerClosureMarker224ARunbook() {
  return {
    version: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_VERSION,
    runbook: [
      "Confirm 223B checker passed on owner machine.",
      "Apply 224A as the final Gift Ledger closure marker only.",
      "Do not add more Gift Ledger archive/readiness packages after 224A.",
      "Move to Stream foundation rooms lifecycle 225A.",
      "Keep all future runtime/provider/DB/Wallet/payout/send work behind separate exact owner approval.",
    ],
  } as const;
}

function createBlockedFutureRequest(reason: string) {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_VERSION,
    status: "blocked_requires_new_exact_owner_approval_and_separate_execution_package",
    reason,
    giftLedgerSafeDisabledChainClosed: true,
    noMoreGiftLedgerArchiveLayers: true,
    nextStageIsStreamFoundationRoomsLifecycle225A: true,
    runtimeExecutionApprovedNow: false,
    launchRuntimeEnablementExecuted: false,
    providerRuntimeEnabled: false,
    providerCredentialLookupExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    walletMutationExecuted: false,
    payoutExecutionExecuted: false,
    sendIntentRuntimeExecutionExecuted: false,
    giftLedgerRuntimeWriteExecuted: false,
    realtimeEmitExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_SAFETY,
  } as const;
}

export function createStreamGiftLedgerClosureMarker224ANextGiftLedgerArchiveStageRequest() {
  return createBlockedFutureRequest("Gift Ledger archive/readiness chain is closed at 224A; next work must move to Stream foundation rooms lifecycle 225A.");
}

export function createStreamGiftLedgerClosureMarker224ALaunchRuntimeEnablementRequest() {
  return createBlockedFutureRequest("Launch runtime enablement requires a new exact owner approval and separate execution package.");
}

export function createStreamGiftLedgerClosureMarker224AProviderCredentialLookupRequest() {
  return createBlockedFutureRequest("Provider credential lookup is forbidden in 224A and requires separate exact owner approval.");
}

export function createStreamGiftLedgerClosureMarker224ADbReadWriteRequest() {
  return createBlockedFutureRequest("DB read/write is forbidden in 224A and requires separate exact owner approval.");
}

export function createStreamGiftLedgerClosureMarker224AGiftSendExecutionRequest() {
  return createBlockedFutureRequest("Gift send execution is forbidden in 224A and requires separate exact owner approval.");
}
