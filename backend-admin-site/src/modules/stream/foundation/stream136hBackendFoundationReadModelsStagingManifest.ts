import { getStreamFoundationReadinessIndex, getStreamFoundationSafetyAudit } from "./core";
import { getStreamFoundationApiContractSnapshot } from "./api";
import { getStreamFoundationReadModelContracts, getStreamFoundationReadModelSnapshotIndex } from "./read-models";

export const STREAM_136H_BACKEND_FOUNDATION_READ_MODELS_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-136H" as const;

export type Stream136HBackendFoundationReadModelsStagingManifest = Readonly<{
  version: typeof STREAM_136H_BACKEND_FOUNDATION_READ_MODELS_STAGING_VERSION;
  scope: "backend_stream_foundation_local_staging_only";
  purpose: "source_only_read_model_contracts_for_stream_mobile_ui";
  pipeline: readonly string[];
  readModels: Readonly<{
    total: number;
    blocked: number;
    reviewRequired: number;
    locked: number;
    databaseReadReadyNow: 0;
    realtimeSubscriptionReadyNow: 0;
    mediaSignedUrlReadyNow: 0;
    fakeRowsAllowedNow: 0;
  }>;
  upstream: Readonly<{
    apiEndpointContracts: number;
    readinessTotalActions: number;
    safetyAuditPassed: boolean;
  }>;
  safety: Readonly<{
    sourceOnlyNow: true;
    routeMountAllowedNow: false;
    runtimeExecutionAllowedNow: false;
    databaseReadAllowedNow: false;
    databaseWriteAllowedNow: false;
    providerCallAllowedNow: false;
    externalNetworkAllowedNow: false;
    walletRuntimeMutationAllowedNow: false;
    messengerRuntimeMutationAllowedNow: false;
    giftsPaymentsRuntimeMutationAllowedNow: false;
    fakeRowsAllowed: false;
    fakeCountersAllowed: false;
    fakeSuccessAllowed: false;
    serverInstallReadyNow: false;
  }>;
  nextStep: "BACKEND_STREAM_FOUNDATION_136I_LOCAL_STAGING_WRITE_MODEL_COMMAND_CONTRACTS";
}>;

export function getStream136HBackendFoundationReadModelsStagingManifest(): Stream136HBackendFoundationReadModelsStagingManifest {
  const contracts = getStreamFoundationReadModelContracts();
  const snapshots = getStreamFoundationReadModelSnapshotIndex();
  const api = getStreamFoundationApiContractSnapshot();
  const readiness = getStreamFoundationReadinessIndex();
  const safetyAudit = getStreamFoundationSafetyAudit();

  return {
    version: STREAM_136H_BACKEND_FOUNDATION_READ_MODELS_STAGING_VERSION,
    scope: "backend_stream_foundation_local_staging_only",
    purpose: "source_only_read_model_contracts_for_stream_mobile_ui",
    pipeline: [
      "mobile_stream_ui_135z_handoff",
      "136d_core_contracts",
      "136e_ports_adapters_noop",
      "136f_orchestrator_source_only",
      "136g_api_contract_no_mount",
      "136h_read_model_contracts_empty_safe_snapshots",
      "136i_write_model_command_contracts_later",
      "server_install_later_after_owner_approval",
    ],
    readModels: {
      total: contracts.length,
      blocked: snapshots.blockedReadModels,
      reviewRequired: snapshots.reviewRequiredReadModels,
      locked: snapshots.lockedReadModels,
      databaseReadReadyNow: snapshots.databaseReadReadyNow,
      realtimeSubscriptionReadyNow: snapshots.realtimeSubscriptionReadyNow,
      mediaSignedUrlReadyNow: snapshots.mediaSignedUrlReadyNow,
      fakeRowsAllowedNow: snapshots.fakeRowsAllowedNow,
    },
    upstream: {
      apiEndpointContracts: api.endpointContracts.length,
      readinessTotalActions: readiness.totalActions,
      safetyAuditPassed: safetyAudit.passed,
    },
    safety: {
      sourceOnlyNow: true,
      routeMountAllowedNow: false,
      runtimeExecutionAllowedNow: false,
      databaseReadAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      externalNetworkAllowedNow: false,
      walletRuntimeMutationAllowedNow: false,
      messengerRuntimeMutationAllowedNow: false,
      giftsPaymentsRuntimeMutationAllowedNow: false,
      fakeRowsAllowed: false,
      fakeCountersAllowed: false,
      fakeSuccessAllowed: false,
      serverInstallReadyNow: false,
    },
    nextStep: "BACKEND_STREAM_FOUNDATION_136I_LOCAL_STAGING_WRITE_MODEL_COMMAND_CONTRACTS",
  };
}
