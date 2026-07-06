import { PLAY_READY_33_OWNER_APPROVAL_TEXT_FOR_PLAY_READY_34 } from "./play-ready-33-controlled-mount-approval-package-planning";

export const PLAY_READY_33_CONTROLLED_MOUNT_APPROVAL_PACKAGE_PLANNING_STAGING_MANIFEST = {
  version: "PLAY-READY-33",
  mode: "controlled_mount_approval_package_planning_source_only",
  sourceWritePerformed: true,
  runtimeRouteMounted: false,
  routeMountedInApp: false,
  appTsWriteAllowedNow: false,
  backendRestartAllowedNow: false,
  adminUiBuildAllowedNow: false,
  routeMountAllowedNext: false,
  sourceImplementationAllowedNextOnlyAfterOwnerApproval: true,
  plannedNextStage: "PLAY-READY-34",
  exactOwnerApprovalRequiredForNextStage: PLAY_READY_33_OWNER_APPROVAL_TEXT_FOR_PLAY_READY_34,
  plannedRoutes: 10,
  methods: ["GET"],
  requiresAdminAuth: true,
  readOnly: true,
  actualExpressRouterMounted: false,
  noDatabaseWrite: true,
  noProviderCall: true,
  noWalletStateChange: true,
  noMoneyMovement: true,
  noFakeSuccess: true
} as const;
