export const STREAM_FOUNDATION_142W_POST_BODY_CAPTURE_HANDOFF_VERSION =
  "BACKEND-STREAM-FOUNDATION-142W" as const;

export type StreamFoundation142WRouteId =
  | "stream_live_start"
  | "stream_live_stop"
  | "stream_live_heartbeat";

export interface StreamFoundation142WRouteBodyCaptureResult {
  readonly id: StreamFoundation142WRouteId;
  readonly path: "/api/stream/live/start" | "/api/stream/live/stop" | "/api/stream/live/heartbeat";
  readonly actualStatusCode: 423;
  readonly statusDescription: "Locked";
  readonly contentType: "application/json; charset=utf-8";
  readonly bodyIsEmpty: false;
  readonly jsonParseOk: true;
  readonly jsonBlockedEnvelopePresent: true;
  readonly jsonSafetyFlagsOk: true;
  readonly forbiddenSuccessFragmentsOk: true;
  readonly diagnosis: "json_blocked_envelope_present";
  readonly ok: true;
}

export interface StreamFoundation142WPostBodyCaptureHandoffSnapshot {
  readonly version: typeof STREAM_FOUNDATION_142W_POST_BODY_CAPTURE_HANDOFF_VERSION;
  readonly stage: "post_body_capture_handoff";
  readonly status: "post_body_capture_verified_no_envelope_patch_needed";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-142V-FIX2";
  readonly bodyCapture142VFix2: {
    readonly ok: true;
    readonly status: "controlled_blocked_response_body_capture_diagnosis_runtime_smoke_passed";
    readonly captureMethod: "System.Net.WebRequest + WebException.Response stream";
    readonly sourceReadinessPassed: 2;
    readonly sourceReadinessFailed: 0;
    readonly expectedRoutes: 3;
    readonly attemptedRoutes: 3;
    readonly passedRoutes: 3;
    readonly failedRoutes: 0;
    readonly jsonBlockedEnvelopeRoutes: 3;
    readonly emptyBodyRoutes: 0;
    readonly nonJsonBodyRoutes: 0;
    readonly jsonMissingExpectedBlockedFieldsRoutes: 0;
    readonly allRoutesReturned423: true;
    readonly allRoutesNoFakeSuccess: true;
    readonly conclusion: "all_routes_return_json_blocked_envelopes";
    readonly tscExitCode: 0;
    readonly sourceMutationPerformed: 0;
    readonly backendRestartPerformed: 0;
    readonly runtimeHttpPerformed: 3;
    readonly runtimePostPerformed: 3;
    readonly databaseReadPerformed: 0;
    readonly databaseWritePerformed: 0;
    readonly providerCallPerformed: 0;
    readonly providerSecretReadPerformed: 0;
    readonly walletMutationPerformed: 0;
    readonly paymentAuthorizationPerformed: 0;
    readonly monthlyPayoutPerformed: 0;
    readonly moneyMovementPerformed: 0;
    readonly fakeSuccessAllowed: false;
  };
  readonly routeResults: readonly StreamFoundation142WRouteBodyCaptureResult[];
  readonly handoffDecision: {
    readonly blockedEnvelopeBodyPatchNeeded: false;
    readonly targetPatchForEnvelopeBodyNeeded: false;
    readonly continueFoundationWork: true;
    readonly preserve423BlockedUntilRuntimeMountApproval: true;
    readonly sourceShapeCorrect: true;
    readonly responseBodyCaptureCorrect: true;
    readonly noFakeSuccessObserved: true;
    readonly noProviderOrWalletObserved: true;
    readonly noMoneyMovementObserved: true;
  };
  readonly requiredExactApprovalTextFor142X: string;
  readonly nextApprovalPolicy: {
    readonly exactApprovalRequiredBefore142X: true;
    readonly nextStageIsSourceOnlyPlanning: true;
    readonly nextStageMayPlanNextLiveRuntimeFoundationBatch: true;
    readonly targetWriteAllowedFor142X: false;
    readonly routeBehaviorChangeAllowedFor142X: false;
    readonly backendRestartAllowedFor142X: false;
    readonly runtimePostAllowedFor142X: false;
    readonly databaseWriteAllowedFor142X: false;
    readonly providerCallAllowedFor142X: false;
    readonly walletMutationAllowedFor142X: false;
    readonly moneyMovementAllowedFor142X: false;
    readonly fakeSuccessAllowedFor142X: false;
  };
  readonly safety: {
    readonly sourceOnly142W: true;
    readonly targetWriteBy142W: false;
    readonly appTsChangeBy142W: false;
    readonly serverTsChangeBy142W: false;
    readonly streamIndexChangeBy142W: false;
    readonly backendRestartBy142W: false;
    readonly runtimeHttpBy142W: false;
    readonly runtimePostBy142W: false;
    readonly databaseReadBy142W: false;
    readonly databaseWriteBy142W: false;
    readonly providerCallBy142W: false;
    readonly providerSecretReadBy142W: false;
    readonly walletMutationBy142W: false;
    readonly paymentAuthorizationBy142W: false;
    readonly monthlyPayoutBy142W: false;
    readonly moneyMovementBy142W: false;
    readonly fakeSuccessBy142W: false;
  };
}
