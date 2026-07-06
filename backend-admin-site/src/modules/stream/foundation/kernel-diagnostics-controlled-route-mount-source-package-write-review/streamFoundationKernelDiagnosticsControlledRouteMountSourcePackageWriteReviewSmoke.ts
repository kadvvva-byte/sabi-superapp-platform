import { getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSnapshot } from "./streamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReview";

export interface StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSmokeResult {
  readonly smokeId: string;
  readonly passed: boolean;
  readonly observed: string;
  readonly expected: string;
  readonly safeCode: string;
}

export interface StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139O";
  readonly passed: boolean;
  readonly total: number;
  readonly passedCount: number;
  readonly results: readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSmokeResult[];
}

export function runStreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSmoke(): StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSnapshot();
  const results: readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSmokeResult[] = [
    {
      smokeId: "139o_review_ready",
      passed: snapshot.status === "controlled_route_mount_source_package_write_review_ready" && snapshot.readyForControlledRouteMountSourcePackageFinalGate === true,
      observed: `${snapshot.status}:${String(snapshot.readyForControlledRouteMountSourcePackageFinalGate)}`,
      expected: "controlled write review ready for final gate only",
      safeCode: "review_ready_for_final_gate_only",
    },
    {
      smokeId: "139o_no_stream_index_or_app_server",
      passed: snapshot.streamIndexPatchIncluded === false && snapshot.streamModuleIndexTouchedNow === false && snapshot.appServerPatchIncluded === false && snapshot.appServerTouchedNow === false,
      observed: `${String(snapshot.streamIndexPatchIncluded)}:${String(snapshot.streamModuleIndexTouchedNow)}:${String(snapshot.appServerPatchIncluded)}:${String(snapshot.appServerTouchedNow)}`,
      expected: "no stream index or app/server touch",
      safeCode: "no_stream_index_or_app_server",
    },
    {
      smokeId: "139o_no_route_mount_or_runtime",
      passed: snapshot.diagnosticsRouteRuntimeMountPerformedNow === false && snapshot.runtimeHttpRequestsPerformed === 0 && snapshot.protectedRouteRegisteredNow === false,
      observed: `${String(snapshot.diagnosticsRouteRuntimeMountPerformedNow)}:${snapshot.runtimeHttpRequestsPerformed}:${String(snapshot.protectedRouteRegisteredNow)}`,
      expected: "no route mount, no HTTP runtime, no protected route registration",
      safeCode: "no_route_mount_or_runtime",
    },
    {
      smokeId: "139o_no_money_or_provider_side_effects",
      passed:
        snapshot.databaseExecutionPerformed === 0 &&
        snapshot.providerCallsPerformed === 0 &&
        snapshot.walletMutationPerformed === 0 &&
        snapshot.paymentAuthorizationPerformed === 0 &&
        snapshot.monthlyPayoutPerformed === 0 &&
        snapshot.moneyMovementPerformed === 0,
      observed: `${snapshot.databaseExecutionPerformed}:${snapshot.providerCallsPerformed}:${snapshot.walletMutationPerformed}:${snapshot.paymentAuthorizationPerformed}:${snapshot.monthlyPayoutPerformed}:${snapshot.moneyMovementPerformed}`,
      expected: "no DB/provider/Wallet/payment/payout/money side effects",
      safeCode: "no_money_or_provider_side_effects",
    },
    {
      smokeId: "139o_no_secrets_or_fake_success",
      passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false && snapshot.fakeSuccessAllowed === false,
      observed: `${snapshot.rawSecretsReturned}:${String(snapshot.mobileProviderKeysAllowed)}:${String(snapshot.fakeSuccessAllowed)}`,
      expected: "no secrets, no mobile provider keys, no fake success",
      safeCode: "no_secrets_or_fake_success",
    },
  ];
  const passedCount = results.filter((result) => result.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-139O",
    passed: passedCount === results.length,
    total: results.length,
    passedCount,
    results,
  };
}
