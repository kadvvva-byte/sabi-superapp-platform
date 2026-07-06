import { getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlySnapshot } from "../kernel-diagnostics-route-source-write-execution-source-only";
import {
  STREAM_FOUNDATION_138Z_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_ONLY_POST_WRITE_VERIFICATION_VERSION,
  type StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationCheck,
  type StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationDecision,
  type StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationSafety,
  type StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationSnapshot,
  type StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationStatus,
} from "./streamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationContracts";

const POST_WRITE_SAFETY: StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationSafety = {
  postWriteVerificationBuiltNow: true,
  verifiesSourceOnlyExecutionStage: true,
  patchScope: "src/modules/stream/foundation/** only",
  sourceOnlyRouteFilesVerifiedInsideFoundationPackageNow: true,
  sourceOnlyRouteFilesVerifiedOutsideFoundationNow: false,
  sourceOnlyVerificationWritesRuntimeRouteNow: false,
  sourceOnlyVerificationMountsRouteNow: false,
  protectedRouteRegisteredNow: false,
  streamIndexPatchIncluded: false,
  streamModuleIndexTouchedNow: false,
  appServerPatchIncluded: false,
  appServerTouchedNow: false,
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

function buildChecks(): readonly StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationCheck[] {
  const sourceOnly = getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlySnapshot();
  const checks: readonly StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationCheck[] = [
    {
      checkId: "previous_source_only_stage_present",
      passed: sourceOnly.version === "BACKEND-STREAM-FOUNDATION-138Y" && sourceOnly.sourceOnlyExecutionPackageBuiltNow === true,
      blocking: !(sourceOnly.version === "BACKEND-STREAM-FOUNDATION-138Y" && sourceOnly.sourceOnlyExecutionPackageBuiltNow === true),
      expected: "138Y source-only execution package exists and reports sourceOnlyExecutionPackageBuiltNow=true",
      observed: `${sourceOnly.version}:${String(sourceOnly.sourceOnlyExecutionPackageBuiltNow)}`,
      safeCode: "previous_source_only_stage_verified",
      safeMessageKey: "stream.foundation.138z.previousSourceOnlyStageVerified",
    },
    {
      checkId: "foundation_scope_only",
      passed: sourceOnly.patchScope === "src/modules/stream/foundation/** only" && sourceOnly.outsideFoundationWriteCount === 0,
      blocking: !(sourceOnly.patchScope === "src/modules/stream/foundation/** only" && sourceOnly.outsideFoundationWriteCount === 0),
      expected: "Only src/modules/stream/foundation/** is in scope and outsideFoundationWriteCount remains 0",
      observed: `${sourceOnly.patchScope}:${String(sourceOnly.outsideFoundationWriteCount)}`,
      safeCode: "foundation_scope_only_verified",
      safeMessageKey: "stream.foundation.138z.foundationScopeOnlyVerified",
    },
    {
      checkId: "stream_index_absent",
      passed: sourceOnly.streamIndexPatchIncluded === false && sourceOnly.streamModuleIndexTouchedNow === false,
      blocking: sourceOnly.streamIndexPatchIncluded || sourceOnly.streamModuleIndexTouchedNow,
      expected: "src/modules/stream/index.ts is not included and not touched",
      observed: `${String(sourceOnly.streamIndexPatchIncluded)}:${String(sourceOnly.streamModuleIndexTouchedNow)}`,
      safeCode: "stream_index_absent_verified",
      safeMessageKey: "stream.foundation.138z.streamIndexAbsentVerified",
    },
    {
      checkId: "app_server_absent",
      passed: sourceOnly.appServerPatchIncluded === false && sourceOnly.appServerTouchedNow === false,
      blocking: sourceOnly.appServerPatchIncluded || sourceOnly.appServerTouchedNow,
      expected: "src/app.ts and src/server.ts stay untouched",
      observed: `${String(sourceOnly.appServerPatchIncluded)}:${String(sourceOnly.appServerTouchedNow)}`,
      safeCode: "app_server_absent_verified",
      safeMessageKey: "stream.foundation.138z.appServerAbsentVerified",
    },
    {
      checkId: "route_mount_absent",
      passed: sourceOnly.routeSourceMountedNow === false && sourceOnly.protectedRouteRegisteredNow === false && sourceOnly.routeMountApprovedNow === false,
      blocking: sourceOnly.routeSourceMountedNow || sourceOnly.protectedRouteRegisteredNow || sourceOnly.routeMountApprovedNow,
      expected: "No diagnostics route is mounted, registered, or approved for mount now",
      observed: `${String(sourceOnly.routeSourceMountedNow)}:${String(sourceOnly.protectedRouteRegisteredNow)}:${String(sourceOnly.routeMountApprovedNow)}`,
      safeCode: "route_mount_absent_verified",
      safeMessageKey: "stream.foundation.138z.routeMountAbsentVerified",
    },
    {
      checkId: "runtime_http_absent",
      passed: sourceOnly.runtimeHttpRequestsPerformed === 0,
      blocking: sourceOnly.runtimeHttpRequestsPerformed !== 0,
      expected: "No runtime HTTP request is performed",
      observed: String(sourceOnly.runtimeHttpRequestsPerformed),
      safeCode: "runtime_http_absent_verified",
      safeMessageKey: "stream.foundation.138z.runtimeHttpAbsentVerified",
    },
    {
      checkId: "database_execution_absent",
      passed: sourceOnly.databaseExecutionPerformed === 0,
      blocking: sourceOnly.databaseExecutionPerformed !== 0,
      expected: "No database execution is performed",
      observed: String(sourceOnly.databaseExecutionPerformed),
      safeCode: "database_execution_absent_verified",
      safeMessageKey: "stream.foundation.138z.databaseExecutionAbsentVerified",
    },
    {
      checkId: "provider_call_absent",
      passed: sourceOnly.providerCallsPerformed === 0,
      blocking: sourceOnly.providerCallsPerformed !== 0,
      expected: "No provider call is performed",
      observed: String(sourceOnly.providerCallsPerformed),
      safeCode: "provider_call_absent_verified",
      safeMessageKey: "stream.foundation.138z.providerCallAbsentVerified",
    },
    {
      checkId: "wallet_mutation_absent",
      passed: sourceOnly.walletMutationPerformed === 0,
      blocking: sourceOnly.walletMutationPerformed !== 0,
      expected: "No Wallet mutation is performed",
      observed: String(sourceOnly.walletMutationPerformed),
      safeCode: "wallet_mutation_absent_verified",
      safeMessageKey: "stream.foundation.138z.walletMutationAbsentVerified",
    },
    {
      checkId: "payment_authorization_absent",
      passed: sourceOnly.paymentAuthorizationPerformed === 0,
      blocking: sourceOnly.paymentAuthorizationPerformed !== 0,
      expected: "No payment authorization is performed",
      observed: String(sourceOnly.paymentAuthorizationPerformed),
      safeCode: "payment_authorization_absent_verified",
      safeMessageKey: "stream.foundation.138z.paymentAuthorizationAbsentVerified",
    },
    {
      checkId: "monthly_payout_absent",
      passed: sourceOnly.monthlyPayoutPerformed === 0,
      blocking: sourceOnly.monthlyPayoutPerformed !== 0,
      expected: "No monthly payout is performed",
      observed: String(sourceOnly.monthlyPayoutPerformed),
      safeCode: "monthly_payout_absent_verified",
      safeMessageKey: "stream.foundation.138z.monthlyPayoutAbsentVerified",
    },
    {
      checkId: "money_movement_absent",
      passed: sourceOnly.moneyMovementPerformed === 0,
      blocking: sourceOnly.moneyMovementPerformed !== 0,
      expected: "No money movement is performed",
      observed: String(sourceOnly.moneyMovementPerformed),
      safeCode: "money_movement_absent_verified",
      safeMessageKey: "stream.foundation.138z.moneyMovementAbsentVerified",
    },
    {
      checkId: "raw_secret_absent",
      passed: sourceOnly.rawSecretsReturned === 0 && sourceOnly.mobileProviderKeysAllowed === false,
      blocking: sourceOnly.rawSecretsReturned !== 0 || sourceOnly.mobileProviderKeysAllowed !== false,
      expected: "No raw secrets are returned and no mobile provider keys are allowed",
      observed: `${String(sourceOnly.rawSecretsReturned)}:${String(sourceOnly.mobileProviderKeysAllowed)}`,
      safeCode: "raw_secret_absent_verified",
      safeMessageKey: "stream.foundation.138z.rawSecretAbsentVerified",
    },
    {
      checkId: "fake_success_absent",
      passed: sourceOnly.fakeSuccessAllowed === false,
      blocking: sourceOnly.fakeSuccessAllowed !== false,
      expected: "Fake success remains forbidden",
      observed: String(sourceOnly.fakeSuccessAllowed),
      safeCode: "fake_success_absent_verified",
      safeMessageKey: "stream.foundation.138z.fakeSuccessAbsentVerified",
    },
  ];

  return checks;
}

function statusFromChecks(checks: readonly StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationCheck[]): StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationStatus {
  if (checks.some((check) => check.blocking && check.checkId === "previous_source_only_stage_present")) {
    return "source_only_post_write_verification_blocked_by_previous_stage";
  }
  if (checks.some((check) => check.blocking && (check.checkId === "foundation_scope_only" || check.checkId === "stream_index_absent" || check.checkId === "app_server_absent"))) {
    return "source_only_post_write_verification_blocked_by_scope_violation";
  }
  if (checks.some((check) => check.blocking)) {
    return "source_only_post_write_verification_blocked_by_runtime_activation";
  }
  return "source_only_post_write_verification_ready";
}

function decisionFromChecks(checks: readonly StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationCheck[]): StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationDecision {
  const blockingChecks = checks.filter((check) => check.blocking).length;
  if (checks.some((check) => check.blocking && check.checkId === "previous_source_only_stage_present")) {
    return {
      decisionCode: "source_only_post_write_blocked_by_previous_stage",
      sourceOnlyPostWriteVerified: false,
      readyForNextFoundationDiagnosticsHandoff: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      serverCopyAllowedNow: false,
      safeCode: "source_only_post_write_blocked_by_previous_stage",
      safeMessageKey: "stream.foundation.138z.blockedByPreviousStage",
    };
  }
  if (blockingChecks > 0) {
    return {
      decisionCode: "source_only_post_write_blocked_by_safety_check",
      sourceOnlyPostWriteVerified: false,
      readyForNextFoundationDiagnosticsHandoff: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      serverCopyAllowedNow: false,
      safeCode: "source_only_post_write_blocked_by_safety_check",
      safeMessageKey: "stream.foundation.138z.blockedBySafetyCheck",
    };
  }
  return {
    decisionCode: "source_only_post_write_verified_without_runtime_activation",
    sourceOnlyPostWriteVerified: true,
    readyForNextFoundationDiagnosticsHandoff: true,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    serverCopyAllowedNow: false,
    safeCode: "source_only_post_write_verified_without_runtime_activation",
    safeMessageKey: "stream.foundation.138z.verifiedWithoutRuntimeActivation",
  };
}

export function getStreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationSnapshot(): StreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationSnapshot {
  const previousStage = getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlySnapshot();
  const checks = buildChecks();
  const blockingChecks = checks.filter((check) => check.blocking).length;
  const passedChecks = checks.filter((check) => check.passed).length;

  return {
    version: STREAM_FOUNDATION_138Z_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_ONLY_POST_WRITE_VERIFICATION_VERSION,
    status: statusFromChecks(checks),
    patchScope: "src/modules/stream/foundation/** only",
    previousSourceOnlyStageStatus: previousStage.status,
    postWriteVerificationBuiltNow: true,
    totalChecks: checks.length,
    passedChecks,
    blockingChecks,
    sourceOnlyRouteFilesVerifiedInsideFoundationPackageNow: true,
    sourceOnlyRouteFilesVerifiedOutsideFoundationNow: false,
    sourceOnlyVerificationWritesRuntimeRouteNow: false,
    sourceOnlyVerificationMountsRouteNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    streamModuleIndexTouchedNow: false,
    appServerPatchIncluded: false,
    appServerTouchedNow: false,
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
    checks,
    decision: decisionFromChecks(checks),
    safety: POST_WRITE_SAFETY,
  };
}
