import type { TaxiMoneyAmount } from '../taxiFoundation.types';

export type TaxiRuntimeRouteDraftVersion001Y = 'TAXI-BACKEND-FOUNDATION-001Y-MEGA';

export type TaxiRuntimeRouteMethod001Y = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type TaxiRuntimeRouteDomain001Y =
  | 'rider_request'
  | 'quote_route_eta'
  | 'dispatch_matching'
  | 'driver_verification'
  | 'vehicle_park_review'
  | 'trip_lifecycle'
  | 'admin_tariff_region'
  | 'payment_settlement'
  | 'support_dispute_safety'
  | 'provider_readiness'
  | 'audit_compliance'
  | 'realtime_shadow';

export type TaxiRuntimeRouteAuthScope001Y =
  | 'taxi:rider:read'
  | 'taxi:rider:write'
  | 'taxi:driver:read'
  | 'taxi:driver:write'
  | 'taxi:admin:read'
  | 'taxi:admin:write'
  | 'taxi:dispatch:read'
  | 'taxi:dispatch:write'
  | 'taxi:support:read'
  | 'taxi:support:write'
  | 'taxi:audit:read'
  | 'taxi:provider-readiness:read';

export type TaxiRuntimeRouteGate001Y =
  | 'admin_first_configuration_required'
  | 'schema_migration_approval_required'
  | 'admin_token_scope_required'
  | 'rider_auth_required'
  | 'driver_auth_required'
  | 'driver_kyc_required'
  | 'vehicle_documents_required'
  | 'tariff_region_config_required'
  | 'provider_reference_labels_required'
  | 'route_provider_required'
  | 'dispatch_provider_required'
  | 'payment_provider_required'
  | 'wallet_boundary_approval_required'
  | 'settlement_review_required'
  | 'support_safety_policy_required'
  | 'audit_reason_required'
  | 'maker_checker_required'
  | 'idempotency_required'
  | 'rate_limit_required'
  | 'runtime_mount_approval_required'
  | 'fake_success_blocked';

export interface TaxiRuntimeRouteDraft001Y {
  readonly id: string;
  readonly domain: TaxiRuntimeRouteDomain001Y;
  readonly method: TaxiRuntimeRouteMethod001Y;
  readonly path: string;
  readonly handlerName: string;
  readonly purpose: string;
  readonly requestContract: string;
  readonly responseContract: string;
  readonly authScopes: readonly TaxiRuntimeRouteAuthScope001Y[];
  readonly gates: readonly TaxiRuntimeRouteGate001Y[];
  readonly mountedNow: false;
  readonly runtimeEnabledNow: false;
  readonly routeRuntimeMountedNow: false;
  readonly handlerExecutesNow: false;
  readonly envReadNow: false;
  readonly dbReadNow: false;
  readonly dbWriteNow: false;
  readonly prismaSchemaWriteNow: false;
  readonly prismaGenerateNow: false;
  readonly prismaMigrationNow: false;
  readonly walletMutationNow: false;
  readonly paymentNow: false;
  readonly payoutNow: false;
  readonly providerDispatchNow: false;
  readonly fakeSuccessBlocked: true;
  readonly exactOwnerApprovalRequired: true;
}

export interface TaxiRuntimeHandlerDraft001Y {
  readonly id: string;
  readonly handlerName: string;
  readonly domain: TaxiRuntimeRouteDomain001Y;
  readonly validatesInput: true;
  readonly requiresIdempotency: boolean;
  readonly requiresAuditReason: boolean;
  readonly returnsProviderNotConfigured: boolean;
  readonly returnsSafeDisabled: true;
  readonly readsEnvNow: false;
  readonly readsDbNow: false;
  readonly writesDbNow: false;
  readonly mutatesWalletNow: false;
  readonly capturesPaymentNow: false;
  readonly executesPayoutNow: false;
  readonly dispatchesProviderNow: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiRuntimeRouteMountPlan001Y {
  readonly id: string;
  readonly phase: 'draft_only' | 'compile_only' | 'mount_after_approval' | 'runtime_smoke_after_mount';
  readonly title: string;
  readonly routeIds: readonly string[];
  readonly requiredGates: readonly TaxiRuntimeRouteGate001Y[];
  readonly canRunNow: false;
  readonly sourceWriteAllowedNow: false;
  readonly appMountAllowedNow: false;
  readonly dbAllowedNow: false;
  readonly providerAllowedNow: false;
  readonly walletAllowedNow: false;
  readonly exactOwnerApprovalRequired: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiRuntimeRouteDraftSnapshot001Y {
  readonly version: TaxiRuntimeRouteDraftVersion001Y;
  readonly status: 'runtime_route_drafts_ready_safe_disabled';
  readonly routeDrafts: readonly TaxiRuntimeRouteDraft001Y[];
  readonly handlerDrafts: readonly TaxiRuntimeHandlerDraft001Y[];
  readonly mountPlan: readonly TaxiRuntimeRouteMountPlan001Y[];
  readonly routeRuntimeMountedNow: false;
  readonly adminUiRuntimeMountedNow: false;
  readonly envReadNow: false;
  readonly dbReadNow: false;
  readonly dbWriteNow: false;
  readonly prismaSchemaWriteNow: false;
  readonly prismaGenerateNow: false;
  readonly prismaMigrationNow: false;
  readonly walletMutationNow: false;
  readonly paymentNow: false;
  readonly payoutNow: false;
  readonly providerDispatchNow: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiRuntimeRouteReadinessInput001Y {
  readonly adminFirstConfigured: boolean;
  readonly schemaMigrationApproved: boolean;
  readonly adminTokenHasRequiredScope: boolean;
  readonly riderAuthReady: boolean;
  readonly driverAuthReady: boolean;
  readonly driverKycApproved: boolean;
  readonly vehicleDocumentsApproved: boolean;
  readonly tariffRegionConfigured: boolean;
  readonly providerReferenceLabelsApproved: boolean;
  readonly routeProviderConfigured: boolean;
  readonly dispatchProviderConfigured: boolean;
  readonly paymentProviderConfigured: boolean;
  readonly walletBoundaryApproved: boolean;
  readonly supportSafetyPolicyApproved: boolean;
  readonly auditReasonProvided: boolean;
  readonly makerCheckerConfigured: boolean;
  readonly idempotencyConfigured: boolean;
  readonly rateLimitConfigured: boolean;
}

export interface TaxiRuntimeRouteReadinessDecision001Y {
  readonly canMountRoutesNow: false;
  readonly canRunHandlersNow: false;
  readonly canReadEnvNow: false;
  readonly canReadDbNow: false;
  readonly canWriteDbNow: false;
  readonly canMutateWalletNow: false;
  readonly canCapturePaymentNow: false;
  readonly canExecutePayoutNow: false;
  readonly canDispatchProviderNow: false;
  readonly missingGates: readonly TaxiRuntimeRouteGate001Y[];
  readonly safeDisabled: true;
  readonly exactOwnerApprovalRequired: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiSafeDisabledRouteResponse001Y {
  readonly ok: false;
  readonly code: 'taxi_runtime_route_draft_safe_disabled';
  readonly routeId: string;
  readonly method: TaxiRuntimeRouteMethod001Y;
  readonly path: string;
  readonly domain: TaxiRuntimeRouteDomain001Y;
  readonly message: string;
  readonly missingGates: readonly TaxiRuntimeRouteGate001Y[];
  readonly moneyPreview?: TaxiMoneyAmount;
  readonly routeRuntimeMountedNow: false;
  readonly handlerExecutesNow: false;
  readonly dbWriteNow: false;
  readonly walletMutationNow: false;
  readonly paymentNow: false;
  readonly payoutNow: false;
  readonly providerDispatchNow: false;
  readonly fakeSuccessBlocked: true;
}
