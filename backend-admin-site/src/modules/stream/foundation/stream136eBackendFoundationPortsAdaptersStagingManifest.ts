import { getStreamFoundationReadinessIndex } from "./core";
import {
  getStreamFoundationNoopAdapterSnapshot,
  getStreamFoundationPortRegistrySnapshot,
} from "./ports";

export const STREAM_136E_BACKEND_FOUNDATION_PORTS_ADAPTERS_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-136E" as const;

export type Stream136EBackendFoundationPortsAdaptersStagingManifest = Readonly<{
  version: typeof STREAM_136E_BACKEND_FOUNDATION_PORTS_ADAPTERS_STAGING_VERSION;
  mode: "local_staging_only";
  scope: "backend_stream_foundation_only";
  previousStage: "BACKEND-STREAM-FOUNDATION-136D";
  nextStage: "BACKEND-STREAM-FOUNDATION-136F";
  pipeline: readonly string[];
  registry: ReturnType<typeof getStreamFoundationPortRegistrySnapshot>;
  noopAdapters: ReturnType<typeof getStreamFoundationNoopAdapterSnapshot>;
  readiness: ReturnType<typeof getStreamFoundationReadinessIndex>;
  safety: Readonly<{
    sourceOnlyNow: true;
    routeMountAllowedNow: false;
    runtimeExecutionAllowedNow: false;
    databaseWriteAllowedNow: false;
    providerCallAllowedNow: false;
    externalNetworkAllowedNow: false;
    walletRuntimeMutationAllowedNow: false;
    messengerRuntimeMutationAllowedNow: false;
    giftsPaymentsRuntimeMutationAllowedNow: false;
    fakeSuccessAllowed: false;
    secretMaterialAllowedInResponse: false;
  }>;
}>;

export function getStream136EBackendFoundationPortsAdaptersStagingManifest(): Stream136EBackendFoundationPortsAdaptersStagingManifest {
  return {
    version: STREAM_136E_BACKEND_FOUNDATION_PORTS_ADAPTERS_STAGING_VERSION,
    mode: "local_staging_only",
    scope: "backend_stream_foundation_only",
    previousStage: "BACKEND-STREAM-FOUNDATION-136D",
    nextStage: "BACKEND-STREAM-FOUNDATION-136F",
    pipeline: [
      "mobile_stream_ui_handoff_135z",
      "backend_stream_foundation_136d_core_contracts",
      "backend_stream_foundation_136e_ports_registry",
      "backend_stream_foundation_136e_noop_blocking_adapters",
      "runtime_adapters_later_after_owner_approval",
    ],
    registry: getStreamFoundationPortRegistrySnapshot(),
    noopAdapters: getStreamFoundationNoopAdapterSnapshot(),
    readiness: getStreamFoundationReadinessIndex(),
    safety: {
      sourceOnlyNow: true,
      routeMountAllowedNow: false,
      runtimeExecutionAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      externalNetworkAllowedNow: false,
      walletRuntimeMutationAllowedNow: false,
      messengerRuntimeMutationAllowedNow: false,
      giftsPaymentsRuntimeMutationAllowedNow: false,
      fakeSuccessAllowed: false,
      secretMaterialAllowedInResponse: false,
    },
  };
}
