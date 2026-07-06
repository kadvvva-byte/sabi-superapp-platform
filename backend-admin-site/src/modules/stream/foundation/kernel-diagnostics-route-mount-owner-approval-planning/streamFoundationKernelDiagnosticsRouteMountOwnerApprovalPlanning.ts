import { getStreamFoundationKernelDiagnosticsFoundationHandoffFreezeSnapshot } from "../kernel-diagnostics-foundation-handoff-freeze";
import {
  STREAM_FOUNDATION_139B_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_OWNER_APPROVAL_PLANNING_VERSION,
  type StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningCheck,
  type StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningDecision,
  type StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningRequirement,
  type StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSafety,
  type StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSnapshot,
  type StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningStatus,
} from "./streamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningContracts";

const OWNER_APPROVAL_PLANNING_SAFETY: StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSafety = {
  ownerApprovalPlanningBuiltNow: true,
  patchScope: "src/modules/stream/foundation/** only",
  requiresFutureExplicitOwnerApproval: true,
  ownerApprovalCapturedNow: false,
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

function buildRequirements(): readonly StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningRequirement[] {
  return [
    {
      artifact: "owner_approval_scope_summary",
      requiredBeforeMount: true,
      readyNow: true,
      routeMountAllowedNow: false,
      description: "Owner must review that the next real route step is limited to diagnostics route source/mount only and excludes Stream runtime launch.",
      safeCode: "owner_approval_scope_summary_ready",
      safeMessageKey: "stream.foundation.139b.ownerApprovalScopeSummaryReady",
    },
    {
      artifact: "mount_blocker_summary",
      requiredBeforeMount: true,
      readyNow: true,
      routeMountAllowedNow: false,
      description: "Route mount remains blocked until explicit future owner approval plus server source patch step.",
      safeCode: "mount_blocker_summary_ready",
      safeMessageKey: "stream.foundation.139b.mountBlockerSummaryReady",
    },
    {
      artifact: "future_server_patch_boundary",
      requiredBeforeMount: true,
      readyNow: true,
      routeMountAllowedNow: false,
      description: "Future patch boundary must name exact server files before any mount is allowed; this stage does not include those files.",
      safeCode: "future_server_patch_boundary_ready",
      safeMessageKey: "stream.foundation.139b.futureServerPatchBoundaryReady",
    },
    {
      artifact: "rollback_requirement_summary",
      requiredBeforeMount: true,
      readyNow: true,
      routeMountAllowedNow: false,
      description: "Future route source/mount step must include rollback instructions before touching server route files.",
      safeCode: "rollback_requirement_summary_ready",
      safeMessageKey: "stream.foundation.139b.rollbackRequirementSummaryReady",
    },
    {
      artifact: "admin_auth_requirement_summary",
      requiredBeforeMount: true,
      readyNow: true,
      routeMountAllowedNow: false,
      description: "Future diagnostics route must be admin-protected and must return redacted diagnostics only.",
      safeCode: "admin_auth_requirement_summary_ready",
      safeMessageKey: "stream.foundation.139b.adminAuthRequirementSummaryReady",
    },
    {
      artifact: "diagnostics_route_contract_summary",
      requiredBeforeMount: true,
      readyNow: true,
      routeMountAllowedNow: false,
      description: "Future route response must stay inside existing diagnostics handoff contracts and must not expose provider keys or money movement actions.",
      safeCode: "diagnostics_route_contract_summary_ready",
      safeMessageKey: "stream.foundation.139b.diagnosticsRouteContractSummaryReady",
    },
  ];
}

function buildChecks(): readonly StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningCheck[] {
  const previous = getStreamFoundationKernelDiagnosticsFoundationHandoffFreezeSnapshot();
  return [
    {
      checkId: "previous_139a_handoff_freeze_ready",
      passed: previous.version === "BACKEND-STREAM-FOUNDATION-139A" && previous.status === "diagnostics_foundation_handoff_freeze_ready",
      blocking: !(previous.version === "BACKEND-STREAM-FOUNDATION-139A" && previous.status === "diagnostics_foundation_handoff_freeze_ready"),
      expected: "139A handoff freeze exists and is ready",
      observed: `${previous.version}:${previous.status}`,
      safeCode: "previous_139a_handoff_freeze_ready",
      safeMessageKey: "stream.foundation.139b.previous139aHandoffFreezeReady",
    },
    {
      checkId: "foundation_scope_only",
      passed: previous.patchScope === "src/modules/stream/foundation/** only",
      blocking: previous.patchScope !== "src/modules/stream/foundation/** only",
      expected: "Only src/modules/stream/foundation/** remains in scope",
      observed: previous.patchScope,
      safeCode: "foundation_scope_only_verified",
      safeMessageKey: "stream.foundation.139b.foundationScopeOnlyVerified",
    },
    {
      checkId: "stream_index_absent",
      passed: previous.streamIndexPatchIncluded === false && previous.streamModuleIndexTouchedNow === false,
      blocking: previous.streamIndexPatchIncluded || previous.streamModuleIndexTouchedNow,
      expected: "src/modules/stream/index.ts remains absent and untouched",
      observed: `${String(previous.streamIndexPatchIncluded)}:${String(previous.streamModuleIndexTouchedNow)}`,
      safeCode: "stream_index_absent_verified",
      safeMessageKey: "stream.foundation.139b.streamIndexAbsentVerified",
    },
    {
      checkId: "app_server_absent",
      passed: previous.appServerPatchIncluded === false && previous.appServerTouchedNow === false,
      blocking: previous.appServerPatchIncluded || previous.appServerTouchedNow,
      expected: "src/app.ts and src/server.ts remain absent and untouched",
      observed: `${String(previous.appServerPatchIncluded)}:${String(previous.appServerTouchedNow)}`,
      safeCode: "app_server_absent_verified",
      safeMessageKey: "stream.foundation.139b.appServerAbsentVerified",
    },
    {
      checkId: "route_mount_absent",
      passed: previous.diagnosticsRouteRuntimeMountPerformedNow === false && previous.protectedRouteRegisteredNow === false,
      blocking: previous.diagnosticsRouteRuntimeMountPerformedNow || previous.protectedRouteRegisteredNow,
      expected: "No diagnostics route is mounted or registered now",
      observed: `${String(previous.diagnosticsRouteRuntimeMountPerformedNow)}:${String(previous.protectedRouteRegisteredNow)}`,
      safeCode: "route_mount_absent_verified",
      safeMessageKey: "stream.foundation.139b.routeMountAbsentVerified",
    },
    {
      checkId: "runtime_http_absent",
      passed: previous.runtimeHttpRequestsPerformed === 0,
      blocking: previous.runtimeHttpRequestsPerformed !== 0,
      expected: "No runtime HTTP requests are performed",
      observed: String(previous.runtimeHttpRequestsPerformed),
      safeCode: "runtime_http_absent_verified",
      safeMessageKey: "stream.foundation.139b.runtimeHttpAbsentVerified",
    },
    {
      checkId: "database_execution_absent",
      passed: previous.databaseExecutionPerformed === 0,
      blocking: previous.databaseExecutionPerformed !== 0,
      expected: "No database execution is performed",
      observed: String(previous.databaseExecutionPerformed),
      safeCode: "database_execution_absent_verified",
      safeMessageKey: "stream.foundation.139b.databaseExecutionAbsentVerified",
    },
    {
      checkId: "provider_call_absent",
      passed: previous.providerCallsPerformed === 0,
      blocking: previous.providerCallsPerformed !== 0,
      expected: "No provider calls are performed",
      observed: String(previous.providerCallsPerformed),
      safeCode: "provider_call_absent_verified",
      safeMessageKey: "stream.foundation.139b.providerCallAbsentVerified",
    },
    {
      checkId: "wallet_mutation_absent",
      passed: previous.walletMutationPerformed === 0,
      blocking: previous.walletMutationPerformed !== 0,
      expected: "No Wallet mutation is performed",
      observed: String(previous.walletMutationPerformed),
      safeCode: "wallet_mutation_absent_verified",
      safeMessageKey: "stream.foundation.139b.walletMutationAbsentVerified",
    },
    {
      checkId: "payment_authorization_absent",
      passed: previous.paymentAuthorizationPerformed === 0,
      blocking: previous.paymentAuthorizationPerformed !== 0,
      expected: "No payment authorization is performed",
      observed: String(previous.paymentAuthorizationPerformed),
      safeCode: "payment_authorization_absent_verified",
      safeMessageKey: "stream.foundation.139b.paymentAuthorizationAbsentVerified",
    },
    {
      checkId: "monthly_payout_absent",
      passed: previous.monthlyPayoutPerformed === 0,
      blocking: previous.monthlyPayoutPerformed !== 0,
      expected: "No monthly payout is performed",
      observed: String(previous.monthlyPayoutPerformed),
      safeCode: "monthly_payout_absent_verified",
      safeMessageKey: "stream.foundation.139b.monthlyPayoutAbsentVerified",
    },
    {
      checkId: "money_movement_absent",
      passed: previous.moneyMovementPerformed === 0,
      blocking: previous.moneyMovementPerformed !== 0,
      expected: "No money movement is performed",
      observed: String(previous.moneyMovementPerformed),
      safeCode: "money_movement_absent_verified",
      safeMessageKey: "stream.foundation.139b.moneyMovementAbsentVerified",
    },
    {
      checkId: "raw_secret_absent",
      passed: previous.rawSecretsReturned === 0 && previous.mobileProviderKeysAllowed === false,
      blocking: previous.rawSecretsReturned !== 0 || previous.mobileProviderKeysAllowed !== false,
      expected: "No raw secrets are returned and mobile provider keys stay forbidden",
      observed: `${String(previous.rawSecretsReturned)}:${String(previous.mobileProviderKeysAllowed)}`,
      safeCode: "raw_secret_absent_verified",
      safeMessageKey: "stream.foundation.139b.rawSecretAbsentVerified",
    },
    {
      checkId: "fake_success_absent",
      passed: previous.fakeSuccessAllowed === false,
      blocking: previous.fakeSuccessAllowed !== false,
      expected: "Fake success remains forbidden",
      observed: String(previous.fakeSuccessAllowed),
      safeCode: "fake_success_absent_verified",
      safeMessageKey: "stream.foundation.139b.fakeSuccessAbsentVerified",
    },
    {
      checkId: "owner_approval_planning_only",
      passed: OWNER_APPROVAL_PLANNING_SAFETY.ownerApprovalPlanningBuiltNow === true && OWNER_APPROVAL_PLANNING_SAFETY.ownerApprovalCapturedNow === false,
      blocking: !(OWNER_APPROVAL_PLANNING_SAFETY.ownerApprovalPlanningBuiltNow === true && OWNER_APPROVAL_PLANNING_SAFETY.ownerApprovalCapturedNow === false),
      expected: "This stage plans owner approval only and captures no approval now",
      observed: `${String(OWNER_APPROVAL_PLANNING_SAFETY.ownerApprovalPlanningBuiltNow)}:${String(OWNER_APPROVAL_PLANNING_SAFETY.ownerApprovalCapturedNow)}`,
      safeCode: "owner_approval_planning_only_verified",
      safeMessageKey: "stream.foundation.139b.ownerApprovalPlanningOnlyVerified",
    },
    {
      checkId: "mount_requires_future_explicit_owner_approval",
      passed: OWNER_APPROVAL_PLANNING_SAFETY.requiresFutureExplicitOwnerApproval === true && OWNER_APPROVAL_PLANNING_SAFETY.diagnosticsRouteRuntimeMountAllowedNow === false,
      blocking: !(OWNER_APPROVAL_PLANNING_SAFETY.requiresFutureExplicitOwnerApproval === true && OWNER_APPROVAL_PLANNING_SAFETY.diagnosticsRouteRuntimeMountAllowedNow === false),
      expected: "Future route mount requires explicit owner approval and remains blocked now",
      observed: `${String(OWNER_APPROVAL_PLANNING_SAFETY.requiresFutureExplicitOwnerApproval)}:${String(OWNER_APPROVAL_PLANNING_SAFETY.diagnosticsRouteRuntimeMountAllowedNow)}`,
      safeCode: "future_owner_approval_required",
      safeMessageKey: "stream.foundation.139b.futureOwnerApprovalRequired",
    },
  ];
}

function statusFromChecks(checks: readonly StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningCheck[]): StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningStatus {
  if (checks.some((check) => check.blocking && check.checkId === "previous_139a_handoff_freeze_ready")) {
    return "route_mount_owner_approval_planning_blocked_by_handoff_freeze";
  }
  if (checks.some((check) => check.blocking && (check.checkId === "foundation_scope_only" || check.checkId === "stream_index_absent" || check.checkId === "app_server_absent"))) {
    return "route_mount_owner_approval_planning_blocked_by_scope_violation";
  }
  if (checks.some((check) => check.blocking)) {
    return "route_mount_owner_approval_planning_blocked_by_runtime_activation";
  }
  return "route_mount_owner_approval_planning_ready";
}

function decisionFromChecks(checks: readonly StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningCheck[]): StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningDecision {
  if (checks.some((check) => check.blocking && check.checkId === "previous_139a_handoff_freeze_ready")) {
    return {
      decisionCode: "route_mount_owner_approval_planning_blocked_by_handoff_freeze",
      readyForFutureOwnerReview: false,
      ownerApprovalCapturedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      sourceWriteAllowedNow: false,
      serverCopyAllowedNow: false,
      safeCode: "route_mount_owner_approval_planning_blocked_by_handoff_freeze",
      safeMessageKey: "stream.foundation.139b.planningBlockedByHandoffFreeze",
    };
  }

  if (checks.some((check) => check.blocking)) {
    return {
      decisionCode: "route_mount_owner_approval_planning_blocked_by_safety_check",
      readyForFutureOwnerReview: false,
      ownerApprovalCapturedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      sourceWriteAllowedNow: false,
      serverCopyAllowedNow: false,
      safeCode: "route_mount_owner_approval_planning_blocked_by_safety_check",
      safeMessageKey: "stream.foundation.139b.planningBlockedBySafetyCheck",
    };
  }

  return {
    decisionCode: "route_mount_owner_approval_planning_ready_for_future_owner_review",
    readyForFutureOwnerReview: true,
    ownerApprovalCapturedNow: false,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    sourceWriteAllowedNow: false,
    serverCopyAllowedNow: false,
    safeCode: "route_mount_owner_approval_planning_ready_for_future_owner_review",
    safeMessageKey: "stream.foundation.139b.planningReadyForFutureOwnerReview",
  };
}

export function getStreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSnapshot(): StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsFoundationHandoffFreezeSnapshot();
  const checks = buildChecks();
  const requirements = buildRequirements();
  const blockingChecks = checks.filter((check) => check.blocking).length;
  const passedChecks = checks.filter((check) => check.passed).length;
  const readyRequirements = requirements.filter((requirement) => requirement.readyNow).length;

  return {
    version: STREAM_FOUNDATION_139B_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_OWNER_APPROVAL_PLANNING_VERSION,
    status: statusFromChecks(checks),
    patchScope: "src/modules/stream/foundation/** only",
    previousHandoffFreezeStatus: previous.status,
    ownerApprovalPlanningBuiltNow: true,
    requiresFutureExplicitOwnerApproval: true,
    totalChecks: checks.length,
    passedChecks,
    blockingChecks,
    totalRequirements: requirements.length,
    readyRequirements,
    ownerApprovalCapturedNow: false,
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
    safety: OWNER_APPROVAL_PLANNING_SAFETY,
  };
}
