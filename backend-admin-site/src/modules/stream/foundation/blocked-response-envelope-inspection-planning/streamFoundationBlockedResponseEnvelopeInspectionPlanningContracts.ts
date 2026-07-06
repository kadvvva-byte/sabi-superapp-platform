export const STREAM_FOUNDATION_142S_BLOCKED_RESPONSE_ENVELOPE_PLANNING_VERSION =
  "BACKEND-STREAM-FOUNDATION-142S" as const;

export type StreamFoundation142SEmptyBodyHypothesisId =
  | "powershell_non_2xx_body_capture_gap"
  | "express_423_json_body_not_serialized"
  | "runtime_handler_envelope_undefined_or_non_json"
  | "response_interceptor_or_error_middleware_swallowing_body"
  | "client_capture_needs_response_stream_fallback";

export type StreamFoundation142SEmptyBodyHypothesisStatus =
  | "needs_source_inspection"
  | "needs_ops_runner_verification"
  | "must_preserve_423_blocked"
  | "not_success_signal";

export interface StreamFoundation142SEmptyBodyHypothesis {
  readonly id: StreamFoundation142SEmptyBodyHypothesisId;
  readonly status: StreamFoundation142SEmptyBodyHypothesisStatus;
  readonly description: string;
  readonly inspectionTargets: readonly string[];
  readonly preserveStatusCode423: true;
  readonly allowRuntimePostIn142S: false;
  readonly allowTargetWriteIn142S: false;
  readonly allowDatabaseWrite: false;
  readonly allowProviderCall: false;
  readonly allowWalletMutation: false;
  readonly allowMoneyMovement: false;
  readonly allowFakeSuccess: false;
}

export type StreamFoundation142SNormalizationPlanStepId =
  | "inspect_app_route_response_shape"
  | "inspect_142c_runtime_handler_envelope"
  | "inspect_142q_response_capture"
  | "draft_json_blocked_envelope_requirement"
  | "prepare_future_patch_only_if_needed";

export interface StreamFoundation142SNormalizationPlanStep {
  readonly id: StreamFoundation142SNormalizationPlanStepId;
  readonly description: string;
  readonly currentStageAction: "plan_only";
  readonly futureStageRequired: "142T_ops_inspection" | "future_exact_target_patch_if_needed";
  readonly preserveStatusCode423: true;
  readonly sourceWriteAllowedNow: false;
  readonly runtimePostAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowedNow: false;
}

export interface StreamFoundation142SBlockedResponseEnvelopeInspectionPlanningSnapshot {
  readonly version: typeof STREAM_FOUNDATION_142S_BLOCKED_RESPONSE_ENVELOPE_PLANNING_VERSION;
  readonly stage: "blocked_response_envelope_inspection_and_normalization_planning_only";
  readonly status: "blocked_response_envelope_planning_ready";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-142R";
  readonly ownerApprovalAccepted: true;
  readonly ownerApprovalText: string;
  readonly evidenceFrom142QAnd142R: {
    readonly runtimeSmokePassed: true;
    readonly routesAttempted: 3;
    readonly routesReturned423: 3;
    readonly responseBodiesEmpty: true;
    readonly responseJsonParseOk: false;
    readonly noForbiddenSuccessFragments: true;
    readonly tscExitCode: 0;
    readonly sourceMutationPerformed: 0;
    readonly backendRestartPerformed: 0;
    readonly databaseWritePerformed: 0;
    readonly providerCallPerformed: 0;
    readonly walletMutationPerformed: 0;
    readonly moneyMovementPerformed: 0;
    readonly fakeSuccessAllowed: false;
  };
  readonly planningDecision: {
    readonly emptyBodyIsNotSuccess: true;
    readonly preserve423BlockedAsPrimarySafetyRequirement: true;
    readonly jsonBlockedEnvelopeRestorationMayBeNeeded: true;
    readonly currentStageIsPlanningOnly: true;
    readonly targetWriteAllowedNow: false;
    readonly runtimePostAllowedNow: false;
    readonly backendRestartAllowedNow: false;
  };
  readonly emptyBodyHypotheses: readonly StreamFoundation142SEmptyBodyHypothesis[];
  readonly normalizationPlanSteps: readonly StreamFoundation142SNormalizationPlanStep[];
  readonly requiredExactApprovalTextFor142T: string;
  readonly nextApprovalPolicy: {
    readonly exactApprovalRequiredBefore142T: true;
    readonly nextStageIsOpsOnlySourceInspection: true;
    readonly nextStageMayInspectAppTs: true;
    readonly nextStageMayInspectRuntimeHandlerDraft: true;
    readonly nextStageMustNotWriteTargets: true;
    readonly nextStageMustNotRestartBackend: true;
    readonly nextStageMustNotRuntimePost: true;
    readonly nextStageMustNotDatabaseWrite: true;
    readonly nextStageMustNotProviderCall: true;
    readonly nextStageMustNotWalletMutation: true;
    readonly nextStageMustNotMoneyMovement: true;
    readonly nextStageMustNotFakeSuccess: true;
  };
  readonly safety: {
    readonly sourceOnly142S: true;
    readonly targetWriteBy142S: false;
    readonly appTsChangeBy142S: false;
    readonly serverTsChangeBy142S: false;
    readonly streamIndexChangeBy142S: false;
    readonly backendRestartBy142S: false;
    readonly runtimeHttpBy142S: false;
    readonly runtimePostBy142S: false;
    readonly databaseReadBy142S: false;
    readonly databaseWriteBy142S: false;
    readonly providerCallBy142S: false;
    readonly providerSecretReadBy142S: false;
    readonly walletMutationBy142S: false;
    readonly paymentAuthorizationBy142S: false;
    readonly monthlyPayoutBy142S: false;
    readonly moneyMovementBy142S: false;
    readonly fakeSuccessBy142S: false;
  };
}
