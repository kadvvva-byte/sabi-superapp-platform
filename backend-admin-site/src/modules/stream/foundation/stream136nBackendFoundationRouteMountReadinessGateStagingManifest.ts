import { getStreamFoundationRouteMountReadinessGateSnapshot } from "./route-mount";

export type Stream136NBackendFoundationRouteMountReadinessGateManifest = Readonly<{
  stage: "BACKEND_STREAM_FOUNDATION_136N";
  title: "route_mount_readiness_gate_local_staging_patch";
  localStagingOnly: true;
  patchOnly: true;
  serverInstallAllowedNow: false;
  appServerMutationAllowedNow: false;
  routeMountAllowedNow: false;
  expressRouterBindingAllowedNow: false;
  middlewareBindingAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeSuccessAllowed: false;
  routeMountReadiness: ReturnType<typeof getStreamFoundationRouteMountReadinessGateSnapshot>;
}>;

export function getStream136NBackendFoundationRouteMountReadinessGateManifest(): Stream136NBackendFoundationRouteMountReadinessGateManifest {
  return {
    stage: "BACKEND_STREAM_FOUNDATION_136N",
    title: "route_mount_readiness_gate_local_staging_patch",
    localStagingOnly: true,
    patchOnly: true,
    serverInstallAllowedNow: false,
    appServerMutationAllowedNow: false,
    routeMountAllowedNow: false,
    expressRouterBindingAllowedNow: false,
    middlewareBindingAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletRuntimeMutationAllowedNow: false,
    messengerRuntimeMutationAllowedNow: false,
    giftsPaymentsRuntimeMutationAllowedNow: false,
    fakeSuccessAllowed: false,
    routeMountReadiness: getStreamFoundationRouteMountReadinessGateSnapshot(),
  };
}
