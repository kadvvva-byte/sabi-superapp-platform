import { getStreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSnapshot } from "../kernel-diagnostics-route-mount-source-patch-final-review-package";
import {
  STREAM_FOUNDATION_139F_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PACKAGE_ASSEMBLY_VERSION,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyArtifact,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyCheck,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyDecision,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySafety,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySnapshot,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyStatus,
} from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyContracts";

const SOURCE_PACKAGE_ASSEMBLY_SAFETY: StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySafety = {
  sourcePackageAssemblyBuiltNow: true,
  patchScope: "src/modules/stream/foundation/** only",
  previousFinalReviewRequired: true,
  futureTargetPathsReturnedAsMetadataOnly: true,
  sourcePatchAllowedNow: false,
  sourcePatchExecutedNow: false,
  sourceFilesWrittenNow: false,
  sourceTextReturned: false,
  diagnosticsRouteRuntimeMountAllowedNow: false,
  diagnosticsRouteRuntimeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
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

function buildArtifacts(): readonly StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyArtifact[] {
  return [
    {
      artifactKind: "route_contract_reference",
      artifactId: "future_kernel_diagnostics_admin_route_contract_reference",
      futureTargetPath: "src/modules/stream/foundation/kernel-diagnostics-admin-route/**",
      includedInThisPatch: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "future_route_contract_reference_metadata_only",
      safeMessageKey: "stream.foundation.139f.futureRouteContractReferenceMetadataOnly",
    },
    {
      artifactKind: "route_factory_reference",
      artifactId: "future_kernel_diagnostics_admin_route_factory_reference",
      futureTargetPath: "src/modules/stream/foundation/kernel-diagnostics-admin-route-factory/**",
      includedInThisPatch: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "future_route_factory_reference_metadata_only",
      safeMessageKey: "stream.foundation.139f.futureRouteFactoryReferenceMetadataOnly",
    },
    {
      artifactKind: "admin_handoff_reference",
      artifactId: "future_kernel_diagnostics_admin_handoff_reference",
      futureTargetPath: "src/modules/stream/foundation/kernel-diagnostics-admin-handoff/**",
      includedInThisPatch: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "future_admin_handoff_reference_metadata_only",
      safeMessageKey: "stream.foundation.139f.futureAdminHandoffReferenceMetadataOnly",
    },
    {
      artifactKind: "unmounted_smoke_reference",
      artifactId: "future_unmounted_smoke_reference",
      futureTargetPath: "src/modules/stream/foundation/kernel-diagnostics-admin-route-unmounted-smoke/**",
      includedInThisPatch: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "future_unmounted_smoke_reference_metadata_only",
      safeMessageKey: "stream.foundation.139f.futureUnmountedSmokeReferenceMetadataOnly",
    },
    {
      artifactKind: "mount_readiness_reference",
      artifactId: "future_mount_readiness_reference",
      futureTargetPath: "src/modules/stream/foundation/kernel-diagnostics-route-mount-readiness-gate/**",
      includedInThisPatch: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "future_mount_readiness_reference_metadata_only",
      safeMessageKey: "stream.foundation.139f.futureMountReadinessReferenceMetadataOnly",
    },
    {
      artifactKind: "source_patch_plan_reference",
      artifactId: "future_source_patch_plan_reference",
      futureTargetPath: "src/modules/stream/foundation/kernel-diagnostics-route-source-patch-plan/**",
      includedInThisPatch: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "future_source_patch_plan_reference_metadata_only",
      safeMessageKey: "stream.foundation.139f.futureSourcePatchPlanReferenceMetadataOnly",
    },
    {
      artifactKind: "owner_approval_reference",
      artifactId: "future_owner_approval_reference",
      futureTargetPath: "src/modules/stream/foundation/kernel-diagnostics-route-mount-owner-approval-planning/**",
      includedInThisPatch: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "future_owner_approval_reference_metadata_only",
      safeMessageKey: "stream.foundation.139f.futureOwnerApprovalReferenceMetadataOnly",
    },
  ];
}

function buildChecks(artifacts: readonly StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyArtifact[]): readonly StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyCheck[] {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSnapshot();
  const previousReady = previous.version === "BACKEND-STREAM-FOUNDATION-139E" && previous.status === "route_mount_source_patch_final_review_ready" && previous.blockingChecks === 0;
  const artifactSafetyPassed = artifacts.every((artifact) => artifact.includedInThisPatch === false && artifact.sourceTextReturned === false && artifact.routeMountAllowedNow === false && artifact.runtimeActivationAllowedNow === false);

  return [
    {
      checkId: "previous_139e_final_review_ready",
      passed: previousReady,
      blocking: !previousReady,
      expected: "139E final review is ready with zero blockers",
      observed: `${previous.version}:${previous.status}:${String(previous.blockingChecks)}`,
      safeCode: "previous_139e_final_review_ready",
      safeMessageKey: "stream.foundation.139f.previous139eFinalReviewReady",
    },
    {
      checkId: "foundation_scope_only",
      passed: previous.patchScope === "src/modules/stream/foundation/** only",
      blocking: previous.patchScope !== "src/modules/stream/foundation/** only",
      expected: "Only src/modules/stream/foundation/** remains in scope",
      observed: previous.patchScope,
      safeCode: "foundation_scope_only_verified",
      safeMessageKey: "stream.foundation.139f.foundationScopeOnlyVerified",
    },
    {
      checkId: "source_package_metadata_only",
      passed: artifactSafetyPassed,
      blocking: !artifactSafetyPassed,
      expected: "Source package artifacts are metadata references only",
      observed: String(artifactSafetyPassed),
      safeCode: "source_package_metadata_only_verified",
      safeMessageKey: "stream.foundation.139f.sourcePackageMetadataOnlyVerified",
    },
    {
      checkId: "stream_index_absent",
      passed: previous.streamIndexPatchIncluded === false && previous.streamModuleIndexTouchedNow === false,
      blocking: previous.streamIndexPatchIncluded || previous.streamModuleIndexTouchedNow,
      expected: "src/modules/stream/index.ts remains absent and untouched",
      observed: `${String(previous.streamIndexPatchIncluded)}:${String(previous.streamModuleIndexTouchedNow)}`,
      safeCode: "stream_index_absent_verified",
      safeMessageKey: "stream.foundation.139f.streamIndexAbsentVerified",
    },
    {
      checkId: "app_server_absent",
      passed: previous.appServerPatchIncluded === false && previous.appServerTouchedNow === false,
      blocking: previous.appServerPatchIncluded || previous.appServerTouchedNow,
      expected: "src/app.ts and src/server.ts remain absent and untouched",
      observed: `${String(previous.appServerPatchIncluded)}:${String(previous.appServerTouchedNow)}`,
      safeCode: "app_server_absent_verified",
      safeMessageKey: "stream.foundation.139f.appServerAbsentVerified",
    },
    {
      checkId: "source_patch_still_not_executed",
      passed: previous.sourcePatchExecutedNow === false && previous.sourceFilesWrittenNow === false && previous.generatedSourceTextReturned === false,
      blocking: previous.sourcePatchExecutedNow || previous.sourceFilesWrittenNow || previous.generatedSourceTextReturned,
      expected: "No route source patch executed, no files written, no source text returned",
      observed: `${String(previous.sourcePatchExecutedNow)}:${String(previous.sourceFilesWrittenNow)}:${String(previous.generatedSourceTextReturned)}`,
      safeCode: "source_patch_still_not_executed_verified",
      safeMessageKey: "stream.foundation.139f.sourcePatchStillNotExecutedVerified",
    },
    {
      checkId: "route_mount_absent",
      passed: previous.diagnosticsRouteRuntimeMountPerformedNow === false && previous.protectedRouteRegisteredNow === false,
      blocking: previous.diagnosticsRouteRuntimeMountPerformedNow || previous.protectedRouteRegisteredNow,
      expected: "No diagnostics route is mounted or registered",
      observed: `${String(previous.diagnosticsRouteRuntimeMountPerformedNow)}:${String(previous.protectedRouteRegisteredNow)}`,
      safeCode: "route_mount_absent_verified",
      safeMessageKey: "stream.foundation.139f.routeMountAbsentVerified",
    },
    {
      checkId: "runtime_and_money_execution_absent",
      passed:
        previous.runtimeHttpRequestsPerformed === 0 &&
        previous.databaseExecutionPerformed === 0 &&
        previous.providerCallsPerformed === 0 &&
        previous.walletMutationPerformed === 0 &&
        previous.moneyMovementPerformed === 0,
      blocking:
        previous.runtimeHttpRequestsPerformed !== 0 ||
        previous.databaseExecutionPerformed !== 0 ||
        previous.providerCallsPerformed !== 0 ||
        previous.walletMutationPerformed !== 0 ||
        previous.moneyMovementPerformed !== 0,
      expected: "No runtime HTTP, DB, provider, Wallet, or money movement execution",
      observed: `${previous.runtimeHttpRequestsPerformed}:${previous.databaseExecutionPerformed}:${previous.providerCallsPerformed}:${previous.walletMutationPerformed}:${previous.moneyMovementPerformed}`,
      safeCode: "runtime_and_money_execution_absent_verified",
      safeMessageKey: "stream.foundation.139f.runtimeAndMoneyExecutionAbsentVerified",
    },
    {
      checkId: "secret_and_fake_success_absent",
      passed: previous.rawSecretsReturned === 0 && previous.mobileProviderKeysAllowed === false && previous.fakeSuccessAllowed === false,
      blocking: previous.rawSecretsReturned !== 0 || previous.mobileProviderKeysAllowed || previous.fakeSuccessAllowed,
      expected: "No raw secrets, mobile provider keys, or fake success",
      observed: `${previous.rawSecretsReturned}:${String(previous.mobileProviderKeysAllowed)}:${String(previous.fakeSuccessAllowed)}`,
      safeCode: "secret_and_fake_success_absent_verified",
      safeMessageKey: "stream.foundation.139f.secretAndFakeSuccessAbsentVerified",
    },
  ];
}

function buildDecision(
  status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyStatus,
  blockingChecks: number,
): StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyDecision {
  if (status !== "route_mount_source_package_assembly_ready") {
    return {
      decisionCode: "route_mount_source_package_assembly_blocked_by_final_review",
      readyForFutureWritePlan: false,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "route_mount_source_package_assembly_blocked",
      safeMessageKey: "stream.foundation.139f.routeMountSourcePackageAssemblyBlocked",
    };
  }
  if (blockingChecks > 0) {
    return {
      decisionCode: "route_mount_source_package_assembly_blocked_by_safety_check",
      readyForFutureWritePlan: false,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "route_mount_source_package_assembly_safety_blocked",
      safeMessageKey: "stream.foundation.139f.routeMountSourcePackageAssemblySafetyBlocked",
    };
  }
  return {
    decisionCode: "route_mount_source_package_assembly_ready_for_future_write_plan",
    readyForFutureWritePlan: true,
    sourcePatchAllowedNow: false,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "route_mount_source_package_assembly_ready",
    safeMessageKey: "stream.foundation.139f.routeMountSourcePackageAssemblyReady",
  };
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySnapshot(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySnapshot {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSnapshot();
  const artifacts = buildArtifacts();
  const checks = buildChecks(artifacts);
  const blockingChecks = checks.filter((check) => check.blocking).length;
  const passedChecks = checks.filter((check) => check.passed).length;
  const status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyStatus = blockingChecks === 0 ? "route_mount_source_package_assembly_ready" : "route_mount_source_package_assembly_blocked";
  const decision = buildDecision(status, blockingChecks);

  return {
    version: STREAM_FOUNDATION_139F_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PACKAGE_ASSEMBLY_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previousFinalReviewStatus: previous.status,
    sourcePackageAssemblyBuiltNow: true,
    totalArtifacts: artifacts.length,
    includedArtifactsInThisPatch: 0,
    sourceTextReturnedArtifacts: 0,
    totalChecks: checks.length,
    passedChecks,
    blockingChecks,
    sourcePatchAllowedNow: false,
    sourcePatchExecutedNow: false,
    sourceFilesWrittenNow: false,
    diagnosticsRouteRuntimeMountAllowedNow: false,
    diagnosticsRouteRuntimeMountPerformedNow: false,
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
    artifacts,
    checks,
    decision,
    safety: SOURCE_PACKAGE_ASSEMBLY_SAFETY,
  };
}
