import { getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSnapshot } from "./streamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecution";
import { getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionReadiness } from "./streamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionReadiness";

export interface StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSmokeResult {
  readonly smokeId: string;
  readonly passed: boolean;
  readonly observed: string;
  readonly expected: string;
  readonly safeCode: string;
}

export interface StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139R";
  readonly passed: boolean;
  readonly total: number;
  readonly passedCount: number;
  readonly results: readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSmokeResult[];
}

export function runStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSmoke(): StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionReadiness();
  const results: readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSmokeResult[] = [
    {
      smokeId: "139r_source_only_execution_ready",
      passed:
        snapshot.status === "controlled_route_mount_source_only_execution_ready_unmounted" &&
        readiness.status === "ready" &&
        snapshot.readyForControlledRouteMountSourceOnlyPostWriteVerification === true,
      observed: `${snapshot.status}:${readiness.status}:${String(snapshot.readyForControlledRouteMountSourceOnlyPostWriteVerification)}`,
      expected: "controlled source-only execution is ready and remains unmounted",
      safeCode: "source_only_execution_ready",
    },
    {
      smokeId: "139r_verified_runtime_route_files",
      passed:
        snapshot.verifiedSourceFileCount === 6 &&
        snapshot.verifiedSourceFiles.every((file) => file.scope === "src/modules/stream/foundation/** only" && file.sourceVerifiedNow === true && file.mountedNow === false),
      observed: `${snapshot.verifiedSourceFileCount}:${String(snapshot.verifiedSourceFiles.every((file) => file.sourceVerifiedNow && !file.mountedNow))}`,
      expected: "six runtime route source files verified inside foundation and still unmounted",
      safeCode: "verified_runtime_route_files",
    },
    {
      smokeId: "139r_no_stream_index_or_app_server",
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
      smokeId: "139r_no_route_mount_or_runtime_http",
      passed:
        snapshot.routeMountPerformedNow === false &&
        snapshot.protectedRouteRegisteredNow === false &&
        snapshot.runtimeHttpRequestsPerformed === 0,
      observed: `${String(snapshot.routeMountPerformedNow)}:${String(snapshot.protectedRouteRegisteredNow)}:${snapshot.runtimeHttpRequestsPerformed}`,
      expected: "no route mount, no protected route registration, no runtime HTTP request",
      safeCode: "no_route_mount_or_runtime_http",
    },
    {
      smokeId: "139r_no_data_or_provider_side_effects",
      passed:
        snapshot.databaseExecutionPerformed === 0 &&
        snapshot.providerCallsPerformed === 0 &&
        snapshot.walletMutationPerformed === 0,
      observed: `${snapshot.databaseExecutionPerformed}:${snapshot.providerCallsPerformed}:${snapshot.walletMutationPerformed}`,
      expected: "no database, provider, or Wallet side effects",
      safeCode: "no_data_or_provider_side_effects",
    },
    {
      smokeId: "139r_no_money_or_fake_success",
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
      smokeId: "139r_no_secrets_or_mobile_provider_keys",
      passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false,
      observed: `${snapshot.rawSecretsReturned}:${String(snapshot.mobileProviderKeysAllowed)}`,
      expected: "no raw secrets and no mobile provider keys",
      safeCode: "no_secrets_or_mobile_provider_keys",
    },
  ];
  const passedCount = results.filter((result) => result.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-139R",
    passed: passedCount === results.length,
    total: results.length,
    passedCount,
    results,
  };
}
