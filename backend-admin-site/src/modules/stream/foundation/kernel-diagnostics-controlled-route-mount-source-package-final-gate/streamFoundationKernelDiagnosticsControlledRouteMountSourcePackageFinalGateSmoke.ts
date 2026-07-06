import { getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateSnapshot } from "./streamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGate";

export interface StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateSmokeResult {
  readonly smokeId: string;
  readonly passed: boolean;
  readonly observed: string;
  readonly expected: string;
  readonly safeCode: string;
}

export interface StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139P";
  readonly passed: boolean;
  readonly total: number;
  readonly passedCount: number;
  readonly results: readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateSmokeResult[];
}

export function runStreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateSmoke(): StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateSnapshot();
  const results: readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateSmokeResult[] = [
    {
      smokeId: "139p_final_gate_ready",
      passed:
        snapshot.status === "controlled_route_mount_source_package_final_gate_ready" &&
        snapshot.readyForControlledRouteMountSourcePackageOwnerApprovedSourceOnlyWrite === true,
      observed: `${snapshot.status}:${String(snapshot.readyForControlledRouteMountSourcePackageOwnerApprovedSourceOnlyWrite)}`,
      expected: "controlled final gate ready for owner-approved source-only write only",
      safeCode: "final_gate_ready_for_owner_approved_source_only_write",
    },
    {
      smokeId: "139p_no_stream_index_or_app_server",
      passed:
        snapshot.streamIndexPatchIncluded === false &&
        snapshot.streamModuleIndexTouchedNow === false &&
        snapshot.appServerPatchIncluded === false &&
        snapshot.appServerTouchedNow === false,
      observed: `${String(snapshot.streamIndexPatchIncluded)}:${String(snapshot.streamModuleIndexTouchedNow)}:${String(snapshot.appServerPatchIncluded)}:${String(snapshot.appServerTouchedNow)}`,
      expected: "no stream index and no app/server patch",
      safeCode: "no_stream_index_or_app_server",
    },
    {
      smokeId: "139p_no_route_mount_or_runtime",
      passed:
        snapshot.diagnosticsRouteRuntimeMountPerformedNow === false &&
        snapshot.runtimeHttpRequestsPerformed === 0 &&
        snapshot.protectedRouteRegisteredNow === false &&
        snapshot.expressRouterBoundNow === false,
      observed: `${String(snapshot.diagnosticsRouteRuntimeMountPerformedNow)}:${snapshot.runtimeHttpRequestsPerformed}:${String(snapshot.protectedRouteRegisteredNow)}:${String(snapshot.expressRouterBoundNow)}`,
      expected: "no route mount, no HTTP runtime, no protected route registration, no router binding",
      safeCode: "no_route_mount_or_runtime",
    },
    {
      smokeId: "139p_no_write_or_data_side_effects",
      passed:
        snapshot.sourcePackageWriteAllowedNow === false &&
        snapshot.sourcePackageWriteExecutedNow === false &&
        snapshot.sourceFilesWrittenNow === false &&
        snapshot.databaseExecutionPerformed === 0,
      observed: `${String(snapshot.sourcePackageWriteAllowedNow)}:${String(snapshot.sourcePackageWriteExecutedNow)}:${String(snapshot.sourceFilesWrittenNow)}:${snapshot.databaseExecutionPerformed}`,
      expected: "no source write execution and no database execution",
      safeCode: "no_write_or_data_side_effects",
    },
    {
      smokeId: "139p_no_money_or_provider_side_effects",
      passed:
        snapshot.providerCallsPerformed === 0 &&
        snapshot.walletMutationPerformed === 0 &&
        snapshot.paymentAuthorizationPerformed === 0 &&
        snapshot.monthlyPayoutPerformed === 0 &&
        snapshot.moneyMovementPerformed === 0,
      observed: `${snapshot.providerCallsPerformed}:${snapshot.walletMutationPerformed}:${snapshot.paymentAuthorizationPerformed}:${snapshot.monthlyPayoutPerformed}:${snapshot.moneyMovementPerformed}`,
      expected: "no provider/Wallet/payment/payout/money side effects",
      safeCode: "no_money_or_provider_side_effects",
    },
    {
      smokeId: "139p_no_secrets_or_fake_success",
      passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false && snapshot.fakeSuccessAllowed === false,
      observed: `${snapshot.rawSecretsReturned}:${String(snapshot.mobileProviderKeysAllowed)}:${String(snapshot.fakeSuccessAllowed)}`,
      expected: "no secrets, no mobile provider keys, no fake success",
      safeCode: "no_secrets_or_fake_success",
    },
  ];
  const passedCount = results.filter((result) => result.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-139P",
    passed: passedCount === results.length,
    total: results.length,
    passedCount,
    results,
  };
}
