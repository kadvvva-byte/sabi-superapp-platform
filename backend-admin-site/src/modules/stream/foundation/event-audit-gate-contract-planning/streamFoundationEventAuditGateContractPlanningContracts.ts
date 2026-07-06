export const STREAM_FOUNDATION_141S_EVENT_AUDIT_GATE_VERSION = "BACKEND-STREAM-FOUNDATION-141S" as const;

export type StreamFoundation141SAuditEventId =
  | "stream_live_session_start_requested"
  | "stream_live_session_start_source_only_blocked"
  | "stream_live_session_stop_requested"
  | "stream_live_session_stop_source_only_blocked"
  | "stream_live_heartbeat_received"
  | "stream_live_heartbeat_source_only_blocked"
  | "stream_runtime_mount_prerequisite_failed"
  | "stream_owner_runtime_mount_approval_required"
  | "stream_moderation_policy_gate_required"
  | "stream_provider_readiness_gate_required";

export type StreamFoundation141SAuditStatus =
  | "contract_planned_not_bound"
  | "append_blocked_now"
  | "schema_review_required"
  | "owner_approval_required";

export interface StreamFoundation141SAuditEventContract {
  readonly id: StreamFoundation141SAuditEventId;
  readonly status: StreamFoundation141SAuditStatus;
  readonly requiredBeforeRuntimeMount: true;
  readonly appendAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly piiAllowedInAuditNow: false;
  readonly rawSecretAllowedInAuditNow: false;
  readonly description: string;
}

export interface StreamFoundation141SEventAuditGateSnapshot {
  readonly version: typeof STREAM_FOUNDATION_141S_EVENT_AUDIT_GATE_VERSION;
  readonly stage: "event_audit_gate_source_only_contract_planning";
  readonly status: "event_audit_contract_planned_routes_remain_blocked";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-141R";
  readonly auditEvents: readonly StreamFoundation141SAuditEventContract[];
  readonly auditPolicy: {
    readonly eventAuditRequiredBeforeRuntimeMount: true;
    readonly immutableAppendRequiredBeforeRuntimeSuccess: true;
    readonly actorUserIdReferenceAllowedLater: true;
    readonly rawPiiAllowedNow: false;
    readonly rawSecretAllowedNow: false;
    readonly rawProviderPayloadAllowedNow: false;
    readonly auditAppendAllowedNow: false;
    readonly routesStayBlockedNow: true;
    readonly expectedCurrentStatusCode: 423;
  };
  readonly totals: {
    readonly auditEvents: 10;
    readonly readyForRuntimeMountNow: 0;
    readonly auditAppendAllowedNow: 0;
    readonly databaseWriteAllowedNow: 0;
    readonly providerCallAllowedNow: 0;
    readonly walletMutationAllowedNow: 0;
    readonly moneyMovementAllowedNow: 0;
    readonly fakeSuccessAllowedNow: 0;
  };
  readonly safety: {
    readonly sourceOnly141S: true;
    readonly appTsChangeBy141S: false;
    readonly serverTsChangeBy141S: false;
    readonly streamIndexChangeBy141S: false;
    readonly schemaMigrationBy141S: false;
    readonly backendRestartBy141S: false;
    readonly runtimeHttpBy141S: false;
    readonly runtimePostBy141S: false;
    readonly databaseReadBy141S: false;
    readonly databaseWriteBy141S: false;
    readonly providerCallBy141S: false;
    readonly providerSecretReadBy141S: false;
    readonly walletMutationBy141S: false;
    readonly paymentAuthorizationBy141S: false;
    readonly monthlyPayoutBy141S: false;
    readonly moneyMovementBy141S: false;
    readonly fakeSuccessBy141S: false;
  };
}
