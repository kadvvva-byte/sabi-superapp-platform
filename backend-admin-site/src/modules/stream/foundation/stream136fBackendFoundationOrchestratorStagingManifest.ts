import { getStreamFoundationReadinessIndex, getStreamFoundationSafetyAudit } from "./core";
import { getStreamFoundationPortRegistrySnapshot } from "./ports";
import { getStreamFoundationOrchestratorSnapshot } from "./orchestrator";

export const STREAM_136F_BACKEND_FOUNDATION_ORCHESTRATOR_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-136F" as const;

export type Stream136FBackendFoundationOrchestratorStagingManifest = Readonly<{
  version: typeof STREAM_136F_BACKEND_FOUNDATION_ORCHESTRATOR_STAGING_VERSION;
  scope: "backend_local_staging_only";
  purpose: "source_only_stream_foundation_orchestrator";
  pipeline: readonly string[];
  checks: Readonly<{
    readinessTotalActions: number;
    registeredPorts: number;
    orchestratorTotalCases: number;
    orchestratorPassedCases: number;
    orchestratorFailedCases: number;
    safetyAuditPassed: boolean;
  }>;
  safety: Readonly<{
    routeMountAllowedNow: false;
    runtimeExecutionAllowedNow: false;
    databaseWriteAllowedNow: false;
    providerCallAllowedNow: false;
    externalNetworkAllowedNow: false;
    walletRuntimeMutationAllowedNow: false;
    messengerRuntimeMutationAllowedNow: false;
    giftsPaymentsRuntimeMutationAllowedNow: false;
    fakeSuccessAllowed: false;
    serverInstallReadyNow: false;
  }>;
  nextStep: "BACKEND_STREAM_FOUNDATION_136G_LOCAL_STAGING_ROUTES_CONTRACTS_NO_MOUNT";
}>;

export function getStream136FBackendFoundationOrchestratorStagingManifest(): Stream136FBackendFoundationOrchestratorStagingManifest {
  const readiness = getStreamFoundationReadinessIndex();
  const ports = getStreamFoundationPortRegistrySnapshot();
  const orchestrator = getStreamFoundationOrchestratorSnapshot();
  const safetyAudit = getStreamFoundationSafetyAudit();

  return {
    version: STREAM_136F_BACKEND_FOUNDATION_ORCHESTRATOR_STAGING_VERSION,
    scope: "backend_local_staging_only",
    purpose: "source_only_stream_foundation_orchestrator",
    pipeline: [
      "mobile_stream_ui_135z_handoff",
      "136d_core_contracts",
      "136e_service_ports_blocking_adapters",
      "136f_source_only_orchestrator",
      "136g_route_contracts_no_mount_later",
      "server_install_later_after_owner_approval",
    ],
    checks: {
      readinessTotalActions: readiness.totalActions,
      registeredPorts: ports.totalPorts,
      orchestratorTotalCases: orchestrator.totalCases,
      orchestratorPassedCases: orchestrator.passedCases,
      orchestratorFailedCases: orchestrator.failedCases,
      safetyAuditPassed: safetyAudit.passed,
    },
    safety: {
      routeMountAllowedNow: false,
      runtimeExecutionAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      externalNetworkAllowedNow: false,
      walletRuntimeMutationAllowedNow: false,
      messengerRuntimeMutationAllowedNow: false,
      giftsPaymentsRuntimeMutationAllowedNow: false,
      fakeSuccessAllowed: false,
      serverInstallReadyNow: false,
    },
    nextStep: "BACKEND_STREAM_FOUNDATION_136G_LOCAL_STAGING_ROUTES_CONTRACTS_NO_MOUNT",
  };
}
