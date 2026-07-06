// BACKEND-STREAM-FOUNDATION-147G
// Source-only Stream live/admin readiness contracts.
// Safe-disabled by default: no provider runtime, no DB write, no Wallet or money movement.

export type StreamProviderBoundaryStatus =
  | "provider_not_configured"
  | "credentials_present_not_verified"
  | "sandbox_configured_disabled"
  | "sandbox_runtime_approved_future"
  | "production_review_required"
  | "production_enabled_future";

export type StreamRoomLifecycleState =
  | "draft"
  | "scheduled"
  | "starting"
  | "provider_not_configured"
  | "live_pending_provider"
  | "paused"
  | "ended"
  | "blocked"
  | "archived";

export type StreamParticipantSessionState =
  | "requested"
  | "approved"
  | "joined"
  | "muted"
  | "camera_off"
  | "suspended"
  | "left"
  | "removed"
  | "blocked";

export type StreamMediaSessionLifecycleState =
  | "not_configured"
  | "allocating_disabled"
  | "ready_pending_provider"
  | "active_future"
  | "paused"
  | "ended"
  | "failed"
  | "blocked";

export type StreamModerationRiskSignal =
  | "report_received"
  | "abuse_risk"
  | "profanity_risk"
  | "adult_gate_required"
  | "temporary_restriction"
  | "review_required";

export interface StreamRealtimeEventEnvelope {
  readonly eventId: string;
  readonly roomId: string;
  readonly actorId: string | null;
  readonly eventType: string;
  readonly createdAtIso: string;
  readonly source: "backend_source_only" | "future_runtime";
  readonly safeDisabled: true;
}

export interface StreamAdminReadinessGate {
  readonly providerStatus: "provider_not_configured";
  readonly runtimeEnabled: false;
  readonly providerCallAllowedNow: false;
  readonly providerBindingAllowedNow: false;
  readonly providerCredentialReadAllowedNow: false;
  readonly providerTokenIssueAllowedNow: false;
  readonly mediaRoomCreateAllowedNow: false;
  readonly dbWriteAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowedNow: false;
}

export interface StreamProviderBoundaryState extends StreamAdminReadinessGate {
  readonly routeMountedNow: false;
  readonly providerCallPerformed: false;
  readonly providerBindingPerformed: false;
  readonly providerCredentialReadPerformed: false;
  readonly providerTokenIssued: false;
  readonly mediaRoomCreated: false;
  readonly dbWritePerformed: false;
  readonly walletMutationPerformed: false;
  readonly moneyMovementPerformed: false;
  readonly simulatedSuccessAllowed: false;
}

export interface BusinessStreamReadinessCard {
  readonly businessStreamSignalsPresent: boolean;
  readonly productCardDisplayFuture: boolean;
  readonly orderAllowedNow: false;
  readonly paymentAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly airwallexRuntimeAllowedNow: false;
}

export interface ShortsDeferredPublishBoundary {
  readonly shortsSignalsPresent: boolean;
  readonly publishAllowedNow: false;
  readonly engagementWritableNow: false;
  readonly moderationRequired: true;
  readonly fakePublishAllowed: false;
}

export interface StreamLiveAdminReadinessSnapshot {
  readonly status: "stream_live_admin_readiness_safe_disabled";
  readonly generatedAtIso: string;
  readonly source: "BACKEND-STREAM-FOUNDATION-147G";
  readonly readOnly: true;
  readonly providerBoundary: StreamProviderBoundaryState;
  readonly roomLifecycleStates: readonly StreamRoomLifecycleState[];
  readonly participantSessionStates: readonly StreamParticipantSessionState[];
  readonly mediaSessionStates: readonly StreamMediaSessionLifecycleState[];
  readonly moderationSignals: readonly StreamModerationRiskSignal[];
  readonly businessStream: BusinessStreamReadinessCard;
  readonly shorts: ShortsDeferredPublishBoundary;
  readonly notes: readonly string[];
}

export const STREAM_LIVE_ADMIN_READINESS_ROUTE_PATH = "/stream/live-admin/readiness" as const;
export const STREAM_LIVE_ADMIN_READINESS_EXPECTED_MOUNT_PREFIX = "/api/admin" as const;
