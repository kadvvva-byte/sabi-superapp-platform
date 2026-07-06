export const STREAM_FOUNDATION_143F_PROVIDER_REALTIME_MODERATION_GATE_CONTRACTS_VERSION =
  "BACKEND-STREAM-FOUNDATION-143F" as const;

export type StreamFoundation143FGateId =
  | "provider_readiness_gate"
  | "realtime_handoff_gate"
  | "moderation_gate"
  | "runtime_mount_prerequisite_gate"
  | "admin_review_gate"
  | "safe_disabled_response_gate";

export type StreamFoundation143FBlockedCode =
  | "STREAM_PROVIDER_NOT_CONFIGURED"
  | "STREAM_PROVIDER_SECRET_SERVER_SIDE_ONLY"
  | "STREAM_REALTIME_SAFE_DISABLED"
  | "STREAM_MODERATION_REQUIRED"
  | "STREAM_RUNTIME_MOUNT_BLOCKED"
  | "STREAM_ADMIN_REVIEW_REQUIRED"
  | "STREAM_SAFE_DISABLED_RESPONSE_REQUIRED";

export type StreamFoundation143FProviderReadinessStatus =
  | "provider_not_configured"
  | "provider_gateway_missing"
  | "provider_secret_missing_server_side"
  | "provider_health_not_verified"
  | "future_provider_ready_after_admin_approval";

export interface StreamFoundation143FProviderReadinessGateContract {
  readonly version: typeof STREAM_FOUNDATION_143F_PROVIDER_REALTIME_MODERATION_GATE_CONTRACTS_VERSION;
  readonly gateId: "provider_readiness_gate";
  readonly sourceOnlyContract: true;
  readonly status: StreamFoundation143FProviderReadinessStatus;
  readonly requiredAdminConfigKeysLater: readonly [
    "streamProviderGatewayUrl",
    "streamProviderProjectId",
    "streamProviderServerSideSecretRef"
  ];
  readonly providerSecretsServerSideOnly: true;
  readonly mobileProviderSecretsAllowed: false;
  readonly publicProviderSecretsAllowed: false;
  readonly providerCallAllowedNow: false;
  readonly providerSecretReadAllowedNow: false;
  readonly providerSuccessAllowedNow: false;
  readonly fakeProviderSuccessAllowedNow: false;
  readonly safeBlockedCode: StreamFoundation143FBlockedCode;
}

export type StreamFoundation143FRealtimeHandoffStatus =
  | "realtime_safe_disabled"
  | "presence_channel_not_mounted"
  | "broadcast_channel_not_mounted"
  | "online_count_not_live"
  | "future_realtime_ready_after_provider_repository_admin";

export interface StreamFoundation143FRealtimeHandoffGateContract {
  readonly version: typeof STREAM_FOUNDATION_143F_PROVIDER_REALTIME_MODERATION_GATE_CONTRACTS_VERSION;
  readonly gateId: "realtime_handoff_gate";
  readonly sourceOnlyContract: true;
  readonly status: StreamFoundation143FRealtimeHandoffStatus;
  readonly roomPresencePublishAllowedNow: false;
  readonly streamStateBroadcastAllowedNow: false;
  readonly realtimeSocketOpenAllowedNow: false;
  readonly realtimeBroadcastAllowedNow: false;
  readonly fakeOnlineCountAllowedNow: false;
  readonly safeBlockedCode: StreamFoundation143FBlockedCode;
}

export type StreamFoundation143FModerationGateStatus =
  | "moderation_required"
  | "age_gate_required"
  | "abuse_policy_required"
  | "report_policy_required"
  | "host_restriction_check_required"
  | "admin_review_required";

export interface StreamFoundation143FModerationGateContract {
  readonly version: typeof STREAM_FOUNDATION_143F_PROVIDER_REALTIME_MODERATION_GATE_CONTRACTS_VERSION;
  readonly gateId: "moderation_gate";
  readonly sourceOnlyContract: true;
  readonly status: StreamFoundation143FModerationGateStatus;
  readonly ageGateRequiredLater: true;
  readonly abusePolicyRequiredLater: true;
  readonly reportPolicyRequiredLater: true;
  readonly hostRestrictionCheckRequiredLater: true;
  readonly participantRestrictionCheckRequiredLater: true;
  readonly adminReviewRequiredLater: true;
  readonly moderationBypassAllowedNow: false;
  readonly runtimeAllowLiveNow: false;
  readonly safeBlockedCode: StreamFoundation143FBlockedCode;
}

export interface StreamFoundation143FRuntimeMountPrerequisiteGateContract {
  readonly version: typeof STREAM_FOUNDATION_143F_PROVIDER_REALTIME_MODERATION_GATE_CONTRACTS_VERSION;
  readonly gateId: "runtime_mount_prerequisite_gate";
  readonly sourceOnlyContract: true;
  readonly requiredPrerequisitesLater: readonly [
    "repository_boundary_verified",
    "provider_readiness_verified",
    "realtime_handoff_verified",
    "moderation_gate_verified",
    "event_audit_verified",
    "admin_review_verified",
    "owner_runtime_mount_approval"
  ];
  readonly repositoryBoundaryVerifiedNow: true;
  readonly providerReadinessVerifiedNow: false;
  readonly realtimeHandoffVerifiedNow: false;
  readonly moderationGateVerifiedNow: false;
  readonly eventAuditVerifiedNow: false;
  readonly adminReviewVerifiedNow: false;
  readonly ownerRuntimeMountApprovalNow: false;
  readonly runtimeMountAllowedNow: false;
  readonly routeBehaviorChangeAllowedNow: false;
  readonly liveWriteRoutesMustRemain423Blocked: true;
  readonly safeBlockedCode: StreamFoundation143FBlockedCode;
}

export interface StreamFoundation143FAdminReviewGateContract {
  readonly version: typeof STREAM_FOUNDATION_143F_PROVIDER_REALTIME_MODERATION_GATE_CONTRACTS_VERSION;
  readonly gateId: "admin_review_gate";
  readonly sourceOnlyContract: true;
  readonly adminSnapshotRequiredLater: true;
  readonly adminProviderReadinessVisibleLater: true;
  readonly adminRealtimeReadinessVisibleLater: true;
  readonly adminModerationReadinessVisibleLater: true;
  readonly adminRuntimeMountApprovalVisibleLater: true;
  readonly adminApprovalBypassAllowedNow: false;
  readonly runtimeLaunchApprovalAllowedNow: false;
  readonly safeBlockedCode: StreamFoundation143FBlockedCode;
}

export interface StreamFoundation143FSafeDisabledResponseGateContract {
  readonly version: typeof STREAM_FOUNDATION_143F_PROVIDER_REALTIME_MODERATION_GATE_CONTRACTS_VERSION;
  readonly gateId: "safe_disabled_response_gate";
  readonly sourceOnlyContract: true;
  readonly statusCode: 423;
  readonly ok: false;
  readonly safeMessageKey: "stream.foundation.143f.gate.sourceOnlyBlocked";
  readonly blockedCodes: readonly StreamFoundation143FBlockedCode[];
  readonly emptyBodyAllowedNow: false;
  readonly fakeSuccessAllowedNow: false;
  readonly liveSuccessAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly providerSecretReadAllowedNow: false;
  readonly realtimeSocketOpenAllowedNow: false;
  readonly realtimeBroadcastAllowedNow: false;
  readonly moderationBypassAllowedNow: false;
  readonly runtimeMountAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
}

export interface StreamFoundation143FProviderRealtimeModerationGateContractsSnapshot {
  readonly version: typeof STREAM_FOUNDATION_143F_PROVIDER_REALTIME_MODERATION_GATE_CONTRACTS_VERSION;
  readonly stage: "controlled_provider_realtime_moderation_gate_contracts_scaffold_source_only";
  readonly status: "provider_realtime_moderation_gate_contracts_scaffold_ready";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-143E";
  readonly ownerApprovalAccepted: true;
  readonly ownerApprovalText: string;
  readonly previousPlanningEvidence: {
    readonly providerRealtimeModerationPlanningReady: true;
    readonly gatePlanItems: 6;
    readonly providerCallAllowedNow: false;
    readonly providerSecretReadAllowedNow: false;
    readonly realtimeSocketAllowedNow: false;
    readonly moderationBypassAllowedNow: false;
    readonly runtimeMountAllowedNow: false;
    readonly liveWriteRoutesMustRemain423Blocked: true;
  };
  readonly providerReadinessGate: StreamFoundation143FProviderReadinessGateContract;
  readonly realtimeHandoffGate: StreamFoundation143FRealtimeHandoffGateContract;
  readonly moderationGate: StreamFoundation143FModerationGateContract;
  readonly runtimeMountPrerequisiteGate: StreamFoundation143FRuntimeMountPrerequisiteGateContract;
  readonly adminReviewGate: StreamFoundation143FAdminReviewGateContract;
  readonly safeDisabledResponseGate: StreamFoundation143FSafeDisabledResponseGateContract;
  readonly requiredExactApprovalTextFor143G: string;
  readonly nextApprovalPolicy: {
    readonly exactApprovalRequiredBefore143G: true;
    readonly nextStageIsOpsOnlyCompileAndSafetyVerification: true;
    readonly sourceModificationAllowedFor143G: false;
    readonly appTsWriteAllowedFor143G: false;
    readonly serverTsWriteAllowedFor143G: false;
    readonly streamIndexWriteAllowedFor143G: false;
    readonly prismaSchemaWriteAllowedFor143G: false;
    readonly migrationAllowedFor143G: false;
    readonly backendRestartAllowedFor143G: false;
    readonly runtimePostAllowedFor143G: false;
    readonly runtimeDbReadAllowedFor143G: false;
    readonly runtimeDbWriteAllowedFor143G: false;
    readonly providerCallAllowedFor143G: false;
    readonly providerSecretReadAllowedFor143G: false;
    readonly realtimeSocketOpenAllowedFor143G: false;
    readonly realtimeBroadcastAllowedFor143G: false;
    readonly moderationBypassAllowedFor143G: false;
    readonly walletMutationAllowedFor143G: false;
    readonly paymentAuthorizationAllowedFor143G: false;
    readonly monthlyPayoutAllowedFor143G: false;
    readonly moneyMovementAllowedFor143G: false;
    readonly fakeSuccessAllowedFor143G: false;
  };
  readonly safety: {
    readonly sourceOnly143F: true;
    readonly changedScopeUnderStreamFoundationOnly: true;
    readonly targetWriteBy143F: false;
    readonly appTsChangeBy143F: false;
    readonly serverTsChangeBy143F: false;
    readonly streamIndexChangeBy143F: false;
    readonly prismaSchemaChangeBy143F: false;
    readonly migrationCreatedBy143F: false;
    readonly routeBehaviorChangeBy143F: false;
    readonly backendRestartBy143F: false;
    readonly runtimeHttpBy143F: false;
    readonly runtimePostBy143F: false;
    readonly runtimeDbReadBy143F: false;
    readonly runtimeDbWriteBy143F: false;
    readonly databaseReadBy143F: false;
    readonly databaseWriteBy143F: false;
    readonly providerCallBy143F: false;
    readonly providerSecretReadBy143F: false;
    readonly realtimeSocketOpenBy143F: false;
    readonly realtimeBroadcastBy143F: false;
    readonly moderationBypassBy143F: false;
    readonly walletMutationBy143F: false;
    readonly paymentAuthorizationBy143F: false;
    readonly monthlyPayoutBy143F: false;
    readonly moneyMovementBy143F: false;
    readonly fakeSuccessBy143F: false;
  };
}
