export const STREAM_FOUNDATION_143B_REPOSITORY_BOUNDARY_CONTRACTS_VERSION =
  "BACKEND-STREAM-FOUNDATION-143B" as const;

export type StreamFoundation143BLiveSessionId = string;
export type StreamFoundation143BActorUserId = string;
export type StreamFoundation143BRoomId = string;
export type StreamFoundation143BCorrelationId = string;
export type StreamFoundation143BClientRequestId = string;

export type StreamFoundation143BLiveSessionState =
  | "draft_blocked"
  | "start_requested_later"
  | "live_later"
  | "stop_requested_later"
  | "stopped_later"
  | "suspended_later"
  | "failed_safe_blocked";

export type StreamFoundation143BParticipantRole =
  | "host"
  | "cohost"
  | "viewer"
  | "moderator"
  | "admin";

export type StreamFoundation143BRepositoryOperation =
  | "plan_read_session"
  | "plan_create_session"
  | "plan_update_session"
  | "plan_upsert_participant"
  | "plan_write_heartbeat"
  | "plan_append_event"
  | "plan_append_audit"
  | "plan_read_idempotency"
  | "plan_write_idempotency";

export interface StreamFoundation143BIdempotencyKeyContract {
  readonly version: typeof STREAM_FOUNDATION_143B_REPOSITORY_BOUNDARY_CONTRACTS_VERSION;
  readonly sourceOnlyContract: true;
  readonly clientRequestId: StreamFoundation143BClientRequestId;
  readonly actorUserId: StreamFoundation143BActorUserId;
  readonly routeId: "stream_live_start" | "stream_live_stop" | "stream_live_heartbeat" | "future_runtime_control";
  readonly operation: StreamFoundation143BRepositoryOperation;
  readonly replaySafeBlockedResponseRequiredLater: true;
  readonly runtimeIdempotencyReadAllowedNow: false;
  readonly runtimeIdempotencyWriteAllowedNow: false;
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly fakeReplayAllowedNow: false;
}

export interface StreamFoundation143BTransactionBoundaryContract {
  readonly version: typeof STREAM_FOUNDATION_143B_REPOSITORY_BOUNDARY_CONTRACTS_VERSION;
  readonly sourceOnlyContract: true;
  readonly boundaryId:
    | "start_live_session_transaction_later"
    | "stop_live_session_transaction_later"
    | "heartbeat_transaction_later"
    | "event_audit_append_transaction_later";
  readonly operations: readonly StreamFoundation143BRepositoryOperation[];
  readonly transactionRequiredLater: true;
  readonly rollbackRequiredLater: true;
  readonly idempotencyRequiredLater: true;
  readonly transactionOpenAllowedNow: false;
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowedNow: false;
}

export interface StreamFoundation143BPersistenceSafetyEnvelope {
  readonly version: typeof STREAM_FOUNDATION_143B_REPOSITORY_BOUNDARY_CONTRACTS_VERSION;
  readonly sourceOnlyContract: true;
  readonly status: "repository_contract_source_only_blocked";
  readonly statusCode: 423;
  readonly safeMessageKey: "stream.foundation.143b.repositoryBoundary.sourceOnlyBlocked";
  readonly schemaWriteAllowedNow: false;
  readonly migrationAllowedNow: false;
  readonly repositoryImplementationAllowedNow: false;
  readonly repositoryMountAllowedNow: false;
  readonly transactionOpenAllowedNow: false;
  readonly runtimeDbReadAllowedNow: false;
  readonly runtimeDbWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowedNow: false;
}

export interface StreamFoundation143BLiveSessionRecordDraft {
  readonly sourceOnlyContract: true;
  readonly liveSessionId: StreamFoundation143BLiveSessionId;
  readonly roomId: StreamFoundation143BRoomId;
  readonly hostUserId: StreamFoundation143BActorUserId;
  readonly state: StreamFoundation143BLiveSessionState;
  readonly correlationId: StreamFoundation143BCorrelationId;
  readonly createdAtIsoRequiredLater: true;
  readonly updatedAtIsoRequiredLater: true;
}

export interface StreamFoundation143BParticipantRecordDraft {
  readonly sourceOnlyContract: true;
  readonly liveSessionId: StreamFoundation143BLiveSessionId;
  readonly actorUserId: StreamFoundation143BActorUserId;
  readonly role: StreamFoundation143BParticipantRole;
  readonly joinedAtIsoRequiredLater: true;
  readonly leftAtIsoOptionalLater: true;
  readonly moderationStateRequiredLater: true;
}

export interface StreamFoundation143BHeartbeatRecordDraft {
  readonly sourceOnlyContract: true;
  readonly liveSessionId: StreamFoundation143BLiveSessionId;
  readonly roomId: StreamFoundation143BRoomId;
  readonly actorUserId: StreamFoundation143BActorUserId;
  readonly heartbeatAtIsoRequiredLater: true;
  readonly staleAfterSecondsRequiredLater: true;
}

export interface StreamFoundation143BEventAuditRecordDraft {
  readonly sourceOnlyContract: true;
  readonly eventKind:
    | "live_session_start_requested_later"
    | "live_session_stop_requested_later"
    | "live_heartbeat_received_later"
    | "live_repository_gate_blocked_later"
    | "live_runtime_mount_approved_later";
  readonly liveSessionId: StreamFoundation143BLiveSessionId;
  readonly actorUserId: StreamFoundation143BActorUserId;
  readonly correlationId: StreamFoundation143BCorrelationId;
  readonly immutableAuditRequiredLater: true;
}

export interface StreamFoundation143BLiveSessionRepositoryContract {
  readonly sourceOnlyContract: true;
  readonly repositoryName: "StreamLiveSessionRepository";
  readonly methodsPlannedOnly: readonly [
    "findSessionByIdLater",
    "createSessionLater",
    "transitionSessionStateLater",
    "markSessionStoppedLater"
  ];
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly repositoryMountedNow: false;
}

export interface StreamFoundation143BParticipantRepositoryContract {
  readonly sourceOnlyContract: true;
  readonly repositoryName: "StreamLiveParticipantRepository";
  readonly methodsPlannedOnly: readonly [
    "listParticipantsLater",
    "upsertParticipantLater",
    "markParticipantLeftLater",
    "markParticipantModeratedLater"
  ];
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly repositoryMountedNow: false;
}

export interface StreamFoundation143BHeartbeatRepositoryContract {
  readonly sourceOnlyContract: true;
  readonly repositoryName: "StreamLiveHeartbeatRepository";
  readonly methodsPlannedOnly: readonly [
    "writeHeartbeatLater",
    "readFreshnessLater",
    "markStaleSessionsLater"
  ];
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly repositoryMountedNow: false;
}

export interface StreamFoundation143BEventAuditRepositoryContract {
  readonly sourceOnlyContract: true;
  readonly repositoryName: "StreamLiveEventAuditRepository";
  readonly methodsPlannedOnly: readonly [
    "appendEventLater",
    "appendAuditLater",
    "readAuditTimelineLater"
  ];
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly repositoryMountedNow: false;
}

export interface StreamFoundation143BRepositoryBoundaryContractsSnapshot {
  readonly version: typeof STREAM_FOUNDATION_143B_REPOSITORY_BOUNDARY_CONTRACTS_VERSION;
  readonly stage: "controlled_live_runtime_repository_boundary_contracts_scaffold_source_only";
  readonly status: "repository_boundary_contracts_scaffold_ready";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-143A";
  readonly ownerApprovalAccepted: true;
  readonly ownerApprovalText: string;
  readonly previousPlanningEvidence: {
    readonly repositoryBoundaryPlanningReady: true;
    readonly planItems: 8;
    readonly schemaPatchAllowedNow: false;
    readonly migrationAllowedNow: false;
    readonly runtimeRepositoryImplementationAllowedNow: false;
    readonly databaseRuntimeAccessAllowedNow: false;
    readonly routeBehaviorChangeAllowedNow: false;
  };
  readonly idempotencyContracts: readonly StreamFoundation143BIdempotencyKeyContract[];
  readonly transactionBoundaryContracts: readonly StreamFoundation143BTransactionBoundaryContract[];
  readonly persistenceSafetyEnvelope: StreamFoundation143BPersistenceSafetyEnvelope;
  readonly liveSessionRepositoryContract: StreamFoundation143BLiveSessionRepositoryContract;
  readonly participantRepositoryContract: StreamFoundation143BParticipantRepositoryContract;
  readonly heartbeatRepositoryContract: StreamFoundation143BHeartbeatRepositoryContract;
  readonly eventAuditRepositoryContract: StreamFoundation143BEventAuditRepositoryContract;
  readonly recordDrafts: {
    readonly liveSessionRecordDraft: StreamFoundation143BLiveSessionRecordDraft;
    readonly participantRecordDraft: StreamFoundation143BParticipantRecordDraft;
    readonly heartbeatRecordDraft: StreamFoundation143BHeartbeatRecordDraft;
    readonly eventAuditRecordDraft: StreamFoundation143BEventAuditRecordDraft;
  };
  readonly requiredExactApprovalTextFor143C: string;
  readonly nextApprovalPolicy: {
    readonly exactApprovalRequiredBefore143C: true;
    readonly nextStageIsOpsOnlyCompileAndSafetyVerification: true;
    readonly sourceModificationAllowedFor143C: false;
    readonly appTsWriteAllowedFor143C: false;
    readonly serverTsWriteAllowedFor143C: false;
    readonly streamIndexWriteAllowedFor143C: false;
    readonly prismaSchemaWriteAllowedFor143C: false;
    readonly migrationAllowedFor143C: false;
    readonly backendRestartAllowedFor143C: false;
    readonly runtimePostAllowedFor143C: false;
    readonly runtimeDbReadAllowedFor143C: false;
    readonly runtimeDbWriteAllowedFor143C: false;
    readonly providerCallAllowedFor143C: false;
    readonly walletMutationAllowedFor143C: false;
    readonly paymentAuthorizationAllowedFor143C: false;
    readonly monthlyPayoutAllowedFor143C: false;
    readonly moneyMovementAllowedFor143C: false;
    readonly fakeSuccessAllowedFor143C: false;
  };
  readonly safety: {
    readonly sourceOnly143B: true;
    readonly changedScopeUnderStreamFoundationOnly: true;
    readonly targetWriteBy143B: false;
    readonly appTsChangeBy143B: false;
    readonly serverTsChangeBy143B: false;
    readonly streamIndexChangeBy143B: false;
    readonly prismaSchemaChangeBy143B: false;
    readonly migrationCreatedBy143B: false;
    readonly routeBehaviorChangeBy143B: false;
    readonly backendRestartBy143B: false;
    readonly runtimeHttpBy143B: false;
    readonly runtimePostBy143B: false;
    readonly databaseReadBy143B: false;
    readonly databaseWriteBy143B: false;
    readonly providerCallBy143B: false;
    readonly providerSecretReadBy143B: false;
    readonly walletMutationBy143B: false;
    readonly paymentAuthorizationBy143B: false;
    readonly monthlyPayoutBy143B: false;
    readonly moneyMovementBy143B: false;
    readonly fakeSuccessBy143B: false;
  };
}
