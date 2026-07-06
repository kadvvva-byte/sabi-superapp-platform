import { STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS } from "../kernel-diagnostics-admin-route";
import {
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_SAFETY,
  getStreamFoundationKernelDiagnosticsRouteMountReadinessGateSnapshot,
} from "../kernel-diagnostics-route-mount-readiness-gate";
import {
  STREAM_FOUNDATION_138N_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_VERSION,
  type StreamFoundationKernelDiagnosticsRouteSourcePatchPlanRouteItem,
  type StreamFoundationKernelDiagnosticsRouteSourcePatchPlanSafety,
  type StreamFoundationKernelDiagnosticsRouteSourcePatchPlanSnapshot,
  type StreamFoundationKernelDiagnosticsRouteSourcePatchPlanStatus,
  type StreamFoundationKernelDiagnosticsRouteSourcePatchPlanStep,
  type StreamFoundationKernelDiagnosticsRouteSourcePatchPlanStepId,
  type StreamFoundationKernelDiagnosticsRouteSourcePatchPlanTarget,
  type StreamFoundationKernelDiagnosticsRouteSourcePatchPlanTargetPath,
} from "./streamFoundationKernelDiagnosticsRouteSourcePatchPlanContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_SAFETY: StreamFoundationKernelDiagnosticsRouteSourcePatchPlanSafety = {
  ...STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_SAFETY,
  routeSourcePatchPlanOnly: true,
  routeSourcePatchCreatedNow: false,
  futureProtectedRouteSourceCreatedNow: false,
  futureRouteMountEntrypointCreatedNow: false,
  sourcePatchForStreamIndexCreatedNow: false,
  appServerPatchCreatedNow: false,
  adminUiPatchCreatedNow: false,
  walletRuntimePatchCreatedNow: false,
  messengerRuntimePatchCreatedNow: false,
  prismaPatchCreatedNow: false,
  envPatchCreatedNow: false,
  routeModuleImportedExpressNow: false,
  protectedAdminMiddlewareBoundNow: false,
  rawSecretRedactionRequiredLater: true,
  separateOwnerApprovalRequiredForActualMount: true,
};

function futureHandlerName(routeId: string): string {
  return `preview${routeId
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")}Handler`;
}

function buildRouteItems(): readonly StreamFoundationKernelDiagnosticsRouteSourcePatchPlanRouteItem[] {
  return STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS.map((definition) => ({
    routeId: definition.routeId,
    path: definition.path,
    definition,
    futureSourceHandlerName: futureHandlerName(definition.routeId),
    futureProtectedRouteMountAllowedAfterApproval: true,
    mountedNow: false,
    sourceCreatedNow: false,
    returnsRawSecrets: false,
    performsProviderCall: false,
    performsDatabaseExecution: false,
    performsWalletMutation: false,
    performsMoneyMovement: false,
  }));
}

function target(
  targetPath: StreamFoundationKernelDiagnosticsRouteSourcePatchPlanTargetPath,
  includedInThisPatch: boolean,
  allowedInThisPatch: boolean,
  requiresSeparateApprovalLater: boolean,
): StreamFoundationKernelDiagnosticsRouteSourcePatchPlanTarget {
  const status = includedInThisPatch ? "included" : "not_included";
  return {
    targetPath,
    targetKind: allowedInThisPatch
      ? "foundation_contract"
      : requiresSeparateApprovalLater
        ? "future_protected_admin_route_source"
        : "forbidden_in_this_patch",
    includedInThisPatch,
    allowedInThisPatch,
    requiresSeparateApprovalLater,
    safeCode: `stream_kernel_diagnostics_route_source_${String(targetPath).replace(/[^a-zA-Z0-9]+/g, "_")}_${status}`,
    safeMessageKey: `stream.kernel.diagnostics.routeSource.${String(targetPath).replace(/[^a-zA-Z0-9]+/g, ".")}.${status}`,
  };
}

function buildTargets(): readonly StreamFoundationKernelDiagnosticsRouteSourcePatchPlanTarget[] {
  return [
    target("src/modules/stream/foundation/**", true, true, false),
    target("src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.routes.ts", false, false, true),
    target("src/modules/stream/stream.module.ts", false, false, true),
    target("stream_module_index_entrypoint", false, false, true),
    target("application_server_entrypoint", false, false, true),
    target("admin_ui_source", false, false, true),
    target("wallet_runtime_source", false, false, true),
    target("messenger_runtime_source", false, false, true),
    target("prisma_schema_or_migration", false, false, true),
    target("environment_secret_file", false, false, true),
  ];
}

function planStep(stepId: StreamFoundationKernelDiagnosticsRouteSourcePatchPlanStepId, ordered: number): StreamFoundationKernelDiagnosticsRouteSourcePatchPlanStep {
  return {
    stepId,
    ordered,
    requiredForFutureMount: true,
    completedInThisPatch: false,
    plannedOnlyNow: true,
    safeCode: `stream_kernel_diagnostics_route_source_${stepId}_planned_only`,
    safeMessageKey: `stream.kernel.diagnostics.routeSource.${stepId}.plannedOnly`,
  };
}

function buildSteps(): readonly StreamFoundationKernelDiagnosticsRouteSourcePatchPlanStep[] {
  return [
    planStep("reuse_unmounted_factory_handlers", 1),
    planStep("wrap_handlers_with_admin_auth", 2),
    planStep("wrap_handlers_with_scope_guard", 3),
    planStep("wrap_response_with_redaction_envelope", 4),
    planStep("keep_provider_wallet_money_disabled", 5),
    planStep("require_separate_mount_approval", 6),
    planStep("keep_stream_module_index_out_of_this_patch", 7),
    planStep("keep_app_server_out_of_this_patch", 8),
  ];
}

function deriveStatus(
  futureMountSourcePatchReviewReady: boolean,
  forbiddenTargetsIncluded: number,
  safety: StreamFoundationKernelDiagnosticsRouteSourcePatchPlanSafety,
): StreamFoundationKernelDiagnosticsRouteSourcePatchPlanStatus {
  if (!futureMountSourcePatchReviewReady) return "route_source_patch_plan_blocked_by_mount_readiness_gate";
  if (forbiddenTargetsIncluded > 0) return "route_source_patch_plan_blocked_by_forbidden_target";
  if (safety.routeMountAllowedInThisPatch || safety.routeMountExecutedNow || safety.providerCallAllowedNow || safety.moneyMovementAllowedNow) {
    return "route_source_patch_plan_blocked_by_safety_boundary";
  }
  return "route_source_patch_plan_ready_review_required_later";
}

export function getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanSnapshot(): StreamFoundationKernelDiagnosticsRouteSourcePatchPlanSnapshot {
  const mountReadiness = getStreamFoundationKernelDiagnosticsRouteMountReadinessGateSnapshot();
  const targets = buildTargets();
  const routeItems = buildRouteItems();
  const steps = buildSteps();
  const safety = STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_SAFETY;
  const forbiddenTargetsIncluded = targets.filter((item) => item.includedInThisPatch && !item.allowedInThisPatch).length;
  const futureSourcePatchReviewReady = mountReadiness.futureMountSourcePatchReviewReady && forbiddenTargetsIncluded === 0;

  return {
    version: STREAM_FOUNDATION_138N_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_VERSION,
    planId: "stream_kernel_diagnostics_route_source_patch_plan",
    status: deriveStatus(mountReadiness.futureMountSourcePatchReviewReady, forbiddenTargetsIncluded, safety),
    patchScope: "src/modules/stream/foundation/** only",
    streamIndexPatchIncluded: false,
    sourcePatchCreatedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    futureSourcePatchReviewReady,
    readyForRouteSourcePatchNow: false,
    requiresSeparateRouteSourceApproval: true,
    requiresSeparateRouteMountApproval: true,
    routeItems,
    routeItemCount: routeItems.length,
    targets,
    forbiddenTargetsIncluded: 0,
    steps,
    plannedStepCount: steps.length,
    completedStepCount: 0,
    runtimeHttpRequestsPerformed: 0,
    providerCallsPerformed: 0,
    databaseExecutionPerformed: 0,
    walletMutationPerformed: 0,
    paymentAuthorizationPerformed: 0,
    monthlyPayoutPerformed: 0,
    moneyMovementPerformed: 0,
    rawSecretsReturned: 0,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    safety,
  };
}
