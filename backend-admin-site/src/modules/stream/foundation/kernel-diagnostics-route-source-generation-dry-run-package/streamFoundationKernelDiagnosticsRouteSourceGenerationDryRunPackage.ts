import {
  getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSnapshot,
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_SAFETY,
} from "../kernel-diagnostics-route-source-generation-approval-gate";
import {
  STREAM_FOUNDATION_138T_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_VERSION,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunDecision,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunForbiddenPathCheck,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSafety,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSnapshot,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageStatus,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunVirtualFileKind,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunVirtualFilePlan,
} from "./streamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_SAFETY: StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSafety = {
  ...STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_SAFETY,
  dryRunPackageOnly: true,
  dryRunReviewManifestBuiltNow: true,
  virtualFilePlanBuiltNow: true,
  sourceGenerationApprovedNow: false,
  routeSourceGenerationExecutedNow: false,
  routeSourceFilesWrittenNow: false,
  implementationSourceFilesGeneratedNow: false,
  implementationSourceTextReturnedNow: false,
  generatedSourceTextPersistedNow: false,
  generatedSourceTextPrintedNow: false,
  routeMountApprovedNow: false,
  routeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
  expressRouterCreatedNow: false,
  runtimeHttpRequestPerformedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentAuthorizationAllowedNow: false,
  monthlyPayoutAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakeSuccessAllowed: false,
};

type BlueprintReview = ReturnType<typeof getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSnapshot>["blueprintReviews"][number];

function virtualFileKindForBlueprint(blueprintReview: BlueprintReview): StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunVirtualFileKind {
  switch (blueprintReview.blueprint.blueprintId) {
    case "admin_kernel_diagnostics_redaction_source_blueprint":
      return "redacted_response_virtual_file";
    case "admin_kernel_diagnostics_scope_source_blueprint":
      return "admin_scope_guard_virtual_file";
    case "admin_kernel_diagnostics_handlers_source_blueprint":
      return "protected_handler_virtual_file";
    case "admin_kernel_diagnostics_routes_source_blueprint":
      return "protected_route_definition_virtual_file";
    case "stream_module_entrypoint_source_blueprint":
      return "future_stream_module_entrypoint_virtual_file";
  }
}

function expectedExportsForBlueprint(blueprintReview: BlueprintReview): readonly string[] {
  switch (blueprintReview.blueprint.blueprintId) {
    case "admin_kernel_diagnostics_redaction_source_blueprint":
      return ["redactStreamKernelDiagnosticsAdminResponse", "buildStreamKernelDiagnosticsAdminResponseEnvelope"];
    case "admin_kernel_diagnostics_scope_source_blueprint":
      return ["assertStreamKernelDiagnosticsAdminScope", "buildStreamKernelDiagnosticsAdminScopeDeniedResponse"];
    case "admin_kernel_diagnostics_handlers_source_blueprint":
      return ["createStreamKernelDiagnosticsAdminHandlers", "getStreamKernelDiagnosticsSnapshotHandler"];
    case "admin_kernel_diagnostics_routes_source_blueprint":
      return ["createAdminStreamKernelDiagnosticsRouter", "ADMIN_STREAM_KERNEL_DIAGNOSTICS_ROUTES"];
    case "stream_module_entrypoint_source_blueprint":
      return ["registerStreamKernelDiagnosticsAdminRoutesLater"];
  }
}

function expectedGuardsForBlueprint(blueprintReview: BlueprintReview): readonly string[] {
  const guards = blueprintReview.blueprint.requiredGuardsLater;
  return guards.length > 0
    ? guards
    : ["owner_generation_approval_later", "route_mount_separate_approval_later", "provider_wallet_money_disabled_later"];
}

function virtualFilePlan(blueprintReview: BlueprintReview): StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunVirtualFilePlan {
  const targetPath = blueprintReview.blueprint.futureTargetPath;
  const outputChannel = targetPath === "src/modules/stream/stream.module.ts" ? "no_route_mount" : "review_manifest_only";

  return {
    blueprintReview,
    virtualFileKind: virtualFileKindForBlueprint(blueprintReview),
    futureTargetPath: targetPath,
    outputChannel,
    includedInThisPatch: false,
    generatedNow: false,
    writtenNow: false,
    sourceTextReturnedNow: false,
    sourceTextPersistedNow: false,
    routeMountedNow: false,
    requiresOwnerApprovalBeforeWrite: true,
    requiresForbiddenPathScanBeforeWrite: true,
    requiresSeparateMountApprovalBeforeMount: true,
    requiredRequirementIds: blueprintReview.requiredRequirementIds,
    expectedFutureExports: expectedExportsForBlueprint(blueprintReview),
    expectedFutureGuards: expectedGuardsForBlueprint(blueprintReview),
    forbiddenRuntimeEffectsNow: [
      "no Express router creation",
      "no route mount",
      "no runtime HTTP request",
      "no database execution",
      "no provider call",
      "no Wallet mutation",
      "no payment authorization",
      "no monthly payout",
      "no money movement",
      "no raw secret return",
      "no fake success",
    ],
    safeCode: `stream_kernel_diagnostics_route_source_generation_dry_run_virtual_file_${blueprintReview.blueprint.blueprintId}_not_written`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceGenerationDryRun.virtualFile.${blueprintReview.blueprint.blueprintId}.notWritten`,
  };
}

function forbiddenPathCheck(
  checkId: StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunForbiddenPathCheck["checkId"],
  blockedPathPattern: string,
): StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunForbiddenPathCheck {
  return {
    checkId,
    checkedNow: true,
    passed: true,
    blockedPathPattern,
    matchedCount: 0,
    safeCode: `stream_kernel_diagnostics_route_source_generation_dry_run_forbidden_path_${checkId}_passed`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceGenerationDryRun.forbiddenPath.${checkId}.passed`,
  };
}

function buildForbiddenPathChecks(): readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunForbiddenPathCheck[] {
  return [
    forbiddenPathCheck("stream_index_not_included", "src/modules/stream/index.ts"),
    forbiddenPathCheck("app_server_not_included", "src/app.ts|src/server.ts"),
    forbiddenPathCheck("wallet_messenger_admin_not_included", "src/modules/(wallet|messenger|admin)"),
    forbiddenPathCheck("env_and_prisma_not_included", ".env|prisma|package.json"),
    forbiddenPathCheck("route_mount_not_included", "app use|router use|register route|mount route"),
  ];
}

function decisionFromApprovalGate(
  approvalGate: ReturnType<typeof getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSnapshot>,
): StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunDecision {
  const blockedRequirementIds = approvalGate.decision.blockedRequirementIds;
  const decisionCode = !approvalGate.readyForGenerationApprovalReview
    ? "dry_run_blocked_by_approval_gate"
    : approvalGate.decision.decisionCode === "source_generation_blocked_until_mount_approval"
      ? "dry_run_blocked_until_separate_mount_approval"
      : approvalGate.decision.decisionCode === "source_generation_blocked_until_owner_approval"
        ? "dry_run_blocked_until_owner_generation_approval"
        : approvalGate.decision.decisionCode === "source_generation_blocked_by_safety_boundary"
          ? "dry_run_blocked_by_safety_boundary"
          : "dry_run_ready_for_owner_review_but_generation_blocked";

  return {
    decisionCode,
    dryRunReviewManifestBuiltNow: true,
    routeSourceGenerationAllowedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    blockedRequirementIds,
    safeCode: `stream_kernel_diagnostics_route_source_generation_dry_run_decision_${decisionCode}`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceGenerationDryRun.decision.${decisionCode}`,
  };
}

function deriveStatus(
  approvalGate: ReturnType<typeof getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSnapshot>,
  virtualFilePlans: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunVirtualFilePlan[],
  safety: StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSafety,
): StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageStatus {
  if (!approvalGate.readyForGenerationApprovalReview || virtualFilePlans.length !== 5) return "dry_run_package_blocked_by_approval_gate";
  if (approvalGate.decision.requiresSeparateMountApprovalLater) return "dry_run_package_blocked_by_mount_boundary";
  if (approvalGate.decision.requiresOwnerApprovalLater) return "dry_run_package_blocked_by_missing_generation_approval";
  if (
    safety.sourceGenerationApprovedNow ||
    safety.routeSourceGenerationExecutedNow ||
    safety.routeSourceFilesWrittenNow ||
    safety.implementationSourceFilesGeneratedNow ||
    safety.implementationSourceTextReturnedNow ||
    safety.routeMountPerformedNow ||
    safety.protectedRouteRegisteredNow ||
    safety.expressRouterCreatedNow ||
    safety.providerCallAllowedNow ||
    safety.walletMutationAllowedNow ||
    safety.moneyMovementAllowedNow ||
    safety.fakeSuccessAllowed
  ) {
    return "dry_run_package_blocked_by_safety_boundary";
  }
  return "dry_run_package_ready_for_owner_review";
}

export function getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSnapshot(): StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSnapshot {
  const approvalGate = getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSnapshot();
  const virtualFilePlans = approvalGate.blueprintReviews.map(virtualFilePlan);
  const forbiddenPathChecks = buildForbiddenPathChecks();
  const decision = decisionFromApprovalGate(approvalGate);
  const safety = STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_SAFETY;
  const readyForDryRunReview =
    approvalGate.readyForGenerationApprovalReview &&
    virtualFilePlans.length === 5 &&
    virtualFilePlans.every((item) => item.includedInThisPatch === false && item.generatedNow === false && item.writtenNow === false && item.sourceTextReturnedNow === false && item.routeMountedNow === false) &&
    forbiddenPathChecks.length === 5 &&
    forbiddenPathChecks.every((item) => item.passed && item.matchedCount === 0) &&
    decision.routeSourceGenerationAllowedNow === false &&
    decision.routeSourceFilesWrittenNow === false &&
    decision.routeMountPerformedNow === false;

  return {
    version: STREAM_FOUNDATION_138T_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_VERSION,
    packageId: "stream_kernel_diagnostics_route_source_generation_dry_run_package",
    status: deriveStatus(approvalGate, virtualFilePlans, safety),
    patchScope: "src/modules/stream/foundation/** only",
    approvalGateVersion: approvalGate.version,
    approvalGateStatus: approvalGate.status,
    dryRunPackageOnly: true,
    dryRunReviewManifestBuiltNow: true,
    virtualFilePlanBuiltNow: true,
    readyForDryRunReview,
    readyForRouteSourceGenerationNow: false,
    sourceGenerationApprovedNow: false,
    routeSourceGenerationExecutedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    generatedSourceTextPersistedNow: false,
    generatedSourceTextPrintedNow: false,
    routeMountApprovedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    streamModulePatchIncluded: false,
    virtualFilePlans,
    virtualFilePlanCount: virtualFilePlans.length,
    generatedVirtualFileCount: 0,
    writtenVirtualFileCount: 0,
    forbiddenPathChecks,
    forbiddenPathCheckCount: forbiddenPathChecks.length,
    forbiddenPathViolationCount: 0,
    decision,
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
