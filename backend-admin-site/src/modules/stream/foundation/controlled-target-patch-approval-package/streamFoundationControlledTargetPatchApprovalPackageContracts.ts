export const STREAM_FOUNDATION_141G_CONTROLLED_TARGET_PATCH_APPROVAL_VERSION = "BACKEND-STREAM-FOUNDATION-141G" as const;

export type StreamFoundation141GApprovalTarget = "src/app.ts" | "src/modules/stream/index.ts";
export type StreamFoundation141GForbiddenTarget = "src/server.ts";

export interface StreamFoundation141GApprovalTargetItem {
  readonly targetFile: StreamFoundation141GApprovalTarget;
  readonly approvalPackageReady: true;
  readonly futurePatchPurpose: string;
  readonly exactApprovalRequiredBeforeWrite: true;
  readonly writeAllowedBy141G: false;
  readonly routeMountAllowedBy141G: false;
  readonly runtimePostAllowedBy141G: false;
  readonly runtimeSmokeAllowedBy141G: false;
  readonly backendRestartAllowedBy141G: false;
  readonly databaseWriteAllowedBy141G: false;
  readonly providerCallAllowedBy141G: false;
  readonly walletMutationAllowedBy141G: false;
  readonly paymentAuthorizationAllowedBy141G: false;
  readonly monthlyPayoutAllowedBy141G: false;
  readonly moneyMovementAllowedBy141G: false;
  readonly fakeSuccessAllowedBy141G: false;
  readonly requiredApprovalText: string;
}

export interface StreamFoundation141GApprovalPackageSnapshot {
  readonly version: typeof STREAM_FOUNDATION_141G_CONTROLLED_TARGET_PATCH_APPROVAL_VERSION;
  readonly stage: "controlled_source_only_target_patch_approval_package";
  readonly status: "target_patch_approval_ready_no_target_write";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-141F";
  readonly approvalTargets: readonly StreamFoundation141GApprovalTargetItem[];
  readonly forbiddenTargets: readonly StreamFoundation141GForbiddenTarget[];
  readonly totals: {
    readonly approvalTargets: 2;
    readonly forbiddenTargets: 1;
    readonly writeAllowedBy141G: 0;
    readonly routeMountAllowedBy141G: 0;
    readonly runtimePostAllowedBy141G: 0;
    readonly runtimeSmokeAllowedBy141G: 0;
    readonly backendRestartAllowedBy141G: 0;
    readonly databaseWriteAllowedBy141G: 0;
    readonly providerCallAllowedBy141G: 0;
    readonly walletMutationAllowedBy141G: 0;
    readonly moneyMovementAllowedBy141G: 0;
    readonly fakeSuccessAllowedBy141G: 0;
  };
  readonly safety: {
    readonly sourceOnly: true;
    readonly appTsChange: false;
    readonly serverTsChange: false;
    readonly streamIndexChange: false;
    readonly routeMountNow: false;
    readonly runtimeHttpBy141G: false;
    readonly runtimePostBy141G: false;
    readonly backendRestart: false;
    readonly databaseWrite: false;
    readonly providerCall: false;
    readonly walletMutation: false;
    readonly paymentAuthorization: false;
    readonly monthlyPayout: false;
    readonly moneyMovement: false;
    readonly fakeSuccess: false;
  };
}
