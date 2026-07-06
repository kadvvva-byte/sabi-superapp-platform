import { getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSnapshot } from "../kernel-diagnostics-controlled-route-mount-source-only-post-write-verification";
import {
  STREAM_FOUNDATION_139T_KERNEL_DIAGNOSTICS_CONTROLLED_ROUTE_MOUNT_PLANNING_FREEZE_VERSION,
  type StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeDecision,
  type StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeFreezeRecord,
  type StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeItem,
  type StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSafety,
  type StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSnapshot,
  type StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeStatus,
} from "./streamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeContracts";

const CONTROLLED_ROUTE_MOUNT_PLANNING_FREEZE_SAFETY: StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  planningFreezeLayerBuiltNow: true,
  postWriteVerificationRequired: true,
  controlledRouteConnectionPlanningRequiredNext: true,
  readyForProductionRouteMount: false,
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

const FREEZE_RECORDS: readonly StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeFreezeRecord[] = [
  { role: "foundation_runtime_route_source_frozen", frozen: true, scope: "src/modules/stream/foundation/** only", readyForNextControlledRouteConnectionPlanning: true, readyForProductionRouteMount: false, routeMountPerformedNow: false, streamIndexPatchIncluded: false, appServerPatchIncluded: false, safeCode: "foundation_runtime_route_source_frozen" },
  { role: "controlled_mount_boundary_frozen", frozen: true, scope: "src/modules/stream/foundation/** only", readyForNextControlledRouteConnectionPlanning: true, readyForProductionRouteMount: false, routeMountPerformedNow: false, streamIndexPatchIncluded: false, appServerPatchIncluded: false, safeCode: "controlled_mount_boundary_frozen" },
  { role: "stream_index_guard_frozen", frozen: true, scope: "src/modules/stream/foundation/** only", readyForNextControlledRouteConnectionPlanning: true, readyForProductionRouteMount: false, routeMountPerformedNow: false, streamIndexPatchIncluded: false, appServerPatchIncluded: false, safeCode: "stream_index_guard_frozen" },
  { role: "app_server_guard_frozen", frozen: true, scope: "src/modules/stream/foundation/** only", readyForNextControlledRouteConnectionPlanning: true, readyForProductionRouteMount: false, routeMountPerformedNow: false, streamIndexPatchIncluded: false, appServerPatchIncluded: false, safeCode: "app_server_guard_frozen" },
  { role: "provider_wallet_guard_frozen", frozen: true, scope: "src/modules/stream/foundation/** only", readyForNextControlledRouteConnectionPlanning: true, readyForProductionRouteMount: false, routeMountPerformedNow: false, streamIndexPatchIncluded: false, appServerPatchIncluded: false, safeCode: "provider_wallet_guard_frozen" },
  { role: "production_transition_guard_frozen", frozen: true, scope: "src/modules/stream/foundation/** only", readyForNextControlledRouteConnectionPlanning: true, readyForProductionRouteMount: false, routeMountPerformedNow: false, streamIndexPatchIncluded: false, appServerPatchIncluded: false, safeCode: "production_transition_guard_frozen" },
] as const;

function buildChecks(): readonly StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeItem[] {
  const previous = getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSnapshot();
  const freezeRecordsValid = FREEZE_RECORDS.length === 6 && FREEZE_RECORDS.every((record) => record.frozen === true && record.scope === "src/modules/stream/foundation/** only" && record.routeMountPerformedNow === false && record.streamIndexPatchIncluded === false && record.appServerPatchIncluded === false);
  return [
    { area: "previous_post_write_verification", checkId: "139t_previous_post_write_verification_passed", passed: previous.status === "controlled_route_mount_source_only_post_write_verification_passed_unmounted" && previous.readyForControlledDiagnosticsRouteMountPlanning === true, blocking: previous.status !== "controlled_route_mount_source_only_post_write_verification_passed_unmounted" || previous.readyForControlledDiagnosticsRouteMountPlanning !== true, expected: "139S post-write verification passed and ready for planning freeze", observed: `${previous.status}:${String(previous.readyForControlledDiagnosticsRouteMountPlanning)}`, remediation: "Run 139S post-write verification before 139T planning freeze.", safeCode: "previous_post_write_verification_passed", safeMessageKey: "stream.foundation.139t.previousPostWriteVerificationPassed" },
    { area: "runtime_route_source_boundary", checkId: "139t_runtime_route_source_boundary_frozen", passed: previous.sourceOnlyPostWriteVerificationPassedNow === true && freezeRecordsValid, blocking: previous.sourceOnlyPostWriteVerificationPassedNow !== true || !freezeRecordsValid, expected: "runtime route source-only boundary frozen with six safe records", observed: `${String(previous.sourceOnlyPostWriteVerificationPassedNow)}:${FREEZE_RECORDS.length}:${String(freezeRecordsValid)}`, remediation: "Re-check route source-only files and freeze records.", safeCode: "runtime_route_source_boundary_frozen", safeMessageKey: "stream.foundation.139t.runtimeRouteSourceBoundaryFrozen" },
    { area: "foundation_scope", checkId: "139t_foundation_scope_only", passed: previous.patchScope === "src/modules/stream/foundation/** only", blocking: previous.patchScope !== "src/modules/stream/foundation/** only", expected: "foundation-only scope", observed: previous.patchScope, remediation: "Remove any non-foundation files before route connection planning.", safeCode: "foundation_scope_only", safeMessageKey: "stream.foundation.139t.foundationScopeOnly" },
    { area: "stream_index_guard", checkId: "139t_no_stream_index_patch", passed: previous.safety.streamIndexPatchIncluded === false && previous.safety.streamModuleIndexTouchedNow === false, blocking: previous.safety.streamIndexPatchIncluded || previous.safety.streamModuleIndexTouchedNow, expected: "no src/modules/stream/index.ts patch", observed: `${String(previous.safety.streamIndexPatchIncluded)}:${String(previous.safety.streamModuleIndexTouchedNow)}`, remediation: "Keep stream module index out until the controlled backend route connection phase.", safeCode: "no_stream_index_patch", safeMessageKey: "stream.foundation.139t.noStreamIndexPatch" },
    { area: "app_server_guard", checkId: "139t_no_app_server_patch", passed: previous.safety.appServerPatchIncluded === false && previous.safety.appServerTouchedNow === false, blocking: previous.safety.appServerPatchIncluded || previous.safety.appServerTouchedNow, expected: "no app/server patch", observed: `${String(previous.safety.appServerPatchIncluded)}:${String(previous.safety.appServerTouchedNow)}`, remediation: "Do not patch backend entry until controlled route connection stage.", safeCode: "no_app_server_patch", safeMessageKey: "stream.foundation.139t.noAppServerPatch" },
    { area: "route_mount_guard", checkId: "139t_no_route_mount", passed: previous.routeMountPerformedNow === false && previous.protectedRouteRegisteredNow === false, blocking: previous.routeMountPerformedNow || previous.protectedRouteRegisteredNow, expected: "no route mount and no protected route registration", observed: `${String(previous.routeMountPerformedNow)}:${String(previous.protectedRouteRegisteredNow)}`, remediation: "Mount only after controlled backend route connection approval.", safeCode: "no_route_mount", safeMessageKey: "stream.foundation.139t.noRouteMount" },
    { area: "runtime_http_guard", checkId: "139t_no_runtime_http", passed: previous.runtimeHttpRequestsPerformed === 0, blocking: previous.runtimeHttpRequestsPerformed > 0, expected: "no runtime HTTP request", observed: String(previous.runtimeHttpRequestsPerformed), remediation: "Use source-only smoke until backend route is mounted.", safeCode: "no_runtime_http", safeMessageKey: "stream.foundation.139t.noRuntimeHttp" },
    { area: "data_side_effect_guard", checkId: "139t_no_data_side_effects", passed: previous.databaseExecutionPerformed === 0 && previous.providerCallsPerformed === 0 && previous.walletMutationPerformed === 0, blocking: previous.databaseExecutionPerformed > 0 || previous.providerCallsPerformed > 0 || previous.walletMutationPerformed > 0, expected: "no DB/provider/Wallet side effects", observed: `${previous.databaseExecutionPerformed}:${previous.providerCallsPerformed}:${previous.walletMutationPerformed}`, remediation: "Keep adapters disabled until controlled provider binding stages.", safeCode: "no_data_side_effects", safeMessageKey: "stream.foundation.139t.noDataSideEffects" },
    { area: "payment_wallet_guard", checkId: "139t_no_payment_wallet_money_movement", passed: previous.paymentAuthorizationPerformed === 0 && previous.monthlyPayoutPerformed === 0 && previous.moneyMovementPerformed === 0, blocking: previous.paymentAuthorizationPerformed > 0 || previous.monthlyPayoutPerformed > 0 || previous.moneyMovementPerformed > 0, expected: "no payment authorization, payout, or money movement", observed: `${previous.paymentAuthorizationPerformed}:${previous.monthlyPayoutPerformed}:${previous.moneyMovementPerformed}`, remediation: "Use payment/Wallet provider gates only after real provider setup.", safeCode: "no_payment_wallet_money_movement", safeMessageKey: "stream.foundation.139t.noPaymentWalletMoneyMovement" },
    { area: "secret_guard", checkId: "139t_no_raw_secrets_or_mobile_keys", passed: previous.rawSecretsReturned === 0 && previous.mobileProviderKeysAllowed === false, blocking: previous.rawSecretsReturned > 0 || previous.mobileProviderKeysAllowed, expected: "no raw secrets and no mobile provider keys", observed: `${previous.rawSecretsReturned}:${String(previous.mobileProviderKeysAllowed)}`, remediation: "Keep provider secrets server-side only and redacted.", safeCode: "no_raw_secrets_or_mobile_keys", safeMessageKey: "stream.foundation.139t.noRawSecretsOrMobileKeys" },
    { area: "fake_success_guard", checkId: "139t_no_fake_success", passed: previous.fakeSuccessAllowed === false, blocking: previous.fakeSuccessAllowed, expected: "fake success disabled", observed: String(previous.fakeSuccessAllowed), remediation: "Keep missing providers blocked/provider_not_configured.", safeCode: "no_fake_success", safeMessageKey: "stream.foundation.139t.noFakeSuccess" },
    { area: "production_transition_guard", checkId: "139t_not_production_ready_yet", passed: previous.readyForProductionRouteMount === false && CONTROLLED_ROUTE_MOUNT_PLANNING_FREEZE_SAFETY.readyForProductionRouteMount === false, blocking: previous.readyForProductionRouteMount !== false || CONTROLLED_ROUTE_MOUNT_PLANNING_FREEZE_SAFETY.readyForProductionRouteMount !== false, expected: "not production route mount ready yet", observed: `${String(previous.readyForProductionRouteMount)}:${String(CONTROLLED_ROUTE_MOUNT_PLANNING_FREEZE_SAFETY.readyForProductionRouteMount)}`, remediation: "Continue with controlled backend route connection planning before any route mount.", safeCode: "not_production_ready_yet", safeMessageKey: "stream.foundation.139t.notProductionReadyYet" },
  ] as const;
}

function buildDecision(checks: readonly StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeItem[]): StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeDecision {
  const previous = getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSnapshot();
  const blockingChecks = checks.filter((check) => check.blocking);
  if (previous.status !== "controlled_route_mount_source_only_post_write_verification_passed_unmounted") {
    return { decisionCode: "controlled_route_mount_planning_freeze_blocked_by_post_write_verification", planningFreezePassedNow: false, readyForControlledBackendRouteConnectionPlanning: false, readyForProductionRouteMount: false, routeMountAllowedNow: false, routeMountPerformedNow: false, runtimeActivationAllowedNow: false, safeCode: "blocked_by_post_write_verification", safeMessageKey: "stream.foundation.139t.blockedByPostWriteVerification" };
  }
  if (blockingChecks.length > 0) {
    return { decisionCode: "controlled_route_mount_planning_freeze_blocked_by_safety_gate", planningFreezePassedNow: false, readyForControlledBackendRouteConnectionPlanning: false, readyForProductionRouteMount: false, routeMountAllowedNow: false, routeMountPerformedNow: false, runtimeActivationAllowedNow: false, safeCode: "blocked_by_safety_gate", safeMessageKey: "stream.foundation.139t.blockedBySafetyGate" };
  }
  return { decisionCode: "controlled_route_mount_planning_freeze_ready_for_connection_planning", planningFreezePassedNow: true, readyForControlledBackendRouteConnectionPlanning: true, readyForProductionRouteMount: false, routeMountAllowedNow: false, routeMountPerformedNow: false, runtimeActivationAllowedNow: false, safeCode: "ready_for_connection_planning", safeMessageKey: "stream.foundation.139t.readyForConnectionPlanning" };
}

export function getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSnapshot(): StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSnapshot();
  const checks = buildChecks();
  const decision = buildDecision(checks);
  const blockingChecks = checks.filter((check) => check.blocking).length;
  const status: StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeStatus = decision.planningFreezePassedNow ? "controlled_route_mount_planning_freeze_ready_unmounted" : "controlled_route_mount_planning_freeze_blocked";
  return {
    version: STREAM_FOUNDATION_139T_KERNEL_DIAGNOSTICS_CONTROLLED_ROUTE_MOUNT_PLANNING_FREEZE_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previousPostWriteVerificationStatus: previous.status,
    planningFreezePassedNow: decision.planningFreezePassedNow,
    freezeRecords: FREEZE_RECORDS,
    freezeRecordCount: FREEZE_RECORDS.length,
    totalChecks: checks.length,
    passedChecks: checks.filter((check) => check.passed).length,
    blockingChecks,
    readyForControlledBackendRouteConnectionPlanning: decision.readyForControlledBackendRouteConnectionPlanning,
    readyForProductionRouteMount: false,
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
    safety: CONTROLLED_ROUTE_MOUNT_PLANNING_FREEZE_SAFETY,
  };
}
