import { getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageSnapshot } from "../kernel-diagnostics-controlled-backend-route-connection-source-package";
import {
  STREAM_FOUNDATION_139X_KERNEL_DIAGNOSTICS_CONTROLLED_BACKEND_ROUTE_CONNECTION_SOURCE_PACKAGE_WRITE_REVIEW_VERSION,
  type StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewCheck,
  type StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewDecision,
  type StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewReviewItem,
  type StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewSafety,
  type StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewSnapshot,
  type StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewStatus,
} from "./streamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewContracts";

const SAFETY: StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  previousSourcePackagePassed: true,
  writeReviewBuiltNow: true,
  sourcePackageWriteAllowedNow: false,
  sourcePackageWriteExecutedNow: false,
  sourceFilesWrittenNow: false,
  sourceTextReturnedNow: false,
  readyForProductionBackend: false,
  routeMountAllowedNow: false,
  routeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
  expressRouterCreatedNow: false,
  expressRouterImportedNow: false,
  expressRouterBoundNow: false,
  streamIndexPatchIncluded: false,
  streamModuleIndexTouchedNow: false,
  appServerPatchIncluded: false,
  appServerTouchedNow: false,
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

const REVIEW_ITEMS: readonly StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewReviewItem[] = [
  {
    reviewId: "139x_foundation_runtime_route_review",
    target: "foundation_runtime_route",
    expectedPath: "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/**",
    approvedForThisPatch: true,
    writeAllowedNow: false,
    writeExecutedNow: false,
    mountAllowedNow: false,
    productionRequired: true,
    safeCode: "foundation_runtime_route_review_only",
  },
  {
    reviewId: "139x_stream_index_connection_deferred",
    target: "stream_module_index_later",
    expectedPath: "src/modules/stream/index.ts",
    approvedForThisPatch: false,
    writeAllowedNow: false,
    writeExecutedNow: false,
    mountAllowedNow: false,
    productionRequired: true,
    safeCode: "stream_index_connection_deferred",
  },
  {
    reviewId: "139x_backend_entry_mount_deferred",
    target: "backend_entry_mount_later",
    expectedPath: "backend app/server route registration file",
    approvedForThisPatch: false,
    writeAllowedNow: false,
    writeExecutedNow: false,
    mountAllowedNow: false,
    productionRequired: true,
    safeCode: "backend_entry_mount_deferred",
  },
  {
    reviewId: "139x_server_smoke_deferred",
    target: "server_smoke_later",
    expectedPath: "production server smoke after controlled mount",
    approvedForThisPatch: false,
    writeAllowedNow: false,
    writeExecutedNow: false,
    mountAllowedNow: false,
    productionRequired: true,
    safeCode: "server_smoke_deferred",
  },
  {
    reviewId: "139x_provider_runtime_deferred",
    target: "provider_runtime_later",
    expectedPath: "DB/realtime/media/payment/Wallet provider adapters",
    approvedForThisPatch: false,
    writeAllowedNow: false,
    writeExecutedNow: false,
    mountAllowedNow: false,
    productionRequired: true,
    safeCode: "provider_runtime_deferred",
  },
] as const;

function buildChecks(): readonly StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewCheck[] {
  const previous = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageSnapshot();
  const previousPassed = previous.readyForControlledBackendRouteConnectionSourcePackageWriteReview === true && previous.blockingChecks === 0;
  return [
    { area: "previous_source_package", checkId: "139x_previous_source_package_passed", passed: previousPassed, blocking: !previousPassed, expected: "139W source package ready for write review", observed: previous.status, remediation: "Re-run 139W source package checks before 139X.", safeCode: "previous_source_package_passed", safeMessageKey: "stream.foundation.139x.previousSourcePackagePassed" },
    { area: "write_review_scope", checkId: "139x_foundation_only_scope", passed: SAFETY.patchScope === "src/modules/stream/foundation/** only", blocking: SAFETY.patchScope !== "src/modules/stream/foundation/** only", expected: "foundation-only patch", observed: SAFETY.patchScope, remediation: "Keep this patch inside foundation only.", safeCode: "foundation_only_scope", safeMessageKey: "stream.foundation.139x.foundationOnlyScope" },
    { area: "stream_index_deferred", checkId: "139x_stream_index_deferred", passed: !SAFETY.streamIndexPatchIncluded && !SAFETY.streamModuleIndexTouchedNow, blocking: SAFETY.streamIndexPatchIncluded || SAFETY.streamModuleIndexTouchedNow, expected: "no src/modules/stream/index.ts changes", observed: `${String(SAFETY.streamIndexPatchIncluded)}:${String(SAFETY.streamModuleIndexTouchedNow)}`, remediation: "Do not include stream index until controlled backend connection stage.", safeCode: "stream_index_deferred", safeMessageKey: "stream.foundation.139x.streamIndexDeferred" },
    { area: "backend_entry_deferred", checkId: "139x_backend_entry_deferred", passed: !SAFETY.appServerPatchIncluded && !SAFETY.appServerTouchedNow && !SAFETY.routeMountPerformedNow, blocking: SAFETY.appServerPatchIncluded || SAFETY.appServerTouchedNow || SAFETY.routeMountPerformedNow, expected: "no backend entry/app/server mount", observed: `${String(SAFETY.appServerPatchIncluded)}:${String(SAFETY.appServerTouchedNow)}:${String(SAFETY.routeMountPerformedNow)}`, remediation: "Mount only after explicit controlled route connection approval.", safeCode: "backend_entry_deferred", safeMessageKey: "stream.foundation.139x.backendEntryDeferred" },
    { area: "runtime_http_deferred", checkId: "139x_runtime_http_deferred", passed: !SAFETY.runtimeHttpRequestPerformedNow, blocking: SAFETY.runtimeHttpRequestPerformedNow, expected: "no runtime HTTP request", observed: String(SAFETY.runtimeHttpRequestPerformedNow), remediation: "Run HTTP smoke only after route mount.", safeCode: "runtime_http_deferred", safeMessageKey: "stream.foundation.139x.runtimeHttpDeferred" },
    { area: "persistence_provider_wallet_deferred", checkId: "139x_persistence_provider_wallet_deferred", passed: !SAFETY.databaseReadAllowedNow && !SAFETY.databaseWriteAllowedNow && !SAFETY.providerCallAllowedNow && !SAFETY.walletMutationAllowedNow, blocking: SAFETY.databaseReadAllowedNow || SAFETY.databaseWriteAllowedNow || SAFETY.providerCallAllowedNow || SAFETY.walletMutationAllowedNow, expected: "no DB/provider/Wallet runtime", observed: `${String(SAFETY.databaseReadAllowedNow)}:${String(SAFETY.databaseWriteAllowedNow)}:${String(SAFETY.providerCallAllowedNow)}:${String(SAFETY.walletMutationAllowedNow)}`, remediation: "Bind runtime adapters later through adapter registry and provider gates.", safeCode: "persistence_provider_wallet_deferred", safeMessageKey: "stream.foundation.139x.persistenceProviderWalletDeferred" },
    { area: "payment_payout_deferred", checkId: "139x_payment_payout_deferred", passed: !SAFETY.paymentAuthorizationAllowedNow && !SAFETY.monthlyPayoutAllowedNow && !SAFETY.moneyMovementAllowedNow, blocking: SAFETY.paymentAuthorizationAllowedNow || SAFETY.monthlyPayoutAllowedNow || SAFETY.moneyMovementAllowedNow, expected: "no payment authorization, monthly payout, or money movement", observed: `${String(SAFETY.paymentAuthorizationAllowedNow)}:${String(SAFETY.monthlyPayoutAllowedNow)}:${String(SAFETY.moneyMovementAllowedNow)}`, remediation: "Keep payment and payout disabled until real providers are configured.", safeCode: "payment_payout_deferred", safeMessageKey: "stream.foundation.139x.paymentPayoutDeferred" },
    { area: "secret_redaction", checkId: "139x_secret_redaction", passed: !SAFETY.rawSecretsReturned && !SAFETY.mobileProviderKeysAllowed, blocking: SAFETY.rawSecretsReturned || SAFETY.mobileProviderKeysAllowed, expected: "no raw secrets and no mobile provider keys", observed: `${String(SAFETY.rawSecretsReturned)}:${String(SAFETY.mobileProviderKeysAllowed)}`, remediation: "Keep provider secrets server-side and redacted.", safeCode: "secret_redaction", safeMessageKey: "stream.foundation.139x.secretRedaction" },
    { area: "fake_success_block", checkId: "139x_fake_success_blocked", passed: SAFETY.fakeSuccessAllowed === false, blocking: SAFETY.fakeSuccessAllowed, expected: "fake success blocked", observed: String(SAFETY.fakeSuccessAllowed), remediation: "Return provider_not_configured/safe-disabled until real providers are configured.", safeCode: "fake_success_blocked", safeMessageKey: "stream.foundation.139x.fakeSuccessBlocked" },
    { area: "production_transition", checkId: "139x_not_production_backend_ready_yet", passed: SAFETY.readyForProductionBackend === false, blocking: SAFETY.readyForProductionBackend !== false, expected: "write review only, not production backend ready yet", observed: String(SAFETY.readyForProductionBackend), remediation: "Continue with final gate, controlled index/backend mount, server build, and production smoke.", safeCode: "not_production_backend_ready_yet", safeMessageKey: "stream.foundation.139x.notProductionBackendReadyYet" },
  ] as const;
}

function buildDecision(checks: readonly StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewCheck[]): StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewDecision {
  const previous = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageSnapshot();
  const blockingChecks = checks.filter((check) => check.blocking);
  const previousPassed = previous.readyForControlledBackendRouteConnectionSourcePackageWriteReview === true && previous.blockingChecks === 0;
  const ready = previousPassed && blockingChecks.length === 0;
  return {
    decisionCode: ready ? "controlled_backend_route_connection_source_package_write_review_ready_for_final_gate" : previousPassed ? "controlled_backend_route_connection_source_package_write_review_blocked_by_safety_gate" : "controlled_backend_route_connection_source_package_write_review_blocked_by_previous_source_package",
    writeReviewPassedNow: ready,
    readyForControlledBackendRouteConnectionSourcePackageFinalGate: ready,
    readyForProductionBackend: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: ready ? "write_review_ready_for_final_gate" : "write_review_blocked",
    safeMessageKey: ready ? "stream.foundation.139x.readyForFinalGate" : "stream.foundation.139x.blocked",
  };
}

export function getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewSnapshot(): StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageSnapshot();
  const checks = buildChecks();
  const decision = buildDecision(checks);
  const passedChecks = checks.filter((check) => check.passed).length;
  const blockingChecks = checks.filter((check) => check.blocking).length;
  const status: StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageWriteReviewStatus = decision.writeReviewPassedNow ? "controlled_backend_route_connection_source_package_write_review_ready_unmounted" : "controlled_backend_route_connection_source_package_write_review_blocked";
  return {
    version: STREAM_FOUNDATION_139X_KERNEL_DIAGNOSTICS_CONTROLLED_BACKEND_ROUTE_CONNECTION_SOURCE_PACKAGE_WRITE_REVIEW_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previousSourcePackageStatus: previous.status,
    writeReviewPassedNow: decision.writeReviewPassedNow,
    reviewItems: REVIEW_ITEMS,
    reviewItemCount: REVIEW_ITEMS.length,
    approvedItemsInThisPatch: REVIEW_ITEMS.filter((item) => item.approvedForThisPatch).length,
    sourcePackageWriteAllowedNow: false,
    sourcePackageWriteExecutedNow: false,
    sourceFilesWrittenNow: 0,
    sourceTextReturnedNow: 0,
    totalChecks: checks.length,
    passedChecks,
    blockingChecks,
    readyForControlledBackendRouteConnectionSourcePackageFinalGate: decision.readyForControlledBackendRouteConnectionSourcePackageFinalGate,
    readyForProductionBackend: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    protectedRouteRegisteredNow: false,
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
