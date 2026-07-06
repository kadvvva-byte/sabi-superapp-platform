import {
  STREAM_FOUNDATION_ADMIN_MONETIZATION_ROUTE_STAGE,
  type StreamFoundationAdminMonetizationRouteAuditDraft,
  type StreamFoundationAdminMonetizationRouteBody,
  type StreamFoundationAdminMonetizationRouteDecisionCode,
  type StreamFoundationAdminMonetizationRoutePath,
  type StreamFoundationAdminMonetizationRouteRequest,
  type StreamFoundationAdminMonetizationRouteResponse,
  type StreamFoundationAdminMonetizationRouteStateSnapshot,
} from "./streamFoundationAdminMonetizationRouteContracts";
import {
  STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS,
  type StreamFoundationAdminMonetizationApiOperation,
  type StreamFoundationAdminMonetizationApiProviderTarget,
  type StreamFoundationAdminMonetizationApiRequest,
} from "./streamFoundationAdminSecureMonetizationApiContracts";
import { previewStreamFoundationAdminSecureMonetizationApiRequest } from "./streamFoundationAdminSecureMonetizationApiService";
import type { StreamFoundationAdminMonetizationConfigInput } from "./streamFoundationAdminMonetizationConfigContracts";

const SNAPSHOT_PATH: StreamFoundationAdminMonetizationRoutePath = "/api/admin/stream/monetization/config/snapshot";
const VALIDATE_PATH: StreamFoundationAdminMonetizationRoutePath = "/api/admin/stream/monetization/config/validate";
const PROVIDER_REF_PATH: StreamFoundationAdminMonetizationRoutePath = "/api/admin/stream/monetization/config/provider-ref";
const POLICY_PATH: StreamFoundationAdminMonetizationRoutePath = "/api/admin/stream/monetization/config/monthly-payout-policy";
const LIVE_TEST_PATH: StreamFoundationAdminMonetizationRoutePath = "/api/admin/stream/monetization/config/provider-live-test-gate";
const DISABLE_PATH: StreamFoundationAdminMonetizationRoutePath = "/api/admin/stream/monetization/config/disable-provider";
const ROTATE_SECRET_PATH: StreamFoundationAdminMonetizationRoutePath = "/api/admin/stream/monetization/config/rotate-provider-secret-ref";
const READINESS_PATH: StreamFoundationAdminMonetizationRoutePath = "/api/admin/stream/monetization/config/readiness";

type MutableRouteStore = {
  configInput: StreamFoundationAdminMonetizationConfigInput;
  providerRefUpdates: number;
  policyUpdates: number;
  disableUpdates: number;
  secretRotationChecks: number;
  auditDrafts: StreamFoundationAdminMonetizationRouteAuditDraft[];
};

function hasPermission(request: StreamFoundationAdminMonetizationRouteRequest, permission: string): boolean {
  return request.actor.permissions.includes(permission);
}

function nonEmpty(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function operationForPath(path: StreamFoundationAdminMonetizationRoutePath, body: StreamFoundationAdminMonetizationRouteBody | undefined): StreamFoundationAdminMonetizationApiOperation {
  if (body?.operation) return body.operation;
  if (path === SNAPSHOT_PATH || path === READINESS_PATH) return "read_redacted_config_snapshot";
  if (path === VALIDATE_PATH) return "validate_config_draft";
  if (path === PROVIDER_REF_PATH) return "save_accept_payment_provider_ref";
  if (path === POLICY_PATH) return "save_monthly_payout_policy";
  if (path === LIVE_TEST_PATH) return "request_provider_live_test_gate";
  if (path === DISABLE_PATH) return "disable_provider_config";
  return "rotate_provider_secret_ref";
}

function configPatchForProvider(target: StreamFoundationAdminMonetizationApiProviderTarget, input: Readonly<{
  configured: boolean;
  enabled: boolean;
  liveTestPassed: boolean;
  environment: "sandbox" | "production" | "disabled";
  providerKeyRef: string;
}>): StreamFoundationAdminMonetizationConfigInput {
  if (target === "accept_payment_provider") {
    return {
      acceptPaymentProviderConfigured: input.configured,
      acceptPaymentProviderEnabled: input.enabled,
      acceptPaymentProviderLiveTestPassed: input.liveTestPassed,
      acceptPaymentProviderEnvironment: input.environment,
      acceptPaymentProviderKeyRef: input.providerKeyRef,
    };
  }
  if (target === "monetization_payout_provider") {
    return {
      monetizationPayoutProviderConfigured: input.configured,
      monetizationPayoutProviderEnabled: input.enabled,
      monetizationPayoutProviderLiveTestPassed: input.liveTestPassed,
      monetizationPayoutProviderEnvironment: input.environment,
      monetizationPayoutProviderKeyRef: input.providerKeyRef,
    };
  }
  if (target === "wallet_coin_ledger_provider") {
    return {
      walletCoinLedgerProviderConfigured: input.configured,
      walletCoinLedgerProviderEnabled: input.enabled,
      walletCoinLedgerProviderLiveTestPassed: input.liveTestPassed,
      walletCoinLedgerProviderEnvironment: input.environment,
      walletCoinLedgerProviderKeyRef: input.providerKeyRef,
    };
  }
  if (target === "platform_settlement_provider") {
    return {
      platformSettlementProviderConfigured: input.configured,
      platformSettlementProviderEnabled: input.enabled,
      platformSettlementProviderLiveTestPassed: input.liveTestPassed,
      platformSettlementProviderEnvironment: input.environment,
      platformSettlementProviderKeyRef: input.providerKeyRef,
    };
  }
  return {
    complianceRiskProviderConfigured: input.configured,
    complianceRiskProviderEnabled: input.enabled,
    complianceRiskProviderLiveTestPassed: input.liveTestPassed,
    complianceRiskProviderEnvironment: input.environment,
    complianceRiskProviderKeyRef: input.providerKeyRef,
  };
}

function containsForbiddenSecretPayload(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const [key, nested] of Object.entries(record)) {
    const normalized = key.toLowerCase();
    if (normalized === "rawsecretvalue" || normalized === "plaintextsecret" || normalized === "apikey" || normalized === "apisecret" || normalized === "privatekey") {
      return true;
    }
    if (containsForbiddenSecretPayload(nested)) return true;
  }
  return false;
}

function mergeConfigInput(current: StreamFoundationAdminMonetizationConfigInput, next: StreamFoundationAdminMonetizationConfigInput | undefined): StreamFoundationAdminMonetizationConfigInput {
  return {
    ...current,
    ...(next ?? {}),
  };
}

function buildApiRequest(
  routeRequest: StreamFoundationAdminMonetizationRouteRequest,
  operation: StreamFoundationAdminMonetizationApiOperation,
  draftConfig: StreamFoundationAdminMonetizationConfigInput,
): StreamFoundationAdminMonetizationApiRequest {
  return {
    requestId: routeRequest.requestId,
    idempotencyKey: routeRequest.idempotencyKey,
    operation,
    actor: routeRequest.actor,
    providerConfig: routeRequest.body?.providerConfig,
    policy: routeRequest.body?.policy,
    draftConfig,
    clientCreatedAt: routeRequest.body?.clientCreatedAt,
  };
}

function auditDraft(request: StreamFoundationAdminMonetizationRouteRequest, operation: StreamFoundationAdminMonetizationApiOperation, safeAction: string): StreamFoundationAdminMonetizationRouteAuditDraft {
  return {
    auditId: `stream-monetization-route-audit-${request.requestId}`,
    requestId: request.requestId,
    operation,
    adminUserId: request.actor.adminUserId,
    safeAction,
    inMemoryOnly: true,
    persistedNow: false,
    auditPersistRequiredLater: true,
    rawSecretCaptured: false,
    providerCallExecuted: false,
    moneyMovementExecuted: false,
  };
}

function snapshotFromStore(store: MutableRouteStore, request: StreamFoundationAdminMonetizationRouteRequest): StreamFoundationAdminMonetizationRouteStateSnapshot {
  const apiPreview = previewStreamFoundationAdminSecureMonetizationApiRequest(
    buildApiRequest(request, "read_redacted_config_snapshot", store.configInput),
  );
  return {
    stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_ROUTE_STAGE,
    safeConfigSnapshot: apiPreview.safeConfigSnapshot!,
    inMemoryProviderRefUpdates: store.providerRefUpdates,
    inMemoryPolicyUpdates: store.policyUpdates,
    inMemoryDisableUpdates: store.disableUpdates,
    inMemorySecretRotationChecks: store.secretRotationChecks,
    auditDrafts: store.auditDrafts,
    redactedResponsesOnly: true,
    rawSecretValuesReturned: false,
    mobileProviderKeysReturned: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  };
}

function response(args: Readonly<{
  request: StreamFoundationAdminMonetizationRouteRequest;
  status: StreamFoundationAdminMonetizationRouteResponse["status"];
  ok: boolean;
  decisionCode: StreamFoundationAdminMonetizationRouteDecisionCode;
  safeMessageKey: string;
  apiRequest: StreamFoundationAdminMonetizationApiRequest;
  store: MutableRouteStore;
  audit?: StreamFoundationAdminMonetizationRouteAuditDraft;
}>): StreamFoundationAdminMonetizationRouteResponse {
  return {
    stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_ROUTE_STAGE,
    status: args.status,
    ok: args.ok,
    decisionCode: args.decisionCode,
    safeMessageKey: args.safeMessageKey,
    path: args.request.path,
    method: args.request.method,
    apiPreview: previewStreamFoundationAdminSecureMonetizationApiRequest(args.apiRequest),
    stateSnapshot: snapshotFromStore(args.store, args.request),
    auditDraft: args.audit,
    routeMountAllowedNow: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretValuesReturned: false,
    mobileProviderKeysReturned: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
  };
}

export type StreamFoundationAdminMonetizationRouteService = Readonly<{
  handle: (request: StreamFoundationAdminMonetizationRouteRequest) => StreamFoundationAdminMonetizationRouteResponse;
  getState: (request: StreamFoundationAdminMonetizationRouteRequest) => StreamFoundationAdminMonetizationRouteStateSnapshot;
}>;

export function createStreamFoundationAdminMonetizationRouteService(initialConfig: StreamFoundationAdminMonetizationConfigInput = {}): StreamFoundationAdminMonetizationRouteService {
  const store: MutableRouteStore = {
    configInput: initialConfig,
    providerRefUpdates: 0,
    policyUpdates: 0,
    disableUpdates: 0,
    secretRotationChecks: 0,
    auditDrafts: [],
  };

  function handle(request: StreamFoundationAdminMonetizationRouteRequest): StreamFoundationAdminMonetizationRouteResponse {
    const operation = operationForPath(request.path, request.body);
    let nextConfig = mergeConfigInput(store.configInput, request.body?.draftConfig);
    const baseApiRequest = buildApiRequest(request, operation, nextConfig);

    if (!nonEmpty(request.requestId) || !nonEmpty(request.idempotencyKey) || !nonEmpty(request.actor.adminUserId)) {
      return response({
        request,
        status: 400,
        ok: false,
        decisionCode: "admin_monetization_route_blocked_invalid_request",
        safeMessageKey: "stream.admin.monetization.route.invalid_request",
        apiRequest: baseApiRequest,
        store,
      });
    }

    if (request.method === "GET" && request.path !== SNAPSHOT_PATH && request.path !== READINESS_PATH) {
      return response({
        request,
        status: 405,
        ok: false,
        decisionCode: "admin_monetization_route_blocked_invalid_method",
        safeMessageKey: "stream.admin.monetization.route.invalid_method",
        apiRequest: baseApiRequest,
        store,
      });
    }

    if (request.method === "POST" && (request.path === SNAPSHOT_PATH || request.path === READINESS_PATH)) {
      return response({
        request,
        status: 405,
        ok: false,
        decisionCode: "admin_monetization_route_blocked_invalid_method",
        safeMessageKey: "stream.admin.monetization.route.invalid_method",
        apiRequest: baseApiRequest,
        store,
      });
    }

    if (!hasPermission(request, STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.read)) {
      return response({
        request,
        status: 403,
        ok: false,
        decisionCode: "admin_monetization_route_blocked_permission_required",
        safeMessageKey: "stream.admin.monetization.route.read_permission_required",
        apiRequest: baseApiRequest,
        store,
      });
    }

    if ((request.method === "POST" || operation !== "read_redacted_config_snapshot") && !hasPermission(request, STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.write)) {
      return response({
        request,
        status: 403,
        ok: false,
        decisionCode: "admin_monetization_route_blocked_permission_required",
        safeMessageKey: "stream.admin.monetization.route.write_permission_required",
        apiRequest: baseApiRequest,
        store,
      });
    }

    if ((request.path === PROVIDER_REF_PATH || request.path === ROTATE_SECRET_PATH) && !hasPermission(request, STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.secrets)) {
      return response({
        request,
        status: 403,
        ok: false,
        decisionCode: "admin_monetization_route_blocked_permission_required",
        safeMessageKey: "stream.admin.monetization.route.secret_permission_required",
        apiRequest: baseApiRequest,
        store,
      });
    }

    if (containsForbiddenSecretPayload(request.body)) {
      return response({
        request,
        status: 422,
        ok: false,
        decisionCode: "admin_monetization_route_blocked_raw_secret_forbidden",
        safeMessageKey: "stream.admin.monetization.route.raw_secret_forbidden",
        apiRequest: baseApiRequest,
        store,
      });
    }

    if (request.path === SNAPSHOT_PATH) {
      return response({
        request,
        status: 200,
        ok: true,
        decisionCode: "admin_monetization_route_snapshot_ready",
        safeMessageKey: "stream.admin.monetization.route.snapshot_ready",
        apiRequest: buildApiRequest(request, "read_redacted_config_snapshot", store.configInput),
        store,
      });
    }

    if (request.path === READINESS_PATH) {
      return response({
        request,
        status: 200,
        ok: true,
        decisionCode: "admin_monetization_route_readiness_ready",
        safeMessageKey: "stream.admin.monetization.route.readiness_ready",
        apiRequest: buildApiRequest(request, "read_redacted_config_snapshot", store.configInput),
        store,
      });
    }

    if (request.path === VALIDATE_PATH) {
      return response({
        request,
        status: 200,
        ok: true,
        decisionCode: "admin_monetization_route_validation_ready",
        safeMessageKey: "stream.admin.monetization.route.validation_ready",
        apiRequest: buildApiRequest(request, "validate_config_draft", nextConfig),
        store,
      });
    }

    if (request.path === LIVE_TEST_PATH) {
      return response({
        request,
        status: 409,
        ok: false,
        decisionCode: "admin_monetization_route_blocked_provider_call_required",
        safeMessageKey: "stream.admin.monetization.route.provider_call_required",
        apiRequest: buildApiRequest(request, "request_provider_live_test_gate", nextConfig),
        store,
      });
    }

    if (request.path === PROVIDER_REF_PATH) {
      const provider = request.body?.providerConfig;
      if (!provider) {
        return response({
          request,
          status: 400,
          ok: false,
          decisionCode: "admin_monetization_route_blocked_invalid_request",
          safeMessageKey: "stream.admin.monetization.route.provider_ref_required",
          apiRequest: baseApiRequest,
          store,
        });
      }
      nextConfig = mergeConfigInput(nextConfig, configPatchForProvider(provider.target, {
        configured: provider.configured,
        enabled: provider.enabled,
        liveTestPassed: provider.liveTestPassed,
        environment: provider.environment,
        providerKeyRef: provider.secretRef.providerKeyRef,
      }));
      store.configInput = nextConfig;
      store.providerRefUpdates += 1;
      const audit = auditDraft(request, operation, "in_memory_provider_ref_saved_for_staging_only");
      store.auditDrafts.push(audit);
      return response({
        request,
        status: 202,
        ok: true,
        decisionCode: "admin_monetization_route_in_memory_provider_ref_saved",
        safeMessageKey: "stream.admin.monetization.route.provider_ref_saved_in_memory_only",
        apiRequest: buildApiRequest(request, operation, nextConfig),
        store,
        audit,
      });
    }

    if (request.path === POLICY_PATH) {
      if (!request.body?.policy) {
        return response({
          request,
          status: 400,
          ok: false,
          decisionCode: "admin_monetization_route_blocked_invalid_request",
          safeMessageKey: "stream.admin.monetization.route.policy_required",
          apiRequest: baseApiRequest,
          store,
        });
      }
      nextConfig = mergeConfigInput(nextConfig, {
        platformFeeBps: request.body.policy.platformFeeBps,
        monthlyPayoutDayOfMonth: request.body.policy.monthlyPayoutDayOfMonth,
        minPayoutCoinAmount: request.body.policy.minPayoutCoinAmount,
        complianceHoldDays: request.body.policy.complianceHoldDays,
        supportedGiftPaymentRails: request.body.policy.supportedGiftPaymentRails,
      });
      store.configInput = nextConfig;
      store.policyUpdates += 1;
      const audit = auditDraft(request, "save_monthly_payout_policy", "in_memory_monthly_payout_policy_saved_for_staging_only");
      store.auditDrafts.push(audit);
      return response({
        request,
        status: 202,
        ok: true,
        decisionCode: "admin_monetization_route_in_memory_policy_saved",
        safeMessageKey: "stream.admin.monetization.route.policy_saved_in_memory_only",
        apiRequest: buildApiRequest(request, "save_monthly_payout_policy", nextConfig),
        store,
        audit,
      });
    }

    if (request.path === DISABLE_PATH) {
      const provider = request.body?.providerConfig;
      if (!provider) {
        return response({
          request,
          status: 400,
          ok: false,
          decisionCode: "admin_monetization_route_blocked_invalid_request",
          safeMessageKey: "stream.admin.monetization.route.provider_target_required",
          apiRequest: baseApiRequest,
          store,
        });
      }
      nextConfig = mergeConfigInput(nextConfig, configPatchForProvider(provider.target, {
        configured: false,
        enabled: false,
        liveTestPassed: false,
        environment: "disabled",
        providerKeyRef: provider.secretRef.providerKeyRef,
      }));
      store.configInput = nextConfig;
      store.disableUpdates += 1;
      const audit = auditDraft(request, "disable_provider_config", "in_memory_provider_disabled_for_staging_only");
      store.auditDrafts.push(audit);
      return response({
        request,
        status: 202,
        ok: true,
        decisionCode: "admin_monetization_route_in_memory_provider_disabled",
        safeMessageKey: "stream.admin.monetization.route.provider_disabled_in_memory_only",
        apiRequest: buildApiRequest(request, "disable_provider_config", nextConfig),
        store,
        audit,
      });
    }

    if (request.path === ROTATE_SECRET_PATH) {
      store.secretRotationChecks += 1;
      const audit = auditDraft(request, "rotate_provider_secret_ref", "secret_rotation_ref_validated_without_returning_secret");
      store.auditDrafts.push(audit);
      return response({
        request,
        status: 202,
        ok: true,
        decisionCode: "admin_monetization_route_secret_rotation_ref_checked",
        safeMessageKey: "stream.admin.monetization.route.secret_rotation_ref_checked",
        apiRequest: buildApiRequest(request, "rotate_provider_secret_ref", nextConfig),
        store,
        audit,
      });
    }

    return response({
      request,
      status: 409,
      ok: false,
      decisionCode: "admin_monetization_route_blocked_route_mount_required",
      safeMessageKey: "stream.admin.monetization.route.mount_required",
      apiRequest: baseApiRequest,
      store,
    });
  }

  return {
    handle,
    getState: (request) => snapshotFromStore(store, request),
  };
}

export function getStreamFoundationAdminMonetizationRouteSafePreview(): StreamFoundationAdminMonetizationRouteResponse {
  const service = createStreamFoundationAdminMonetizationRouteService({
    acceptPaymentProviderConfigured: true,
    acceptPaymentProviderEnabled: true,
    acceptPaymentProviderLiveTestPassed: true,
    acceptPaymentProviderKeyRef: "admin.stream.payment.accept.provider.secret_ref",
    monetizationPayoutProviderConfigured: true,
    monetizationPayoutProviderEnabled: true,
    monetizationPayoutProviderLiveTestPassed: true,
    monetizationPayoutProviderKeyRef: "admin.stream.monetization.payout.provider.secret_ref",
    walletCoinLedgerProviderConfigured: true,
    walletCoinLedgerProviderEnabled: true,
    walletCoinLedgerProviderLiveTestPassed: true,
    walletCoinLedgerProviderKeyRef: "admin.wallet.coin.ledger.provider.secret_ref",
    platformFeeBps: 1200,
    monthlyPayoutDayOfMonth: 1,
    minPayoutCoinAmount: 1000,
    complianceHoldDays: 7,
  });
  return service.handle({
    requestId: "stream-admin-monetization-route-preview",
    idempotencyKey: "stream-admin-monetization-route-preview-key",
    method: "GET",
    path: SNAPSHOT_PATH,
    actor: {
      adminUserId: "admin-preview",
      role: "owner",
      permissions: [
        STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.read,
        STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.write,
        STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.secrets,
        STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.liveTest,
      ],
    },
  });
}
