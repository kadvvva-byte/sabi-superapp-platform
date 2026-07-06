export const STREAM_FOUNDATION_141Q_REPOSITORY_GATE_VERSION = "BACKEND-STREAM-FOUNDATION-141Q" as const;

export type StreamFoundation141QRepositoryContractId =
  | "live_room_lifecycle_repository"
  | "live_session_state_repository"
  | "live_heartbeat_repository"
  | "live_event_audit_repository"
  | "moderation_evidence_repository"
  | "streamer_runtime_status_repository"
  | "repository_transaction_boundary";

export type StreamFoundation141QRepositoryStatus =
  | "contract_planned_not_bound"
  | "runtime_mount_blocked"
  | "schema_review_required"
  | "owner_approval_required";

export interface StreamFoundation141QRepositoryContract {
  readonly id: StreamFoundation141QRepositoryContractId;
  readonly status: StreamFoundation141QRepositoryStatus;
  readonly requiredBeforeRuntimeMount: true;
  readonly plannedReadContract: boolean;
  readonly plannedWriteContract: boolean;
  readonly schemaMigrationAllowedNow: false;
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly transactionAllowedNow: false;
  readonly runtimeSuccessAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly description: string;
}

export interface StreamFoundation141QRepositoryGateSnapshot {
  readonly version: typeof STREAM_FOUNDATION_141Q_REPOSITORY_GATE_VERSION;
  readonly stage: "repository_gate_source_only_contract_planning";
  readonly status: "repository_contract_planned_routes_remain_blocked";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-141P";
  readonly repositoryContracts: readonly StreamFoundation141QRepositoryContract[];
  readonly repositoryPolicy: {
    readonly repositoryRequiredBeforeRuntimeMount: true;
    readonly lifecyclePersistenceRequiredBeforeRuntimeSuccess: true;
    readonly heartbeatPersistenceRequiredBeforeRuntimeSuccess: true;
    readonly eventAuditPersistenceRequiredBeforeRuntimeSuccess: true;
    readonly moderationEvidenceStorageRequiresReview: true;
    readonly schemaMigrationAllowedNow: false;
    readonly prismaRuntimeAllowedNow: false;
    readonly routesStayBlockedNow: true;
    readonly expectedCurrentStatusCode: 423;
  };
  readonly totals: {
    readonly repositoryContracts: 7;
    readonly readyForRuntimeMountNow: 0;
    readonly schemaMigrationAllowedNow: 0;
    readonly databaseReadAllowedNow: 0;
    readonly databaseWriteAllowedNow: 0;
    readonly transactionAllowedNow: 0;
    readonly runtimeSuccessAllowedNow: 0;
    readonly providerCallAllowedNow: 0;
    readonly walletMutationAllowedNow: 0;
    readonly moneyMovementAllowedNow: 0;
    readonly fakeSuccessAllowedNow: 0;
  };
  readonly safety: {
    readonly sourceOnly141Q: true;
    readonly appTsChangeBy141Q: false;
    readonly serverTsChangeBy141Q: false;
    readonly streamIndexChangeBy141Q: false;
    readonly schemaMigrationBy141Q: false;
    readonly backendRestartBy141Q: false;
    readonly runtimeHttpBy141Q: false;
    readonly runtimePostBy141Q: false;
    readonly databaseReadBy141Q: false;
    readonly databaseWriteBy141Q: false;
    readonly providerCallBy141Q: false;
    readonly walletMutationBy141Q: false;
    readonly paymentAuthorizationBy141Q: false;
    readonly monthlyPayoutBy141Q: false;
    readonly moneyMovementBy141Q: false;
    readonly fakeSuccessBy141Q: false;
  };
}
