import type {
  StreamFoundation141XLiveWriteCommandId,
  StreamFoundation141XLiveWriteEvaluationDecision,
} from "../live-write-runtime-gate-evaluator";

export const STREAM_FOUNDATION_141Y_LIVE_WRITE_SOURCE_ONLY_ADAPTER_VERSION =
  "BACKEND-STREAM-FOUNDATION-141Y" as const;

export type StreamFoundation141YLiveWriteRouteId =
  | "stream_live_start"
  | "stream_live_stop"
  | "stream_live_heartbeat";

export interface StreamFoundation141YLiveWriteAdapterInput {
  readonly routeId: StreamFoundation141YLiveWriteRouteId;
  readonly commandId: StreamFoundation141XLiveWriteCommandId;
  readonly rawBody?: unknown;
  readonly actorUserId?: string;
  readonly roomId?: string;
  readonly deviceSessionId?: string;
  readonly clientRequestId?: string;
  readonly locale?: string;
}

export interface StreamFoundation141YLiveWriteAdapterDecision {
  readonly version: typeof STREAM_FOUNDATION_141Y_LIVE_WRITE_SOURCE_ONLY_ADAPTER_VERSION;
  readonly stage: "controlled_source_only_live_write_adapter_draft";
  readonly sourceOnly: true;
  readonly ok: false;
  readonly statusCode: 423;
  readonly routeId: StreamFoundation141YLiveWriteRouteId;
  readonly commandId: StreamFoundation141XLiveWriteCommandId;
  readonly adapterBlockedCode: "STREAM_LIVE_WRITE_ADAPTER_SOURCE_ONLY_BLOCKED";
  readonly safeMessageKey: "stream.foundation.141y.liveWriteAdapter.sourceOnlyBlocked";
  readonly normalizedInput: {
    readonly actorUserId?: string;
    readonly roomId?: string;
    readonly deviceSessionId?: string;
    readonly clientRequestId?: string;
    readonly locale?: string;
  };
  readonly gateDecision: StreamFoundation141XLiveWriteEvaluationDecision;
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
  readonly nextRequiredStage: "BACKEND-STREAM-FOUNDATION-141Z";
}
