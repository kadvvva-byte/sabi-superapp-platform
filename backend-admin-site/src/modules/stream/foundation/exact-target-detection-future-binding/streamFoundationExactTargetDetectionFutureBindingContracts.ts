export const STREAM_FOUNDATION_141E_EXACT_TARGET_DETECTION_VERSION = "BACKEND-STREAM-FOUNDATION-141E" as const;

export type StreamFoundation141ETargetFile =
  | "src/app.ts"
  | "src/modules/stream/index.ts"
  | "src/server.ts";

export type StreamFoundation141ETargetRole =
  | "future_route_mount_candidate"
  | "future_export_candidate"
  | "forbidden_runtime_server_target";

export interface StreamFoundation141ETargetDetectionItem {
  readonly targetFile: StreamFoundation141ETargetFile;
  readonly targetRole: StreamFoundation141ETargetRole;
  readonly detectedForFutureBinding: boolean;
  readonly exactTargetSelected: boolean;
  readonly writeAllowedNow: false;
  readonly mountAllowedNow: false;
  readonly runtimePostAllowedNow: false;
  readonly backendRestartAllowedNow: false;
  readonly reason: string;
}

export interface StreamFoundation141EExactTargetDetectionSnapshot {
  readonly version: typeof STREAM_FOUNDATION_141E_EXACT_TARGET_DETECTION_VERSION;
  readonly stage: "exact_target_detection_for_future_binding_patch";
  readonly status: "future_targets_detected_no_write_no_mount";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-141D";
  readonly targetDetectionItems: readonly StreamFoundation141ETargetDetectionItem[];
  readonly selectedFuturePatchTargets: readonly ["src/app.ts", "src/modules/stream/index.ts"];
  readonly forbiddenRuntimeTargets: readonly ["src/server.ts"];
  readonly totals: {
    readonly targetItems: 3;
    readonly selectedFuturePatchTargets: 2;
    readonly forbiddenRuntimeTargets: 1;
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
    readonly runtimeHttpBy141E: false;
    readonly runtimePostBy141E: false;
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
