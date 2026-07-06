import { getStreamFoundationKernelDiagnosticsControlledRouteMountOwnerApprovedSourceOnlyWritePackageSnapshot } from "./streamFoundationKernelDiagnosticsControlledRouteMountOwnerApprovedSourceOnlyWritePackage";

export interface StreamFoundationKernelDiagnosticsControlledRouteMountOwnerApprovedSourceOnlyWritePackageSmokeResult {
  readonly smokeId: string;
  readonly passed: boolean;
  readonly observed: string;
  readonly expected: string;
  readonly safeCode: string;
}

export interface StreamFoundationKernelDiagnosticsControlledRouteMountOwnerApprovedSourceOnlyWritePackageSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139Q";
  readonly passed: boolean;
  readonly total: number;
  readonly passedCount: number;
  readonly results: readonly StreamFoundationKernelDiagnosticsControlledRouteMountOwnerApprovedSourceOnlyWritePackageSmokeResult[];
}

export function runStreamFoundationKernelDiagnosticsControlledRouteMountOwnerApprovedSourceOnlyWritePackageSmoke(): StreamFoundationKernelDiagnosticsControlledRouteMountOwnerApprovedSourceOnlyWritePackageSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledRouteMountOwnerApprovedSourceOnlyWritePackageSnapshot();
  const results: readonly StreamFoundationKernelDiagnosticsControlledRouteMountOwnerApprovedSourceOnlyWritePackageSmokeResult[] = [
    {
      smokeId: "139q_owner_approved_source_only_package_ready",
      passed:
        snapshot.status === "controlled_route_mount_owner_approved_source_only_write_package_ready" &&
        snapshot.readyForControlledRouteMountSourceOnlyExecution === true,
      observed: `${snapshot.status}:${String(snapshot.readyForControlledRouteMountSourceOnlyExecution)}`,
      expected: "controlled owner-approved source-only package ready for the next source-only execution stage",
      safeCode: "owner_approved_source_only_package_ready",
    },
    {
      smokeId: "139q_planned_files_foundation_only",
      passed:
        snapshot.plannedSourceFileCount === 6 &&
        snapshot.plannedSourceFiles.every((file) => file.scope === "src/modules/stream/foundation/** only" && file.writtenNow === false),
      observed: `${snapshot.plannedSourceFileCount}:${String(snapshot.plannedSourceFiles.every((file) => file.writtenNow === false))}`,
      expected: "six planned foundation-only files, none written now",
      safeCode: "planned_files_foundation_only",
    },
    {
      smokeId: "139q_no_stream_index_or_app_server",
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
      smokeId: "139q_no_route_mount_or_runtime",
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
      smokeId: "139q_no_write_or_data_side_effects",
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
      smokeId: "139q_no_money_or_provider_side_effects",
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
      smokeId: "139q_no_secrets_or_fake_success",
      passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false && snapshot.fakeSuccessAllowed === false,
      observed: `${snapshot.rawSecretsReturned}:${String(snapshot.mobileProviderKeysAllowed)}:${String(snapshot.fakeSuccessAllowed)}`,
      expected: "no secrets, no mobile provider keys, no fake success",
      safeCode: "no_secrets_or_fake_success",
    },
  ];
  const passedCount = results.filter((result) => result.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-139Q",
    passed: passedCount === results.length,
    total: results.length,
    passedCount,
    results,
  };
}
