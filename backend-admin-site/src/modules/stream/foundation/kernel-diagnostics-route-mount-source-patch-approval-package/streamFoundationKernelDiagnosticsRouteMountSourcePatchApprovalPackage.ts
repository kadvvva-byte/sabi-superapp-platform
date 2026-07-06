import { getStreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSnapshot } from "../kernel-diagnostics-route-mount-owner-approval-planning";
import {
  STREAM_FOUNDATION_139C_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PATCH_APPROVAL_PACKAGE_VERSION,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageCheck,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageDecision,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageRequirement,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageSafety,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageSnapshot,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageStatus,
} from "./streamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageContracts";

const SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY: StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageSafety = {
  sourcePatchApprovalPackageBuiltNow: true,
  patchScope: "src/modules/stream/foundation/** only",
  requiresFutureExplicitOwnerApproval: true,
  ownerApprovalCapturedNow: false,
  sourcePatchAllowedNow: false,
  sourcePatchExecutedNow: false,
  diagnosticsRouteRuntimeMountAllowedNow: false,
  diagnosticsRouteRuntimeMountPerformedNow: false,
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

function buildRequirements(): readonly StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageRequirement[] {
  return [
    {
      artifact: "source_patch_scope_summary",
      requiredBeforeSourcePatch: true,
      readyNow: true,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      description: "Future diagnostics source patch must remain restricted to a protected diagnostics route package and must not launch Stream runtime.",
      safeCode: "source_patch_scope_summary_ready",
      safeMessageKey: "stream.foundation.139c.sourcePatchScopeSummaryReady",
    },
    {
      artifact: "source_patch_file_boundary_summary",
      requiredBeforeSourcePatch: true,
      readyNow: true,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      description: "Future source patch file list must be reviewed before any server route source is written; this stage writes only foundation approval contracts.",
      safeCode: "source_patch_file_boundary_summary_ready",
      safeMessageKey: "stream.foundation.139c.sourcePatchFileBoundarySummaryReady",
    },
    {
      artifact: "route_mount_blocker_summary",
      requiredBeforeSourcePatch: true,
      readyNow: true,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      description: "Route mount stays blocked after this package; source approval does not mount or register protected routes.",
      safeCode: "route_mount_blocker_summary_ready",
      safeMessageKey: "stream.foundation.139c.routeMountBlockerSummaryReady",
    },
    {
      artifact: "admin_auth_guard_summary",
      requiredBeforeSourcePatch: true,
      readyNow: true,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      description: "Future diagnostics route must be admin-protected and must never expose provider keys, raw secrets, or money movement actions.",
      safeCode: "admin_auth_guard_summary_ready",
      safeMessageKey: "stream.foundation.139c.adminAuthGuardSummaryReady",
    },
    {
      artifact: "redacted_response_contract_summary",
      requiredBeforeSourcePatch: true,
      readyNow: true,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      description: "Future response must use redacted diagnostics envelopes only and must keep provider/Wallet/payment statuses safe-disabled until real adapters are bound.",
      safeCode: "redacted_response_contract_summary_ready",
      safeMessageKey: "stream.foundation.139c.redactedResponseContractSummaryReady",
    },
    {
      artifact: "rollback_requirement_summary",
      requiredBeforeSourcePatch: true,
      readyNow: true,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      description: "Future server source patch must include rollback instructions before touching any route files outside foundation.",
      safeCode: "rollback_requirement_summary_ready",
      safeMessageKey: "stream.foundation.139c.rollbackRequirementSummaryReady",
    },
  ];
}

function buildChecks(): readonly StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageCheck[] {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSnapshot();
  const previousReady = previous.version === "BACKEND-STREAM-FOUNDATION-139B" && previous.status === "route_mount_owner_approval_planning_ready";
  return [
    {
      checkId: "previous_139b_owner_planning_ready",
      passed: previousReady,
      blocking: !previousReady,
      expected: "139B owner approval planning exists and is ready",
      observed: `${previous.version}:${previous.status}`,
      safeCode: "previous_139b_owner_planning_ready",
      safeMessageKey: "stream.foundation.139c.previous139bOwnerPlanningReady",
    },
    {
      checkId: "foundation_scope_only",
      passed: previous.patchScope === "src/modules/stream/foundation/** only",
      blocking: previous.patchScope !== "src/modules/stream/foundation/** only",
      expected: "Only src/modules/stream/foundation/** remains in scope",
      observed: previous.patchScope,
      safeCode: "foundation_scope_only_verified",
      safeMessageKey: "stream.foundation.139c.foundationScopeOnlyVerified",
    },
    {
      checkId: "stream_index_absent",
      passed: previous.streamIndexPatchIncluded === false && previous.streamModuleIndexTouchedNow === false,
      blocking: previous.streamIndexPatchIncluded || previous.streamModuleIndexTouchedNow,
      expected: "src/modules/stream/index.ts remains absent and untouched",
      observed: `${String(previous.streamIndexPatchIncluded)}:${String(previous.streamModuleIndexTouchedNow)}`,
      safeCode: "stream_index_absent_verified",
      safeMessageKey: "stream.foundation.139c.streamIndexAbsentVerified",
    },
    {
      checkId: "app_server_absent",
      passed: previous.appServerPatchIncluded === false && previous.appServerTouchedNow === false,
      blocking: previous.appServerPatchIncluded || previous.appServerTouchedNow,
      expected: "src/app.ts and src/server.ts remain absent and untouched",
      observed: `${String(previous.appServerPatchIncluded)}:${String(previous.appServerTouchedNow)}`,
      safeCode: "app_server_absent_verified",
      safeMessageKey: "stream.foundation.139c.appServerAbsentVerified",
    },
    {
      checkId: "route_mount_absent",
      passed: previous.diagnosticsRouteRuntimeMountPerformedNow === false && previous.protectedRouteRegisteredNow === false,
      blocking: previous.diagnosticsRouteRuntimeMountPerformedNow || previous.protectedRouteRegisteredNow,
      expected: "No diagnostics route is mounted or registered now",
      observed: `${String(previous.diagnosticsRouteRuntimeMountPerformedNow)}:${String(previous.protectedRouteRegisteredNow)}`,
      safeCode: "route_mount_absent_verified",
      safeMessageKey: "stream.foundation.139c.routeMountAbsentVerified",
    },
    {
      checkId: "runtime_http_absent",
      passed: previous.runtimeHttpRequestsPerformed === 0,
      blocking: previous.runtimeHttpRequestsPerformed !== 0,
      expected: "No runtime HTTP requests are performed",
      observed: String(previous.runtimeHttpRequestsPerformed),
      safeCode: "runtime_http_absent_verified",
      safeMessageKey: "stream.foundation.139c.runtimeHttpAbsentVerified",
    },
    {
      checkId: "database_execution_absent",
      passed: previous.databaseExecutionPerformed === 0,
      blocking: previous.databaseExecutionPerformed !== 0,
      expected: "No database execution is performed",
      observed: String(previous.databaseExecutionPerformed),
      safeCode: "database_execution_absent_verified",
      safeMessageKey: "stream.foundation.139c.databaseExecutionAbsentVerified",
    },
    {
      checkId: "provider_call_absent",
      passed: previous.providerCallsPerformed === 0,
      blocking: previous.providerCallsPerformed !== 0,
      expected: "No provider calls are performed",
      observed: String(previous.providerCallsPerformed),
      safeCode: "provider_call_absent_verified",
      safeMessageKey: "stream.foundation.139c.providerCallAbsentVerified",
    },
    {
      checkId: "wallet_mutation_absent",
      passed: previous.walletMutationPerformed === 0,
      blocking: previous.walletMutationPerformed !== 0,
      expected: "No Wallet mutation is performed",
      observed: String(previous.walletMutationPerformed),
      safeCode: "wallet_mutation_absent_verified",
      safeMessageKey: "stream.foundation.139c.walletMutationAbsentVerified",
    },
    {
      checkId: "payment_authorization_absent",
      passed: previous.paymentAuthorizationPerformed === 0,
      blocking: previous.paymentAuthorizationPerformed !== 0,
      expected: "No payment authorization is performed",
      observed: String(previous.paymentAuthorizationPerformed),
      safeCode: "payment_authorization_absent_verified",
      safeMessageKey: "stream.foundation.139c.paymentAuthorizationAbsentVerified",
    },
    {
      checkId: "monthly_payout_absent",
      passed: previous.monthlyPayoutPerformed === 0,
      blocking: previous.monthlyPayoutPerformed !== 0,
      expected: "No monthly payout is performed",
      observed: String(previous.monthlyPayoutPerformed),
      safeCode: "monthly_payout_absent_verified",
      safeMessageKey: "stream.foundation.139c.monthlyPayoutAbsentVerified",
    },
    {
      checkId: "money_movement_absent",
      passed: previous.moneyMovementPerformed === 0,
      blocking: previous.moneyMovementPerformed !== 0,
      expected: "No money movement is performed",
      observed: String(previous.moneyMovementPerformed),
      safeCode: "money_movement_absent_verified",
      safeMessageKey: "stream.foundation.139c.moneyMovementAbsentVerified",
    },
    {
      checkId: "raw_secret_absent",
      passed: previous.rawSecretsReturned === 0 && previous.mobileProviderKeysAllowed === false,
      blocking: previous.rawSecretsReturned !== 0 || previous.mobileProviderKeysAllowed !== false,
      expected: "No raw secrets are returned and mobile provider keys stay forbidden",
      observed: `${String(previous.rawSecretsReturned)}:${String(previous.mobileProviderKeysAllowed)}`,
      safeCode: "raw_secret_absent_verified",
      safeMessageKey: "stream.foundation.139c.rawSecretAbsentVerified",
    },
    {
      checkId: "fake_success_absent",
      passed: previous.fakeSuccessAllowed === false,
      blocking: previous.fakeSuccessAllowed !== false,
      expected: "Fake success remains forbidden",
      observed: String(previous.fakeSuccessAllowed),
      safeCode: "fake_success_absent_verified",
      safeMessageKey: "stream.foundation.139c.fakeSuccessAbsentVerified",
    },
    {
      checkId: "source_patch_approval_package_only",
      passed: SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY.sourcePatchApprovalPackageBuiltNow === true && SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY.sourcePatchExecutedNow === false,
      blocking: !(SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY.sourcePatchApprovalPackageBuiltNow === true && SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY.sourcePatchExecutedNow === false),
      expected: "This stage builds approval package only and executes no source patch",
      observed: `${String(SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY.sourcePatchApprovalPackageBuiltNow)}:${String(SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY.sourcePatchExecutedNow)}`,
      safeCode: "source_patch_approval_package_only_verified",
      safeMessageKey: "stream.foundation.139c.sourcePatchApprovalPackageOnlyVerified",
    },
    {
      checkId: "source_patch_requires_future_explicit_owner_approval",
      passed: SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY.requiresFutureExplicitOwnerApproval === true && SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY.sourcePatchAllowedNow === false,
      blocking: !(SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY.requiresFutureExplicitOwnerApproval === true && SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY.sourcePatchAllowedNow === false),
      expected: "Future source patch requires explicit owner approval and remains blocked now",
      observed: `${String(SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY.requiresFutureExplicitOwnerApproval)}:${String(SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY.sourcePatchAllowedNow)}`,
      safeCode: "future_owner_approval_required",
      safeMessageKey: "stream.foundation.139c.futureOwnerApprovalRequired",
    },
  ];
}

function statusFromChecks(checks: readonly StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageCheck[]): StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageStatus {
  if (checks.some((check) => check.blocking && check.checkId === "previous_139b_owner_planning_ready")) {
    return "route_mount_source_patch_approval_package_blocked_by_owner_planning";
  }
  if (checks.some((check) => check.blocking && (check.checkId === "foundation_scope_only" || check.checkId === "stream_index_absent" || check.checkId === "app_server_absent"))) {
    return "route_mount_source_patch_approval_package_blocked_by_scope_violation";
  }
  if (checks.some((check) => check.blocking)) {
    return "route_mount_source_patch_approval_package_blocked_by_runtime_activation";
  }
  return "route_mount_source_patch_approval_package_ready";
}

function decisionFromChecks(checks: readonly StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageCheck[]): StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageDecision {
  if (checks.some((check) => check.blocking && check.checkId === "previous_139b_owner_planning_ready")) {
    return {
      decisionCode: "route_mount_source_patch_approval_package_blocked_by_owner_planning",
      readyForFutureOwnerReview: false,
      ownerApprovalCapturedNow: false,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      serverCopyAllowedNow: false,
      safeCode: "route_mount_source_patch_approval_package_blocked_by_owner_planning",
      safeMessageKey: "stream.foundation.139c.approvalPackageBlockedByOwnerPlanning",
    };
  }

  if (checks.some((check) => check.blocking)) {
    return {
      decisionCode: "route_mount_source_patch_approval_package_blocked_by_safety_check",
      readyForFutureOwnerReview: false,
      ownerApprovalCapturedNow: false,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      serverCopyAllowedNow: false,
      safeCode: "route_mount_source_patch_approval_package_blocked_by_safety_check",
      safeMessageKey: "stream.foundation.139c.approvalPackageBlockedBySafetyCheck",
    };
  }

  return {
    decisionCode: "route_mount_source_patch_approval_package_ready_for_future_owner_review",
    readyForFutureOwnerReview: true,
    ownerApprovalCapturedNow: false,
    sourcePatchAllowedNow: false,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    serverCopyAllowedNow: false,
    safeCode: "route_mount_source_patch_approval_package_ready_for_future_owner_review",
    safeMessageKey: "stream.foundation.139c.approvalPackageReadyForFutureOwnerReview",
  };
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageSnapshot(): StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSnapshot();
  const checks = buildChecks();
  const requirements = buildRequirements();
  const blockingChecks = checks.filter((check) => check.blocking).length;
  const passedChecks = checks.filter((check) => check.passed).length;
  const readyRequirements = requirements.filter((requirement) => requirement.readyNow).length;

  return {
    version: STREAM_FOUNDATION_139C_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PATCH_APPROVAL_PACKAGE_VERSION,
    status: statusFromChecks(checks),
    patchScope: "src/modules/stream/foundation/** only",
    previousOwnerPlanningStatus: previous.status,
    sourcePatchApprovalPackageBuiltNow: true,
    requiresFutureExplicitOwnerApproval: true,
    totalChecks: checks.length,
    passedChecks,
    blockingChecks,
    totalRequirements: requirements.length,
    readyRequirements,
    ownerApprovalCapturedNow: false,
    sourcePatchAllowedNow: false,
    sourcePatchExecutedNow: false,
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
    checks,
    requirements,
    decision: decisionFromChecks(checks),
    safety: SOURCE_PATCH_APPROVAL_PACKAGE_SAFETY,
  };
}
