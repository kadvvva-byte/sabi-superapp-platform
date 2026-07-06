export const STREAM_FOUNDATION_142Y_LIVE_RUNTIME_CONTRACTS_DRAFT_VERSION =
  "BACKEND-STREAM-FOUNDATION-142Y" as const;

export type StreamFoundationLiveRuntimeLifecycleState =
  | "draft_blocked"
  | "preflight_blocked"
  | "provider_not_configured"
  | "repository_not_mounted"
  | "moderation_review_required"
  | "ready_for_future_mount_approval"
  | "runtime_mounted_later";

export type StreamFoundationLiveRuntimeCommandKind =
  | "start_live_session"
  | "stop_live_session"
  | "live_heartbeat"
  | "suspend_live_session"
  | "resume_live_session"
  | "fail_safe_block";

export interface StreamFoundationLiveRuntimeCommandEnvelope {
  readonly version: typeof STREAM_FOUNDATION_142Y_LIVE_RUNTIME_CONTRACTS_DRAFT_VERSION;
  readonly commandKind: StreamFoundationLiveRuntimeCommandKind;
  readonly routeId: "stream_live_start" | "stream_live_stop" | "stream_live_heartbeat" | "future_runtime_control";
  readonly actorUserIdRequired: true;
  readonly roomIdRequired: true;
  readonly clientRequestIdRequired: true;
  readonly currentLifecycleState: StreamFoundationLiveRuntimeLifecycleState;
  readonly sourceOnlyDraft: true;
  readonly routeBehaviorChangeAllowedNow: false;
  readonly runtimeMountAllowedNow: false;
  readonly runtimePostAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowedNow: false;
}

export type StreamFoundationRepositoryBoundaryOperation =
  | "read_live_session_later"
  | "create_live_session_later"
  | "update_live_session_later"
  | "append_live_event_later"
  | "append_live_audit_later";

export interface StreamFoundationRepositoryBoundaryContract {
  readonly sourceOnlyDraft: true;
  readonly operation: StreamFoundationRepositoryBoundaryOperation;
  readonly repositoryMountedNow: false;
  readonly transactionRequiredLater: true;
  readonly idempotencyRequiredLater: true;
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly fakePersistenceAllowedNow: false;
}

export type StreamFoundationProviderReadinessStatus =
  | "provider_not_configured"
  | "provider_key_missing"
  | "provider_gateway_missing"
  | "provider_health_not_verified"
  | "future_provider_ready_after_admin_gate";

export interface StreamFoundationProviderReadinessGateContract {
  readonly sourceOnlyDraft: true;
  readonly status: StreamFoundationProviderReadinessStatus;
  readonly providerSecretsServerSideOnly: true;
  readonly publicProviderSecretExposureAllowed: false;
  readonly providerCallAllowedNow: false;
  readonly providerSuccessAllowedNow: false;
  readonly fakeProviderSuccessAllowedNow: false;
}

export type StreamFoundationRealtimeHandoffStatus =
  | "realtime_safe_disabled"
  | "room_presence_not_mounted"
  | "broadcast_channel_not_mounted"
  | "future_realtime_ready_after_provider_and_repository";

export interface StreamFoundationRealtimeHandoffContract {
  readonly sourceOnlyDraft: true;
  readonly status: StreamFoundationRealtimeHandoffStatus;
  readonly roomPresencePublishAllowedNow: false;
  readonly broadcastEventAllowedNow: false;
  readonly socketOpenAllowedNow: false;
  readonly fakeOnlineCountAllowedNow: false;
}

export type StreamFoundationModerationGateStatus =
  | "moderation_contract_draft"
  | "age_gate_required"
  | "abuse_gate_required"
  | "report_gate_required"
  | "admin_review_required_later";

export interface StreamFoundationModerationGateContract {
  readonly sourceOnlyDraft: true;
  readonly status: StreamFoundationModerationGateStatus;
  readonly ageGateRequiredLater: true;
  readonly abuseGateRequiredLater: true;
  readonly reportGateRequiredLater: true;
  readonly adminReviewRequiredLater: true;
  readonly moderationBypassAllowedNow: false;
  readonly runtimeAllowLiveNow: false;
}

export type StreamFoundationEventAuditKind =
  | "live_session_command_received_later"
  | "live_session_gate_blocked_later"
  | "provider_readiness_checked_later"
  | "moderation_gate_checked_later"
  | "runtime_mount_approved_later";

export interface StreamFoundationEventAuditContract {
  readonly sourceOnlyDraft: true;
  readonly eventKind: StreamFoundationEventAuditKind;
  readonly appendEventAllowedNow: false;
  readonly appendAuditAllowedNow: false;
  readonly immutableAuditRequiredLater: true;
  readonly actorRequiredLater: true;
  readonly correlationIdRequiredLater: true;
}

export interface StreamFoundation142YLiveRuntimeFoundationContractsDraftSnapshot {
  readonly version: typeof STREAM_FOUNDATION_142Y_LIVE_RUNTIME_CONTRACTS_DRAFT_VERSION;
  readonly stage: "controlled_live_runtime_foundation_contracts_draft_source_only";
  readonly status: "live_runtime_foundation_contracts_draft_ready";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-142X";
  readonly ownerApprovalAccepted: true;
  readonly ownerApprovalText: string;
  readonly verifiedPreviousEvidence: {
    readonly blockedJsonEnvelopesPresentForLiveWriteRoutes: true;
    readonly routesReturned423: 3;
    readonly emptyBodyRoutes: 0;
    readonly targetPatchForEnvelopeBodyNeeded: false;
    readonly routeBehaviorChangeRequiredNow: false;
    readonly fakeSuccessObserved: false;
  };
  readonly lifecycleContracts: readonly StreamFoundationLiveRuntimeCommandEnvelope[];
  readonly repositoryBoundaryContracts: readonly StreamFoundationRepositoryBoundaryContract[];
  readonly providerReadinessGateContracts: readonly StreamFoundationProviderReadinessGateContract[];
  readonly realtimeHandoffContracts: readonly StreamFoundationRealtimeHandoffContract[];
  readonly moderationGateContracts: readonly StreamFoundationModerationGateContract[];
  readonly eventAuditContracts: readonly StreamFoundationEventAuditContract[];
  readonly nextApprovalTextFor142Z: string;
  readonly nextApprovalPolicy: {
    readonly exactApprovalRequiredBefore142Z: true;
    readonly nextStageIsOpsOnlyCompileAndSafetyVerification: true;
    readonly sourceModificationAllowedFor142Z: false;
    readonly targetWriteAllowedFor142Z: false;
    readonly backendRestartAllowedFor142Z: false;
    readonly runtimePostAllowedFor142Z: false;
    readonly databaseWriteAllowedFor142Z: false;
    readonly providerCallAllowedFor142Z: false;
    readonly walletMutationAllowedFor142Z: false;
    readonly moneyMovementAllowedFor142Z: false;
    readonly fakeSuccessAllowedFor142Z: false;
  };
  readonly safety: {
    readonly sourceOnly142Y: true;
    readonly changedScopeUnderStreamFoundationOnly: true;
    readonly targetWriteBy142Y: false;
    readonly appTsChangeBy142Y: false;
    readonly serverTsChangeBy142Y: false;
    readonly streamIndexChangeBy142Y: false;
    readonly routeBehaviorChangeBy142Y: false;
    readonly backendRestartBy142Y: false;
    readonly runtimeHttpBy142Y: false;
    readonly runtimePostBy142Y: false;
    readonly databaseReadBy142Y: false;
    readonly databaseWriteBy142Y: false;
    readonly providerCallBy142Y: false;
    readonly providerSecretReadBy142Y: false;
    readonly walletMutationBy142Y: false;
    readonly paymentAuthorizationBy142Y: false;
    readonly monthlyPayoutBy142Y: false;
    readonly moneyMovementBy142Y: false;
    readonly fakeSuccessBy142Y: false;
  };
}
