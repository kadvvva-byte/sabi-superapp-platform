import type {
  StreamFoundationAction,
  StreamFoundationGateId,
  StreamFoundationSafeCode,
  StreamFoundationSeverity,
  StreamFoundationSurface,
} from "../core";
import type {
  StreamFoundationDomainEventContract,
  StreamFoundationDomainEventId,
  StreamFoundationDomainEventStage,
  StreamFoundationDomainEventStatus,
} from "./streamFoundationDomainEventContracts";
import {
  STREAM_FOUNDATION_DOMAIN_EVENT_CONTRACTS,
  getStreamFoundationDomainEventContract,
  getStreamFoundationDomainEventContractsForSurfaceAction,
} from "./streamFoundationDomainEventContracts";

export type StreamFoundationDomainEventDecisionRequest = Readonly<{
  requestId: string;
  eventId?: StreamFoundationDomainEventId;
  surface: StreamFoundationSurface;
  action: StreamFoundationAction;
  correlationId?: string;
}>;

export type StreamFoundationDomainEventDecision = Readonly<{
  stage: StreamFoundationDomainEventStage;
  requestId: string;
  eventId: StreamFoundationDomainEventId;
  surface: StreamFoundationSurface;
  action: StreamFoundationAction;
  ok: false;
  status: StreamFoundationDomainEventStatus;
  safeCode: StreamFoundationSafeCode;
  severity: StreamFoundationSeverity;
  safeMessageKey: string;
  requiredGates: readonly StreamFoundationGateId[];
  eventBusPublishAllowedNow: false;
  realtimeBroadcastAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  mediaStorageWriteAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeSuccessAllowed: false;
  secretMaterialAllowedInDecision: false;
}>;

function firstSurface(contract: StreamFoundationDomainEventContract): StreamFoundationSurface {
  return contract.sourceSurfaces[0] ?? "stream_entry";
}

function firstAction(contract: StreamFoundationDomainEventContract): StreamFoundationAction {
  return contract.sourceActions[0] ?? "open_surface";
}

function decisionFromContract(
  contract: StreamFoundationDomainEventContract,
  requestId: string,
  surface: StreamFoundationSurface,
  action: StreamFoundationAction,
): StreamFoundationDomainEventDecision {
  return {
    stage: contract.stage,
    requestId,
    eventId: contract.eventId,
    surface,
    action,
    ok: false,
    status: contract.status,
    safeCode: contract.safeCode,
    severity: contract.severity,
    safeMessageKey: contract.safeMessageKey,
    requiredGates: contract.requiredGates,
    eventBusPublishAllowedNow: false,
    realtimeBroadcastAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    mediaStorageWriteAllowedNow: false,
    walletRuntimeMutationAllowedNow: false,
    messengerRuntimeMutationAllowedNow: false,
    giftsPaymentsRuntimeMutationAllowedNow: false,
    fakeSuccessAllowed: false,
    secretMaterialAllowedInDecision: false,
  };
}

export function createStreamFoundationDomainEventDecision(
  request: StreamFoundationDomainEventDecisionRequest,
): StreamFoundationDomainEventDecision {
  const direct = request.eventId ? getStreamFoundationDomainEventContract(request.eventId) : undefined;
  const contract = direct ?? getStreamFoundationDomainEventContractsForSurfaceAction(request.surface, request.action)[0];

  if (contract) {
    return decisionFromContract(contract, request.requestId, request.surface, request.action);
  }

  const fallback = STREAM_FOUNDATION_DOMAIN_EVENT_CONTRACTS[0];
  return {
    ...decisionFromContract(fallback, request.requestId, request.surface, request.action),
    safeCode: "STREAM_UNKNOWN_ACTION_BLOCKED",
    severity: "blocked",
    safeMessageKey: "stream.foundation.event.unknown.blocked",
    status: "blocked_backend_common_missing",
    requiredGates: ["stream_kernel_gateway_gate"],
  };
}

export type StreamFoundationDomainEventDecisionIndex = Readonly<{
  stage: StreamFoundationDomainEventStage;
  totalEventContracts: number;
  sourceOnlyContractReadyEvents: number;
  backendBlockedEvents: number;
  adminBlockedEvents: number;
  providerBlockedEvents: number;
  lastStageLockedEvents: number;
  eventBusPublishReadyNow: 0;
  realtimeBroadcastReadyNow: 0;
  databaseWriteReadyNow: 0;
  providerCallReadyNow: 0;
  mediaStorageWriteReadyNow: 0;
  walletRuntimeMutationReadyNow: 0;
  fakeSuccessReadyNow: 0;
  sampleDecisions: readonly StreamFoundationDomainEventDecision[];
}>;

export function getStreamFoundationDomainEventDecisionIndex(): StreamFoundationDomainEventDecisionIndex {
  const sampleDecisions = STREAM_FOUNDATION_DOMAIN_EVENT_CONTRACTS.map((contract, index) =>
    decisionFromContract(contract, `stream-136j-domain-event-${index + 1}`, firstSurface(contract), firstAction(contract)),
  );

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136J_DOMAIN_EVENTS_STAGING",
    totalEventContracts: STREAM_FOUNDATION_DOMAIN_EVENT_CONTRACTS.length,
    sourceOnlyContractReadyEvents: sampleDecisions.filter((decision) => decision.status === "source_only_contract_ready").length,
    backendBlockedEvents: sampleDecisions.filter((decision) => decision.status === "blocked_backend_common_missing").length,
    adminBlockedEvents: sampleDecisions.filter((decision) => decision.status === "blocked_admin_gate_missing").length,
    providerBlockedEvents: sampleDecisions.filter((decision) => decision.status === "blocked_provider_not_configured").length,
    lastStageLockedEvents: sampleDecisions.filter((decision) => decision.status === "locked_wallet_gift_last_stage").length,
    eventBusPublishReadyNow: 0,
    realtimeBroadcastReadyNow: 0,
    databaseWriteReadyNow: 0,
    providerCallReadyNow: 0,
    mediaStorageWriteReadyNow: 0,
    walletRuntimeMutationReadyNow: 0,
    fakeSuccessReadyNow: 0,
    sampleDecisions,
  };
}
