import { STREAM_FOUNDATION_ACTION_POLICIES } from "./streamFoundationGatePolicy";
import type { StreamFoundationGateStatus } from "./streamFoundationCoreTypes";

export type StreamFoundationReadinessIndex = Readonly<{
  stage: "BACKEND_STREAM_FOUNDATION_READINESS_INDEX_SOURCE_ONLY";
  totalActions: number;
  localPreviewOnlyActions: number;
  backendBlockedActions: number;
  adminReviewRequiredActions: number;
  providerBlockedActions: number;
  lastStageLockedActions: number;
  runtimeExecutionReadyActions: 0;
  readinessScoreForPlanning: number;
  readyForRouteMount: false;
  readyForDatabaseWrite: false;
  readyForProviderCalls: false;
  readyForWalletGiftRuntime: false;
}>;

const countByStatus = (status: StreamFoundationGateStatus): number =>
  STREAM_FOUNDATION_ACTION_POLICIES.filter((entry) => entry.blockedBy === status).length;

export function getStreamFoundationReadinessIndex(): StreamFoundationReadinessIndex {
  const totalActions = STREAM_FOUNDATION_ACTION_POLICIES.length;
  const localPreviewOnlyActions = STREAM_FOUNDATION_ACTION_POLICIES.filter((entry) => entry.sourceOnlyLocalPreviewAllowed).length;
  const readinessScoreForPlanning = Math.round((localPreviewOnlyActions / totalActions) * 100);

  return {
    stage: "BACKEND_STREAM_FOUNDATION_READINESS_INDEX_SOURCE_ONLY",
    totalActions,
    localPreviewOnlyActions,
    backendBlockedActions: countByStatus("blocked_backend_common_missing"),
    adminReviewRequiredActions: countByStatus("blocked_admin_gate_missing"),
    providerBlockedActions: countByStatus("blocked_provider_not_configured"),
    lastStageLockedActions: countByStatus("locked_last_stage_boundary"),
    runtimeExecutionReadyActions: 0,
    readinessScoreForPlanning,
    readyForRouteMount: false,
    readyForDatabaseWrite: false,
    readyForProviderCalls: false,
    readyForWalletGiftRuntime: false,
  };
}
