import {
  TAXI_RUNTIME_HANDLER_DRAFTS_001Y,
  TAXI_RUNTIME_ROUTE_DRAFTS_001Y,
  TAXI_RUNTIME_ROUTE_DRAFTS_VERSION_001Y,
  TAXI_RUNTIME_ROUTE_MOUNT_PLAN_001Y,
} from './constants';
import type {
  TaxiRuntimeRouteDomain001Y,
  TaxiRuntimeRouteDraft001Y,
  TaxiRuntimeRouteGate001Y,
  TaxiRuntimeRouteReadinessDecision001Y,
  TaxiRuntimeRouteReadinessInput001Y,
  TaxiRuntimeRouteDraftSnapshot001Y,
  TaxiSafeDisabledRouteResponse001Y,
} from './types';

export function getTaxiRuntimeRouteDraftSnapshot001Y(): TaxiRuntimeRouteDraftSnapshot001Y {
  return {
    version: TAXI_RUNTIME_ROUTE_DRAFTS_VERSION_001Y,
    status: 'runtime_route_drafts_ready_safe_disabled',
    routeDrafts: TAXI_RUNTIME_ROUTE_DRAFTS_001Y,
    handlerDrafts: TAXI_RUNTIME_HANDLER_DRAFTS_001Y,
    mountPlan: TAXI_RUNTIME_ROUTE_MOUNT_PLAN_001Y,
    routeRuntimeMountedNow: false,
    adminUiRuntimeMountedNow: false,
    envReadNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    walletMutationNow: false,
    paymentNow: false,
    payoutNow: false,
    providerDispatchNow: false,
    fakeSuccessBlocked: true,
  };
}

export function listTaxiRuntimeRouteDraftPaths001Y(): readonly string[] {
  return TAXI_RUNTIME_ROUTE_DRAFTS_001Y.map((route) => `${route.method} ${route.path}`);
}

export function summarizeTaxiRuntimeRouteDraftDomains001Y(): readonly {
  readonly domain: TaxiRuntimeRouteDomain001Y;
  readonly routeCount: number;
  readonly handlerCount: number;
  readonly mountedNow: false;
  readonly runtimeEnabledNow: false;
  readonly providerDispatchNow: false;
}[] {
  const domains = Array.from(new Set(TAXI_RUNTIME_ROUTE_DRAFTS_001Y.map((route) => route.domain)));
  return domains.map((domain) => ({
    domain,
    routeCount: TAXI_RUNTIME_ROUTE_DRAFTS_001Y.filter((route) => route.domain === domain).length,
    handlerCount: TAXI_RUNTIME_HANDLER_DRAFTS_001Y.filter((handler) => handler.domain === domain).length,
    mountedNow: false,
    runtimeEnabledNow: false,
    providerDispatchNow: false,
  }));
}

export function findTaxiRuntimeRouteDraft001Y(routeId: string): TaxiRuntimeRouteDraft001Y | undefined {
  return TAXI_RUNTIME_ROUTE_DRAFTS_001Y.find((route) => route.id === routeId);
}

export function evaluateTaxiRuntimeRouteReadiness001Y(input: TaxiRuntimeRouteReadinessInput001Y): TaxiRuntimeRouteReadinessDecision001Y {
  const missing = new Set<TaxiRuntimeRouteGate001Y>();

  if (!input.adminFirstConfigured) missing.add('admin_first_configuration_required');
  if (!input.schemaMigrationApproved) missing.add('schema_migration_approval_required');
  if (!input.adminTokenHasRequiredScope) missing.add('admin_token_scope_required');
  if (!input.riderAuthReady) missing.add('rider_auth_required');
  if (!input.driverAuthReady) missing.add('driver_auth_required');
  if (!input.driverKycApproved) missing.add('driver_kyc_required');
  if (!input.vehicleDocumentsApproved) missing.add('vehicle_documents_required');
  if (!input.tariffRegionConfigured) missing.add('tariff_region_config_required');
  if (!input.providerReferenceLabelsApproved) missing.add('provider_reference_labels_required');
  if (!input.routeProviderConfigured) missing.add('route_provider_required');
  if (!input.dispatchProviderConfigured) missing.add('dispatch_provider_required');
  if (!input.paymentProviderConfigured) missing.add('payment_provider_required');
  if (!input.walletBoundaryApproved) missing.add('wallet_boundary_approval_required');
  if (!input.supportSafetyPolicyApproved) missing.add('support_safety_policy_required');
  if (!input.auditReasonProvided) missing.add('audit_reason_required');
  if (!input.makerCheckerConfigured) missing.add('maker_checker_required');
  if (!input.idempotencyConfigured) missing.add('idempotency_required');
  if (!input.rateLimitConfigured) missing.add('rate_limit_required');

  missing.add('runtime_mount_approval_required');
  missing.add('fake_success_blocked');

  return {
    canMountRoutesNow: false,
    canRunHandlersNow: false,
    canReadEnvNow: false,
    canReadDbNow: false,
    canWriteDbNow: false,
    canMutateWalletNow: false,
    canCapturePaymentNow: false,
    canExecutePayoutNow: false,
    canDispatchProviderNow: false,
    missingGates: Array.from(missing),
    safeDisabled: true,
    exactOwnerApprovalRequired: true,
    fakeSuccessBlocked: true,
  };
}

export function buildTaxiSafeDisabledRouteResponse001Y(routeId: string): TaxiSafeDisabledRouteResponse001Y {
  const route = findTaxiRuntimeRouteDraft001Y(routeId) ?? TAXI_RUNTIME_ROUTE_DRAFTS_001Y[0];
  return {
    ok: false,
    code: 'taxi_runtime_route_draft_safe_disabled',
    routeId: route.id,
    method: route.method,
    path: route.path,
    domain: route.domain,
    message: 'Taxi route is drafted but not mounted. Runtime requires separate owner approval, schema migration approval, provider readiness, Wallet/payment boundary approval, Admin maker-checker, idempotency and rate-limit gates.',
    missingGates: route.gates,
    routeRuntimeMountedNow: false,
    handlerExecutesNow: false,
    dbWriteNow: false,
    walletMutationNow: false,
    paymentNow: false,
    payoutNow: false,
    providerDispatchNow: false,
    fakeSuccessBlocked: true,
  };
}
