import {
  getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningReadiness,
  getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningSnapshot,
} from "../kernel-diagnostics-controlled-backend-entry-patch-planning";
import {
  STREAM_FOUNDATION_140D_KERNEL_DIAGNOSTICS_CONTROLLED_BACKEND_ENTRY_PATCH_OWNER_REVIEW_PACKAGE_VERSION,
  type StreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageCheck,
  type StreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageDecision,
  type StreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageReviewItem,
  type StreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageSafety,
  type StreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageSnapshot,
} from "./streamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageContracts";

const SAFETY: StreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  ownerReviewPackageBuiltNow: true,
  explicitOwnerApprovalRequiredBeforeAnyNonFoundationWrite: true,
  explicitOwnerApprovalCapturedNow: false,
  sourceWriteAllowedNow: false,
  sourceWriteExecutedNow: false,
  streamIndexPatchIncludedNow: false,
  streamModuleIndexTouchedNow: false,
  backendEntryPatchIncludedNow: false,
  appServerPatchIncludedNow: false,
  appServerTouchedNow: false,
  routeMountAllowedNow: false,
  routeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
  expressRouterCreatedNow: false,
  expressRouterImportedNow: false,
  expressRouterBoundNow: false,
  runtimeHttpRequestAllowedNow: false,
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
  readyForProductionBackend: false,
};

function buildReviewItems(): readonly StreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageReviewItem[] {
  return [
    {
      target: "stream_module_index_export_review",
      futurePath: "src/modules/stream/index.ts",
      operation: "review_only_no_write",
      requiresSeparateExplicitOwnerApproval: true,
      approvedForWriteNow: false,
      writtenNow: false,
      mountedNow: false,
      runtimeSmokeNow: false,
      includesDatabaseExecutionNow: false,
      includesProviderCallNow: false,
      includesWalletMutationNow: false,
      includesMoneyMovementNow: false,
      safeCode: "140d_review_stream_module_index_export",
      safeMessageKey: "stream.foundation.140d.review.streamModuleIndexExport",
    },
    {
      target: "backend_app_route_mount_review",
      futurePath: "src/app.ts",
      operation: "review_only_no_write",
      requiresSeparateExplicitOwnerApproval: true,
      approvedForWriteNow: false,
      writtenNow: false,
      mountedNow: false,
      runtimeSmokeNow: false,
      includesDatabaseExecutionNow: false,
      includesProviderCallNow: false,
      includesWalletMutationNow: false,
      includesMoneyMovementNow: false,
      safeCode: "140d_review_backend_app_route_mount",
      safeMessageKey: "stream.foundation.140d.review.backendAppRouteMount",
    },
    {
      target: "backend_server_audit_review",
      futurePath: "src/server.ts",
      operation: "review_only_no_write",
      requiresSeparateExplicitOwnerApproval: true,
      approvedForWriteNow: false,
      writtenNow: false,
      mountedNow: false,
      runtimeSmokeNow: false,
      includesDatabaseExecutionNow: false,
      includesProviderCallNow: false,
      includesWalletMutationNow: false,
      includesMoneyMovementNow: false,
      safeCode: "140d_review_backend_server_audit_only",
      safeMessageKey: "stream.foundation.140d.review.backendServerAuditOnly",
    },
    {
      target: "protected_router_chain_review",
      futurePath: "future protected stream diagnostics route chain",
      operation: "review_only_no_write",
      requiresSeparateExplicitOwnerApproval: true,
      approvedForWriteNow: false,
      writtenNow: false,
      mountedNow: false,
      runtimeSmokeNow: false,
      includesDatabaseExecutionNow: false,
      includesProviderCallNow: false,
      includesWalletMutationNow: false,
      includesMoneyMovementNow: false,
      safeCode: "140d_review_protected_router_chain",
      safeMessageKey: "stream.foundation.140d.review.protectedRouterChain",
    },
    {
      target: "post_mount_runtime_smoke_review",
      futurePath: "future local HTTP smoke after explicit mount approval",
      operation: "review_only_no_write",
      requiresSeparateExplicitOwnerApproval: true,
      approvedForWriteNow: false,
      writtenNow: false,
      mountedNow: false,
      runtimeSmokeNow: false,
      includesDatabaseExecutionNow: false,
      includesProviderCallNow: false,
      includesWalletMutationNow: false,
      includesMoneyMovementNow: false,
      safeCode: "140d_review_post_mount_runtime_smoke",
      safeMessageKey: "stream.foundation.140d.review.postMountRuntimeSmoke",
    },
    {
      target: "rollback_plan_review",
      futurePath: "future rollback checklist for stream index and app mount patch",
      operation: "review_only_no_write",
      requiresSeparateExplicitOwnerApproval: true,
      approvedForWriteNow: false,
      writtenNow: false,
      mountedNow: false,
      runtimeSmokeNow: false,
      includesDatabaseExecutionNow: false,
      includesProviderCallNow: false,
      includesWalletMutationNow: false,
      includesMoneyMovementNow: false,
      safeCode: "140d_review_rollback_plan",
      safeMessageKey: "stream.foundation.140d.review.rollbackPlan",
    },
  ] as const;
}

function buildChecks(
  reviewItems: readonly StreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageReviewItem[],
): readonly StreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageCheck[] {
  const previous = getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningSnapshot();
  const previousReadiness = getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningReadiness();
  const previousReady =
    previous.status === "controlled_backend_entry_patch_planning_ready_unmounted" &&
    previousReadiness.ready === true &&
    previous.blockingChecks === 0 &&
    previous.readyForControlledBackendEntryPatchOwnerReview === true;
  const reviewItemsSafe =
    reviewItems.length === 6 &&
    reviewItems.every((item) =>
      item.operation === "review_only_no_write" &&
      item.requiresSeparateExplicitOwnerApproval === true &&
      item.approvedForWriteNow === false &&
      item.writtenNow === false &&
      item.mountedNow === false &&
      item.runtimeSmokeNow === false &&
      item.includesDatabaseExecutionNow === false &&
      item.includesProviderCallNow === false &&
      item.includesWalletMutationNow === false &&
      item.includesMoneyMovementNow === false,
    );

  return [
    {
      area: "previous_140c_planning",
      checkId: "140d_previous_140c_ready",
      passed: previousReady,
      blocking: !previousReady,
      expected: "140C planning is ready and has zero blocking checks before 140D owner review.",
      observed: `${previous.status}:${String(previousReadiness.ready)}:${previous.blockingChecks}:${String(previous.readyForControlledBackendEntryPatchOwnerReview)}`,
      remediation: "Install/fix 140C before preparing owner review for backend entry patch.",
      safeCode: "previous_140c_ready",
      safeMessageKey: "stream.foundation.140d.previous140cReady",
    },
    {
      area: "owner_review_metadata",
      checkId: "140d_owner_review_metadata_safe",
      passed:
        SAFETY.ownerReviewPackageBuiltNow === true &&
        SAFETY.explicitOwnerApprovalRequiredBeforeAnyNonFoundationWrite === true &&
        SAFETY.explicitOwnerApprovalCapturedNow === false,
      blocking:
        SAFETY.ownerReviewPackageBuiltNow !== true ||
        SAFETY.explicitOwnerApprovalRequiredBeforeAnyNonFoundationWrite !== true ||
        SAFETY.explicitOwnerApprovalCapturedNow !== false,
      expected: "Review package exists, explicit owner approval is still required, and no approval is captured by this patch.",
      observed: `${String(SAFETY.ownerReviewPackageBuiltNow)}:${String(SAFETY.explicitOwnerApprovalRequiredBeforeAnyNonFoundationWrite)}:${String(SAFETY.explicitOwnerApprovalCapturedNow)}`,
      remediation: "Keep 140D review-only. Do not convert it into owner-approved write execution.",
      safeCode: "owner_review_metadata_safe",
      safeMessageKey: "stream.foundation.140d.ownerReviewMetadataSafe",
    },
    {
      area: "future_stream_index_entry_patch",
      checkId: "140d_stream_index_review_only",
      passed: SAFETY.streamIndexPatchIncludedNow === false && SAFETY.streamModuleIndexTouchedNow === false,
      blocking: SAFETY.streamIndexPatchIncludedNow || SAFETY.streamModuleIndexTouchedNow,
      expected: "src/modules/stream/index.ts is reviewed only, not included or touched in 140D.",
      observed: `${String(SAFETY.streamIndexPatchIncludedNow)}:${String(SAFETY.streamModuleIndexTouchedNow)}`,
      remediation: "Move any stream index write into a later owner-approved patch.",
      safeCode: "stream_index_review_only",
      safeMessageKey: "stream.foundation.140d.streamIndexReviewOnly",
    },
    {
      area: "future_backend_app_mount_patch",
      checkId: "140d_backend_app_review_only",
      passed: SAFETY.backendEntryPatchIncludedNow === false && SAFETY.appServerPatchIncludedNow === false && SAFETY.appServerTouchedNow === false,
      blocking: SAFETY.backendEntryPatchIncludedNow || SAFETY.appServerPatchIncludedNow || SAFETY.appServerTouchedNow,
      expected: "src/app.ts and src/server.ts are review-only future targets, not included or touched now.",
      observed: `${String(SAFETY.backendEntryPatchIncludedNow)}:${String(SAFETY.appServerPatchIncludedNow)}:${String(SAFETY.appServerTouchedNow)}`,
      remediation: "Do not patch app/server until an explicit owner-approved source-only stage.",
      safeCode: "backend_app_review_only",
      safeMessageKey: "stream.foundation.140d.backendAppReviewOnly",
    },
    {
      area: "future_server_route_audit",
      checkId: "140d_server_audit_review_only",
      passed: reviewItems.some((item) => item.target === "backend_server_audit_review" && item.writtenNow === false),
      blocking: !reviewItems.some((item) => item.target === "backend_server_audit_review" && item.writtenNow === false),
      expected: "Server route audit is present as review-only and has no write now.",
      observed: String(reviewItems.some((item) => item.target === "backend_server_audit_review" && item.writtenNow === false)),
      remediation: "Keep server audit as review-only until runtime mount is approved.",
      safeCode: "server_audit_review_only",
      safeMessageKey: "stream.foundation.140d.serverAuditReviewOnly",
    },
    {
      area: "future_runtime_smoke_plan",
      checkId: "140d_runtime_smoke_review_only",
      passed: reviewItems.some((item) => item.target === "post_mount_runtime_smoke_review" && item.runtimeSmokeNow === false),
      blocking: !reviewItems.some((item) => item.target === "post_mount_runtime_smoke_review" && item.runtimeSmokeNow === false),
      expected: "Runtime smoke is only a future reviewed step; no HTTP call is performed now.",
      observed: String(reviewItems.some((item) => item.target === "post_mount_runtime_smoke_review" && item.runtimeSmokeNow === false)),
      remediation: "Run runtime HTTP smoke only after explicit route mount approval.",
      safeCode: "runtime_smoke_review_only",
      safeMessageKey: "stream.foundation.140d.runtimeSmokeReviewOnly",
    },
    {
      area: "foundation_scope",
      checkId: "140d_foundation_scope_only",
      passed: SAFETY.patchScope === "src/modules/stream/foundation/** only" && reviewItemsSafe,
      blocking: SAFETY.patchScope !== "src/modules/stream/foundation/** only" || !reviewItemsSafe,
      expected: "140D package is foundation-only and every review item is no-write/no-mount/no-runtime.",
      observed: `${SAFETY.patchScope}:${String(reviewItemsSafe)}`,
      remediation: "Remove non-foundation files and unsafe review items from this package.",
      safeCode: "foundation_scope_only",
      safeMessageKey: "stream.foundation.140d.foundationScopeOnly",
    },
    {
      area: "runtime_execution_deferred",
      checkId: "140d_runtime_execution_deferred",
      passed:
        SAFETY.routeMountAllowedNow === false &&
        SAFETY.routeMountPerformedNow === false &&
        SAFETY.runtimeHttpRequestAllowedNow === false &&
        SAFETY.runtimeHttpRequestPerformedNow === false,
      blocking:
        SAFETY.routeMountAllowedNow ||
        SAFETY.routeMountPerformedNow ||
        SAFETY.runtimeHttpRequestAllowedNow ||
        SAFETY.runtimeHttpRequestPerformedNow,
      expected: "No route mount and no runtime HTTP execution in 140D.",
      observed: `${String(SAFETY.routeMountAllowedNow)}:${String(SAFETY.routeMountPerformedNow)}:${String(SAFETY.runtimeHttpRequestAllowedNow)}:${String(SAFETY.runtimeHttpRequestPerformedNow)}`,
      remediation: "Keep all runtime work blocked until the controlled mount stage.",
      safeCode: "runtime_execution_deferred",
      safeMessageKey: "stream.foundation.140d.runtimeExecutionDeferred",
    },
    {
      area: "persistence_provider_wallet_deferred",
      checkId: "140d_db_provider_wallet_deferred",
      passed: SAFETY.databaseWriteAllowedNow === false && SAFETY.providerCallAllowedNow === false && SAFETY.walletMutationAllowedNow === false,
      blocking: SAFETY.databaseWriteAllowedNow || SAFETY.providerCallAllowedNow || SAFETY.walletMutationAllowedNow,
      expected: "No DB/provider/Wallet execution in 140D.",
      observed: `${String(SAFETY.databaseWriteAllowedNow)}:${String(SAFETY.providerCallAllowedNow)}:${String(SAFETY.walletMutationAllowedNow)}`,
      remediation: "Keep persistence/provider/Wallet work for later approved stages.",
      safeCode: "db_provider_wallet_deferred",
      safeMessageKey: "stream.foundation.140d.dbProviderWalletDeferred",
    },
    {
      area: "money_movement_block",
      checkId: "140d_money_movement_blocked",
      passed:
        SAFETY.paymentAuthorizationAllowedNow === false &&
        SAFETY.monthlyPayoutAllowedNow === false &&
        SAFETY.moneyMovementAllowedNow === false,
      blocking: SAFETY.paymentAuthorizationAllowedNow || SAFETY.monthlyPayoutAllowedNow || SAFETY.moneyMovementAllowedNow,
      expected: "No payment authorization, monthly payout, or money movement.",
      observed: `${String(SAFETY.paymentAuthorizationAllowedNow)}:${String(SAFETY.monthlyPayoutAllowedNow)}:${String(SAFETY.moneyMovementAllowedNow)}`,
      remediation: "Keep money movement blocked until real provider and Wallet ledger gates exist.",
      safeCode: "money_movement_blocked",
      safeMessageKey: "stream.foundation.140d.moneyMovementBlocked",
    },
    {
      area: "secret_redaction",
      checkId: "140d_no_secrets",
      passed: SAFETY.rawSecretsReturned === false && SAFETY.mobileProviderKeysAllowed === false,
      blocking: SAFETY.rawSecretsReturned || SAFETY.mobileProviderKeysAllowed,
      expected: "No raw secrets and no mobile provider keys.",
      observed: `${String(SAFETY.rawSecretsReturned)}:${String(SAFETY.mobileProviderKeysAllowed)}`,
      remediation: "Keep all provider keys server-side only and hidden.",
      safeCode: "no_secrets",
      safeMessageKey: "stream.foundation.140d.noSecrets",
    },
    {
      area: "fake_success_block",
      checkId: "140d_fake_success_blocked",
      passed: SAFETY.fakeSuccessAllowed === false,
      blocking: SAFETY.fakeSuccessAllowed,
      expected: "Fake success stays blocked.",
      observed: String(SAFETY.fakeSuccessAllowed),
      remediation: "Return safe-disabled/provider_not_configured states until real providers are configured.",
      safeCode: "fake_success_blocked",
      safeMessageKey: "stream.foundation.140d.fakeSuccessBlocked",
    },
  ];
}

function buildDecision(
  checks: readonly StreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageCheck[],
): StreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageDecision {
  const blocking = checks.filter((check) => check.blocking);
  if (blocking.some((check) => check.area === "previous_140c_planning")) {
    return {
      decisionCode: "controlled_backend_entry_patch_owner_review_package_blocked_by_140c",
      reviewPackageReadyNow: false,
      readyForExplicitOwnerApproval: false,
      readyForControlledBackendEntryPatchOwnerApprovedPackage: false,
      readyForControlledBackendEntryPatchSourceOnlyWrite: false,
      readyForProductionBackend: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "140d_blocked_by_140c",
      safeMessageKey: "stream.foundation.140d.blockedBy140c",
    };
  }
  if (blocking.length > 0) {
    return {
      decisionCode: "controlled_backend_entry_patch_owner_review_package_blocked_by_safety_gate",
      reviewPackageReadyNow: false,
      readyForExplicitOwnerApproval: false,
      readyForControlledBackendEntryPatchOwnerApprovedPackage: false,
      readyForControlledBackendEntryPatchSourceOnlyWrite: false,
      readyForProductionBackend: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "140d_blocked_by_safety_gate",
      safeMessageKey: "stream.foundation.140d.blockedBySafetyGate",
    };
  }
  return {
    decisionCode: "controlled_backend_entry_patch_owner_review_package_ready_for_explicit_owner_approval",
    reviewPackageReadyNow: true,
    readyForExplicitOwnerApproval: true,
    readyForControlledBackendEntryPatchOwnerApprovedPackage: false,
    readyForControlledBackendEntryPatchSourceOnlyWrite: false,
    readyForProductionBackend: false,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "140d_owner_review_package_ready",
    safeMessageKey: "stream.foundation.140d.ownerReviewPackageReady",
  };
}

export function getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageSnapshot(): StreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningSnapshot();
  const previousReadiness = getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningReadiness();
  const reviewItems = buildReviewItems();
  const checks = buildChecks(reviewItems);
  const decision = buildDecision(checks);
  return {
    version: STREAM_FOUNDATION_140D_KERNEL_DIAGNOSTICS_CONTROLLED_BACKEND_ENTRY_PATCH_OWNER_REVIEW_PACKAGE_VERSION,
    status: decision.reviewPackageReadyNow
      ? "controlled_backend_entry_patch_owner_review_package_ready"
      : "controlled_backend_entry_patch_owner_review_package_blocked",
    patchScope: "src/modules/stream/foundation/** only",
    previous140cStatus: previous.status,
    previous140cReady: previousReadiness.ready,
    reviewItems,
    reviewItemCount: reviewItems.length,
    totalChecks: checks.length,
    passedChecks: checks.filter((check) => check.passed).length,
    blockingChecks: checks.filter((check) => check.blocking).length,
    reviewPackageReadyNow: decision.reviewPackageReadyNow,
    readyForExplicitOwnerApproval: decision.readyForExplicitOwnerApproval,
    readyForControlledBackendEntryPatchOwnerApprovedPackage: false,
    readyForControlledBackendEntryPatchSourceOnlyWrite: false,
    readyForProductionBackend: false,
    explicitOwnerApprovalRequiredBeforeAnyNonFoundationWrite: true,
    explicitOwnerApprovalCapturedNow: false,
    sourceWriteAllowedNow: false,
    sourceWriteExecutedNow: false,
    streamIndexPatchIncludedNow: false,
    streamModuleIndexTouchedNow: false,
    backendEntryPatchIncludedNow: false,
    appServerPatchIncludedNow: false,
    appServerTouchedNow: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    protectedRouteRegisteredNow: false,
    expressRouterCreatedNow: false,
    expressRouterImportedNow: false,
    expressRouterBoundNow: false,
    runtimeHttpRequestsPerformed: 0,
    databaseExecutionPerformed: 0,
    providerCallsPerformed: 0,
    walletMutationPerformed: 0,
    paymentAuthorizationPerformed: 0,
    monthlyPayoutPerformed: 0,
    moneyMovementPerformed: 0,
    rawSecretsReturned: 0,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    checks,
    decision,
    safety: SAFETY,
  };
}
