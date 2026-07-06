import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySnapshot } from "../kernel-diagnostics-route-mount-source-package-assembly";
import {
  STREAM_FOUNDATION_139G_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PACKAGE_WRITE_PLAN_VERSION,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanCheck,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanCommand,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanDecision,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSafety,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSnapshot,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanStatus,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanTarget,
} from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanContracts";

const WRITE_PLAN_SAFETY: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSafety = {
  writePlanBuiltNow: true,
  patchScope: "src/modules/stream/foundation/** only",
  previousAssemblyRequired: true,
  futureTargetPathsReturnedAsMetadataOnly: true,
  commandsExecutableNow: false,
  sourcePackageWriteAllowedNow: false,
  sourcePackageWriteExecutedNow: false,
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

function buildTargets(): readonly StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanTarget[] {
  return [
    {
      targetKind: "diagnostics_admin_route_contract",
      targetId: "future_diagnostics_admin_route_contract_write_plan",
      futureTargetPath: "src/modules/stream/foundation/kernel-diagnostics-admin-route/**",
      writeAllowedNow: false,
      includedInThisPatch: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "future_diagnostics_route_contract_write_plan_metadata_only",
      safeMessageKey: "stream.foundation.139g.futureDiagnosticsRouteContractWritePlanMetadataOnly",
    },
    {
      targetKind: "diagnostics_admin_route_factory",
      targetId: "future_diagnostics_admin_route_factory_write_plan",
      futureTargetPath: "src/modules/stream/foundation/kernel-diagnostics-admin-route-factory/**",
      writeAllowedNow: false,
      includedInThisPatch: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "future_diagnostics_route_factory_write_plan_metadata_only",
      safeMessageKey: "stream.foundation.139g.futureDiagnosticsRouteFactoryWritePlanMetadataOnly",
    },
    {
      targetKind: "diagnostics_admin_route_unmounted_smoke",
      targetId: "future_diagnostics_admin_route_unmounted_smoke_write_plan",
      futureTargetPath: "src/modules/stream/foundation/kernel-diagnostics-admin-route-unmounted-smoke/**",
      writeAllowedNow: false,
      includedInThisPatch: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "future_diagnostics_unmounted_smoke_write_plan_metadata_only",
      safeMessageKey: "stream.foundation.139g.futureDiagnosticsUnmountedSmokeWritePlanMetadataOnly",
    },
    {
      targetKind: "diagnostics_admin_route_mount_readiness",
      targetId: "future_diagnostics_admin_route_mount_readiness_write_plan",
      futureTargetPath: "src/modules/stream/foundation/kernel-diagnostics-route-mount-readiness-gate/**",
      writeAllowedNow: false,
      includedInThisPatch: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "future_diagnostics_mount_readiness_write_plan_metadata_only",
      safeMessageKey: "stream.foundation.139g.futureDiagnosticsMountReadinessWritePlanMetadataOnly",
    },
    {
      targetKind: "diagnostics_admin_route_manifest",
      targetId: "future_diagnostics_admin_route_manifest_write_plan",
      futureTargetPath: "src/modules/stream/foundation/stream139hBackendFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewStagingManifest.ts",
      writeAllowedNow: false,
      includedInThisPatch: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "future_diagnostics_manifest_write_plan_metadata_only",
      safeMessageKey: "stream.foundation.139g.futureDiagnosticsManifestWritePlanMetadataOnly",
    },
  ];
}

function buildCommands(): readonly StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanCommand[] {
  return [
    {
      commandId: "verify_foundation_scope_before_future_write",
      commandKind: "verify_foundation_scope",
      executableNow: false,
      writesFilesNow: false,
      mountsRouteNow: false,
      requiresOwnerApproval: true,
      safeCode: "foundation_scope_verification_command_not_executable",
      safeMessageKey: "stream.foundation.139g.foundationScopeVerificationCommandNotExecutable",
    },
    {
      commandId: "verify_no_stream_index_patch_before_future_write",
      commandKind: "verify_no_stream_index_patch",
      executableNow: false,
      writesFilesNow: false,
      mountsRouteNow: false,
      requiresOwnerApproval: true,
      safeCode: "stream_index_guard_command_not_executable",
      safeMessageKey: "stream.foundation.139g.streamIndexGuardCommandNotExecutable",
    },
    {
      commandId: "verify_no_app_server_patch_before_future_write",
      commandKind: "verify_no_app_server_patch",
      executableNow: false,
      writesFilesNow: false,
      mountsRouteNow: false,
      requiresOwnerApproval: true,
      safeCode: "app_server_guard_command_not_executable",
      safeMessageKey: "stream.foundation.139g.appServerGuardCommandNotExecutable",
    },
    {
      commandId: "verify_no_runtime_execution_before_future_write",
      commandKind: "verify_no_runtime_execution",
      executableNow: false,
      writesFilesNow: false,
      mountsRouteNow: false,
      requiresOwnerApproval: true,
      safeCode: "runtime_execution_guard_command_not_executable",
      safeMessageKey: "stream.foundation.139g.runtimeExecutionGuardCommandNotExecutable",
    },
    {
      commandId: "prepare_future_source_write_after_owner_review",
      commandKind: "prepare_future_source_write",
      executableNow: false,
      writesFilesNow: false,
      mountsRouteNow: false,
      requiresOwnerApproval: true,
      safeCode: "future_source_write_command_metadata_only",
      safeMessageKey: "stream.foundation.139g.futureSourceWriteCommandMetadataOnly",
    },
  ];
}

function buildChecks(): readonly StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanCheck[] {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySnapshot();
  return [
    {
      checkId: "previous_assembly_ready",
      passed: previous.status === "route_mount_source_package_assembly_ready" && previous.decision.readyForFutureWritePlan === true,
      blocking: previous.status !== "route_mount_source_package_assembly_ready" || previous.decision.readyForFutureWritePlan !== true,
      expected: "139F source package assembly is ready for a future write plan",
      observed: `${previous.status}:${String(previous.decision.readyForFutureWritePlan)}`,
      safeCode: "previous_assembly_ready_verified",
      safeMessageKey: "stream.foundation.139g.previousAssemblyReadyVerified",
    },
    {
      checkId: "foundation_scope_only",
      passed: previous.patchScope === "src/modules/stream/foundation/** only" && previous.streamIndexPatchIncluded === false && previous.appServerPatchIncluded === false,
      blocking: previous.patchScope !== "src/modules/stream/foundation/** only" || previous.streamIndexPatchIncluded || previous.appServerPatchIncluded,
      expected: "Only src/modules/stream/foundation/** scope, no stream index, no app/server patch",
      observed: `${previous.patchScope}:${String(previous.streamIndexPatchIncluded)}:${String(previous.appServerPatchIncluded)}`,
      safeCode: "foundation_scope_only_verified",
      safeMessageKey: "stream.foundation.139g.foundationScopeOnlyVerified",
    },
    {
      checkId: "previous_metadata_only_artifacts",
      passed: previous.includedArtifactsInThisPatch === 0 && previous.sourceTextReturnedArtifacts === 0,
      blocking: previous.includedArtifactsInThisPatch !== 0 || previous.sourceTextReturnedArtifacts !== 0,
      expected: "139F artifacts remained metadata-only",
      observed: `${previous.includedArtifactsInThisPatch}:${previous.sourceTextReturnedArtifacts}`,
      safeCode: "previous_metadata_only_artifacts_verified",
      safeMessageKey: "stream.foundation.139g.previousMetadataOnlyArtifactsVerified",
    },
    {
      checkId: "source_write_still_absent",
      passed: previous.sourcePatchExecutedNow === false && previous.sourceFilesWrittenNow === false,
      blocking: previous.sourcePatchExecutedNow || previous.sourceFilesWrittenNow,
      expected: "No source write executed before 139G",
      observed: `${String(previous.sourcePatchExecutedNow)}:${String(previous.sourceFilesWrittenNow)}`,
      safeCode: "source_write_still_absent_verified",
      safeMessageKey: "stream.foundation.139g.sourceWriteStillAbsentVerified",
    },
    {
      checkId: "route_mount_still_absent",
      passed: previous.diagnosticsRouteRuntimeMountPerformedNow === false && previous.protectedRouteRegisteredNow === false,
      blocking: previous.diagnosticsRouteRuntimeMountPerformedNow || previous.protectedRouteRegisteredNow,
      expected: "No diagnostics route mount or protected route registration",
      observed: `${String(previous.diagnosticsRouteRuntimeMountPerformedNow)}:${String(previous.protectedRouteRegisteredNow)}`,
      safeCode: "route_mount_still_absent_verified",
      safeMessageKey: "stream.foundation.139g.routeMountStillAbsentVerified",
    },
    {
      checkId: "runtime_execution_still_absent",
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
      expected: "No runtime HTTP, DB, provider, Wallet, or money execution",
      observed: `${previous.runtimeHttpRequestsPerformed}:${previous.databaseExecutionPerformed}:${previous.providerCallsPerformed}:${previous.walletMutationPerformed}:${previous.moneyMovementPerformed}`,
      safeCode: "runtime_execution_still_absent_verified",
      safeMessageKey: "stream.foundation.139g.runtimeExecutionStillAbsentVerified",
    },
    {
      checkId: "secret_and_fake_success_absent",
      passed: previous.rawSecretsReturned === 0 && previous.mobileProviderKeysAllowed === false && previous.fakeSuccessAllowed === false,
      blocking: previous.rawSecretsReturned !== 0 || previous.mobileProviderKeysAllowed || previous.fakeSuccessAllowed,
      expected: "No raw secrets, mobile provider keys, or fake success",
      observed: `${previous.rawSecretsReturned}:${String(previous.mobileProviderKeysAllowed)}:${String(previous.fakeSuccessAllowed)}`,
      safeCode: "secret_and_fake_success_absent_verified",
      safeMessageKey: "stream.foundation.139g.secretAndFakeSuccessAbsentVerified",
    },
  ];
}

function buildDecision(
  status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanStatus,
  blockingChecks: number,
): StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanDecision {
  if (status !== "route_mount_source_package_write_plan_ready") {
    return {
      decisionCode: "route_mount_source_package_write_plan_blocked_by_assembly",
      readyForFutureOwnerReview: false,
      commandsExecutableNow: false,
      sourcePackageWriteAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "route_mount_source_package_write_plan_blocked_by_assembly",
      safeMessageKey: "stream.foundation.139g.routeMountSourcePackageWritePlanBlockedByAssembly",
    };
  }
  if (blockingChecks > 0) {
    return {
      decisionCode: "route_mount_source_package_write_plan_blocked_by_safety_check",
      readyForFutureOwnerReview: false,
      commandsExecutableNow: false,
      sourcePackageWriteAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "route_mount_source_package_write_plan_blocked_by_safety_check",
      safeMessageKey: "stream.foundation.139g.routeMountSourcePackageWritePlanBlockedBySafetyCheck",
    };
  }
  return {
    decisionCode: "route_mount_source_package_write_plan_ready_for_future_owner_review",
    readyForFutureOwnerReview: true,
    commandsExecutableNow: false,
    sourcePackageWriteAllowedNow: false,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "route_mount_source_package_write_plan_ready_for_future_owner_review",
    safeMessageKey: "stream.foundation.139g.routeMountSourcePackageWritePlanReadyForFutureOwnerReview",
  };
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSnapshot(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySnapshot();
  const targets = buildTargets();
  const commands = buildCommands();
  const checks = buildChecks();
  const passedChecks = checks.filter((check) => check.passed).length;
  const blockingChecks = checks.filter((check) => check.blocking).length;
  const status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanStatus =
    previous.status === "route_mount_source_package_assembly_ready" && previous.decision.readyForFutureWritePlan === true && blockingChecks === 0
      ? "route_mount_source_package_write_plan_ready"
      : "route_mount_source_package_write_plan_blocked";
  const decision = buildDecision(status, blockingChecks);

  return {
    version: STREAM_FOUNDATION_139G_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PACKAGE_WRITE_PLAN_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previousAssemblyStatus: previous.status,
    writePlanBuiltNow: true,
    totalTargets: targets.length,
    writeAllowedTargets: 0,
    includedTargetsInThisPatch: 0,
    sourceTextReturnedTargets: 0,
    totalCommands: commands.length,
    executableCommands: 0,
    commandsWritingFilesNow: 0,
    commandsMountingRouteNow: 0,
    totalChecks: checks.length,
    passedChecks,
    blockingChecks,
    sourcePackageWriteAllowedNow: false,
    sourcePackageWriteExecutedNow: false,
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
    targets,
    commands,
    checks,
    decision,
    safety: WRITE_PLAN_SAFETY,
  };
}
