export const STREAM_FOUNDATION_141F_CONTROLLED_TARGET_PATCH_REVIEW_VERSION = "BACKEND-STREAM-FOUNDATION-141F" as const;

export type StreamFoundation141FTargetFile = "src/app.ts" | "src/modules/stream/index.ts" | "src/server.ts";
export type StreamFoundation141FReviewStatus =
  | "review_ready_no_write"
  | "selected_for_future_patch"
  | "forbidden_for_future_patch";

export interface StreamFoundation141FTargetPatchReviewItem {
  readonly targetFile: StreamFoundation141FTargetFile;
  readonly reviewStatus: StreamFoundation141FReviewStatus;
  readonly futurePatchPurpose: string;
  readonly exactTargetSelected: boolean;
  readonly writeAllowedBy141F: false;
  readonly routeMountAllowedBy141F: false;
  readonly runtimePostAllowedBy141F: false;
  readonly backendRestartAllowedBy141F: false;
  readonly databaseWriteAllowedBy141F: false;
  readonly providerCallAllowedBy141F: false;
  readonly walletMutationAllowedBy141F: false;
  readonly moneyMovementAllowedBy141F: false;
  readonly fakeSuccessAllowedBy141F: false;
  readonly reviewChecks: readonly string[];
}

export interface StreamFoundation141FTargetPatchReviewSnapshot {
  readonly version: typeof STREAM_FOUNDATION_141F_CONTROLLED_TARGET_PATCH_REVIEW_VERSION;
  readonly stage: "controlled_target_patch_review_package";
  readonly status: "target_patch_review_ready_no_write_no_mount";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-141E";
  readonly futureSelectedTargets: readonly ["src/app.ts", "src/modules/stream/index.ts"];
  readonly forbiddenTargets: readonly ["src/server.ts"];
  readonly reviewItems: readonly StreamFoundation141FTargetPatchReviewItem[];
  readonly totals: {
    readonly reviewItems: 3;
    readonly futureSelectedTargets: 2;
    readonly forbiddenTargets: 1;
    readonly actualWritesNow: 0;
    readonly routeMountNow: 0;
    readonly runtimePostNow: 0;
    readonly backendRestartNow: 0;
    readonly databaseWriteNow: 0;
    readonly providerCallNow: 0;
    readonly walletMutationNow: 0;
    readonly moneyMovementNow: 0;
    readonly fakeSuccessNow: 0;
  };
  readonly safety: {
    readonly sourceOnly: true;
    readonly appTsChange: false;
    readonly serverTsChange: false;
    readonly streamIndexChange: false;
    readonly routeMountNow: false;
    readonly runtimeHttpBy141F: false;
    readonly runtimePostBy141F: false;
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
