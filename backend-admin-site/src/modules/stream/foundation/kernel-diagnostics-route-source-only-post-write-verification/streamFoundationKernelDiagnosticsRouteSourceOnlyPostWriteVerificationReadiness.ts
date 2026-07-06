import { getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlyReadiness } from "../kernel-diagnostics-route-source-write-execution-source-only";
import { getStreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerification";
import { STREAM_FOUNDATION_138Z_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_ONLY_POST_WRITE_VERIFICATION_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationReadiness {
  readonly version: typeof STREAM_FOUNDATION_138Z_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_ONLY_POST_WRITE_VERIFICATION_VERSION;
  readonly readyForPostWriteVerification: boolean;
  readonly previousSourceOnlyExecutionPackageReady: boolean;
  readonly sourceOnlyPostWriteVerified: boolean;
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly blockingChecks: number;
  readonly sourceOnlyRouteFilesVerifiedOutsideFoundationNow: false;
  readonly sourceOnlyVerificationWritesRuntimeRouteNow: false;
  readonly sourceOnlyVerificationMountsRouteNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly streamModuleIndexTouchedNow: false;
  readonly appServerPatchIncluded: false;
  readonly appServerTouchedNow: false;
  readonly noRuntimeHttpRequests: boolean;
  readonly noProviderCalls: boolean;
  readonly noDatabaseExecution: boolean;
  readonly noWalletMutation: boolean;
  readonly noPaymentAuthorization: boolean;
  readonly noMonthlyPayout: boolean;
  readonly noMoneyMovement: boolean;
  readonly noRawSecrets: boolean;
  readonly noFakeSuccess: boolean;
}

export function getStreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationReadiness(): StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationReadiness {
  const previousReadiness = getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlyReadiness();
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationSnapshot();
  const allChecksPassed = snapshot.totalChecks > 0 && snapshot.passedChecks === snapshot.totalChecks && snapshot.blockingChecks === 0;
  const safetyPassed =
    snapshot.runtimeHttpRequestsPerformed === 0 &&
    snapshot.providerCallsPerformed === 0 &&
    snapshot.databaseExecutionPerformed === 0 &&
    snapshot.walletMutationPerformed === 0 &&
    snapshot.paymentAuthorizationPerformed === 0 &&
    snapshot.monthlyPayoutPerformed === 0 &&
    snapshot.moneyMovementPerformed === 0 &&
    snapshot.rawSecretsReturned === 0 &&
    snapshot.mobileProviderKeysAllowed === false &&
    snapshot.fakeSuccessAllowed === false;

  return {
    version: STREAM_FOUNDATION_138Z_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_ONLY_POST_WRITE_VERIFICATION_VERSION,
    readyForPostWriteVerification:
      previousReadiness.readyForSourceOnlyExecutionPackage &&
      snapshot.decision.sourceOnlyPostWriteVerified &&
      snapshot.decision.readyForNextFoundationDiagnosticsHandoff &&
      snapshot.sourceOnlyRouteFilesVerifiedOutsideFoundationNow === false &&
      snapshot.sourceOnlyVerificationWritesRuntimeRouteNow === false &&
      snapshot.sourceOnlyVerificationMountsRouteNow === false &&
      snapshot.protectedRouteRegisteredNow === false &&
      snapshot.streamIndexPatchIncluded === false &&
      snapshot.streamModuleIndexTouchedNow === false &&
      snapshot.appServerPatchIncluded === false &&
      snapshot.appServerTouchedNow === false &&
      allChecksPassed &&
      safetyPassed,
    previousSourceOnlyExecutionPackageReady: previousReadiness.readyForSourceOnlyExecutionPackage,
    sourceOnlyPostWriteVerified: snapshot.decision.sourceOnlyPostWriteVerified,
    totalChecks: snapshot.totalChecks,
    passedChecks: snapshot.passedChecks,
    blockingChecks: snapshot.blockingChecks,
    sourceOnlyRouteFilesVerifiedOutsideFoundationNow: false,
    sourceOnlyVerificationWritesRuntimeRouteNow: false,
    sourceOnlyVerificationMountsRouteNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    streamModuleIndexTouchedNow: false,
    appServerPatchIncluded: false,
    appServerTouchedNow: false,
    noRuntimeHttpRequests: snapshot.runtimeHttpRequestsPerformed === 0,
    noProviderCalls: snapshot.providerCallsPerformed === 0,
    noDatabaseExecution: snapshot.databaseExecutionPerformed === 0,
    noWalletMutation: snapshot.walletMutationPerformed === 0,
    noPaymentAuthorization: snapshot.paymentAuthorizationPerformed === 0,
    noMonthlyPayout: snapshot.monthlyPayoutPerformed === 0,
    noMoneyMovement: snapshot.moneyMovementPerformed === 0,
    noRawSecrets: snapshot.rawSecretsReturned === 0,
    noFakeSuccess: snapshot.fakeSuccessAllowed === false,
  };
}
