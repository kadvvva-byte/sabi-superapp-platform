import { getStreamFoundation137WKernelBridgeReadiness } from "./kernel-bridge/streamFoundationKernelBridgeReadiness";
import { runStreamFoundation137WKernelBridgeSmoke } from "./kernel-bridge/streamFoundationKernelBridgeSmoke";

export const STREAM_137W_BACKEND_FOUNDATION_KERNEL_BRIDGE_BOUNDARY_STAGING_MANIFEST_VERSION = "BACKEND-STREAM-FOUNDATION-137W" as const;

export interface Stream137WBackendFoundationKernelBridgeBoundaryStagingManifest {
  readonly version: typeof STREAM_137W_BACKEND_FOUNDATION_KERNEL_BRIDGE_BOUNDARY_STAGING_MANIFEST_VERSION;
  readonly stage: "kernel_bridge_boundary_staging";
  readonly scope: "src/modules/stream/foundation_only";
  readonly streamIndexPatchIncluded: false;
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
  readonly readiness: ReturnType<typeof getStreamFoundation137WKernelBridgeReadiness>;
  readonly smoke: ReturnType<typeof runStreamFoundation137WKernelBridgeSmoke>;
  readonly nextStage: "137X_kernel_facade_connection_contracts_foundation_only";
}

export function getStream137WBackendFoundationKernelBridgeBoundaryStagingManifest(): Stream137WBackendFoundationKernelBridgeBoundaryStagingManifest {
  return {
    version: STREAM_137W_BACKEND_FOUNDATION_KERNEL_BRIDGE_BOUNDARY_STAGING_MANIFEST_VERSION,
    stage: "kernel_bridge_boundary_staging",
    scope: "src/modules/stream/foundation_only",
    streamIndexPatchIncluded: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    readiness: getStreamFoundation137WKernelBridgeReadiness(),
    smoke: runStreamFoundation137WKernelBridgeSmoke(),
    nextStage: "137X_kernel_facade_connection_contracts_foundation_only",
  };
}
