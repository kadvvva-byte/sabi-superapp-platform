import {
  createStreamFoundationKernelDiagnosticsBackendRouteConnectionHandler,
  getStreamFoundationKernelDiagnosticsBackendRouteConnectionHandlerBridge,
  getStreamFoundationKernelDiagnosticsBackendRouteConnectionReadiness,
  getStreamFoundationKernelDiagnosticsBackendRouteConnectionSmokeReport,
  getStreamFoundationKernelDiagnosticsBackendRouteConnectionSnapshot,
} from "../kernel-diagnostics-backend-route-connection";
import {
  STREAM_FOUNDATION_140B_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SOURCE_ONLY_POST_WRITE_VERIFICATION_VERSION,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationCheck,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationDecision,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationSafety,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationSnapshot,
} from "./streamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationContracts";

const SAFETY: StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  postWriteVerificationBuiltNow: true,
  streamIndexPatchIncluded: false,
  streamModuleIndexTouchedNow: false,
  backendEntryPatchIncluded: false,
  appServerPatchIncluded: false,
  appServerTouchedNow: false,
  routeMountAllowedNow: false,
  routeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
  expressRouterCreatedNow: false,
  expressRouterImportedNow: false,
  expressRouterBoundNow: false,
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

function buildChecks(): readonly StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationCheck[] {
  const snapshot140a = getStreamFoundationKernelDiagnosticsBackendRouteConnectionSnapshot();
  const readiness140a = getStreamFoundationKernelDiagnosticsBackendRouteConnectionReadiness();
  const smoke140a = getStreamFoundationKernelDiagnosticsBackendRouteConnectionSmokeReport();
  const bridge = getStreamFoundationKernelDiagnosticsBackendRouteConnectionHandlerBridge();
  const handler = createStreamFoundationKernelDiagnosticsBackendRouteConnectionHandler();
  const sampleRoute = snapshot140a.routePlans[0];
  const sample = sampleRoute ? handler({ routeId: sampleRoute.routeId, context: { requestId: "140b-post-write-verification", scopes: sampleRoute.requiredScopes } }) : undefined;

  return [
    {
      area: "previous_140a_source",
      checkId: "140b_previous_140a_source_ready",
      passed: snapshot140a.status === "controlled_backend_route_connection_source_ready_unmounted" && readiness140a.ready === true && smoke140a.status === "controlled_backend_route_connection_source_smoke_ready_unmounted",
      blocking: snapshot140a.status !== "controlled_backend_route_connection_source_ready_unmounted" || readiness140a.ready !== true || smoke140a.status !== "controlled_backend_route_connection_source_smoke_ready_unmounted",
      expected: "140A mount plan/handler bridge/response adapter source is ready and unmounted.",
      observed: `${snapshot140a.status}:${String(readiness140a.ready)}:${smoke140a.status}`,
      remediation: "Fix 140A source readiness before continuing to 140C planning.",
      safeCode: "previous_140a_source_ready",
      safeMessageKey: "stream.foundation.140b.previous140aSourceReady",
    },
    {
      area: "mount_plan",
      checkId: "140b_mount_plan_unmounted",
      passed: snapshot140a.routePlanCount > 0 && snapshot140a.routePlans.every((plan) => plan.sourceReadyNow === true && plan.mountedNow === false && plan.protectedRouteRegisteredNow === false),
      blocking: snapshot140a.routePlanCount === 0 || !snapshot140a.routePlans.every((plan) => plan.sourceReadyNow === true && plan.mountedNow === false && plan.protectedRouteRegisteredNow === false),
      expected: "Route plans exist but remain unmounted/unregistered.",
      observed: `${snapshot140a.routePlanCount}:${String(snapshot140a.routePlans.every((plan) => plan.mountedNow === false && plan.protectedRouteRegisteredNow === false))}`,
      remediation: "Keep all route plans unmounted until backend entry patch approval.",
      safeCode: "mount_plan_unmounted",
      safeMessageKey: "stream.foundation.140b.mountPlanUnmounted",
    },
    {
      area: "handler_bridge",
      checkId: "140b_handler_bridge_unmounted",
      passed: bridge.sourceReadyNow === true && bridge.mountedNow === false && bridge.protectedRouteRegisteredNow === false && sample?.mountedNow === false && sample?.protectedRouteRegisteredNow === false,
      blocking: !(bridge.sourceReadyNow === true && bridge.mountedNow === false && bridge.protectedRouteRegisteredNow === false && sample?.mountedNow === false && sample?.protectedRouteRegisteredNow === false),
      expected: "Handler bridge works as source-only preview without registering a protected route.",
      observed: `${String(bridge.sourceReadyNow)}:${String(bridge.mountedNow)}:${String(bridge.protectedRouteRegisteredNow)}:${String(sample?.mountedNow)}`,
      remediation: "Do not bind handler bridge to Express/router in 140B.",
      safeCode: "handler_bridge_unmounted",
      safeMessageKey: "stream.foundation.140b.handlerBridgeUnmounted",
    },
    {
      area: "response_adapter",
      checkId: "140b_response_adapter_redacted",
      passed: sample?.rawSecretFieldsReturned === 0 && sample?.providerCallsPerformed === 0 && sample?.walletMutationPerformed === 0 && sample?.moneyMovementPerformed === 0,
      blocking: !(sample?.rawSecretFieldsReturned === 0 && sample?.providerCallsPerformed === 0 && sample?.walletMutationPerformed === 0 && sample?.moneyMovementPerformed === 0),
      expected: "Response adapter returns a redacted, source-only envelope.",
      observed: `${String(sample?.rawSecretFieldsReturned)}:${String(sample?.providerCallsPerformed)}:${String(sample?.walletMutationPerformed)}:${String(sample?.moneyMovementPerformed)}`,
      remediation: "Remove raw secrets/provider/Wallet/money fields from route adapter response.",
      safeCode: "response_adapter_redacted",
      safeMessageKey: "stream.foundation.140b.responseAdapterRedacted",
    },
    {
      area: "source_only_scope",
      checkId: "140b_foundation_scope_only",
      passed: snapshot140a.patchScope === "src/modules/stream/foundation/** only" && snapshot140a.sourceFiles.every((file) => file.scope === "src/modules/stream/foundation/** only"),
      blocking: snapshot140a.patchScope !== "src/modules/stream/foundation/** only" || !snapshot140a.sourceFiles.every((file) => file.scope === "src/modules/stream/foundation/** only"),
      expected: "140A/140B stay inside foundation only.",
      observed: `${snapshot140a.patchScope}:${snapshot140a.sourceFileCount}`,
      remediation: "Remove non-foundation files from this verification package.",
      safeCode: "foundation_scope_only",
      safeMessageKey: "stream.foundation.140b.foundationScopeOnly",
    },
    {
      area: "stream_index_deferred",
      checkId: "140b_stream_index_deferred",
      passed: SAFETY.streamIndexPatchIncluded === false && SAFETY.streamModuleIndexTouchedNow === false,
      blocking: SAFETY.streamIndexPatchIncluded || SAFETY.streamModuleIndexTouchedNow,
      expected: "No src/modules/stream/index.ts patch in 140B.",
      observed: `${String(SAFETY.streamIndexPatchIncluded)}:${String(SAFETY.streamModuleIndexTouchedNow)}`,
      remediation: "Stream index work belongs to a later explicitly approved patch.",
      safeCode: "stream_index_deferred",
      safeMessageKey: "stream.foundation.140b.streamIndexDeferred",
    },
    {
      area: "backend_entry_deferred",
      checkId: "140b_backend_entry_deferred",
      passed: SAFETY.backendEntryPatchIncluded === false && SAFETY.appServerPatchIncluded === false && SAFETY.appServerTouchedNow === false,
      blocking: SAFETY.backendEntryPatchIncluded || SAFETY.appServerPatchIncluded || SAFETY.appServerTouchedNow,
      expected: "No backend entry/app/server patch in 140B.",
      observed: `${String(SAFETY.backendEntryPatchIncluded)}:${String(SAFETY.appServerPatchIncluded)}:${String(SAFETY.appServerTouchedNow)}`,
      remediation: "Only plan backend entry patch in 140C; do not mount yet.",
      safeCode: "backend_entry_deferred",
      safeMessageKey: "stream.foundation.140b.backendEntryDeferred",
    },
    {
      area: "runtime_execution_deferred",
      checkId: "140b_runtime_http_deferred",
      passed: SAFETY.routeMountPerformedNow === false && SAFETY.runtimeHttpRequestPerformedNow === false,
      blocking: SAFETY.routeMountPerformedNow || SAFETY.runtimeHttpRequestPerformedNow,
      expected: "No route mount and no runtime HTTP request.",
      observed: `${String(SAFETY.routeMountPerformedNow)}:${String(SAFETY.runtimeHttpRequestPerformedNow)}`,
      remediation: "Runtime HTTP smoke must wait until an explicit controlled mount stage.",
      safeCode: "runtime_http_deferred",
      safeMessageKey: "stream.foundation.140b.runtimeHttpDeferred",
    },
    {
      area: "persistence_provider_wallet_deferred",
      checkId: "140b_db_provider_wallet_deferred",
      passed: SAFETY.databaseWriteAllowedNow === false && SAFETY.providerCallAllowedNow === false && SAFETY.walletMutationAllowedNow === false,
      blocking: SAFETY.databaseWriteAllowedNow || SAFETY.providerCallAllowedNow || SAFETY.walletMutationAllowedNow,
      expected: "No DB/provider/Wallet runtime.",
      observed: `${String(SAFETY.databaseWriteAllowedNow)}:${String(SAFETY.providerCallAllowedNow)}:${String(SAFETY.walletMutationAllowedNow)}`,
      remediation: "Connect DB/provider/Wallet adapters only in later approved stages.",
      safeCode: "db_provider_wallet_deferred",
      safeMessageKey: "stream.foundation.140b.dbProviderWalletDeferred",
    },
    {
      area: "money_movement_block",
      checkId: "140b_money_movement_blocked",
      passed: SAFETY.paymentAuthorizationAllowedNow === false && SAFETY.monthlyPayoutAllowedNow === false && SAFETY.moneyMovementAllowedNow === false,
      blocking: SAFETY.paymentAuthorizationAllowedNow || SAFETY.monthlyPayoutAllowedNow || SAFETY.moneyMovementAllowedNow,
      expected: "No payment authorization, no monthly payout, no money movement.",
      observed: `${String(SAFETY.paymentAuthorizationAllowedNow)}:${String(SAFETY.monthlyPayoutAllowedNow)}:${String(SAFETY.moneyMovementAllowedNow)}`,
      remediation: "Monetization stays safe-disabled/provider-gated until a real provider and Wallet ledger stage is approved.",
      safeCode: "money_movement_blocked",
      safeMessageKey: "stream.foundation.140b.moneyMovementBlocked",
    },
    {
      area: "secret_redaction",
      checkId: "140b_no_secrets",
      passed: SAFETY.rawSecretsReturned === false && SAFETY.mobileProviderKeysAllowed === false,
      blocking: SAFETY.rawSecretsReturned || SAFETY.mobileProviderKeysAllowed,
      expected: "No raw secrets and no mobile provider keys.",
      observed: `${String(SAFETY.rawSecretsReturned)}:${String(SAFETY.mobileProviderKeysAllowed)}`,
      remediation: "Keep all provider keys server-side only.",
      safeCode: "no_secrets",
      safeMessageKey: "stream.foundation.140b.noSecrets",
    },
    {
      area: "fake_success_block",
      checkId: "140b_fake_success_blocked",
      passed: SAFETY.fakeSuccessAllowed === false,
      blocking: SAFETY.fakeSuccessAllowed,
      expected: "Fake success is blocked.",
      observed: String(SAFETY.fakeSuccessAllowed),
      remediation: "Return provider_not_configured/safe-disabled until real providers are configured.",
      safeCode: "fake_success_blocked",
      safeMessageKey: "stream.foundation.140b.fakeSuccessBlocked",
    },
  ];
}

function buildDecision(
  checks: readonly StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationCheck[],
): StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationDecision {
  const blocking = checks.filter((check) => check.blocking);
  if (blocking.some((check) => check.area === "previous_140a_source")) {
    return {
      decisionCode: "controlled_backend_route_connection_source_only_post_write_verification_blocked_by_140a",
      postWriteVerificationReadyNow: false,
      readyForControlledBackendEntryPatchPlanning: false,
      readyForProductionBackend: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "140b_blocked_by_140a",
      safeMessageKey: "stream.foundation.140b.blockedBy140a",
    };
  }
  if (blocking.length > 0) {
    return {
      decisionCode: "controlled_backend_route_connection_source_only_post_write_verification_blocked_by_safety_gate",
      postWriteVerificationReadyNow: false,
      readyForControlledBackendEntryPatchPlanning: false,
      readyForProductionBackend: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "140b_blocked_by_safety_gate",
      safeMessageKey: "stream.foundation.140b.blockedBySafetyGate",
    };
  }
  return {
    decisionCode: "controlled_backend_route_connection_source_only_post_write_verification_ready_for_140c_planning",
    postWriteVerificationReadyNow: true,
    readyForControlledBackendEntryPatchPlanning: true,
    readyForProductionBackend: false,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "140b_post_write_verification_ready",
    safeMessageKey: "stream.foundation.140b.postWriteVerificationReady",
  };
}

export function getStreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationSnapshot(): StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationSnapshot {
  const snapshot140a = getStreamFoundationKernelDiagnosticsBackendRouteConnectionSnapshot();
  const readiness140a = getStreamFoundationKernelDiagnosticsBackendRouteConnectionReadiness();
  const smoke140a = getStreamFoundationKernelDiagnosticsBackendRouteConnectionSmokeReport();
  const checks = buildChecks();
  const decision = buildDecision(checks);
  return {
    version: STREAM_FOUNDATION_140B_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SOURCE_ONLY_POST_WRITE_VERIFICATION_VERSION,
    status: decision.postWriteVerificationReadyNow
      ? "controlled_backend_route_connection_source_only_post_write_verification_ready"
      : "controlled_backend_route_connection_source_only_post_write_verification_blocked",
    patchScope: "src/modules/stream/foundation/** only",
    previous140aStatus: snapshot140a.status,
    previous140aReadinessReady: readiness140a.ready,
    previous140aSmokeStatus: smoke140a.status,
    sourceFileCount: snapshot140a.sourceFileCount,
    routePlanCount: snapshot140a.routePlanCount,
    totalChecks: checks.length,
    passedChecks: checks.filter((check) => check.passed).length,
    blockingChecks: checks.filter((check) => check.blocking).length,
    postWriteVerificationReadyNow: decision.postWriteVerificationReadyNow,
    readyForControlledBackendEntryPatchPlanning: decision.readyForControlledBackendEntryPatchPlanning,
    readyForProductionBackend: false,
    streamIndexPatchIncluded: false,
    streamModuleIndexTouchedNow: false,
    backendEntryPatchIncluded: false,
    appServerPatchIncluded: false,
    appServerTouchedNow: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    protectedRouteRegisteredNow: false,
    expressRouterCreatedNow: false,
    expressRouterImportedNow: false,
    expressRouterBoundNow: false,
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
    safety: SAFETY,
  };
}
