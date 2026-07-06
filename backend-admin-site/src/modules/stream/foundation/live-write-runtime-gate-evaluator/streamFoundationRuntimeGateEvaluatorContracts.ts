export const STREAM_FOUNDATION_141X_RUNTIME_GATE_EVALUATOR_VERSION =
  "BACKEND-STREAM-FOUNDATION-141X" as const;

export type StreamFoundation141XLiveWriteCommandId =
  | "stream_start_live_session_command"
  | "stream_stop_live_session_command"
  | "stream_live_heartbeat_command";

export type StreamFoundation141XGateId =
  | "identity_session_gate"
  | "rate_limit_gate"
  | "moderation_policy_gate"
  | "repository_gate"
  | "realtime_provider_readiness_gate"
  | "event_audit_gate"
  | "owner_runtime_mount_approval_gate";

export type StreamFoundation141XGateStatus =
  | "passed_later"
  | "blocked_now"
  | "not_configured"
  | "approval_required"
  | "not_bound";

export interface StreamFoundation141XGateInput {
  readonly gateId: StreamFoundation141XGateId;
  readonly status: StreamFoundation141XGateStatus;
  readonly safeMessageKey: string;
  readonly evidenceKey: string;
}

export interface StreamFoundation141XLiveWriteEvaluationInput {
  readonly commandId: StreamFoundation141XLiveWriteCommandId;
  readonly routeId: "stream_live_start" | "stream_live_stop" | "stream_live_heartbeat";
  readonly actorUserId?: string;
  readonly roomId?: string;
  readonly deviceSessionId?: string;
  readonly clientRequestId?: string;
  readonly locale?: string;
  readonly gates: readonly StreamFoundation141XGateInput[];
}

export interface StreamFoundation141XLiveWriteEvaluationDecision {
  readonly version: typeof STREAM_FOUNDATION_141X_RUNTIME_GATE_EVALUATOR_VERSION;
  readonly sourceOnly: true;
  readonly routeId: StreamFoundation141XLiveWriteEvaluationInput["routeId"];
  readonly commandId: StreamFoundation141XLiveWriteCommandId;
  readonly ok: false;
  readonly statusCode: 423;
  readonly blockedCode: "STREAM_RUNTIME_GATE_EVALUATOR_SOURCE_ONLY_BLOCKED";
  readonly safeMessageKey: "stream.foundation.141x.runtimeGateEvaluator.sourceOnlyBlocked";
  readonly runtimeMountAllowedNow: false;
  readonly runtimeSuccessAllowedNow: false;
  readonly fakeSuccessAllowedNow: false;
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly providerSecretReadAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly gatesChecked: number;
  readonly gateStatuses: readonly StreamFoundation141XGateInput[];
  readonly missingGateIds: readonly StreamFoundation141XGateId[];
  readonly blockingGateIds: readonly StreamFoundation141XGateId[];
  readonly nextRequiredStage: "BACKEND-STREAM-FOUNDATION-141Y";
}
