import { getStreamFoundationControlledTargetPatchApprovalPackageSnapshot } from "./controlled-target-patch-approval-package";

export const STREAM_141G_CONTROLLED_TARGET_PATCH_APPROVAL_PACKAGE_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141G",
  stage: "controlled_source_only_target_patch_approval_package",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141F",
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    routeMountNow: false,
    runtimeHttpBy141G: false,
    runtimePostBy141G: false,
    backendRestart: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationControlledTargetPatchApprovalPackageSnapshot(),
} as const;
