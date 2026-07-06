import {
  createStreamFoundation141XDefaultGateInputs,
  evaluateStreamFoundationLiveWriteRuntimeGatesSourceOnly,
} from "../live-write-runtime-gate-evaluator";
import {
  STREAM_FOUNDATION_141Y_LIVE_WRITE_SOURCE_ONLY_ADAPTER_VERSION,
  type StreamFoundation141YLiveWriteAdapterDecision,
  type StreamFoundation141YLiveWriteAdapterInput,
} from "./streamFoundationLiveWriteSourceOnlyAdapterDraftContracts";

function normalizeOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function readBodyObject(rawBody: unknown): Record<string, unknown> {
  if (!rawBody || typeof rawBody !== "object" || Array.isArray(rawBody)) {
    return {};
  }

  return rawBody as Record<string, unknown>;
}

export function createStreamFoundationLiveWriteSourceOnlyAdapterDecision(
  input: StreamFoundation141YLiveWriteAdapterInput,
): StreamFoundation141YLiveWriteAdapterDecision {
  const body = readBodyObject(input.rawBody);

  const normalizedInput = {
    actorUserId: normalizeOptionalString(input.actorUserId ?? body.actorUserId),
    roomId: normalizeOptionalString(input.roomId ?? body.roomId),
    deviceSessionId: normalizeOptionalString(input.deviceSessionId ?? body.deviceSessionId),
    clientRequestId: normalizeOptionalString(input.clientRequestId ?? body.clientRequestId),
    locale: normalizeOptionalString(input.locale ?? body.locale),
  } as const;

  const gateDecision = evaluateStreamFoundationLiveWriteRuntimeGatesSourceOnly({
    commandId: input.commandId,
    routeId: input.routeId,
    actorUserId: normalizedInput.actorUserId,
    roomId: normalizedInput.roomId,
    deviceSessionId: normalizedInput.deviceSessionId,
    clientRequestId: normalizedInput.clientRequestId,
    locale: normalizedInput.locale,
    gates: createStreamFoundation141XDefaultGateInputs(),
  });

  return {
    version: STREAM_FOUNDATION_141Y_LIVE_WRITE_SOURCE_ONLY_ADAPTER_VERSION,
    stage: "controlled_source_only_live_write_adapter_draft",
    sourceOnly: true,
    ok: false,
    statusCode: 423,
    routeId: input.routeId,
    commandId: input.commandId,
    adapterBlockedCode: "STREAM_LIVE_WRITE_ADAPTER_SOURCE_ONLY_BLOCKED",
    safeMessageKey: "stream.foundation.141y.liveWriteAdapter.sourceOnlyBlocked",
    normalizedInput,
    gateDecision,
    runtimeMountAllowedNow: false,
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
    nextRequiredStage: "BACKEND-STREAM-FOUNDATION-141Z",
  };
}

export function createStreamFoundationLiveStartSourceOnlyAdapterDecision(
  rawBody?: unknown,
): StreamFoundation141YLiveWriteAdapterDecision {
  return createStreamFoundationLiveWriteSourceOnlyAdapterDecision({
    routeId: "stream_live_start",
    commandId: "stream_start_live_session_command",
    rawBody,
  });
}

export function createStreamFoundationLiveStopSourceOnlyAdapterDecision(
  rawBody?: unknown,
): StreamFoundation141YLiveWriteAdapterDecision {
  return createStreamFoundationLiveWriteSourceOnlyAdapterDecision({
    routeId: "stream_live_stop",
    commandId: "stream_stop_live_session_command",
    rawBody,
  });
}

export function createStreamFoundationLiveHeartbeatSourceOnlyAdapterDecision(
  rawBody?: unknown,
): StreamFoundation141YLiveWriteAdapterDecision {
  return createStreamFoundationLiveWriteSourceOnlyAdapterDecision({
    routeId: "stream_live_heartbeat",
    commandId: "stream_live_heartbeat_command",
    rawBody,
  });
}
