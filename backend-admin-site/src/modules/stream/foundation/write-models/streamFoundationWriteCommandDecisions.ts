import type {
  StreamFoundationAction,
  StreamFoundationGateId,
  StreamFoundationSafeCode,
  StreamFoundationSeverity,
  StreamFoundationSurface,
} from "../core";
import type {
  StreamFoundationWriteCommandContract,
  StreamFoundationWriteCommandId,
  StreamFoundationWriteCommandStage,
  StreamFoundationWriteCommandStatus,
} from "./streamFoundationWriteCommandContracts";
import {
  STREAM_FOUNDATION_WRITE_COMMAND_CONTRACTS,
  getStreamFoundationWriteCommandContract,
  getStreamFoundationWriteCommandContractForSurfaceAction,
} from "./streamFoundationWriteCommandContracts";

export type StreamFoundationWriteCommandRequest = Readonly<{
  requestId: string;
  commandId?: StreamFoundationWriteCommandId;
  surface: StreamFoundationSurface;
  action: StreamFoundationAction;
  userId?: string;
  sessionId?: string;
  idempotencyKey?: string;
  payloadShapeOnly?: Readonly<Record<string, string | number | boolean | null>>;
}>;

export type StreamFoundationWriteCommandDecision = Readonly<{
  stage: StreamFoundationWriteCommandStage;
  requestId: string;
  commandId: StreamFoundationWriteCommandId;
  surface: StreamFoundationSurface;
  action: StreamFoundationAction;
  ok: false;
  status: StreamFoundationWriteCommandStatus;
  safeCode: StreamFoundationSafeCode;
  severity: StreamFoundationSeverity;
  safeMessageKey: string;
  missingGateIds: readonly StreamFoundationGateId[];
  idempotencyKeyRequiredLater: boolean;
  userSessionRequiredLater: true;
  adminGateRequiredLater: boolean;
  providerGateRequiredLater: boolean;
  walletGiftLastStageRequiredLater: boolean;
  acceptedCommandNow: false;
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  mediaStorageWriteAllowedNow: false;
  realtimePublishAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeSuccessAllowed: false;
  secretMaterialAllowedInDecision: false;
}>;

function firstSurface(contract: StreamFoundationWriteCommandContract): StreamFoundationSurface {
  return contract.targetSurfaces[0] ?? "stream_entry";
}

function decisionFromContract(
  contract: StreamFoundationWriteCommandContract,
  requestId: string,
  surface: StreamFoundationSurface,
): StreamFoundationWriteCommandDecision {
  return {
    stage: "BACKEND_STREAM_FOUNDATION_136I_WRITE_MODELS_STAGING",
    requestId,
    commandId: contract.commandId,
    surface,
    action: contract.action,
    ok: false,
    status: contract.status,
    safeCode: contract.safeCode,
    severity: contract.severity,
    safeMessageKey: contract.safeMessageKey,
    missingGateIds: contract.requiredGates,
    idempotencyKeyRequiredLater: contract.idempotencyKeyRequiredLater,
    userSessionRequiredLater: contract.userSessionRequiredLater,
    adminGateRequiredLater: contract.adminGateRequiredLater,
    providerGateRequiredLater: contract.providerGateRequiredLater,
    walletGiftLastStageRequiredLater: contract.walletGiftLastStageRequiredLater,
    acceptedCommandNow: false,
    routeMountAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    mediaStorageWriteAllowedNow: false,
    realtimePublishAllowedNow: false,
    walletRuntimeMutationAllowedNow: false,
    messengerRuntimeMutationAllowedNow: false,
    giftsPaymentsRuntimeMutationAllowedNow: false,
    fakeSuccessAllowed: false,
    secretMaterialAllowedInDecision: false,
  };
}

export function createStreamFoundationWriteCommandDecision(request: StreamFoundationWriteCommandRequest): StreamFoundationWriteCommandDecision {
  const contract = request.commandId
    ? getStreamFoundationWriteCommandContract(request.commandId)
    : getStreamFoundationWriteCommandContractForSurfaceAction(request.surface, request.action);

  if (contract) {
    return decisionFromContract(contract, request.requestId, request.surface);
  }

  const fallback = STREAM_FOUNDATION_WRITE_COMMAND_CONTRACTS[0];
  return {
    ...decisionFromContract(fallback, request.requestId, request.surface),
    action: request.action,
    safeCode: "STREAM_UNKNOWN_ACTION_BLOCKED",
    severity: "blocked",
    safeMessageKey: "stream.foundation.write.unknown_command.blocked",
    status: "blocked_backend_common_missing",
    missingGateIds: ["stream_kernel_gateway_gate"],
  };
}

export type StreamFoundationWriteCommandDecisionIndex = Readonly<{
  stage: StreamFoundationWriteCommandStage;
  totalCommands: number;
  acceptedCommandReadyNow: 0;
  backendBlockedCommands: number;
  adminBlockedCommands: number;
  providerBlockedCommands: number;
  lastStageLockedCommands: number;
  routeMountReadyNow: 0;
  runtimeExecutionReadyNow: 0;
  databaseWriteReadyNow: 0;
  providerCallReadyNow: 0;
  mediaStorageWriteReadyNow: 0;
  realtimePublishReadyNow: 0;
  walletRuntimeMutationReadyNow: 0;
  fakeSuccessReadyNow: 0;
  sampleDecisions: readonly StreamFoundationWriteCommandDecision[];
}>;

export function getStreamFoundationWriteCommandDecisionIndex(): StreamFoundationWriteCommandDecisionIndex {
  const sampleDecisions = STREAM_FOUNDATION_WRITE_COMMAND_CONTRACTS.map((contract, index) =>
    decisionFromContract(contract, `stream-136i-write-command-${index + 1}`, firstSurface(contract)),
  );

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136I_WRITE_MODELS_STAGING",
    totalCommands: STREAM_FOUNDATION_WRITE_COMMAND_CONTRACTS.length,
    acceptedCommandReadyNow: 0,
    backendBlockedCommands: sampleDecisions.filter((decision) => decision.status === "blocked_backend_common_missing").length,
    adminBlockedCommands: sampleDecisions.filter((decision) => decision.status === "blocked_admin_gate_missing").length,
    providerBlockedCommands: sampleDecisions.filter((decision) => decision.status === "blocked_provider_not_configured").length,
    lastStageLockedCommands: sampleDecisions.filter((decision) => decision.status === "locked_wallet_gift_last_stage").length,
    routeMountReadyNow: 0,
    runtimeExecutionReadyNow: 0,
    databaseWriteReadyNow: 0,
    providerCallReadyNow: 0,
    mediaStorageWriteReadyNow: 0,
    realtimePublishReadyNow: 0,
    walletRuntimeMutationReadyNow: 0,
    fakeSuccessReadyNow: 0,
    sampleDecisions,
  };
}
