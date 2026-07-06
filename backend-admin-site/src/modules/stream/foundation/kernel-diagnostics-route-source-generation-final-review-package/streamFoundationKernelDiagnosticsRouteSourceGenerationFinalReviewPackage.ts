import {
  getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSnapshot,
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_SAFETY,
} from "../kernel-diagnostics-route-source-generation-dry-run-package";
import {
  STREAM_FOUNDATION_138U_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_FINAL_REVIEW_PACKAGE_VERSION,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewDecision,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewItem,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewItemId,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSafety,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSnapshot,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageStatus,
  type StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewVirtualFileReview,
} from "./streamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_FINAL_REVIEW_PACKAGE_SAFETY: StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSafety = {
  ...STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_SAFETY,
  finalReviewPackageOnly: true,
  finalOwnerDecisionRequiredLater: true,
  finalRouteMountApprovalRequiredLater: true,
  finalReviewBuiltNow: true,
  routeSourceGenerationApprovedNow: false,
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

type DryRunSnapshot = ReturnType<typeof getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSnapshot>;

function reviewItem(
  itemId: StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewItemId,
  passed: boolean,
  blocking: boolean,
  source: StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewItem["source"],
  evidence: readonly string[],
  requiredBeforeGeneration: boolean,
  requiredBeforeMount: boolean,
): StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewItem {
  return {
    itemId,
    passed,
    blocking,
    source,
    evidence,
    requiredBeforeGeneration,
    requiredBeforeMount,
    safeCode: `stream_kernel_diagnostics_route_source_generation_final_review_${itemId}_${passed ? "passed" : "blocked"}`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceGenerationFinalReview.${itemId}.${passed ? "passed" : "blocked"}`,
  };
}

function buildReviewItems(dryRun: DryRunSnapshot): readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewItem[] {
  const allForbiddenPathChecksPassed = dryRun.forbiddenPathChecks.every((item) => item.checkedNow && item.passed && item.matchedCount === 0);
  const allVirtualFilesNotWritten = dryRun.virtualFilePlans.every(
    (item) => item.includedInThisPatch === false && item.generatedNow === false && item.writtenNow === false && item.sourceTextReturnedNow === false && item.routeMountedNow === false,
  );
  const providerWalletMoneyDisabled =
    dryRun.providerCallsPerformed === 0 &&
    dryRun.walletMutationPerformed === 0 &&
    dryRun.paymentAuthorizationPerformed === 0 &&
    dryRun.monthlyPayoutPerformed === 0 &&
    dryRun.moneyMovementPerformed === 0 &&
    dryRun.fakeSuccessAllowed === false;

  return [
    reviewItem(
      "dry_run_package_verified",
      dryRun.readyForDryRunReview && allVirtualFilesNotWritten,
      !(dryRun.readyForDryRunReview && allVirtualFilesNotWritten),
      "dry_run_snapshot",
      [`virtualFilePlans=${dryRun.virtualFilePlanCount}`, `generated=${dryRun.generatedVirtualFileCount}`, `written=${dryRun.writtenVirtualFileCount}`],
      true,
      true,
    ),
    reviewItem(
      "forbidden_paths_verified",
      allForbiddenPathChecksPassed && dryRun.forbiddenPathViolationCount === 0,
      !(allForbiddenPathChecksPassed && dryRun.forbiddenPathViolationCount === 0),
      "forbidden_path_scan",
      [`forbiddenPathChecks=${dryRun.forbiddenPathCheckCount}`, `violations=${dryRun.forbiddenPathViolationCount}`],
      true,
      true,
    ),
    reviewItem(
      "stream_index_excluded_verified",
      dryRun.streamIndexPatchIncluded === false,
      dryRun.streamIndexPatchIncluded !== false,
      "forbidden_path_scan",
      ["src/modules/stream/index.ts is excluded from this foundation-only package"],
      true,
      true,
    ),
    reviewItem(
      "app_server_excluded_verified",
      dryRun.appServerPatchIncluded === false && dryRun.streamModulePatchIncluded === false,
      !(dryRun.appServerPatchIncluded === false && dryRun.streamModulePatchIncluded === false),
      "forbidden_path_scan",
      ["src/app.ts, src/server.ts and stream module entrypoint are excluded"],
      true,
      true,
    ),
    reviewItem(
      "route_source_write_requires_owner_approval",
      dryRun.sourceGenerationApprovedNow === false && dryRun.routeSourceFilesWrittenNow === false,
      false,
      "owner_review_boundary",
      ["owner approval remains required before any route source write"],
      true,
      true,
    ),
    reviewItem(
      "route_mount_requires_separate_approval",
      dryRun.routeMountApprovedNow === false && dryRun.routeMountPerformed === false && dryRun.protectedRouteRegisteredNow === false,
      false,
      "owner_review_boundary",
      ["separate route mount approval remains required after source review"],
      false,
      true,
    ),
    reviewItem(
      "provider_wallet_money_disabled_verified",
      providerWalletMoneyDisabled,
      !providerWalletMoneyDisabled,
      "runtime_safety_boundary",
      ["provider calls, Wallet mutation, payment authorization, monthly payout and money movement are all zero"],
      true,
      true,
    ),
    reviewItem(
      "raw_secrets_blocked_verified",
      dryRun.rawSecretsReturned === 0 && dryRun.mobileProviderKeysAllowed === false,
      !(dryRun.rawSecretsReturned === 0 && dryRun.mobileProviderKeysAllowed === false),
      "runtime_safety_boundary",
      ["raw secrets are not returned and mobile provider keys remain blocked"],
      true,
      true,
    ),
  ];
}

function buildVirtualFileReviews(dryRun: DryRunSnapshot): readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewVirtualFileReview[] {
  return dryRun.virtualFilePlans.map((virtualFilePlan) => ({
    virtualFilePlan,
    finalReviewPassed:
      virtualFilePlan.includedInThisPatch === false &&
      virtualFilePlan.generatedNow === false &&
      virtualFilePlan.writtenNow === false &&
      virtualFilePlan.sourceTextReturnedNow === false &&
      virtualFilePlan.routeMountedNow === false,
    approvedForWriteNow: false,
    includedInThisPatch: false,
    generatedNow: false,
    writtenNow: false,
    sourceTextReturnedNow: false,
    routeMountedNow: false,
    ownerDecisionRequiredLater: true,
    forbiddenPathScanRequiredAgainBeforeWrite: true,
    separateRouteMountApprovalRequiredLater: true,
    safeCode: `stream_kernel_diagnostics_route_source_generation_final_review_virtual_file_${virtualFilePlan.virtualFileKind}_not_written`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceGenerationFinalReview.virtualFile.${virtualFilePlan.virtualFileKind}.notWritten`,
  }));
}

function buildDecision(
  dryRun: DryRunSnapshot,
  reviewItems: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewItem[],
): StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewDecision {
  const blockingItemIds = reviewItems.filter((item) => item.blocking).map((item) => item.itemId);
  const readyForOwnerDecision = blockingItemIds.length === 0 && dryRun.readyForDryRunReview;
  const forbiddenPathBlocked = reviewItems.some((item) => item.source === "forbidden_path_scan" && item.blocking);
  const decisionCode = !dryRun.readyForDryRunReview
    ? "final_review_blocked_by_dry_run"
    : forbiddenPathBlocked
      ? "final_review_blocked_by_forbidden_path_scan"
      : dryRun.routeMountApprovedNow === false
        ? "final_review_blocked_until_separate_mount_approval"
        : dryRun.sourceGenerationApprovedNow === false
          ? "final_review_blocked_until_owner_generation_approval"
          : "final_review_ready_for_owner_decision_but_generation_blocked";

  return {
    decisionCode,
    finalReviewBuiltNow: true,
    readyForOwnerDecision,
    routeSourceGenerationAllowedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    blockingItemIds,
    safeCode: `stream_kernel_diagnostics_route_source_generation_final_review_decision_${decisionCode}`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceGenerationFinalReview.decision.${decisionCode}`,
  };
}

function deriveStatus(
  dryRun: DryRunSnapshot,
  reviewItems: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewItem[],
  decision: StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewDecision,
): StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageStatus {
  if (!dryRun.readyForDryRunReview) return "final_review_blocked_by_dry_run_package";
  if (reviewItems.some((item) => item.source === "forbidden_path_scan" && item.blocking)) return "final_review_blocked_by_forbidden_paths";
  if (decision.decisionCode === "final_review_blocked_until_separate_mount_approval") return "final_review_blocked_by_mount_boundary";
  if (decision.decisionCode === "final_review_blocked_until_owner_generation_approval") return "final_review_blocked_by_missing_owner_decision";
  return "final_review_ready_for_owner_decision";
}

export function getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSnapshot(): StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSnapshot {
  const dryRun = getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSnapshot();
  const reviewItems = buildReviewItems(dryRun);
  const virtualFileReviews = buildVirtualFileReviews(dryRun);
  const decision = buildDecision(dryRun, reviewItems);
  const blockingReviewItemCount = reviewItems.filter((item) => item.blocking).length;

  return {
    version: STREAM_FOUNDATION_138U_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_FINAL_REVIEW_PACKAGE_VERSION,
    packageId: "stream_kernel_diagnostics_route_source_generation_final_review_package",
    status: deriveStatus(dryRun, reviewItems, decision),
    patchScope: "src/modules/stream/foundation/** only",
    dryRunVersion: dryRun.version,
    dryRunStatus: dryRun.status,
    finalReviewPackageOnly: true,
    finalReviewBuiltNow: true,
    readyForOwnerDecision: decision.readyForOwnerDecision,
    readyForRouteSourceGenerationNow: false,
    routeSourceGenerationApprovedNow: false,
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
    reviewItems,
    reviewItemCount: reviewItems.length,
    blockingReviewItemCount,
    virtualFileReviews,
    virtualFileReviewCount: virtualFileReviews.length,
    approvedVirtualFileWriteCount: 0,
    writtenVirtualFileCount: 0,
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
    safety: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_FINAL_REVIEW_PACKAGE_SAFETY,
  };
}
