import {
  STREAM_FOUNDATION_SAFE_SNAPSHOT,
  getStreamFoundationReadinessIndex,
  type StreamFoundationGateId,
  type StreamFoundationSafetySnapshot,
} from "../core";
import { getStreamFoundationPortRegistrySnapshot } from "../ports";
import { getStreamFoundationOrchestratorSnapshot } from "../orchestrator";
import { getStreamFoundationApiContractSnapshot } from "../api";
import { getStreamFoundationReadModelSnapshotIndex } from "../read-models";
import { getStreamFoundationWriteCommandDecisionIndex } from "../write-models";
import { getStreamFoundationDomainEventDecisionIndex } from "../domain-events";
import { getStreamFoundationPersistenceModelMapSummary } from "../persistence";
import { getStreamFoundationRepositoryRegistrySummary } from "../repositories";

export type StreamFoundationReadinessCompositionStage = "BACKEND_STREAM_FOUNDATION_136M_SERVICE_READINESS_COMPOSITION_STAGING";

export type StreamFoundationReadinessAreaId =
  | "core_policy"
  | "ports_adapters"
  | "orchestrator"
  | "api_contract"
  | "read_models"
  | "write_models"
  | "domain_events"
  | "persistence_models"
  | "repository_contracts"
  | "realtime_media_execution"
  | "admin_moderation_execution"
  | "provider_storage_execution"
  | "wallet_gift_last_stage";

export type StreamFoundationReadinessAreaStatus =
  | "source_only_contract_ready"
  | "source_only_preview_ready"
  | "blocked_backend_common_execution_missing"
  | "blocked_admin_gate_missing"
  | "blocked_provider_not_configured"
  | "locked_wallet_gift_last_stage";

export type StreamFoundationReadinessAreaSeverity = "info" | "review_required" | "blocked" | "locked";

export type StreamFoundationReadinessArea = Readonly<{
  areaId: StreamFoundationReadinessAreaId;
  status: StreamFoundationReadinessAreaStatus;
  severity: StreamFoundationReadinessAreaSeverity;
  safeMessageKey: string;
  requiredGates: readonly StreamFoundationGateId[];
  sourceOnlyContractReadyNow: boolean;
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  realtimePublishAllowedNow: false;
  mediaStorageWriteAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationServiceReadinessCompositionSafety = StreamFoundationSafetySnapshot & Readonly<{
  apiRouteMountedNow: false;
  appServerTouchedNow: false;
  dataStoreClientAllowedNow: false;
  schemaFileMutationAllowedNow: false;
  migrationAllowedNow: false;
  realtimeBroadcastAllowedNow: false;
  mediaSignedUrlAllowedNow: false;
  eventBusPublishAllowedNow: false;
}>;

export type StreamFoundationServiceReadinessCompositionSnapshot = Readonly<{
  stage: StreamFoundationReadinessCompositionStage;
  source: "local_staging_only";
  totalAreas: number;
  sourceOnlyReadyAreas: number;
  backendBlockedAreas: number;
  adminBlockedAreas: number;
  providerBlockedAreas: number;
  lastStageLockedAreas: number;
  routeMountReadyAreasNow: 0;
  runtimeExecutionReadyAreasNow: 0;
  databaseReadReadyAreasNow: 0;
  databaseWriteReadyAreasNow: 0;
  providerCallReadyAreasNow: 0;
  realtimePublishReadyAreasNow: 0;
  mediaStorageWriteReadyAreasNow: 0;
  fakeSuccessReadyAreasNow: 0;
  readinessScoreForSourceOnlyFoundation: number;
  readyForServerInstallNow: false;
  readyForRouteMountNow: false;
  readyForDatabaseIntegrationNow: false;
  readyForProviderIntegrationNow: false;
  readyForWalletGiftRuntimeNow: false;
  areas: readonly StreamFoundationReadinessArea[];
  inputs: Readonly<{
    coreReadiness: ReturnType<typeof getStreamFoundationReadinessIndex>;
    portRegistry: ReturnType<typeof getStreamFoundationPortRegistrySnapshot>;
    orchestrator: ReturnType<typeof getStreamFoundationOrchestratorSnapshot>;
    apiContract: ReturnType<typeof getStreamFoundationApiContractSnapshot>;
    readModels: ReturnType<typeof getStreamFoundationReadModelSnapshotIndex>;
    writeModels: ReturnType<typeof getStreamFoundationWriteCommandDecisionIndex>;
    domainEvents: ReturnType<typeof getStreamFoundationDomainEventDecisionIndex>;
    persistence: ReturnType<typeof getStreamFoundationPersistenceModelMapSummary>;
    repositories: ReturnType<typeof getStreamFoundationRepositoryRegistrySummary>;
  }>;
  safety: StreamFoundationServiceReadinessCompositionSafety;
}>;

export const STREAM_FOUNDATION_136M_SERVICE_READINESS_SAFETY: StreamFoundationServiceReadinessCompositionSafety = {
  ...STREAM_FOUNDATION_SAFE_SNAPSHOT,
  apiRouteMountedNow: false,
  appServerTouchedNow: false,
  dataStoreClientAllowedNow: false,
  schemaFileMutationAllowedNow: false,
  migrationAllowedNow: false,
  realtimeBroadcastAllowedNow: false,
  mediaSignedUrlAllowedNow: false,
  eventBusPublishAllowedNow: false,
};

const area = (
  areaId: StreamFoundationReadinessAreaId,
  status: StreamFoundationReadinessAreaStatus,
  severity: StreamFoundationReadinessAreaSeverity,
  safeMessageKey: string,
  requiredGates: readonly StreamFoundationGateId[],
): StreamFoundationReadinessArea => ({
  areaId,
  status,
  severity,
  safeMessageKey,
  requiredGates,
  sourceOnlyContractReadyNow: status === "source_only_contract_ready" || status === "source_only_preview_ready",
  routeMountAllowedNow: false,
  runtimeExecutionAllowedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  realtimePublishAllowedNow: false,
  mediaStorageWriteAllowedNow: false,
  walletRuntimeMutationAllowedNow: false,
  messengerRuntimeMutationAllowedNow: false,
  giftsPaymentsRuntimeMutationAllowedNow: false,
  fakeSuccessAllowed: false,
});

export function getStreamFoundationServiceReadinessAreas(): readonly StreamFoundationReadinessArea[] {
  return [
    area("core_policy", "source_only_preview_ready", "info", "stream.foundation.136m.core_policy.source_only_ready", ["stream_kernel_gateway_gate", "locale_error_gate"]),
    area("ports_adapters", "source_only_contract_ready", "info", "stream.foundation.136m.ports.contracts_ready_no_runtime", ["stream_kernel_gateway_gate"]),
    area("orchestrator", "source_only_preview_ready", "info", "stream.foundation.136m.orchestrator.safe_preview_ready", ["stream_kernel_gateway_gate", "observability_audit_gate"]),
    area("api_contract", "source_only_contract_ready", "info", "stream.foundation.136m.api.contract_ready_unmounted", ["stream_kernel_gateway_gate", "identity_session_gate"]),
    area("read_models", "source_only_contract_ready", "info", "stream.foundation.136m.read_models.empty_contracts_ready", ["stream_kernel_gateway_gate", "locale_error_gate"]),
    area("write_models", "blocked_backend_common_execution_missing", "blocked", "stream.foundation.136m.write_models.execution_blocked", ["identity_session_gate", "stream_kernel_gateway_gate"]),
    area("domain_events", "source_only_contract_ready", "info", "stream.foundation.136m.domain_events.contracts_ready_no_publish", ["observability_audit_gate"]),
    area("persistence_models", "source_only_contract_ready", "info", "stream.foundation.136m.persistence.model_map_ready_no_schema_write", ["observability_audit_gate"]),
    area("repository_contracts", "source_only_contract_ready", "info", "stream.foundation.136m.repositories.interfaces_ready_no_data_store", ["stream_kernel_gateway_gate"]),
    area("realtime_media_execution", "blocked_backend_common_execution_missing", "blocked", "stream.foundation.136m.realtime_media.execution_blocked", ["realtime_room_gate", "live_lifecycle_gate", "media_storage_cdn_gate"]),
    area("admin_moderation_execution", "blocked_admin_gate_missing", "review_required", "stream.foundation.136m.admin_moderation.gate_required", ["moderation_admin_gate", "launch_readiness_gate"]),
    area("provider_storage_execution", "blocked_provider_not_configured", "blocked", "stream.foundation.136m.provider_storage.provider_not_configured", ["provider_secret_gate", "media_storage_cdn_gate"]),
    area("wallet_gift_last_stage", "locked_wallet_gift_last_stage", "locked", "stream.foundation.136m.wallet_gift.last_stage_locked", ["wallet_coin_gift_last_stage_gate", "provider_secret_gate", "launch_readiness_gate"]),
  ] as const;
}

const countArea = (
  areas: readonly StreamFoundationReadinessArea[],
  predicate: (areaItem: StreamFoundationReadinessArea) => boolean,
): number => areas.filter(predicate).length;

export function getStreamFoundationServiceReadinessCompositionSnapshot(): StreamFoundationServiceReadinessCompositionSnapshot {
  const areas = getStreamFoundationServiceReadinessAreas();
  const sourceOnlyReadyAreas = countArea(areas, (areaItem) => areaItem.sourceOnlyContractReadyNow);

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136M_SERVICE_READINESS_COMPOSITION_STAGING",
    source: "local_staging_only",
    totalAreas: areas.length,
    sourceOnlyReadyAreas,
    backendBlockedAreas: countArea(areas, (areaItem) => areaItem.status === "blocked_backend_common_execution_missing"),
    adminBlockedAreas: countArea(areas, (areaItem) => areaItem.status === "blocked_admin_gate_missing"),
    providerBlockedAreas: countArea(areas, (areaItem) => areaItem.status === "blocked_provider_not_configured"),
    lastStageLockedAreas: countArea(areas, (areaItem) => areaItem.status === "locked_wallet_gift_last_stage"),
    routeMountReadyAreasNow: 0,
    runtimeExecutionReadyAreasNow: 0,
    databaseReadReadyAreasNow: 0,
    databaseWriteReadyAreasNow: 0,
    providerCallReadyAreasNow: 0,
    realtimePublishReadyAreasNow: 0,
    mediaStorageWriteReadyAreasNow: 0,
    fakeSuccessReadyAreasNow: 0,
    readinessScoreForSourceOnlyFoundation: Math.round((sourceOnlyReadyAreas / areas.length) * 100),
    readyForServerInstallNow: false,
    readyForRouteMountNow: false,
    readyForDatabaseIntegrationNow: false,
    readyForProviderIntegrationNow: false,
    readyForWalletGiftRuntimeNow: false,
    areas,
    inputs: {
      coreReadiness: getStreamFoundationReadinessIndex(),
      portRegistry: getStreamFoundationPortRegistrySnapshot(),
      orchestrator: getStreamFoundationOrchestratorSnapshot(),
      apiContract: getStreamFoundationApiContractSnapshot(),
      readModels: getStreamFoundationReadModelSnapshotIndex(),
      writeModels: getStreamFoundationWriteCommandDecisionIndex(),
      domainEvents: getStreamFoundationDomainEventDecisionIndex(),
      persistence: getStreamFoundationPersistenceModelMapSummary(),
      repositories: getStreamFoundationRepositoryRegistrySummary(),
    },
    safety: STREAM_FOUNDATION_136M_SERVICE_READINESS_SAFETY,
  };
}
