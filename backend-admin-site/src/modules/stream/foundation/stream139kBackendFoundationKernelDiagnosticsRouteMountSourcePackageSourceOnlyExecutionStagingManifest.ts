import { getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSmokeReport } from "./kernel-diagnostics-admin-runtime-route";
import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSmokeReport } from "./kernel-diagnostics-route-mount-source-package-source-only-execution";

export const STREAM_139K_BACKEND_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PACKAGE_SOURCE_ONLY_EXECUTION_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-139K",
  stage: "kernel diagnostics route mount source package source-only execution",
  patchScope: "src/modules/stream/foundation/** only",
  streamIndexPatchIncluded: false,
  appServerPatchIncluded: false,
  runtimeRouteSourceWrittenInFoundationNow: true,
  routeMountPerformedNow: false,
  runtimeHttpRequestPerformedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentAuthorizationAllowedNow: false,
  monthlyPayoutAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretsReturned: false,
  fakeSuccessAllowed: false,
  runtimeRouteSmoke: getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSmokeReport(),
  sourceOnlyExecutionSmoke: getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSmokeReport(),
  nextStage: "BACKEND-STREAM-FOUNDATION-139L kernel diagnostics route mount source package post-write verification",
} as const;
