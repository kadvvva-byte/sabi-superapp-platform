import {
  handleStreamFoundationLiveHeartbeatSourceOnlyDraft,
  handleStreamFoundationLiveStartSourceOnlyDraft,
  handleStreamFoundationLiveStopSourceOnlyDraft,
} from "./streamFoundationLiveWriteHandlerSourceOnlyDraftHandlers";
import {
  STREAM_FOUNDATION_140Y_LIVE_WRITE_HANDLER_DRAFT_VERSION,
  type StreamFoundation140YLiveWriteHandlerDraftSnapshot,
} from "./streamFoundationLiveWriteHandlerSourceOnlyDraftContracts";

export function getStreamFoundationLiveWriteHandlerSourceOnlyDraftSnapshot(): StreamFoundation140YLiveWriteHandlerDraftSnapshot {
  const sampleBase = {
    actorUserId: "redacted_source_only_actor",
    roomId: "redacted_source_only_room",
    clientRequestId: "source_only_client_request",
    deviceSessionId: "source_only_device_session",
    locale: "system_default",
  } as const;

  return {
    version: STREAM_FOUNDATION_140Y_LIVE_WRITE_HANDLER_DRAFT_VERSION,
    stage: "live_write_handler_source_only_implementation_draft",
    status: "handlers_return_blocked_envelopes_until_runtime_approval",
    previousStage: "BACKEND-STREAM-FOUNDATION-140X",
    handlersReady: true,
    routeMountNow: false,
    runtimePostNow: false,
    handlerCount: 3,
    sampleEnvelopes: [
      handleStreamFoundationLiveStartSourceOnlyDraft(sampleBase),
      handleStreamFoundationLiveStopSourceOnlyDraft(sampleBase),
      handleStreamFoundationLiveHeartbeatSourceOnlyDraft(sampleBase),
    ],
    safety: {
      sourceOnly: true,
      appTsChange: false,
      serverTsChange: false,
      streamIndexChange: false,
      routeMountNow: false,
      runtimeHttpBy140Y: false,
      runtimePostBy140Y: false,
      databaseWrite: false,
      providerCall: false,
      walletMutation: false,
      paymentAuthorization: false,
      monthlyPayout: false,
      moneyMovement: false,
      fakeSuccess: false,
    },
  };
}
