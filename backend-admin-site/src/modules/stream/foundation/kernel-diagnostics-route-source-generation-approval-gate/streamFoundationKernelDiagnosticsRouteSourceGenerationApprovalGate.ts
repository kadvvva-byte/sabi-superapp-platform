import {
  getStreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSnapshot,
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_IMPLEMENTATION_SOURCE_PACKAGE_SAFETY,
} from "../kernel-diagnostics-route-implementation-source-package";
import {
  STREAM_FOUNDATION_138S_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_VERSION,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalBlueprintReview,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalDecision,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSafety,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSnapshot,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateStatus,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalMountBoundaryGate,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirement,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirementId,
} from "./streamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_SAFETY: StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSafety = {
  ...STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_IMPLEMENTATION_SOURCE_PACKAGE_SAFETY,
  generationApprovalGateOnly: true,
  sourceGenerationOwnerApprovalRecordedNow: false,
  sourceGenerationApprovedNow: false,
  routeSourceGenerationExecutedNow: false,
  routeSourceFilesWrittenNow: false,
  implementationSourceFilesGeneratedNow: false,
  implementationSourceTextReturnedNow: false,
  routeMountApprovedNow: false,
  routeMountPerformedNow: false,
  streamIndexPatchIncluded: false,
  appServerPatchIncluded: false,
  streamModulePatchIncluded: false,
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

function requirement(
  requirementId: StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirementId,
  title: string,
  satisfiedNow: boolean,
  separateOwnerApprovalRequired: boolean,
  separateMountApprovalRequired: boolean,
): StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirement {
  return {
    requirementId,
    title,
    requiredBeforeGeneration: true,
    satisfiedNow,
    blocksGenerationNow: !satisfiedNow || separateOwnerApprovalRequired || separateMountApprovalRequired,
    separateOwnerApprovalRequired,
    separateMountApprovalRequired,
    safeCode: `stream_kernel_diagnostics_route_source_generation_requirement_${requirementId}`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceGeneration.requirement.${requirementId}`,
  };
}

function buildRequirements(sourcePackageReady: boolean): readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirement[] {
  return [
    requirement("source_package_review_passed", "138R implementation source package is ready for owner review", sourcePackageReady, false, false),
    requirement("owner_route_source_generation_approval_required", "Owner must explicitly approve route source generation in a later controlled step", false, true, false),
    requirement("admin_scope_guard_required", "Admin scope guard must exist before any generated route source can be activated", false, true, false),
    requirement("redacted_response_guard_required", "Redacted response guard must exist before diagnostics data can be exposed", false, true, false),
    requirement("provider_wallet_money_disabled_guard_required", "Provider, Wallet, payment, payout and money movement must remain disabled", true, false, false),
    requirement("forbidden_path_scan_required", "Forbidden path scan must pass before any source generation package is accepted", false, true, false),
    requirement("route_mount_separate_approval_required", "Route mount must be a separate approval after source generation", false, false, true),
    requirement("stream_index_separate_approval_required", "src/modules/stream/index.ts remains out of this patch and requires separate approval later", false, false, true),
  ];
}

function blueprintReview(
  blueprint: ReturnType<typeof getStreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSnapshot>["sourceBlueprints"][number],
): StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalBlueprintReview {
  const requiredRequirementIds: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirementId[] = blueprint.futureTargetPath === "src/modules/stream/stream.module.ts"
    ? [
        "source_package_review_passed",
        "owner_route_source_generation_approval_required",
        "forbidden_path_scan_required",
        "route_mount_separate_approval_required",
        "stream_index_separate_approval_required",
      ]
    : [
        "source_package_review_passed",
        "owner_route_source_generation_approval_required",
        "admin_scope_guard_required",
        "redacted_response_guard_required",
        "provider_wallet_money_disabled_guard_required",
        "forbidden_path_scan_required",
        "route_mount_separate_approval_required",
      ];

  return {
    blueprint,
    approvedForGenerationNow: false,
    generatedNow: false,
    sourceTextReturnedNow: false,
    routeMountedNow: false,
    requiresOwnerApprovalBeforeGeneration: true,
    requiresForbiddenPathScanBeforeGeneration: true,
    requiredRequirementIds,
    safeCode: `stream_kernel_diagnostics_route_source_generation_blueprint_${blueprint.blueprintId}_not_approved`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceGeneration.blueprint.${blueprint.blueprintId}.notApproved`,
  };
}

function mountBoundaryGate(
  boundary: ReturnType<typeof getStreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSnapshot>["mountBoundaryReviews"][number],
): StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalMountBoundaryGate {
  return {
    boundary,
    approvedForMountNow: false,
    routeMountedNow: false,
    includedInThisPatch: false,
    requiredBeforeMount: true,
    safeCode: `stream_kernel_diagnostics_route_source_generation_mount_boundary_${boundary.boundaryId}_blocked`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceGeneration.mountBoundary.${boundary.boundaryId}.blocked`,
  };
}

function decisionFromRequirements(
  requirements: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirement[],
): StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalDecision {
  const blockedRequirementIds = requirements.filter((item) => item.blocksGenerationNow).map((item) => item.requirementId);
  const mountBlocked = requirements.some((item) => item.separateMountApprovalRequired && item.blocksGenerationNow);
  const ownerBlocked = requirements.some((item) => item.separateOwnerApprovalRequired && item.blocksGenerationNow);
  const decisionCode = mountBlocked
    ? "source_generation_blocked_until_mount_approval"
    : ownerBlocked
      ? "source_generation_blocked_until_owner_approval"
      : blockedRequirementIds.length > 0
        ? "source_generation_blocked_by_safety_boundary"
        : "source_generation_review_ready_but_not_approved";

  return {
    decisionCode,
    generationAllowedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    requiresOwnerApprovalLater: true,
    requiresSeparateMountApprovalLater: true,
    blockedRequirementIds,
    safeCode: `stream_kernel_diagnostics_route_source_generation_decision_${decisionCode}`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceGeneration.decision.${decisionCode}`,
  };
}

function deriveStatus(
  sourcePackageReady: boolean,
  requirements: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirement[],
  safety: StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSafety,
): StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateStatus {
  if (!sourcePackageReady) return "generation_approval_gate_blocked_by_source_package";
  if (requirements.some((item) => item.separateMountApprovalRequired && item.blocksGenerationNow)) return "generation_approval_gate_blocked_by_mount_boundary";
  if (requirements.some((item) => item.separateOwnerApprovalRequired && item.blocksGenerationNow)) return "generation_approval_gate_blocked_by_missing_owner_approval";
  if (
    safety.sourceGenerationApprovedNow ||
    safety.routeSourceGenerationExecutedNow ||
    safety.routeSourceFilesWrittenNow ||
    safety.implementationSourceFilesGeneratedNow ||
    safety.routeMountPerformedNow ||
    safety.protectedRouteRegisteredNow ||
    safety.expressRouterCreatedNow ||
    safety.providerCallAllowedNow ||
    safety.walletMutationAllowedNow ||
    safety.moneyMovementAllowedNow ||
    safety.fakeSuccessAllowed
  ) {
    return "generation_approval_gate_blocked_by_safety_boundary";
  }
  return "generation_approval_gate_ready_for_owner_review";
}

export function getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSnapshot(): StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSnapshot {
  const sourcePackage = getStreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSnapshot();
  const sourcePackageReady =
    sourcePackage.readyForImplementationSourcePackageReview &&
    sourcePackage.sourceBlueprintCount === 5 &&
    sourcePackage.generatedSourceBlueprintCount === 0 &&
    sourcePackage.mountBoundaryReviewCount === 4 &&
    sourcePackage.routeSourceFilesWrittenNow === false &&
    sourcePackage.routeMountPerformed === false &&
    sourcePackage.streamIndexPatchIncluded === false &&
    sourcePackage.appServerPatchIncluded === false;
  const requirements = buildRequirements(sourcePackageReady);
  const blueprintReviews = sourcePackage.sourceBlueprints.map(blueprintReview);
  const mountBoundaryGates = sourcePackage.mountBoundaryReviews.map(mountBoundaryGate);
  const decision = decisionFromRequirements(requirements);
  const safety = STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_SAFETY;
  const blockedRequirementCount = requirements.filter((item) => item.blocksGenerationNow).length;
  const readyForGenerationApprovalReview =
    sourcePackageReady &&
    requirements.length === 8 &&
    blueprintReviews.length === 5 &&
    mountBoundaryGates.length === 4 &&
    blueprintReviews.every((item) => item.approvedForGenerationNow === false && item.generatedNow === false && item.sourceTextReturnedNow === false) &&
    mountBoundaryGates.every((item) => item.approvedForMountNow === false && item.routeMountedNow === false && item.includedInThisPatch === false) &&
    decision.generationAllowedNow === false;

  return {
    version: STREAM_FOUNDATION_138S_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_VERSION,
    gateId: "stream_kernel_diagnostics_route_source_generation_approval_gate",
    status: deriveStatus(sourcePackageReady, requirements, safety),
    patchScope: "src/modules/stream/foundation/** only",
    sourcePackageVersion: sourcePackage.version,
    sourcePackageStatus: sourcePackage.status,
    generationApprovalGateOnly: true,
    readyForGenerationApprovalReview,
    sourceGenerationOwnerApprovalRecordedNow: false,
    sourceGenerationApprovedNow: false,
    readyForRouteSourceGenerationNow: false,
    routeSourceGenerationExecutedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    routeMountApprovedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    streamModulePatchIncluded: false,
    requirements,
    requirementCount: requirements.length,
    satisfiedRequirementCount: requirements.filter((item) => item.satisfiedNow).length,
    blockedRequirementCount,
    blueprintReviews,
    blueprintReviewCount: blueprintReviews.length,
    approvedBlueprintCount: 0,
    mountBoundaryGates,
    mountBoundaryGateCount: mountBoundaryGates.length,
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
