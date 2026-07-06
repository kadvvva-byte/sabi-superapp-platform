import {
  STREAM_FOUNDATION_SAFE_SNAPSHOT,
  STREAM_FOUNDATION_SURFACE_ACTIONS,
  createStreamFoundationSourceOnlyRequest,
  type StreamFoundationAction,
  type StreamFoundationSurface,
} from "../core";
import {
  createStreamFoundationOrchestratorStagingRequest,
  getStreamFoundationOrchestratorSnapshot,
  orchestrateStreamFoundationRequest,
} from "../orchestrator";
import type {
  StreamFoundationApiContractSnapshot,
  StreamFoundationApiDraftResponse,
  StreamFoundationApiEndpointDescriptor,
  StreamFoundationApiPreviewBody,
  StreamFoundationApiSafety,
  StreamFoundationApiValidationIssue,
} from "./streamFoundationApiContract";

export const STREAM_FOUNDATION_136G_API_SAFE_SNAPSHOT: StreamFoundationApiSafety = {
  sourceOnlyNow: true,
  routeContractOnlyNow: true,
  routeMountedNow: false,
  appServerTouchedNow: false,
  runtimeExecutionAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  externalNetworkAllowedNow: false,
  walletRuntimeMutationAllowedNow: false,
  messengerRuntimeMutationAllowedNow: false,
  giftsPaymentsRuntimeMutationAllowedNow: false,
  fakeSuccessAllowed: false,
  secretMaterialAllowedInResponse: false,
};

export const STREAM_FOUNDATION_136G_API_ENDPOINT_CONTRACTS: readonly StreamFoundationApiEndpointDescriptor[] = [
  {
    endpointId: "stream_foundation_preview_endpoint_contract",
    method: "POST",
    path: "/api/stream/foundation/preview",
    descriptionKey: "stream.foundation.api.preview.contract_only",
    acceptsMobileKernelEnvelope: true,
    returnsSafeEnvelope: true,
    routeMountAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    fakeSuccessAllowed: false,
  },
  {
    endpointId: "stream_foundation_readiness_endpoint_contract",
    method: "POST",
    path: "/api/stream/foundation/readiness",
    descriptionKey: "stream.foundation.api.readiness.contract_only",
    acceptsMobileKernelEnvelope: false,
    returnsSafeEnvelope: true,
    routeMountAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    fakeSuccessAllowed: false,
  },
  {
    endpointId: "stream_foundation_safety_endpoint_contract",
    method: "POST",
    path: "/api/stream/foundation/safety",
    descriptionKey: "stream.foundation.api.safety.contract_only",
    acceptsMobileKernelEnvelope: false,
    returnsSafeEnvelope: true,
    routeMountAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    fakeSuccessAllowed: false,
  },
] as const;

const KNOWN_SURFACES = Object.keys(STREAM_FOUNDATION_SURFACE_ACTIONS) as StreamFoundationSurface[];
const KNOWN_ACTIONS = Array.from(
  new Set(KNOWN_SURFACES.flatMap((surface) => STREAM_FOUNDATION_SURFACE_ACTIONS[surface])),
) as StreamFoundationAction[];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStreamFoundationSurface(value: unknown): value is StreamFoundationSurface {
  return typeof value === "string" && KNOWN_SURFACES.includes(value as StreamFoundationSurface);
}

function isStreamFoundationAction(value: unknown): value is StreamFoundationAction {
  return typeof value === "string" && KNOWN_ACTIONS.includes(value as StreamFoundationAction);
}

function validateStreamFoundationApiPreviewBody(value: unknown): readonly StreamFoundationApiValidationIssue[] {
  const issues: StreamFoundationApiValidationIssue[] = [];

  if (!isRecord(value)) {
    return [{ field: "body", safeMessageKey: "stream.foundation.api.validation.body_object_required" }];
  }

  if (!isNonEmptyString(value.requestId)) {
    issues.push({ field: "requestId", safeMessageKey: "stream.foundation.api.validation.request_id_required" });
  }

  if (!isStreamFoundationSurface(value.surface)) {
    issues.push({ field: "surface", safeMessageKey: "stream.foundation.api.validation.surface_unknown" });
  }

  if (!isStreamFoundationAction(value.action)) {
    issues.push({ field: "action", safeMessageKey: "stream.foundation.api.validation.action_unknown" });
  }

  return issues;
}

function parseStreamFoundationApiPreviewBody(value: unknown): StreamFoundationApiPreviewBody | undefined {
  if (!isRecord(value)) return undefined;
  if (!isNonEmptyString(value.requestId)) return undefined;
  if (!isStreamFoundationSurface(value.surface)) return undefined;
  if (!isStreamFoundationAction(value.action)) return undefined;

  return {
    requestId: value.requestId,
    surface: value.surface,
    action: value.action,
    userId: isNonEmptyString(value.userId) ? value.userId : undefined,
    sessionId: isNonEmptyString(value.sessionId) ? value.sessionId : undefined,
    locale: isNonEmptyString(value.locale) ? value.locale : undefined,
    correlationId: isNonEmptyString(value.correlationId) ? value.correlationId : undefined,
    metadata: isRecord(value.metadata) ? value.metadata as StreamFoundationApiPreviewBody["metadata"] : undefined,
  };
}

export function createStreamFoundationApiPreviewDraftResponse(body: unknown): StreamFoundationApiDraftResponse {
  const validationIssues = validateStreamFoundationApiPreviewBody(body);

  if (validationIssues.length > 0) {
    return {
      stage: "BACKEND_STREAM_FOUNDATION_136G_API_CONTRACT_STAGING",
      endpointId: "stream_foundation_preview_endpoint_contract",
      ok: false,
      status: 400,
      safeCode: "STREAM_API_VALIDATION_BLOCKED",
      safeMessageKey: "stream.foundation.api.validation.blocked",
      validationIssues,
      safety: STREAM_FOUNDATION_136G_API_SAFE_SNAPSHOT,
    };
  }

  const previewBody = parseStreamFoundationApiPreviewBody(body);

  if (!previewBody) {
    return {
      stage: "BACKEND_STREAM_FOUNDATION_136G_API_CONTRACT_STAGING",
      endpointId: "stream_foundation_preview_endpoint_contract",
      ok: false,
      status: 400,
      safeCode: "STREAM_API_VALIDATION_BLOCKED",
      safeMessageKey: "stream.foundation.api.validation.blocked",
      validationIssues: [{ field: "body", safeMessageKey: "stream.foundation.api.validation.body_parse_failed" }],
      safety: STREAM_FOUNDATION_136G_API_SAFE_SNAPSHOT,
    };
  }

  const request = createStreamFoundationSourceOnlyRequest(previewBody.requestId, previewBody.surface, previewBody.action);
  const decision = orchestrateStreamFoundationRequest({
    request: {
      ...request,
      userId: previewBody.userId,
      sessionId: previewBody.sessionId,
      locale: previewBody.locale ?? request.locale,
      metadata: previewBody.metadata,
    },
    source: "mobile_kernel_handoff",
    correlationId: previewBody.correlationId ?? `stream-136g-${previewBody.requestId}`,
  });

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136G_API_CONTRACT_STAGING",
    endpointId: "stream_foundation_preview_endpoint_contract",
    ok: decision.ok,
    status: decision.ok ? 200 : 409,
    safeCode: decision.safeCode,
    safeMessageKey: decision.safeMessageKey,
    validationIssues: [],
    orchestratorDecision: decision,
    responseEnvelope: decision.responseEnvelope,
    safety: STREAM_FOUNDATION_136G_API_SAFE_SNAPSHOT,
  };
}

export function getStreamFoundationApiContractSnapshot(): StreamFoundationApiContractSnapshot {
  const sampleBodies: readonly StreamFoundationApiPreviewBody[] = [
    { requestId: "136g-entry-preview", surface: "stream_entry", action: "open_surface" },
    { requestId: "136g-live-blocked", surface: "live_single", action: "start_live" },
    { requestId: "136g-short-upload-blocked", surface: "shorts_creator", action: "upload_short_media" },
    { requestId: "136g-gift-locked", surface: "wallet_gift_boundary", action: "request_gift_send" },
  ] as const;

  const responses = sampleBodies.map((sample) => createStreamFoundationApiPreviewDraftResponse(sample));
  const orchestratorSnapshot = getStreamFoundationOrchestratorSnapshot();

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136G_API_CONTRACT_STAGING",
    endpointContracts: STREAM_FOUNDATION_136G_API_ENDPOINT_CONTRACTS,
    mountedEndpointsNow: 0,
    runtimeExecutionReadyNow: false,
    databaseWriteReadyNow: false,
    providerCallReadyNow: false,
    samplePreviewCases: responses.length + orchestratorSnapshot.totalCases,
    samplePreviewPassed: responses.length + orchestratorSnapshot.passedCases,
    safety: STREAM_FOUNDATION_136G_API_SAFE_SNAPSHOT,
    coreSafety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}

export function createStreamFoundationApiStagingDecisionForSmoke(surface: StreamFoundationSurface, action: StreamFoundationAction) {
  return orchestrateStreamFoundationRequest(createStreamFoundationOrchestratorStagingRequest("136g-direct-smoke", surface, action));
}
