export const STREAM_FOUNDATION_140Y_LIVE_WRITE_HANDLER_DRAFT_VERSION = "BACKEND-STREAM-FOUNDATION-140Y" as const;

export type StreamFoundation140YLiveWriteCommandId =
  | "stream_start_live_session_command"
  | "stream_stop_live_session_command"
  | "stream_live_heartbeat_command";

export type StreamFoundation140YLiveWriteRouteId =
  | "stream_live_start"
  | "stream_live_stop"
  | "stream_live_heartbeat";

export type StreamFoundation140YBlockedCode =
  | "STREAM_RUNTIME_WRITE_BLOCKED_SOURCE_ONLY"
  | "STREAM_OWNER_RUNTIME_APPROVAL_REQUIRED"
  | "STREAM_PROVIDER_NOT_CONFIGURED"
  | "STREAM_REPOSITORY_NOT_CONFIGURED"
  | "STREAM_IDENTITY_SESSION_REQUIRED";

export interface StreamFoundation140YLiveWriteDraftRequest {
  readonly routeId: StreamFoundation140YLiveWriteRouteId;
  readonly commandId: StreamFoundation140YLiveWriteCommandId;
  readonly actorUserId?: string;
  readonly roomId?: string;
  readonly clientRequestId?: string;
  readonly deviceSessionId?: string;
  readonly locale?: string;
  readonly body?: Readonly<Record<string, unknown>>;
}

export interface StreamFoundation140YLiveWriteBlockedEnvelope {
  readonly version: typeof STREAM_FOUNDATION_140Y_LIVE_WRITE_HANDLER_DRAFT_VERSION;
  readonly ok: false;
  readonly sourceOnly: true;
  readonly runtimeMountedNow: false;
  readonly runtimePostAllowedNow: false;
  readonly routeId: StreamFoundation140YLiveWriteRouteId;
  readonly commandId: StreamFoundation140YLiveWriteCommandId;
  readonly statusCode: 423;
  readonly blockedCode: StreamFoundation140YBlockedCode;
  readonly safeMessageKey: string;
  readonly fakeSuccessAllowed: false;
  readonly databaseWritePerformed: 0;
  readonly providerCallPerformed: 0;
  readonly walletMutationPerformed: 0;
  readonly paymentAuthorizationPerformed: 0;
  readonly monthlyPayoutPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly auditPlan: readonly string[];
  readonly requiredBeforeRuntimeMount: readonly string[];
}

export interface StreamFoundation140YLiveWriteHandlerDraftSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140Y_LIVE_WRITE_HANDLER_DRAFT_VERSION;
  readonly stage: "live_write_handler_source_only_implementation_draft";
  readonly status: "handlers_return_blocked_envelopes_until_runtime_approval";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-140X";
  readonly handlersReady: true;
  readonly routeMountNow: false;
  readonly runtimePostNow: false;
  readonly handlerCount: 3;
  readonly sampleEnvelopes: readonly StreamFoundation140YLiveWriteBlockedEnvelope[];
  readonly safety: {
    readonly sourceOnly: true;
    readonly appTsChange: false;
    readonly serverTsChange: false;
    readonly streamIndexChange: false;
    readonly routeMountNow: false;
    readonly runtimeHttpBy140Y: false;
    readonly runtimePostBy140Y: false;
    readonly databaseWrite: false;
    readonly providerCall: false;
    readonly walletMutation: false;
    readonly paymentAuthorization: false;
    readonly monthlyPayout: false;
    readonly moneyMovement: false;
    readonly fakeSuccess: false;
  };
}
