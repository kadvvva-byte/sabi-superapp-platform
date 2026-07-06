import {
  PLAY_READY_36_OWNER_APPROVAL_TEXT_FOR_PLAY_READY_37,
  playReady36ControlledRouteMountPreflightPackagePlanning
} from "./play-ready-36-controlled-route-mount-preflight-package-planning";

export const PLAY_READY_36_CONTROLLED_ROUTE_MOUNT_PREFLIGHT_PACKAGE_PLANNING_STAGING_MANIFEST = {
  ...playReady36ControlledRouteMountPreflightPackagePlanning,
  sourceWritePerformed: true,
  routeMountExecutedNow: false,
  runtimeRouteMounted: false,
  routeMountedInApp: false,
  actualExpressRouterMounted: false,
  appTsWritePerformed: false,
  appTsWriteAllowedNow: false,
  backendRestartPerformed: false,
  backendRestartAllowedNow: false,
  adminUiBuildPerformed: false,
  adminUiBuildAllowedNow: false,
  runtimeDbWritePerformed: false,
  providerExecutionPerformed: false,
  walletStateChangePerformed: false,
  moneyMovementPerformed: false,
  fakeSuccessPerformed: false,
  exactOwnerApprovalRequiredForNextStage: PLAY_READY_36_OWNER_APPROVAL_TEXT_FOR_PLAY_READY_37
} as const;
