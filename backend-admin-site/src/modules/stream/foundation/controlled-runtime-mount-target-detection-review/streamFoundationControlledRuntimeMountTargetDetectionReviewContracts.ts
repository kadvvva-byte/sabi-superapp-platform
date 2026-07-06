export const STREAM_FOUNDATION_141W_CONTROLLED_RUNTIME_MOUNT_TARGET_REVIEW_VERSION =
  "BACKEND-STREAM-FOUNDATION-141W" as const;

export type StreamFoundation141WTargetKind =
  | "new_source_only_foundation_folder"
  | "future_runtime_handler_folder"
  | "future_adapter_file"
  | "existing_blocked_handler_reference"
  | "forbidden_target_now";

export type StreamFoundation141WTargetStatus =
  | "reviewed_safe_for_future_source_plan"
  | "future_approval_required"
  | "forbidden_now"
  | "must_remain_unchanged_now";

export interface StreamFoundation141WTargetDetectionItem {
  readonly id: string;
  readonly kind: StreamFoundation141WTargetKind;
  readonly status: StreamFoundation141WTargetStatus;
  readonly path: string;
  readonly mayBeWrittenBy141W: false;
  readonly mayBeRuntimeMountedBy141W: false;
  readonly mayEnableSuccessBy141W: false;
  readonly mayTouchDatabaseBy141W: false;
  readonly mayCallProviderBy141W: false;
  readonly mayMutateWalletBy141W: false;
  readonly description: string;
}

export interface StreamFoundation141WControlledRuntimeMountTargetReviewSnapshot {
  readonly version: typeof STREAM_FOUNDATION_141W_CONTROLLED_RUNTIME_MOUNT_TARGET_REVIEW_VERSION;
  readonly stage: "controlled_runtime_mount_target_detection_and_source_patch_review";
  readonly status: "target_detection_review_ready_no_target_write";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-141V";
  readonly targetDetectionItems: readonly StreamFoundation141WTargetDetectionItem[];
  readonly patchReviewPolicy: {
    readonly futurePatchMayOnlyUseFoundationFolders: true;
    readonly appTsWriteAllowedNow: false;
    readonly serverTsWriteAllowedNow: false;
    readonly streamIndexWriteAllowedNow: false;
    readonly prismaSchemaWriteAllowedNow: false;
    readonly runtimeMountAllowedNow: false;
    readonly runtimeSuccessAllowedNow: false;
    readonly defaultBlockedHandlerMustRemain: true;
    readonly routesStayBlockedNow: true;
    readonly expectedCurrentStatusCode: 423;
  };
  readonly totals: {
    readonly targetDetectionItems: 12;
    readonly futureSafeTargets: 8;
    readonly forbiddenTargetsNow: 4;
    readonly targetWriteAllowedNow: 0;
    readonly runtimeMountAllowedNow: 0;
    readonly runtimeSuccessAllowedNow: 0;
    readonly databaseWriteAllowedNow: 0;
    readonly providerCallAllowedNow: 0;
    readonly walletMutationAllowedNow: 0;
    readonly moneyMovementAllowedNow: 0;
    readonly fakeSuccessAllowedNow: 0;
  };
  readonly safety: {
    readonly sourceOnly141W: true;
    readonly appTsChangeBy141W: false;
    readonly serverTsChangeBy141W: false;
    readonly streamIndexChangeBy141W: false;
    readonly schemaMigrationBy141W: false;
    readonly backendRestartBy141W: false;
    readonly runtimeHttpBy141W: false;
    readonly runtimePostBy141W: false;
    readonly databaseReadBy141W: false;
    readonly databaseWriteBy141W: false;
    readonly providerCallBy141W: false;
    readonly providerSecretReadBy141W: false;
    readonly walletMutationBy141W: false;
    readonly paymentAuthorizationBy141W: false;
    readonly monthlyPayoutBy141W: false;
    readonly moneyMovementBy141W: false;
    readonly fakeSuccessBy141W: false;
  };
}
