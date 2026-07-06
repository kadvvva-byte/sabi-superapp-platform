// BACKEND-STREAM-FOUNDATION-147G
// Source-only service payload for Stream live/admin readiness.
// No provider calls, no DB, no Wallet, no money movement.

import type {
  BusinessStreamReadinessCard,
  ShortsDeferredPublishBoundary,
  StreamLiveAdminReadinessSnapshot,
  StreamMediaSessionLifecycleState,
  StreamModerationRiskSignal,
  StreamParticipantSessionState,
  StreamProviderBoundaryState,
  StreamRoomLifecycleState,
} from "./streamLiveAdminReadinessContracts";

export function createStreamProviderBoundaryState147G(): StreamProviderBoundaryState {
  return {
    providerStatus: "provider_not_configured",
    runtimeEnabled: false,
    providerCallAllowedNow: false,
    providerBindingAllowedNow: false,
    providerCredentialReadAllowedNow: false,
    providerTokenIssueAllowedNow: false,
    mediaRoomCreateAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowedNow: false,
    routeMountedNow: false,
    providerCallPerformed: false,
    providerBindingPerformed: false,
    providerCredentialReadPerformed: false,
    providerTokenIssued: false,
    mediaRoomCreated: false,
    dbWritePerformed: false,
    walletMutationPerformed: false,
    moneyMovementPerformed: false,
    simulatedSuccessAllowed: false,
  };
}

export function createBusinessStreamReadinessCard147G(): BusinessStreamReadinessCard {
  return {
    businessStreamSignalsPresent: true,
    productCardDisplayFuture: true,
    orderAllowedNow: false,
    paymentAllowedNow: false,
    walletMutationAllowedNow: false,
    airwallexRuntimeAllowedNow: false,
  };
}

export function createShortsDeferredPublishBoundary147G(): ShortsDeferredPublishBoundary {
  return {
    shortsSignalsPresent: true,
    publishAllowedNow: false,
    engagementWritableNow: false,
    moderationRequired: true,
    fakePublishAllowed: false,
  };
}

export function createStreamLiveAdminReadinessSnapshot147G(nowIso = new Date().toISOString()): StreamLiveAdminReadinessSnapshot {
  const roomLifecycleStates: readonly StreamRoomLifecycleState[] = [
    "draft",
    "scheduled",
    "starting",
    "provider_not_configured",
    "live_pending_provider",
    "paused",
    "ended",
    "blocked",
    "archived",
  ];

  const participantSessionStates: readonly StreamParticipantSessionState[] = [
    "requested",
    "approved",
    "joined",
    "muted",
    "camera_off",
    "suspended",
    "left",
    "removed",
    "blocked",
  ];

  const mediaSessionStates: readonly StreamMediaSessionLifecycleState[] = [
    "not_configured",
    "allocating_disabled",
    "ready_pending_provider",
    "active_future",
    "paused",
    "ended",
    "failed",
    "blocked",
  ];

  const moderationSignals: readonly StreamModerationRiskSignal[] = [
    "report_received",
    "abuse_risk",
    "profanity_risk",
    "adult_gate_required",
    "temporary_restriction",
    "review_required",
  ];

  return {
    status: "stream_live_admin_readiness_safe_disabled",
    generatedAtIso: nowIso,
    source: "BACKEND-STREAM-FOUNDATION-147G",
    readOnly: true,
    providerBoundary: createStreamProviderBoundaryState147G(),
    roomLifecycleStates,
    participantSessionStates,
    mediaSessionStates,
    moderationSignals,
    businessStream: createBusinessStreamReadinessCard147G(),
    shorts: createShortsDeferredPublishBoundary147G(),
    notes: [
      "Source-only scaffold is intentionally unmounted.",
      "Provider remains provider_not_configured.",
      "No provider call, credential read, token issue, DB write, Wallet mutation, money movement, or fake success is allowed.",
    ],
  };
}
