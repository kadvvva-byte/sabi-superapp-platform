import {
  createStreamFoundationLiveHeartbeatSourceOnlyAdapterDecision,
  createStreamFoundationLiveStartSourceOnlyAdapterDecision,
  createStreamFoundationLiveStopSourceOnlyAdapterDecision,
} from "../live-write-source-only-adapter-draft";
import {
  STREAM_FOUNDATION_142C_LIVE_WRITE_RUNTIME_HANDLER_DRAFT_VERSION,
  type StreamFoundation142CLiveWriteRuntimeHandlerDecision,
  type StreamFoundation142CLiveWriteRuntimeHandlerInput,
} from "./streamFoundationLiveWriteRuntimeHandlerDraftContracts";

function createBlockedRuntimeHandlerDecision(
  input: StreamFoundation142CLiveWriteRuntimeHandlerInput,
): StreamFoundation142CLiveWriteRuntimeHandlerDecision {
  const adapterDecision =
    input.routeId === "stream_live_start"
      ? createStreamFoundationLiveStartSourceOnlyAdapterDecision(input.rawBody)
      : input.routeId === "stream_live_stop"
        ? createStreamFoundationLiveStopSourceOnlyAdapterDecision(input.rawBody)
        : createStreamFoundationLiveHeartbeatSourceOnlyAdapterDecision(input.rawBody);

  return {
    version: STREAM_FOUNDATION_142C_LIVE_WRITE_RUNTIME_HANDLER_DRAFT_VERSION,
    stage: "controlled_source_only_runtime_handler_draft",
    sourceOnly: true,
    handlerId: input.handlerId,
    handlerStatus: "source_only_blocked",
    routeId: input.routeId,
    ok: false,
    statusCode: 423,
    runtimeHandlerBlockedCode: "STREAM_RUNTIME_HANDLER_DRAFT_SOURCE_ONLY_BLOCKED",
    safeMessageKey: "stream.foundation.142c.runtimeHandlerDraft.sourceOnlyBlocked",
    adapterDecision,
    runtimeMountedNow: false,
    routeBindingChangedNow: false,
    runtimeSuccessAllowedNow: false,
    fakeSuccessAllowedNow: false,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    providerSecretReadAllowedNow: false,
    walletMutationAllowedNow: false,
    paymentAuthorizationAllowedNow: false,
    monthlyPayoutAllowedNow: false,
    moneyMovementAllowedNow: false,
    nextRequiredStage: "BACKEND-STREAM-FOUNDATION-142D",
  };
}

export function createStreamFoundationLiveStartRuntimeHandlerDraftDecision(
  rawBody?: unknown,
): StreamFoundation142CLiveWriteRuntimeHandlerDecision {
  return createBlockedRuntimeHandlerDecision({
    handlerId: "live_start_runtime_handler_draft",
    routeId: "stream_live_start",
    rawBody,
  });
}

export function createStreamFoundationLiveStopRuntimeHandlerDraftDecision(
  rawBody?: unknown,
): StreamFoundation142CLiveWriteRuntimeHandlerDecision {
  return createBlockedRuntimeHandlerDecision({
    handlerId: "live_stop_runtime_handler_draft",
    routeId: "stream_live_stop",
    rawBody,
  });
}

export function createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision(
  rawBody?: unknown,
): StreamFoundation142CLiveWriteRuntimeHandlerDecision {
  return createBlockedRuntimeHandlerDecision({
    handlerId: "live_heartbeat_runtime_handler_draft",
    routeId: "stream_live_heartbeat",
    rawBody,
  });
}

export function createStreamFoundationLiveWriteRuntimeHandlerDraftDecision(
  input: StreamFoundation142CLiveWriteRuntimeHandlerInput,
): StreamFoundation142CLiveWriteRuntimeHandlerDecision {
  return createBlockedRuntimeHandlerDecision(input);
}
