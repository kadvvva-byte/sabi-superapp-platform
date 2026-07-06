import { getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanReadiness } from "./streamFoundationKernelDiagnosticsRouteSourcePatchPlanReadiness";
import { getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourcePatchPlan";
import { STREAM_FOUNDATION_138N_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourcePatchPlanContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourcePatchPlanSmokeReport {
  readonly version: typeof STREAM_FOUNDATION_138N_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_VERSION;
  readonly passed: boolean;
  readonly expectedRouteItems: 4;
  readonly actualRouteItems: number;
  readonly expectedPlannedSteps: 8;
  readonly actualPlannedSteps: number;
  readonly sourcePatchCreatedNow: false;
  readonly routeMountPerformed: false;
  readonly protectedRouteRegisteredNow: false;
  readonly noForbiddenTargetsIncluded: boolean;
  readonly noRuntimeHttpRequests: boolean;
  readonly noProviderCalls: boolean;
  readonly noDatabaseExecution: boolean;
  readonly noWalletMutation: boolean;
  readonly noMoneyMovement: boolean;
  readonly noRawSecrets: boolean;
  readonly streamIndexPatchIncluded: false;
  readonly safeSummary: string;
}

export function getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanSmokeReport(): StreamFoundationKernelDiagnosticsRouteSourcePatchPlanSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanReadiness();
  const passed =
    readiness.readyForRouteSourcePatchPlanReview &&
    snapshot.routeItemCount === 4 &&
    snapshot.plannedStepCount === 8 &&
    snapshot.forbiddenTargetsIncluded === 0 &&
    snapshot.routeMountPerformed === false &&
    snapshot.protectedRouteRegisteredNow === false &&
    snapshot.providerCallsPerformed === 0 &&
    snapshot.databaseExecutionPerformed === 0 &&
    snapshot.walletMutationPerformed === 0 &&
    snapshot.moneyMovementPerformed === 0 &&
    snapshot.rawSecretsReturned === 0 &&
    snapshot.streamIndexPatchIncluded === false;

  return {
    version: STREAM_FOUNDATION_138N_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_VERSION,
    passed,
    expectedRouteItems: 4,
    actualRouteItems: snapshot.routeItemCount,
    expectedPlannedSteps: 8,
    actualPlannedSteps: snapshot.plannedStepCount,
    sourcePatchCreatedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    noForbiddenTargetsIncluded: snapshot.forbiddenTargetsIncluded === 0,
    noRuntimeHttpRequests: snapshot.runtimeHttpRequestsPerformed === 0,
    noProviderCalls: snapshot.providerCallsPerformed === 0,
    noDatabaseExecution: snapshot.databaseExecutionPerformed === 0,
    noWalletMutation: snapshot.walletMutationPerformed === 0,
    noMoneyMovement: snapshot.moneyMovementPerformed === 0,
    noRawSecrets: snapshot.rawSecretsReturned === 0,
    streamIndexPatchIncluded: false,
    safeSummary: passed
      ? "138N route source patch plan is safe for review only; no route source, mount, app server, provider, Wallet, money movement, raw secrets, or stream module index patch was created."
      : "138N route source patch plan requires review before any future protected route source patch.",
  };
}
