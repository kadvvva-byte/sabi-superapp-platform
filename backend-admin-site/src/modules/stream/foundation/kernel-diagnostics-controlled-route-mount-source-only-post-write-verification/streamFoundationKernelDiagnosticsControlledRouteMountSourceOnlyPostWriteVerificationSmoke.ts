import { getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSnapshot } from "./streamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerification";
import { getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationReadiness } from "./streamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationReadiness";

export interface StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSmokeResult {
  readonly smokeId: string;
  readonly passed: boolean;
  readonly observed: string;
  readonly expected: string;
  readonly safeCode: string;
}

export interface StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139S";
  readonly passed: boolean;
  readonly total: number;
  readonly passedCount: number;
  readonly results: readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSmokeResult[];
}

export function runStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSmoke(): StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationReadiness();
  const results: readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSmokeResult[] = [
    {
      smokeId: "139s_post_write_verification_ready",
      passed:
        snapshot.status === "controlled_route_mount_source_only_post_write_verification_passed_unmounted" &&
        readiness.status === "ready" &&
        snapshot.readyForControlledDiagnosticsRouteMountPlanning === true,
      observed: `${snapshot.status}:${readiness.status}:${String(snapshot.readyForControlledDiagnosticsRouteMountPlanning)}`,
      expected: "post-write verification passes and is ready for controlled route mount planning",
      safeCode: "post_write_verification_ready",
    },
    {
      smokeId: "139s_verified_runtime_route_files_after_write",
      passed:
        snapshot.verifiedSourceFileCount === 6 &&
        snapshot.verifiedSourceFiles.every((file) => file.verifiedAfterSourceOnlyWrite && !file.mountedNow && file.scope === "src/modules/stream/foundation/** only"),
      observed: `${snapshot.verifiedSourceFileCount}:${String(snapshot.verifiedSourceFiles.every((file) => file.verifiedAfterSourceOnlyWrite && !file.mountedNow))}`,
      expected: "six source-only runtime route files verified after write and still unmounted",
      safeCode: "verified_runtime_route_files_after_write",
    },
    {
      smokeId: "139s_no_stream_index_or_app_server",
      passed:
        snapshot.safety.streamIndexPatchIncluded === false &&
        snapshot.safety.streamModuleIndexTouchedNow === false &&
        snapshot.safety.appServerPatchIncluded === false &&
        snapshot.safety.appServerTouchedNow === false,
      observed: `${String(snapshot.safety.streamIndexPatchIncluded)}:${String(snapshot.safety.streamModuleIndexTouchedNow)}:${String(snapshot.safety.appServerPatchIncluded)}:${String(snapshot.safety.appServerTouchedNow)}`,
      expected: "no stream index and no app/server patch",
      safeCode: "no_stream_index_or_app_server",
    },
    {
      smokeId: "139s_no_route_mount_or_runtime_http",
      passed:
        snapshot.routeMountPerformedNow === false &&
        snapshot.protectedRouteRegisteredNow === false &&
        snapshot.runtimeHttpRequestsPerformed === 0,
      observed: `${String(snapshot.routeMountPerformedNow)}:${String(snapshot.protectedRouteRegisteredNow)}:${snapshot.runtimeHttpRequestsPerformed}`,
      expected: "no route mount, protected route registration, or runtime HTTP",
      safeCode: "no_route_mount_or_runtime_http",
    },
    {
      smokeId: "139s_no_data_or_provider_side_effects",
      passed:
        snapshot.databaseExecutionPerformed === 0 &&
        snapshot.providerCallsPerformed === 0 &&
        snapshot.walletMutationPerformed === 0,
      observed: `${snapshot.databaseExecutionPerformed}:${snapshot.providerCallsPerformed}:${snapshot.walletMutationPerformed}`,
      expected: "no database, provider, or Wallet side effects",
      safeCode: "no_data_or_provider_side_effects",
    },
    {
      smokeId: "139s_no_money_or_fake_success",
      passed:
        snapshot.paymentAuthorizationPerformed === 0 &&
        snapshot.monthlyPayoutPerformed === 0 &&
        snapshot.moneyMovementPerformed === 0 &&
        snapshot.fakeSuccessAllowed === false,
      observed: `${snapshot.paymentAuthorizationPerformed}:${snapshot.monthlyPayoutPerformed}:${snapshot.moneyMovementPerformed}:${String(snapshot.fakeSuccessAllowed)}`,
      expected: "no payment, payout, money movement, or fake success",
      safeCode: "no_money_or_fake_success",
    },
    {
      smokeId: "139s_no_secrets_or_mobile_provider_keys",
      passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false,
      observed: `${snapshot.rawSecretsReturned}:${String(snapshot.mobileProviderKeysAllowed)}`,
      expected: "no raw secrets and no mobile provider keys",
      safeCode: "no_secrets_or_mobile_provider_keys",
    },
  ];
  const passedCount = results.filter((result) => result.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-139S",
    passed: passedCount === results.length,
    total: results.length,
    passedCount,
    results,
  };
}
