import type {
  StreamFoundation141YLiveWriteAdapterDecision,
  StreamFoundation141YLiveWriteRouteId,
} from "../live-write-source-only-adapter-draft";

export const STREAM_FOUNDATION_142C_LIVE_WRITE_RUNTIME_HANDLER_DRAFT_VERSION =
  "BACKEND-STREAM-FOUNDATION-142C" as const;

export type StreamFoundation142CLiveWriteRuntimeHandlerId =
  | "live_start_runtime_handler_draft"
  | "live_stop_runtime_handler_draft"
  | "live_heartbeat_runtime_handler_draft";

export type StreamFoundation142CLiveWriteRuntimeHandlerStatus =
  | "source_only_blocked"
  | "runtime_mount_not_bound"
  | "future_approval_required";

export interface StreamFoundation142CLiveWriteRuntimeHandlerInput {
  readonly handlerId: StreamFoundation142CLiveWriteRuntimeHandlerId;
  readonly routeId: StreamFoundation141YLiveWriteRouteId;
  readonly rawBody?: unknown;
  readonly actorUserId?: string;
  readonly roomId?: string;
  readonly deviceSessionId?: string;
  readonly clientRequestId?: string;
  readonly locale?: string;
}

export interface StreamFoundation142CLiveWriteRuntimeHandlerDecision {
  readonly version: typeof STREAM_FOUNDATION_142C_LIVE_WRITE_RUNTIME_HANDLER_DRAFT_VERSION;
  readonly stage: "controlled_source_only_runtime_handler_draft";
  readonly sourceOnly: true;
  readonly handlerId: StreamFoundation142CLiveWriteRuntimeHandlerId;
  readonly handlerStatus: StreamFoundation142CLiveWriteRuntimeHandlerStatus;
  readonly routeId: StreamFoundation141YLiveWriteRouteId;
  readonly ok: false;
  readonly statusCode: 423;
  readonly runtimeHandlerBlockedCode: "STREAM_RUNTIME_HANDLER_DRAFT_SOURCE_ONLY_BLOCKED";
  readonly safeMessageKey: "stream.foundation.142c.runtimeHandlerDraft.sourceOnlyBlocked";
  readonly adapterDecision: StreamFoundation141YLiveWriteAdapterDecision;
  readonly runtimeMountedNow: false;
  readonly routeBindingChangedNow: false;
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
  readonly nextRequiredStage: "BACKEND-STREAM-FOUNDATION-142D";
}
