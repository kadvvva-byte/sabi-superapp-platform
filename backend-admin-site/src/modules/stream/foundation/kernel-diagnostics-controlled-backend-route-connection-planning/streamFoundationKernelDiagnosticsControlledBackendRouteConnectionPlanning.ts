import { getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSnapshot } from "../kernel-diagnostics-controlled-route-mount-planning-freeze";
import {
  STREAM_FOUNDATION_139U_KERNEL_DIAGNOSTICS_CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_VERSION,
  type StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningCheck,
  type StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningDecision,
  type StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningSafety,
  type StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningSnapshot,
  type StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningStatus,
  type StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningStepRecord,
} from "./streamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningContracts";

const CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY: StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  backendRouteConnectionPlanningBuiltNow: true,
  routeSourceAlreadyBuiltInsideFoundation: true,
  backendConnectionSourcePatchRequiredNext: true,
  readyForProductionBackend: false,
  routeMountAllowedNow: false,
  routeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
  expressRouterCreatedNow: false,
  expressRouterImportedNow: false,
  expressRouterBoundNow: false,
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

const STEP_RECORDS: readonly StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningStepRecord[] = [
  { step: "validate_foundation_runtime_route_source", planned: true, executedNow: false, requiredBeforeProductionBackend: true, patchScopeNow: "src/modules/stream/foundation/** only", safeCode: "validate_foundation_runtime_route_source_planned" },
  { step: "prepare_stream_module_index_patch_later", planned: true, executedNow: false, requiredBeforeProductionBackend: true, patchScopeNow: "src/modules/stream/foundation/** only", safeCode: "stream_module_index_patch_deferred" },
  { step: "prepare_backend_entry_mount_patch_later", planned: true, executedNow: false, requiredBeforeProductionBackend: true, patchScopeNow: "src/modules/stream/foundation/** only", safeCode: "backend_entry_mount_patch_deferred" },
  { step: "prepare_protected_admin_diagnostics_route_later", planned: true, executedNow: false, requiredBeforeProductionBackend: true, patchScopeNow: "src/modules/stream/foundation/** only", safeCode: "protected_admin_diagnostics_route_deferred" },
  { step: "prepare_server_build_and_smoke_later", planned: true, executedNow: false, requiredBeforeProductionBackend: true, patchScopeNow: "src/modules/stream/foundation/** only", safeCode: "server_build_and_smoke_deferred" },
  { step: "keep_runtime_side_effects_blocked_until_connected", planned: true, executedNow: false, requiredBeforeProductionBackend: true, patchScopeNow: "src/modules/stream/foundation/** only", safeCode: "runtime_side_effects_blocked_until_connected" },
] as const;

function buildChecks(): readonly StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningCheck[] {
  const previous = getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSnapshot();
  const stepsPlanned = STEP_RECORDS.every((record) => record.planned && record.executedNow === false && record.requiredBeforeProductionBackend);
  return [
    { area: "previous_planning_freeze", checkId: "139u_previous_planning_freeze_ready", passed: previous.status === "controlled_route_mount_planning_freeze_ready_unmounted" && previous.planningFreezePassedNow === true, blocking: previous.status !== "controlled_route_mount_planning_freeze_ready_unmounted" || previous.planningFreezePassedNow !== true, expected: "139T planning freeze ready", observed: `${previous.status}:${String(previous.planningFreezePassedNow)}`, remediation: "Complete 139T planning freeze before backend connection planning.", safeCode: "previous_planning_freeze_ready", safeMessageKey: "stream.foundation.139u.previousPlanningFreezeReady" },
    { area: "foundation_runtime_route_source", checkId: "139u_foundation_runtime_route_source_available", passed: previous.freezeRecordCount >= 6 && previous.readyForControlledBackendRouteConnectionPlanning === true, blocking: previous.freezeRecordCount < 6 || previous.readyForControlledBackendRouteConnectionPlanning !== true, expected: "frozen runtime route source records and connection planning readiness", observed: `${previous.freezeRecordCount}:${String(previous.readyForControlledBackendRouteConnectionPlanning)}`, remediation: "Re-run source-only post-write verification and planning freeze.", safeCode: "foundation_runtime_route_source_available", safeMessageKey: "stream.foundation.139u.foundationRuntimeRouteSourceAvailable" },
    { area: "backend_connection_boundary", checkId: "139u_backend_connection_steps_planned_only", passed: stepsPlanned, blocking: !stepsPlanned, expected: "all backend connection steps planned and not executed now", observed: `${STEP_RECORDS.length}:${String(stepsPlanned)}`, remediation: "Keep connection steps as planned-only until owner-approved source patch.", safeCode: "backend_connection_steps_planned_only", safeMessageKey: "stream.foundation.139u.backendConnectionStepsPlannedOnly" },
    { area: "stream_index_deferred", checkId: "139u_stream_index_deferred", passed: previous.safety.streamIndexPatchIncluded === false && CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.streamIndexPatchIncluded === false, blocking: previous.safety.streamIndexPatchIncluded || CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.streamIndexPatchIncluded, expected: "no src/modules/stream/index.ts patch in this stage", observed: `${String(previous.safety.streamIndexPatchIncluded)}:${String(CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.streamIndexPatchIncluded)}`, remediation: "Patch stream index only in explicit controlled backend route connection stage.", safeCode: "stream_index_deferred", safeMessageKey: "stream.foundation.139u.streamIndexDeferred" },
    { area: "app_server_deferred", checkId: "139u_app_server_deferred", passed: previous.safety.appServerPatchIncluded === false && CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.appServerPatchIncluded === false, blocking: previous.safety.appServerPatchIncluded || CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.appServerPatchIncluded, expected: "no app/server patch in this stage", observed: `${String(previous.safety.appServerPatchIncluded)}:${String(CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.appServerPatchIncluded)}`, remediation: "Patch backend app/server only after source patch review and explicit owner approval.", safeCode: "app_server_deferred", safeMessageKey: "stream.foundation.139u.appServerDeferred" },
    { area: "protected_route_mount_deferred", checkId: "139u_route_mount_deferred", passed: previous.routeMountPerformedNow === false && previous.protectedRouteRegisteredNow === false && CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.routeMountPerformedNow === false, blocking: previous.routeMountPerformedNow || previous.protectedRouteRegisteredNow || CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.routeMountPerformedNow, expected: "no route mount and no protected route registration now", observed: `${String(previous.routeMountPerformedNow)}:${String(previous.protectedRouteRegisteredNow)}:${String(CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.routeMountPerformedNow)}`, remediation: "Mount only in controlled backend route connection execution stage.", safeCode: "route_mount_deferred", safeMessageKey: "stream.foundation.139u.routeMountDeferred" },
    { area: "runtime_http_deferred", checkId: "139u_runtime_http_deferred", passed: previous.runtimeHttpRequestsPerformed === 0 && CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.runtimeHttpRequestPerformedNow === false, blocking: previous.runtimeHttpRequestsPerformed > 0 || CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.runtimeHttpRequestPerformedNow, expected: "no runtime HTTP request now", observed: `${previous.runtimeHttpRequestsPerformed}:${String(CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.runtimeHttpRequestPerformedNow)}`, remediation: "Run HTTP smoke only after route mount stage.", safeCode: "runtime_http_deferred", safeMessageKey: "stream.foundation.139u.runtimeHttpDeferred" },
    { area: "database_provider_wallet_deferred", checkId: "139u_database_provider_wallet_deferred", passed: previous.databaseExecutionPerformed === 0 && previous.providerCallsPerformed === 0 && previous.walletMutationPerformed === 0, blocking: previous.databaseExecutionPerformed > 0 || previous.providerCallsPerformed > 0 || previous.walletMutationPerformed > 0, expected: "no DB/provider/Wallet side effects", observed: `${previous.databaseExecutionPerformed}:${previous.providerCallsPerformed}:${previous.walletMutationPerformed}`, remediation: "Keep adapters disabled until dedicated persistence/provider binding stages.", safeCode: "database_provider_wallet_deferred", safeMessageKey: "stream.foundation.139u.databaseProviderWalletDeferred" },
    { area: "payment_payout_deferred", checkId: "139u_payment_payout_deferred", passed: previous.paymentAuthorizationPerformed === 0 && previous.monthlyPayoutPerformed === 0 && previous.moneyMovementPerformed === 0, blocking: previous.paymentAuthorizationPerformed > 0 || previous.monthlyPayoutPerformed > 0 || previous.moneyMovementPerformed > 0, expected: "no payment authorization, monthly payout, or money movement", observed: `${previous.paymentAuthorizationPerformed}:${previous.monthlyPayoutPerformed}:${previous.moneyMovementPerformed}`, remediation: "Use payment and Wallet gates only after real provider integration.", safeCode: "payment_payout_deferred", safeMessageKey: "stream.foundation.139u.paymentPayoutDeferred" },
    { area: "secret_redaction", checkId: "139u_secret_redaction", passed: previous.rawSecretsReturned === 0 && previous.mobileProviderKeysAllowed === false, blocking: previous.rawSecretsReturned > 0 || previous.mobileProviderKeysAllowed, expected: "no raw secrets and no mobile provider keys", observed: `${previous.rawSecretsReturned}:${String(previous.mobileProviderKeysAllowed)}`, remediation: "Keep provider keys server-side and redacted.", safeCode: "secret_redaction", safeMessageKey: "stream.foundation.139u.secretRedaction" },
    { area: "fake_success_block", checkId: "139u_fake_success_blocked", passed: previous.fakeSuccessAllowed === false && CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.fakeSuccessAllowed === false, blocking: previous.fakeSuccessAllowed || CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.fakeSuccessAllowed, expected: "fake success blocked", observed: `${String(previous.fakeSuccessAllowed)}:${String(CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.fakeSuccessAllowed)}`, remediation: "Return provider_not_configured/safe-disabled until real providers are configured.", safeCode: "fake_success_blocked", safeMessageKey: "stream.foundation.139u.fakeSuccessBlocked" },
    { area: "production_backend_transition", checkId: "139u_not_production_backend_ready_yet", passed: previous.readyForProductionRouteMount === false && CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.readyForProductionBackend === false, blocking: previous.readyForProductionRouteMount !== false || CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.readyForProductionBackend !== false, expected: "planning only, not production backend ready yet", observed: `${String(previous.readyForProductionRouteMount)}:${String(CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY.readyForProductionBackend)}`, remediation: "Continue with controlled source patch review and route connection stages.", safeCode: "not_production_backend_ready_yet", safeMessageKey: "stream.foundation.139u.notProductionBackendReadyYet" },
  ] as const;
}

function buildDecision(checks: readonly StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningCheck[]): StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningDecision {
  const previous = getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSnapshot();
  const blockingChecks = checks.filter((check) => check.blocking);
  if (previous.status !== "controlled_route_mount_planning_freeze_ready_unmounted") {
    return { decisionCode: "controlled_backend_route_connection_planning_blocked_by_freeze", connectionPlanningPassedNow: false, readyForBackendRouteConnectionSourcePatchReview: false, readyForProductionBackend: false, routeMountAllowedNow: false, routeMountPerformedNow: false, runtimeActivationAllowedNow: false, safeCode: "blocked_by_freeze", safeMessageKey: "stream.foundation.139u.blockedByFreeze" };
  }
  if (blockingChecks.length > 0) {
    return { decisionCode: "controlled_backend_route_connection_planning_blocked_by_safety_gate", connectionPlanningPassedNow: false, readyForBackendRouteConnectionSourcePatchReview: false, readyForProductionBackend: false, routeMountAllowedNow: false, routeMountPerformedNow: false, runtimeActivationAllowedNow: false, safeCode: "blocked_by_safety_gate", safeMessageKey: "stream.foundation.139u.blockedBySafetyGate" };
  }
  return { decisionCode: "controlled_backend_route_connection_planning_ready_for_source_patch_review", connectionPlanningPassedNow: true, readyForBackendRouteConnectionSourcePatchReview: true, readyForProductionBackend: false, routeMountAllowedNow: false, routeMountPerformedNow: false, runtimeActivationAllowedNow: false, safeCode: "ready_for_source_patch_review", safeMessageKey: "stream.foundation.139u.readyForSourcePatchReview" };
}

export function getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningSnapshot(): StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSnapshot();
  const checks = buildChecks();
  const decision = buildDecision(checks);
  const status: StreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningStatus = decision.connectionPlanningPassedNow
    ? "controlled_backend_route_connection_planning_ready_unmounted"
    : "controlled_backend_route_connection_planning_blocked";
  return {
    version: STREAM_FOUNDATION_139U_KERNEL_DIAGNOSTICS_CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previousPlanningFreezeStatus: previous.status,
    connectionPlanningPassedNow: decision.connectionPlanningPassedNow,
    stepRecords: STEP_RECORDS,
    stepRecordCount: STEP_RECORDS.length,
    totalChecks: checks.length,
    passedChecks: checks.filter((check) => check.passed).length,
    blockingChecks: checks.filter((check) => check.blocking).length,
    readyForBackendRouteConnectionSourcePatchReview: decision.readyForBackendRouteConnectionSourcePatchReview,
    readyForProductionBackend: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    protectedRouteRegisteredNow: false,
    runtimeHttpRequestsPerformed: 0,
    databaseExecutionPerformed: 0,
    providerCallsPerformed: 0,
    walletMutationPerformed: 0,
    paymentAuthorizationPerformed: 0,
    monthlyPayoutPerformed: 0,
    moneyMovementPerformed: 0,
    rawSecretsReturned: 0,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    checks,
    decision,
    safety: CONTROLLED_BACKEND_ROUTE_CONNECTION_PLANNING_SAFETY,
  };
}
