import { getStreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationSnapshot } from "../kernel-diagnostics-route-source-only-post-write-verification";
import {
  STREAM_FOUNDATION_139A_KERNEL_DIAGNOSTICS_FOUNDATION_HANDOFF_FREEZE_VERSION,
  type StreamFoundationKernelDiagnosticsFoundationHandoffFreezeCheck,
  type StreamFoundationKernelDiagnosticsFoundationHandoffFreezeDecision,
  type StreamFoundationKernelDiagnosticsFoundationHandoffFreezeSafety,
  type StreamFoundationKernelDiagnosticsFoundationHandoffFreezeSnapshot,
  type StreamFoundationKernelDiagnosticsFoundationHandoffFreezeStatus,
} from "./streamFoundationKernelDiagnosticsFoundationHandoffFreezeContracts";

const HANDOFF_FREEZE_SAFETY: StreamFoundationKernelDiagnosticsFoundationHandoffFreezeSafety = {
  handoffFreezeBuiltNow: true,
  freezesDiagnosticsFoundationBoundaryNow: true,
  patchScope: "src/modules/stream/foundation/** only",
  diagnosticsRouteSourceOnlyVerifiedNow: true,
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

function buildChecks(): readonly StreamFoundationKernelDiagnosticsFoundationHandoffFreezeCheck[] {
  const previous = getStreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationSnapshot();
  const checks: readonly StreamFoundationKernelDiagnosticsFoundationHandoffFreezeCheck[] = [
    {
      checkId: "previous_138z_post_write_verification_ready",
      passed: previous.version === "BACKEND-STREAM-FOUNDATION-138Z" && previous.status === "source_only_post_write_verification_ready",
      blocking: !(previous.version === "BACKEND-STREAM-FOUNDATION-138Z" && previous.status === "source_only_post_write_verification_ready"),
      expected: "138Z post-write verification exists and is ready",
      observed: `${previous.version}:${previous.status}`,
      safeCode: "previous_138z_verified",
      safeMessageKey: "stream.foundation.139a.previous138zVerified",
    },
    {
      checkId: "foundation_scope_only",
      passed: previous.patchScope === "src/modules/stream/foundation/** only",
      blocking: previous.patchScope !== "src/modules/stream/foundation/** only",
      expected: "Only src/modules/stream/foundation/** remains in scope",
      observed: previous.patchScope,
      safeCode: "foundation_scope_only_verified",
      safeMessageKey: "stream.foundation.139a.foundationScopeOnlyVerified",
    },
    {
      checkId: "stream_index_absent",
      passed: previous.streamIndexPatchIncluded === false && previous.streamModuleIndexTouchedNow === false,
      blocking: previous.streamIndexPatchIncluded || previous.streamModuleIndexTouchedNow,
      expected: "src/modules/stream/index.ts is not included and not touched",
      observed: `${String(previous.streamIndexPatchIncluded)}:${String(previous.streamModuleIndexTouchedNow)}`,
      safeCode: "stream_index_absent_verified",
      safeMessageKey: "stream.foundation.139a.streamIndexAbsentVerified",
    },
    {
      checkId: "app_server_absent",
      passed: previous.appServerPatchIncluded === false && previous.appServerTouchedNow === false,
      blocking: previous.appServerPatchIncluded || previous.appServerTouchedNow,
      expected: "src/app.ts and src/server.ts stay untouched",
      observed: `${String(previous.appServerPatchIncluded)}:${String(previous.appServerTouchedNow)}`,
      safeCode: "app_server_absent_verified",
      safeMessageKey: "stream.foundation.139a.appServerAbsentVerified",
    },
    {
      checkId: "route_mount_absent",
      passed: previous.sourceOnlyVerificationMountsRouteNow === false && previous.protectedRouteRegisteredNow === false,
      blocking: previous.sourceOnlyVerificationMountsRouteNow || previous.protectedRouteRegisteredNow,
      expected: "No diagnostics route is mounted or registered now",
      observed: `${String(previous.sourceOnlyVerificationMountsRouteNow)}:${String(previous.protectedRouteRegisteredNow)}`,
      safeCode: "route_mount_absent_verified",
      safeMessageKey: "stream.foundation.139a.routeMountAbsentVerified",
    },
    {
      checkId: "runtime_http_absent",
      passed: previous.runtimeHttpRequestsPerformed === 0,
      blocking: previous.runtimeHttpRequestsPerformed !== 0,
      expected: "No runtime HTTP request is performed",
      observed: String(previous.runtimeHttpRequestsPerformed),
      safeCode: "runtime_http_absent_verified",
      safeMessageKey: "stream.foundation.139a.runtimeHttpAbsentVerified",
    },
    {
      checkId: "database_execution_absent",
      passed: previous.databaseExecutionPerformed === 0,
      blocking: previous.databaseExecutionPerformed !== 0,
      expected: "No database execution is performed",
      observed: String(previous.databaseExecutionPerformed),
      safeCode: "database_execution_absent_verified",
      safeMessageKey: "stream.foundation.139a.databaseExecutionAbsentVerified",
    },
    {
      checkId: "provider_call_absent",
      passed: previous.providerCallsPerformed === 0,
      blocking: previous.providerCallsPerformed !== 0,
      expected: "No provider call is performed",
      observed: String(previous.providerCallsPerformed),
      safeCode: "provider_call_absent_verified",
      safeMessageKey: "stream.foundation.139a.providerCallAbsentVerified",
    },
    {
      checkId: "wallet_mutation_absent",
      passed: previous.walletMutationPerformed === 0,
      blocking: previous.walletMutationPerformed !== 0,
      expected: "No Wallet mutation is performed",
      observed: String(previous.walletMutationPerformed),
      safeCode: "wallet_mutation_absent_verified",
      safeMessageKey: "stream.foundation.139a.walletMutationAbsentVerified",
    },
    {
      checkId: "payment_authorization_absent",
      passed: previous.paymentAuthorizationPerformed === 0,
      blocking: previous.paymentAuthorizationPerformed !== 0,
      expected: "No payment authorization is performed",
      observed: String(previous.paymentAuthorizationPerformed),
      safeCode: "payment_authorization_absent_verified",
      safeMessageKey: "stream.foundation.139a.paymentAuthorizationAbsentVerified",
    },
    {
      checkId: "monthly_payout_absent",
      passed: previous.monthlyPayoutPerformed === 0,
      blocking: previous.monthlyPayoutPerformed !== 0,
      expected: "No monthly payout is performed",
      observed: String(previous.monthlyPayoutPerformed),
      safeCode: "monthly_payout_absent_verified",
      safeMessageKey: "stream.foundation.139a.monthlyPayoutAbsentVerified",
    },
    {
      checkId: "money_movement_absent",
      passed: previous.moneyMovementPerformed === 0,
      blocking: previous.moneyMovementPerformed !== 0,
      expected: "No money movement is performed",
      observed: String(previous.moneyMovementPerformed),
      safeCode: "money_movement_absent_verified",
      safeMessageKey: "stream.foundation.139a.moneyMovementAbsentVerified",
    },
    {
      checkId: "raw_secret_absent",
      passed: previous.rawSecretsReturned === 0 && previous.mobileProviderKeysAllowed === false,
      blocking: previous.rawSecretsReturned !== 0 || previous.mobileProviderKeysAllowed !== false,
      expected: "No raw secrets are returned and mobile provider keys stay forbidden",
      observed: `${String(previous.rawSecretsReturned)}:${String(previous.mobileProviderKeysAllowed)}`,
      safeCode: "raw_secret_absent_verified",
      safeMessageKey: "stream.foundation.139a.rawSecretAbsentVerified",
    },
    {
      checkId: "fake_success_absent",
      passed: previous.fakeSuccessAllowed === false,
      blocking: previous.fakeSuccessAllowed !== false,
      expected: "Fake success remains forbidden",
      observed: String(previous.fakeSuccessAllowed),
      safeCode: "fake_success_absent_verified",
      safeMessageKey: "stream.foundation.139a.fakeSuccessAbsentVerified",
    },
    {
      checkId: "handoff_freeze_boundary_locked",
      passed: HANDOFF_FREEZE_SAFETY.freezesDiagnosticsFoundationBoundaryNow === true && HANDOFF_FREEZE_SAFETY.diagnosticsRouteRuntimeMountAllowedNow === false,
      blocking: !(HANDOFF_FREEZE_SAFETY.freezesDiagnosticsFoundationBoundaryNow === true && HANDOFF_FREEZE_SAFETY.diagnosticsRouteRuntimeMountAllowedNow === false),
      expected: "Diagnostics foundation handoff boundary is frozen and route mount remains blocked",
      observed: `${String(HANDOFF_FREEZE_SAFETY.freezesDiagnosticsFoundationBoundaryNow)}:${String(HANDOFF_FREEZE_SAFETY.diagnosticsRouteRuntimeMountAllowedNow)}`,
      safeCode: "handoff_freeze_boundary_locked",
      safeMessageKey: "stream.foundation.139a.handoffFreezeBoundaryLocked",
    },
  ];

  return checks;
}

function statusFromChecks(checks: readonly StreamFoundationKernelDiagnosticsFoundationHandoffFreezeCheck[]): StreamFoundationKernelDiagnosticsFoundationHandoffFreezeStatus {
  if (checks.some((check) => check.blocking && check.checkId === "previous_138z_post_write_verification_ready")) {
    return "diagnostics_foundation_handoff_freeze_blocked_by_previous_stage";
  }
  if (checks.some((check) => check.blocking && (check.checkId === "foundation_scope_only" || check.checkId === "stream_index_absent" || check.checkId === "app_server_absent"))) {
    return "diagnostics_foundation_handoff_freeze_blocked_by_scope_violation";
  }
  if (checks.some((check) => check.blocking)) {
    return "diagnostics_foundation_handoff_freeze_blocked_by_runtime_activation";
  }
  return "diagnostics_foundation_handoff_freeze_ready";
}

function decisionFromChecks(checks: readonly StreamFoundationKernelDiagnosticsFoundationHandoffFreezeCheck[]): StreamFoundationKernelDiagnosticsFoundationHandoffFreezeDecision {
  const blockingChecks = checks.filter((check) => check.blocking).length;
  if (checks.some((check) => check.blocking && check.checkId === "previous_138z_post_write_verification_ready")) {
    return {
      decisionCode: "diagnostics_foundation_handoff_blocked_by_previous_stage",
      diagnosticsFoundationFrozen: false,
      readyForRouteMountPlanningAfterOwnerApproval: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      serverCopyAllowedNow: false,
      sourceWriteAllowedNow: false,
      safeCode: "diagnostics_foundation_handoff_blocked_by_previous_stage",
      safeMessageKey: "stream.foundation.139a.handoffBlockedByPreviousStage",
    };
  }

  if (blockingChecks > 0) {
    return {
      decisionCode: "diagnostics_foundation_handoff_blocked_by_safety_check",
      diagnosticsFoundationFrozen: false,
      readyForRouteMountPlanningAfterOwnerApproval: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      serverCopyAllowedNow: false,
      sourceWriteAllowedNow: false,
      safeCode: "diagnostics_foundation_handoff_blocked_by_safety_check",
      safeMessageKey: "stream.foundation.139a.handoffBlockedBySafetyCheck",
    };
  }

  return {
    decisionCode: "diagnostics_foundation_boundary_frozen_for_owner_handoff",
    diagnosticsFoundationFrozen: true,
    readyForRouteMountPlanningAfterOwnerApproval: true,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    serverCopyAllowedNow: false,
    sourceWriteAllowedNow: false,
    safeCode: "diagnostics_foundation_boundary_frozen_for_owner_handoff",
    safeMessageKey: "stream.foundation.139a.boundaryFrozenForOwnerHandoff",
  };
}

export function getStreamFoundationKernelDiagnosticsFoundationHandoffFreezeSnapshot(): StreamFoundationKernelDiagnosticsFoundationHandoffFreezeSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsRouteSourceOnlyPostWriteVerificationSnapshot();
  const checks = buildChecks();
  const blockingChecks = checks.filter((check) => check.blocking).length;

  return {
    version: STREAM_FOUNDATION_139A_KERNEL_DIAGNOSTICS_FOUNDATION_HANDOFF_FREEZE_VERSION,
    status: statusFromChecks(checks),
    patchScope: "src/modules/stream/foundation/** only",
    previousPostWriteVerificationStatus: previous.status,
    handoffFreezeBuiltNow: true,
    totalChecks: checks.length,
    passedChecks: checks.filter((check) => check.passed).length,
    blockingChecks,
    diagnosticsRouteSourceOnlyVerifiedNow: true,
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
    decision: decisionFromChecks(checks),
    safety: HANDOFF_FREEZE_SAFETY,
  };
}
