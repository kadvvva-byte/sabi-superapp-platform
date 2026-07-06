import { getStreamFoundationReadinessIndex, getStreamFoundationSafetyAudit } from "./core";
import { getStreamFoundationOrchestratorSnapshot } from "./orchestrator";
import { getStreamFoundationReadModelSnapshotIndex } from "./read-models";
import { getStreamFoundationWriteCommandContracts, getStreamFoundationWriteCommandDecisionIndex } from "./write-models";

export const STREAM_136I_BACKEND_FOUNDATION_WRITE_MODELS_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-136I" as const;

export type Stream136IBackendFoundationWriteModelsStagingManifest = Readonly<{
  version: typeof STREAM_136I_BACKEND_FOUNDATION_WRITE_MODELS_STAGING_VERSION;
  scope: "backend_stream_foundation_local_staging_only";
  purpose: "source_only_write_model_command_contracts_for_stream_mobile_ui";
  pipeline: readonly string[];
  writeModels: Readonly<{
    total: number;
    backendBlocked: number;
    adminBlocked: number;
    providerBlocked: number;
    lastStageLocked: number;
    acceptedCommandReadyNow: 0;
    routeMountReadyNow: 0;
    runtimeExecutionReadyNow: 0;
    databaseWriteReadyNow: 0;
    providerCallReadyNow: 0;
    fakeSuccessReadyNow: 0;
  }>;
  upstream: Readonly<{
    readModels: number;
    orchestratorCases: number;
    readinessTotalActions: number;
    safetyAuditPassed: boolean;
  }>;
  safety: Readonly<{
    sourceOnlyNow: true;
    routeMountAllowedNow: false;
    runtimeExecutionAllowedNow: false;
    databaseWriteAllowedNow: false;
    providerCallAllowedNow: false;
    mediaStorageWriteAllowedNow: false;
    realtimePublishAllowedNow: false;
    externalNetworkAllowedNow: false;
    walletRuntimeMutationAllowedNow: false;
    messengerRuntimeMutationAllowedNow: false;
    giftsPaymentsRuntimeMutationAllowedNow: false;
    fakeLiveAllowed: false;
    fakeUploadAllowed: false;
    fakePublishAllowed: false;
    fakeModerationAllowed: false;
    fakeGiftAllowed: false;
    fakeSuccessAllowed: false;
    serverInstallReadyNow: false;
  }>;
  nextStep: "BACKEND_STREAM_FOUNDATION_136J_LOCAL_STAGING_DOMAIN_EVENT_CONTRACTS";
}>;

export function getStream136IBackendFoundationWriteModelsStagingManifest(): Stream136IBackendFoundationWriteModelsStagingManifest {
  const contracts = getStreamFoundationWriteCommandContracts();
  const decisionIndex = getStreamFoundationWriteCommandDecisionIndex();
  const readModelIndex = getStreamFoundationReadModelSnapshotIndex();
  const orchestrator = getStreamFoundationOrchestratorSnapshot();
  const readiness = getStreamFoundationReadinessIndex();
  const safetyAudit = getStreamFoundationSafetyAudit();

  return {
    version: STREAM_136I_BACKEND_FOUNDATION_WRITE_MODELS_STAGING_VERSION,
    scope: "backend_stream_foundation_local_staging_only",
    purpose: "source_only_write_model_command_contracts_for_stream_mobile_ui",
    pipeline: [
      "mobile_stream_ui_135z_handoff",
      "136d_core_contracts",
      "136e_ports_adapters_noop",
      "136f_orchestrator_source_only",
      "136g_api_contract_no_mount",
      "136h_read_model_contracts_empty_safe_snapshots",
      "136i_write_model_command_contracts_blocked_safe_decisions",
      "136j_domain_event_contracts_later",
      "server_install_later_after_owner_approval",
    ],
    writeModels: {
      total: contracts.length,
      backendBlocked: decisionIndex.backendBlockedCommands,
      adminBlocked: decisionIndex.adminBlockedCommands,
      providerBlocked: decisionIndex.providerBlockedCommands,
      lastStageLocked: decisionIndex.lastStageLockedCommands,
      acceptedCommandReadyNow: decisionIndex.acceptedCommandReadyNow,
      routeMountReadyNow: decisionIndex.routeMountReadyNow,
      runtimeExecutionReadyNow: decisionIndex.runtimeExecutionReadyNow,
      databaseWriteReadyNow: decisionIndex.databaseWriteReadyNow,
      providerCallReadyNow: decisionIndex.providerCallReadyNow,
      fakeSuccessReadyNow: decisionIndex.fakeSuccessReadyNow,
    },
    upstream: {
      readModels: readModelIndex.totalReadModels,
      orchestratorCases: orchestrator.totalCases,
      readinessTotalActions: readiness.totalActions,
      safetyAuditPassed: safetyAudit.passed,
    },
    safety: {
      sourceOnlyNow: true,
      routeMountAllowedNow: false,
      runtimeExecutionAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      mediaStorageWriteAllowedNow: false,
      realtimePublishAllowedNow: false,
      externalNetworkAllowedNow: false,
      walletRuntimeMutationAllowedNow: false,
      messengerRuntimeMutationAllowedNow: false,
      giftsPaymentsRuntimeMutationAllowedNow: false,
      fakeLiveAllowed: false,
      fakeUploadAllowed: false,
      fakePublishAllowed: false,
      fakeModerationAllowed: false,
      fakeGiftAllowed: false,
      fakeSuccessAllowed: false,
      serverInstallReadyNow: false,
    },
    nextStep: "BACKEND_STREAM_FOUNDATION_136J_LOCAL_STAGING_DOMAIN_EVENT_CONTRACTS",
  };
}
