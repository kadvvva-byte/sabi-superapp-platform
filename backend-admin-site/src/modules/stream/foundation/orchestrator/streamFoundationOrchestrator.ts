import {
  createStreamFoundationResponseEnvelope,
  createStreamFoundationSourceOnlyRequest,
  STREAM_FOUNDATION_SAFE_SNAPSHOT,
  type StreamFoundationAction,
  type StreamFoundationResponseEnvelope,
  type StreamFoundationSafeCode,
  type StreamFoundationSeverity,
  type StreamFoundationSurface,
} from "../core";
import {
  createStreamFoundationPortDecision,
  getStreamFoundationPortIdsForSurfaceAction,
  STREAM_FOUNDATION_PORT_SAFE_SNAPSHOT,
  type StreamFoundationPortDecision,
} from "../ports";
import type {
  StreamFoundationOrchestratorDecision,
  StreamFoundationOrchestratorMode,
  StreamFoundationOrchestratorRequest,
  StreamFoundationOrchestratorSampleCase,
  StreamFoundationOrchestratorSnapshot,
} from "./streamFoundationOrchestratorTypes";

function responseToMode(response: StreamFoundationResponseEnvelope): StreamFoundationOrchestratorMode {
  if (response.safeCode === "STREAM_SOURCE_ONLY_PREVIEW_ALLOWED") return "source_only_preview";
  if (response.safeCode === "STREAM_ADMIN_GATE_REQUIRED") return "blocked_admin_gate_missing";
  if (response.safeCode === "STREAM_PROVIDER_NOT_CONFIGURED") return "blocked_provider_not_configured";
  if (response.safeCode === "STREAM_WALLET_GIFT_LAST_STAGE_LOCKED") return "locked_wallet_gift_last_stage";
  if (response.safeCode === "STREAM_UNKNOWN_ACTION_BLOCKED") return "blocked_unknown_request";
  return "blocked_backend_common_missing";
}

function normalizePortDecisions(
  response: StreamFoundationResponseEnvelope,
  portDecisions: readonly StreamFoundationPortDecision[],
): readonly StreamFoundationPortDecision[] {
  if (portDecisions.length > 0) return portDecisions;

  return response.gates.map((gate) => ({
    portId: gate.gateId === "wallet_coin_gift_last_stage_gate"
      ? "wallet_coin_gift_boundary_port"
      : gate.gateId === "provider_secret_gate"
        ? "provider_gate_port"
        : gate.gateId === "moderation_admin_gate"
          ? "moderation_admin_port"
          : gate.gateId === "observability_audit_gate"
            ? "observability_audit_port"
            : "identity_session_port",
    status: gate.status === "ready_for_source_only_planning"
      ? "source_only_contract_ready"
      : gate.status === "blocked_admin_gate_missing"
        ? "admin_gate_missing"
        : gate.status === "blocked_provider_not_configured"
          ? "provider_not_configured"
          : gate.status === "locked_last_stage_boundary"
            ? "last_stage_locked"
            : "adapter_missing",
    ok: false,
    safeCode: response.safeCode as StreamFoundationSafeCode,
    safeMessageKey: gate.reasonKey,
    severity: gate.severity as StreamFoundationSeverity,
    blockedByGate: gate.gateId,
    adapterRuntimeEnabledNow: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    fakeSuccessAllowed: false,
  }));
}

export function orchestrateStreamFoundationRequest(
  orchestratorRequest: StreamFoundationOrchestratorRequest,
): StreamFoundationOrchestratorDecision {
  const responseEnvelope = createStreamFoundationResponseEnvelope(orchestratorRequest.request);
  const expectedPorts = getStreamFoundationPortIdsForSurfaceAction(
    orchestratorRequest.request.surface,
    orchestratorRequest.request.action,
  );
  const directPortDecisions = expectedPorts.map((portId) => createStreamFoundationPortDecision(portId));
  const portDecisions = normalizePortDecisions(responseEnvelope, directPortDecisions);
  const mode = responseToMode(responseEnvelope);

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136F_ORCHESTRATOR_STAGING",
    mode,
    ok: responseEnvelope.ok,
    safeCode: responseEnvelope.safeCode,
    safeMessageKey: responseEnvelope.safeMessageKey,
    severity: responseEnvelope.severity,
    mobileAction: responseEnvelope.mobileAction,
    surface: orchestratorRequest.request.surface,
    action: orchestratorRequest.request.action,
    expectedPorts,
    portDecisions,
    responseEnvelope,
    safety: STREAM_FOUNDATION_PORT_SAFE_SNAPSHOT,
  };
}

export const STREAM_FOUNDATION_136F_ORCHESTRATOR_SAMPLE_CASES: readonly StreamFoundationOrchestratorSampleCase[] = [
  { requestId: "136f-open-entry", surface: "stream_entry", action: "open_surface", expectedMode: "source_only_preview", expectedOk: true },
  { requestId: "136f-live-draft", surface: "live_composer", action: "prepare_live_draft", expectedMode: "source_only_preview", expectedOk: true },
  { requestId: "136f-start-live", surface: "live_single", action: "start_live", expectedMode: "blocked_backend_common_missing", expectedOk: false },
  { requestId: "136f-group-join", surface: "live_group", action: "join_live", expectedMode: "blocked_backend_common_missing", expectedOk: false },
  { requestId: "136f-short-draft", surface: "shorts_creator", action: "prepare_short_draft", expectedMode: "source_only_preview", expectedOk: true },
  { requestId: "136f-short-upload", surface: "shorts_creator", action: "upload_short_media", expectedMode: "blocked_provider_not_configured", expectedOk: false },
  { requestId: "136f-short-feed", surface: "shorts_feed", action: "load_shorts_feed", expectedMode: "blocked_backend_common_missing", expectedOk: false },
  { requestId: "136f-business-product", surface: "business_stream", action: "request_business_product_attach", expectedMode: "blocked_admin_gate_missing", expectedOk: false },
  { requestId: "136f-creator-check", surface: "creator_profile", action: "request_creator_verification", expectedMode: "blocked_admin_gate_missing", expectedOk: true },
  { requestId: "136f-moderation", surface: "moderation_admin", action: "report_content", expectedMode: "blocked_admin_gate_missing", expectedOk: false },
  { requestId: "136f-analytics", surface: "playback_analytics", action: "load_playback_analytics", expectedMode: "blocked_backend_common_missing", expectedOk: false },
  { requestId: "136f-gift", surface: "wallet_gift_boundary", action: "request_gift_send", expectedMode: "locked_wallet_gift_last_stage", expectedOk: false },
] as const;

export function createStreamFoundationOrchestratorStagingRequest(
  requestId: string,
  surface: StreamFoundationSurface,
  action: StreamFoundationAction,
): StreamFoundationOrchestratorRequest {
  return {
    request: createStreamFoundationSourceOnlyRequest(requestId, surface, action),
    source: "backend_staging_smoke",
    correlationId: `stream-136f-${requestId}`,
  };
}

export function getStreamFoundationOrchestratorSnapshot(): StreamFoundationOrchestratorSnapshot {
  const samples = STREAM_FOUNDATION_136F_ORCHESTRATOR_SAMPLE_CASES.map((sample) =>
    orchestrateStreamFoundationRequest(createStreamFoundationOrchestratorStagingRequest(sample.requestId, sample.surface, sample.action)),
  );
  const passedCases = samples.filter((decision, index) => {
    const expected = STREAM_FOUNDATION_136F_ORCHESTRATOR_SAMPLE_CASES[index];
    return decision.mode === expected.expectedMode && decision.ok === expected.expectedOk;
  }).length;

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136F_ORCHESTRATOR_STAGING",
    totalCases: samples.length,
    passedCases,
    failedCases: samples.length - passedCases,
    sourceOnlyPreviewCases: samples.filter((decision) => decision.mode === "source_only_preview").length,
    backendBlockedCases: samples.filter((decision) => decision.mode === "blocked_backend_common_missing").length,
    adminBlockedCases: samples.filter((decision) => decision.mode === "blocked_admin_gate_missing").length,
    providerBlockedCases: samples.filter((decision) => decision.mode === "blocked_provider_not_configured").length,
    lastStageLockedCases: samples.filter((decision) => decision.mode === "locked_wallet_gift_last_stage").length,
    runtimeExecutionReadyCases: 0,
    routeMountReadyNow: STREAM_FOUNDATION_SAFE_SNAPSHOT.routeMountAllowedNow,
    databaseWriteReadyNow: STREAM_FOUNDATION_SAFE_SNAPSHOT.databaseWriteAllowedNow,
    providerCallReadyNow: STREAM_FOUNDATION_SAFE_SNAPSHOT.providerCallAllowedNow,
    samples,
    safety: STREAM_FOUNDATION_PORT_SAFE_SNAPSHOT,
  };
}
