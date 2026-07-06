import type { StreamFoundationApiEndpointDescriptor } from "../api";
import { getStreamFoundationApiContractSnapshot } from "../api";
import type { StreamFoundationGateId, StreamFoundationSafetySnapshot } from "../core";
import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import { getStreamFoundationServiceReadinessCompositionSnapshot } from "../readiness";

export type StreamFoundationRouteMountReadinessGateStage = "BACKEND_STREAM_FOUNDATION_136N_ROUTE_MOUNT_READINESS_GATE_STAGING";

export type StreamFoundationRouteMountCheckId =
  | "api_contract_present"
  | "service_readiness_present"
  | "identity_session_gate_required"
  | "admin_auth_gate_required"
  | "provider_gate_still_blocked"
  | "database_integration_still_blocked"
  | "runtime_execution_still_blocked"
  | "fake_success_still_blocked"
  | "app_server_touch_still_blocked"
  | "wallet_messenger_mutation_still_blocked"
  | "observability_audit_required"
  | "route_mount_approval_required";

export type StreamFoundationRouteMountCheckStatus =
  | "passed_contract_present"
  | "blocked_until_backend_execution_stage"
  | "blocked_until_admin_approval"
  | "blocked_until_provider_configuration"
  | "blocked_until_database_integration"
  | "blocked_until_runtime_binding"
  | "locked_no_fake_success";

export type StreamFoundationRouteMountCheckSeverity = "info" | "review_required" | "blocked" | "locked";

export type StreamFoundationRouteMountReadinessCheck = Readonly<{
  checkId: StreamFoundationRouteMountCheckId;
  status: StreamFoundationRouteMountCheckStatus;
  severity: StreamFoundationRouteMountCheckSeverity;
  safeMessageKey: string;
  requiredGates: readonly StreamFoundationGateId[];
  passedForSourceOnlyStagingNow: boolean;
  routeMountAllowedNow: false;
  appServerMutationAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  realtimePublishAllowedNow: false;
  mediaStorageWriteAllowedNow: false;
  eventBusPublishAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeSuccessAllowed: false;
  secretMaterialAllowedInRouteResponse: false;
}>;

export type StreamFoundationRouteMountEndpointPreview = Readonly<{
  endpointId: StreamFoundationApiEndpointDescriptor["endpointId"];
  method: StreamFoundationApiEndpointDescriptor["method"];
  path: StreamFoundationApiEndpointDescriptor["path"];
  acceptsMobileKernelEnvelope: boolean;
  returnsSafeEnvelope: true;
  mountPlanOnlyNow: true;
  routeMountedNow: false;
  requiresAdminApprovalBeforeMount: true;
  requiresAuthMiddlewareBeforeMount: true;
  requiresRateLimitBeforeMount: true;
  requiresAuditBeforeMount: true;
  requiresProviderGateBeforeLiveProviderPath: true;
  runtimeExecutionAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationRouteMountReadinessSafety = StreamFoundationSafetySnapshot & Readonly<{
  localStagingOnly: true;
  patchOnly: true;
  appTsTouchedNow: false;
  serverTsTouchedNow: false;
  routesMountedNow: false;
  expressRouterCreatedNow: false;
  middlewareBoundNow: false;
  runtimeExecutionAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  schemaMutationAllowedNow: false;
  migrationAllowedNow: false;
  providerCallAllowedNow: false;
  externalNetworkAllowedNow: false;
  realtimeBroadcastAllowedNow: false;
  mediaStorageWriteAllowedNow: false;
  eventBusPublishAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeSuccessAllowed: false;
  secretMaterialAllowedInResponse: false;
}>;

export type StreamFoundationRouteMountReadinessGateSnapshot = Readonly<{
  stage: StreamFoundationRouteMountReadinessGateStage;
  source: "local_staging_only";
  purpose: "route_mount_readiness_gate_contract_only";
  totalChecks: number;
  sourceOnlyPassedChecks: number;
  reviewRequiredChecks: number;
  blockedChecks: number;
  lockedChecks: number;
  endpointPreviews: readonly StreamFoundationRouteMountEndpointPreview[];
  routeMountReadyNow: false;
  readyForAppServerMutationNow: false;
  readyForRuntimeExecutionNow: false;
  readyForDatabaseIntegrationNow: false;
  readyForProviderIntegrationNow: false;
  readyForWalletGiftRuntimeNow: false;
  checks: readonly StreamFoundationRouteMountReadinessCheck[];
  inputs: Readonly<{
    apiContract: ReturnType<typeof getStreamFoundationApiContractSnapshot>;
    serviceReadiness: ReturnType<typeof getStreamFoundationServiceReadinessCompositionSnapshot>;
  }>;
  safety: StreamFoundationRouteMountReadinessSafety;
}>;

export const STREAM_FOUNDATION_136N_ROUTE_MOUNT_READINESS_SAFETY: StreamFoundationRouteMountReadinessSafety = {
  ...STREAM_FOUNDATION_SAFE_SNAPSHOT,
  localStagingOnly: true,
  patchOnly: true,
  appTsTouchedNow: false,
  serverTsTouchedNow: false,
  routesMountedNow: false,
  expressRouterCreatedNow: false,
  middlewareBoundNow: false,
  runtimeExecutionAllowedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  schemaMutationAllowedNow: false,
  migrationAllowedNow: false,
  providerCallAllowedNow: false,
  externalNetworkAllowedNow: false,
  realtimeBroadcastAllowedNow: false,
  mediaStorageWriteAllowedNow: false,
  eventBusPublishAllowedNow: false,
  walletRuntimeMutationAllowedNow: false,
  messengerRuntimeMutationAllowedNow: false,
  giftsPaymentsRuntimeMutationAllowedNow: false,
  fakeSuccessAllowed: false,
  secretMaterialAllowedInResponse: false,
};

const check = (
  checkId: StreamFoundationRouteMountCheckId,
  status: StreamFoundationRouteMountCheckStatus,
  severity: StreamFoundationRouteMountCheckSeverity,
  safeMessageKey: string,
  requiredGates: readonly StreamFoundationGateId[],
): StreamFoundationRouteMountReadinessCheck => ({
  checkId,
  status,
  severity,
  safeMessageKey,
  requiredGates,
  passedForSourceOnlyStagingNow: status === "passed_contract_present" || status === "locked_no_fake_success",
  routeMountAllowedNow: false,
  appServerMutationAllowedNow: false,
  runtimeExecutionAllowedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  realtimePublishAllowedNow: false,
  mediaStorageWriteAllowedNow: false,
  eventBusPublishAllowedNow: false,
  walletRuntimeMutationAllowedNow: false,
  messengerRuntimeMutationAllowedNow: false,
  giftsPaymentsRuntimeMutationAllowedNow: false,
  fakeSuccessAllowed: false,
  secretMaterialAllowedInRouteResponse: false,
});

export function getStreamFoundationRouteMountReadinessChecks(): readonly StreamFoundationRouteMountReadinessCheck[] {
  return [
    check("api_contract_present", "passed_contract_present", "info", "stream.foundation.136n.api_contract.present", ["stream_kernel_gateway_gate"]),
    check("service_readiness_present", "passed_contract_present", "info", "stream.foundation.136n.service_readiness.present", ["stream_kernel_gateway_gate", "observability_audit_gate"]),
    check("identity_session_gate_required", "blocked_until_backend_execution_stage", "blocked", "stream.foundation.136n.identity_session.required_before_mount", ["identity_session_gate"]),
    check("admin_auth_gate_required", "blocked_until_admin_approval", "review_required", "stream.foundation.136n.admin_auth.required_before_mount", ["moderation_admin_gate", "launch_readiness_gate"]),
    check("provider_gate_still_blocked", "blocked_until_provider_configuration", "blocked", "stream.foundation.136n.provider_gate.not_configured", ["provider_secret_gate", "media_storage_cdn_gate"]),
    check("database_integration_still_blocked", "blocked_until_database_integration", "blocked", "stream.foundation.136n.database.integration_missing", ["observability_audit_gate", "stream_kernel_gateway_gate"]),
    check("runtime_execution_still_blocked", "blocked_until_runtime_binding", "blocked", "stream.foundation.136n.runtime.binding_missing", ["realtime_room_gate", "live_lifecycle_gate", "media_storage_cdn_gate"]),
    check("fake_success_still_blocked", "locked_no_fake_success", "locked", "stream.foundation.136n.fake_success.locked_off", ["launch_readiness_gate"]),
    check("app_server_touch_still_blocked", "blocked_until_admin_approval", "review_required", "stream.foundation.136n.app_server_touch.requires_approval", ["launch_readiness_gate"]),
    check("wallet_messenger_mutation_still_blocked", "locked_no_fake_success", "locked", "stream.foundation.136n.wallet_messenger_mutation.locked_off", ["wallet_coin_gift_last_stage_gate"]),
    check("observability_audit_required", "blocked_until_backend_execution_stage", "blocked", "stream.foundation.136n.observability.required_before_mount", ["observability_audit_gate"]),
    check("route_mount_approval_required", "blocked_until_admin_approval", "review_required", "stream.foundation.136n.route_mount.approval_required", ["launch_readiness_gate", "moderation_admin_gate"]),
  ] as const;
}

function endpointPreview(endpoint: StreamFoundationApiEndpointDescriptor): StreamFoundationRouteMountEndpointPreview {
  return {
    endpointId: endpoint.endpointId,
    method: endpoint.method,
    path: endpoint.path,
    acceptsMobileKernelEnvelope: endpoint.acceptsMobileKernelEnvelope,
    returnsSafeEnvelope: true,
    mountPlanOnlyNow: true,
    routeMountedNow: false,
    requiresAdminApprovalBeforeMount: true,
    requiresAuthMiddlewareBeforeMount: true,
    requiresRateLimitBeforeMount: true,
    requiresAuditBeforeMount: true,
    requiresProviderGateBeforeLiveProviderPath: true,
    runtimeExecutionAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    fakeSuccessAllowed: false,
  };
}

const countChecks = (
  checks: readonly StreamFoundationRouteMountReadinessCheck[],
  predicate: (checkItem: StreamFoundationRouteMountReadinessCheck) => boolean,
): number => checks.filter(predicate).length;

export function getStreamFoundationRouteMountReadinessGateSnapshot(): StreamFoundationRouteMountReadinessGateSnapshot {
  const apiContract = getStreamFoundationApiContractSnapshot();
  const serviceReadiness = getStreamFoundationServiceReadinessCompositionSnapshot();
  const checks = getStreamFoundationRouteMountReadinessChecks();

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136N_ROUTE_MOUNT_READINESS_GATE_STAGING",
    source: "local_staging_only",
    purpose: "route_mount_readiness_gate_contract_only",
    totalChecks: checks.length,
    sourceOnlyPassedChecks: countChecks(checks, (checkItem) => checkItem.passedForSourceOnlyStagingNow),
    reviewRequiredChecks: countChecks(checks, (checkItem) => checkItem.severity === "review_required"),
    blockedChecks: countChecks(checks, (checkItem) => checkItem.severity === "blocked"),
    lockedChecks: countChecks(checks, (checkItem) => checkItem.severity === "locked"),
    endpointPreviews: apiContract.endpointContracts.map(endpointPreview),
    routeMountReadyNow: false,
    readyForAppServerMutationNow: false,
    readyForRuntimeExecutionNow: false,
    readyForDatabaseIntegrationNow: false,
    readyForProviderIntegrationNow: false,
    readyForWalletGiftRuntimeNow: false,
    checks,
    inputs: {
      apiContract,
      serviceReadiness,
    },
    safety: STREAM_FOUNDATION_136N_ROUTE_MOUNT_READINESS_SAFETY,
  };
}
