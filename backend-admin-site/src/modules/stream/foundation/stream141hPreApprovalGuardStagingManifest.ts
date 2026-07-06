import { getStreamFoundationControlledTargetPatchWritePreApprovalGuardSnapshot } from "./controlled-target-patch-write-pre-approval-guard";

export const STREAM_141H_PRE_APPROVAL_GUARD_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141H-PRE",
  stage: "controlled_target_patch_write_pre_approval_guard",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141G",
  targetWriteAllowedNow: false,
  exactApprovalRequired: true,
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    routeMountNow: false,
    runtimeHttpBy141HPre: false,
    runtimePostBy141HPre: false,
    backendRestart: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationControlledTargetPatchWritePreApprovalGuardSnapshot(),
} as const;
