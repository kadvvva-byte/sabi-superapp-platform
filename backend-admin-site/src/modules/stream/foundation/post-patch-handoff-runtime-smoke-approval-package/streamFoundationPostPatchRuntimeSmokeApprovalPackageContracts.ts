export const STREAM_FOUNDATION_142P_POST_PATCH_RUNTIME_SMOKE_APPROVAL_VERSION =
  "BACKEND-STREAM-FOUNDATION-142P" as const;

export type StreamFoundation142PRuntimeSmokeRouteId =
  | "runtime_smoke_stream_live_start"
  | "runtime_smoke_stream_live_stop"
  | "runtime_smoke_stream_live_heartbeat";

export interface StreamFoundation142PRuntimeSmokeApprovalRoute {
  readonly id: StreamFoundation142PRuntimeSmokeRouteId;
  readonly method: "POST";
  readonly path: "/api/stream/live/start" | "/api/stream/live/stop" | "/api/stream/live/heartbeat";
  readonly expectedStatusCode: 423;
  readonly expectedBlockedBehavior: true;
  readonly allowedOnlyAfter142QApproval: true;
  readonly requestBodySafeFieldsOnly: readonly [
    "actorUserId",
    "roomId",
    "clientRequestId",
    "deviceSessionId",
    "locale"
  ];
  readonly databaseWriteAllowed: false;
  readonly providerCallAllowed: false;
  readonly walletMutationAllowed: false;
  readonly paymentAuthorizationAllowed: false;
  readonly monthlyPayoutAllowed: false;
  readonly moneyMovementAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundation142PPostPatchRuntimeSmokeApprovalSnapshot {
  readonly version: typeof STREAM_FOUNDATION_142P_POST_PATCH_RUNTIME_SMOKE_APPROVAL_VERSION;
  readonly stage: "post_patch_handoff_and_controlled_blocked_route_runtime_smoke_approval_package";
  readonly status: "post_patch_handoff_ready_next_exact_approval_required";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-142O-FIX2";
  readonly verification142OFix2: {
    readonly ok: true;
    readonly routeBindingPassed: 3;
    readonly routeBindingFailed: 0;
    readonly runtimeImportOk: true;
    readonly runtimeHandlerReadinessPassed: 3;
    readonly runtimeHandlerReadinessFailed: 0;
    readonly routePatchContextSafetyOk: true;
    readonly tscExitCode: 0;
    readonly runtimeHttpPerformed: 0;
    readonly runtimePostPerformed: 0;
    readonly backendRestartPerformed: 0;
    readonly databaseReadPerformed: 0;
    readonly databaseWritePerformed: 0;
    readonly providerCallPerformed: 0;
    readonly walletMutationPerformed: 0;
    readonly moneyMovementPerformed: 0;
    readonly fakeSuccessAllowed: false;
  };
  readonly runtimeSmokeApprovalRoutes: readonly StreamFoundation142PRuntimeSmokeApprovalRoute[];
  readonly requiredExactApprovalTextFor142Q: string;
  readonly nextApprovalPolicy: {
    readonly exactApprovalRequiredBefore142Q: true;
    readonly nextStageMayRunRuntimePostSmoke: true;
    readonly nextStageMustUseLocalBackendOnly: true;
    readonly nextStageMustExpect423Blocked: true;
    readonly backendRestartAllowedFor142Q: false;
    readonly sourceWriteAllowedFor142Q: false;
    readonly databaseWriteAllowedFor142Q: false;
    readonly providerCallAllowedFor142Q: false;
    readonly walletMutationAllowedFor142Q: false;
    readonly paymentAuthorizationAllowedFor142Q: false;
    readonly monthlyPayoutAllowedFor142Q: false;
    readonly moneyMovementAllowedFor142Q: false;
    readonly fakeSuccessAllowedFor142Q: false;
    readonly expectedStatusCodeForAllRoutes: 423;
  };
  readonly totals: {
    readonly approvalRoutes: 3;
    readonly runtimePostAllowedBy142P: 0;
    readonly runtimePostAllowedFor142QAfterApproval: 3;
    readonly backendRestartAllowedFor142Q: 0;
    readonly databaseWriteAllowedFor142Q: 0;
    readonly providerCallAllowedFor142Q: 0;
    readonly walletMutationAllowedFor142Q: 0;
    readonly moneyMovementAllowedFor142Q: 0;
    readonly fakeSuccessAllowedFor142Q: 0;
  };
  readonly safety: {
    readonly sourceOnly142P: true;
    readonly targetWriteBy142P: false;
    readonly backendRestartBy142P: false;
    readonly runtimeHttpBy142P: false;
    readonly runtimePostBy142P: false;
    readonly databaseReadBy142P: false;
    readonly databaseWriteBy142P: false;
    readonly providerCallBy142P: false;
    readonly providerSecretReadBy142P: false;
    readonly walletMutationBy142P: false;
    readonly paymentAuthorizationBy142P: false;
    readonly monthlyPayoutBy142P: false;
    readonly moneyMovementBy142P: false;
    readonly fakeSuccessBy142P: false;
  };
}
