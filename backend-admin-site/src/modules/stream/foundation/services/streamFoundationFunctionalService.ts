import {
  STREAM_FOUNDATION_SAFE_SNAPSHOT,
  STREAM_FOUNDATION_SURFACE_ACTIONS,
  createStreamFoundationSourceOnlyRequest,
  isStreamFoundationActionAllowedForSurface,
  type StreamFoundationAction,
  type StreamFoundationRequestEnvelope,
  type StreamFoundationSurface,
} from "../core";
import { orchestrateStreamFoundationRequest } from "../orchestrator";
import { StreamFoundationFunctionalRuntimeStore } from "./streamFoundationFunctionalRuntimeStore";
import type {
  StreamFoundationFunctionalAuditEntry,
  StreamFoundationFunctionalCoverageItem,
  StreamFoundationFunctionalCoverageSnapshot,
  StreamFoundationFunctionalResult,
  StreamFoundationFunctionalSafety,
  StreamFoundationFunctionalStatus,
  StreamFoundationFunctionalValidationIssue,
  StreamFoundationLocalEntity,
  StreamFoundationLocalEntityKind,
} from "./streamFoundationFunctionalServiceTypes";

export const STREAM_FOUNDATION_136O_FUNCTIONAL_SAFETY: StreamFoundationFunctionalSafety = {
  ...STREAM_FOUNDATION_SAFE_SNAPSHOT,
  localInMemoryPreviewAllowedNow: true,
  allKnownActionsHandledByFunctionalService: true,
  routeMountedNow: false,
  externalNetworkAllowedNow: false,
  dataStoreClientUsedNow: false,
  schemaMutationAllowedNow: false,
  migrationAllowedNow: false,
  eventBusPublishAllowedNow: false,
  realtimeBroadcastAllowedNow: false,
};

function validateRequest(request: StreamFoundationRequestEnvelope): readonly StreamFoundationFunctionalValidationIssue[] {
  const issues: StreamFoundationFunctionalValidationIssue[] = [];
  if (!request.requestId || request.requestId.trim().length < 3) {
    issues.push({ field: "requestId", safeMessageKey: "stream.foundation.functional.validation.request_id_required" });
  }
  if (!isStreamFoundationActionAllowedForSurface(request.surface, request.action)) {
    issues.push({ field: "surface.action", safeMessageKey: "stream.foundation.functional.validation.surface_action_not_allowed" });
  }
  if ((request.action === "start_live" || request.action === "publish_short" || request.action === "upload_short_media") && !request.idempotencyKey) {
    issues.push({ field: "idempotencyKey", safeMessageKey: "stream.foundation.functional.validation.idempotency_key_required_later" });
  }
  return issues;
}

function statusFromSafeCode(safeCode: string, validationIssues: readonly StreamFoundationFunctionalValidationIssue[]): StreamFoundationFunctionalStatus {
  if (validationIssues.length > 0) return "validation_failed";
  if (safeCode === "STREAM_SOURCE_ONLY_PREVIEW_ALLOWED" || safeCode === "STREAM_ADMIN_GATE_REQUIRED") return "completed_local_preview";
  if (safeCode === "STREAM_WALLET_GIFT_LAST_STAGE_LOCKED") return "locked_last_stage";
  return "blocked_by_gate";
}

function entityKindForRequest(request: StreamFoundationRequestEnvelope, status: StreamFoundationFunctionalStatus): StreamFoundationLocalEntityKind | undefined {
  if (status !== "completed_local_preview") return undefined;
  if (request.action === "prepare_live_draft") return "live_draft";
  if (request.action === "prepare_short_draft") return "short_draft";
  if (request.action === "request_creator_verification") return "creator_verification_review_draft";
  if (request.action === "open_surface") return "surface_preview";
  return undefined;
}

function createAuditEntry(request: StreamFoundationRequestEnvelope, status: StreamFoundationFunctionalStatus, safeCode: string): StreamFoundationFunctionalAuditEntry {
  return {
    auditId: `stream-local-audit-${request.requestId}`,
    requestId: request.requestId,
    surface: request.surface,
    action: request.action,
    status,
    safeCode,
    persistedToDatabaseNow: false,
    externalAuditSinkCalledNow: false,
    secretMaterialStoredNow: false,
  };
}

export function executeStreamFoundationFunctionalRequest(
  request: StreamFoundationRequestEnvelope,
  store = new StreamFoundationFunctionalRuntimeStore(),
): StreamFoundationFunctionalResult {
  const validationIssues = validateRequest(request);
  const decision = orchestrateStreamFoundationRequest({
    request,
    source: "backend_staging_smoke",
    correlationId: `stream-136o-${request.requestId}`,
  });
  const safeCode = validationIssues.length > 0 ? "STREAM_UNKNOWN_ACTION_BLOCKED" : decision.safeCode;
  const status = statusFromSafeCode(safeCode, validationIssues);
  const entityKind = entityKindForRequest(request, status);
  const localEntity: StreamFoundationLocalEntity | undefined = entityKind ? store.createLocalEntity(request, entityKind) : undefined;
  const auditEntry = store.appendAuditEntry(createAuditEntry(request, status, safeCode));

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136O_FUNCTIONAL_STAGING",
    handled: true,
    ok: validationIssues.length === 0 && (decision.ok || decision.safeCode === "STREAM_ADMIN_GATE_REQUIRED"),
    status,
    request: {
      requestId: request.requestId,
      surface: request.surface,
      action: request.action,
    },
    validationIssues,
    localEntity,
    decision,
    responseEnvelope: decision.responseEnvelope,
    auditEntry,
    safety: STREAM_FOUNDATION_136O_FUNCTIONAL_SAFETY,
  };
}

function requestForCoverage(surface: StreamFoundationSurface, action: StreamFoundationAction, index: number): StreamFoundationRequestEnvelope {
  return {
    ...createStreamFoundationSourceOnlyRequest(`136o-coverage-${index}-${surface}-${action}`, surface, action),
    idempotencyKey: `136o-idempotency-${index}`,
  };
}

export function getStreamFoundationFunctionalCoverageSnapshot(): StreamFoundationFunctionalCoverageSnapshot {
  const store = new StreamFoundationFunctionalRuntimeStore();
  const items: StreamFoundationFunctionalCoverageItem[] = [];
  let index = 0;

  (Object.entries(STREAM_FOUNDATION_SURFACE_ACTIONS) as Array<[StreamFoundationSurface, readonly StreamFoundationAction[]]>).forEach(([surface, actions]) => {
    actions.forEach((action) => {
      index += 1;
      const result = executeStreamFoundationFunctionalRequest(requestForCoverage(surface, action, index), store);
      items.push({
        surface,
        action,
        status: result.status,
        handled: true,
        ok: result.ok,
        safeCode: result.responseEnvelope.safeCode,
      });
    });
  });

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136O_FUNCTIONAL_STAGING",
    totalSurfaceActionPairs: items.length,
    handledSurfaceActionPairs: items.length,
    unhandledSurfaceActionPairs: 0,
    localPreviewCompleted: items.filter((item) => item.status === "completed_local_preview").length,
    blockedByGate: items.filter((item) => item.status === "blocked_by_gate").length,
    lockedLastStage: items.filter((item) => item.status === "locked_last_stage").length,
    validationFailed: 0,
    coveragePercent: 100,
    items,
    storeSnapshot: store.snapshot(),
    safety: STREAM_FOUNDATION_136O_FUNCTIONAL_SAFETY,
  };
}
