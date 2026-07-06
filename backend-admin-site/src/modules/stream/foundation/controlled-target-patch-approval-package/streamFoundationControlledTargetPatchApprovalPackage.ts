import {
  STREAM_FOUNDATION_141G_CONTROLLED_TARGET_PATCH_APPROVAL_VERSION,
  type StreamFoundation141GApprovalPackageSnapshot,
  type StreamFoundation141GApprovalTarget,
  type StreamFoundation141GApprovalTargetItem,
} from "./streamFoundationControlledTargetPatchApprovalPackageContracts";

function approvalTarget(
  targetFile: StreamFoundation141GApprovalTarget,
  futurePatchPurpose: string,
): StreamFoundation141GApprovalTargetItem {
  return {
    targetFile,
    approvalPackageReady: true,
    futurePatchPurpose,
    exactApprovalRequiredBeforeWrite: true,
    writeAllowedBy141G: false,
    routeMountAllowedBy141G: false,
    runtimePostAllowedBy141G: false,
    runtimeSmokeAllowedBy141G: false,
    backendRestartAllowedBy141G: false,
    databaseWriteAllowedBy141G: false,
    providerCallAllowedBy141G: false,
    walletMutationAllowedBy141G: false,
    paymentAuthorizationAllowedBy141G: false,
    monthlyPayoutAllowedBy141G: false,
    moneyMovementAllowedBy141G: false,
    fakeSuccessAllowedBy141G: false,
    requiredApprovalText:
      "I approve BACKEND-STREAM-FOUNDATION-141H controlled target patch write package only for " +
      targetFile +
      ", no src/server.ts change, no backend restart, no runtime POST smoke, no DB write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success.",
  };
}

const APPROVAL_TARGETS: readonly StreamFoundation141GApprovalTargetItem[] = [
  approvalTarget(
    "src/app.ts",
    "Future controlled route binding write target after exact approval only.",
  ),
  approvalTarget(
    "src/modules/stream/index.ts",
    "Future controlled Stream module export write target after exact approval only.",
  ),
];

export function getStreamFoundationControlledTargetPatchApprovalPackageSnapshot(): StreamFoundation141GApprovalPackageSnapshot {
  return {
    version: STREAM_FOUNDATION_141G_CONTROLLED_TARGET_PATCH_APPROVAL_VERSION,
    stage: "controlled_source_only_target_patch_approval_package",
    status: "target_patch_approval_ready_no_target_write",
    previousStage: "BACKEND-STREAM-FOUNDATION-141F",
    approvalTargets: APPROVAL_TARGETS,
    forbiddenTargets: ["src/server.ts"],
    totals: {
      approvalTargets: 2,
      forbiddenTargets: 1,
      writeAllowedBy141G: 0,
      routeMountAllowedBy141G: 0,
      runtimePostAllowedBy141G: 0,
      runtimeSmokeAllowedBy141G: 0,
      backendRestartAllowedBy141G: 0,
      databaseWriteAllowedBy141G: 0,
      providerCallAllowedBy141G: 0,
      walletMutationAllowedBy141G: 0,
      moneyMovementAllowedBy141G: 0,
      fakeSuccessAllowedBy141G: 0,
    },
    safety: {
      sourceOnly: true,
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
  };
}
