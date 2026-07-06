import type { TaxiMoneyAmount, TaxiTariffCode } from '../taxiFoundation.types';

export type TaxiRuntimeApiContractVersion001V = 'TAXI-BACKEND-FOUNDATION-001V-MEGA';

export type TaxiRuntimeApiDomain001V =
  | 'rider_request'
  | 'quote_route_eta'
  | 'driver_dispatch'
  | 'driver_verification'
  | 'trip_lifecycle'
  | 'tariff_region_admin'
  | 'payment_wallet_settlement'
  | 'support_dispute_safety'
  | 'audit_compliance'
  | 'provider_readiness';

export type TaxiRuntimeHttpMethod001V = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type TaxiRuntimeAuthScope001V =
  | 'taxi:rider'
  | 'taxi:driver'
  | 'taxi:admin:read'
  | 'taxi:admin:write'
  | 'taxi:support:read'
  | 'taxi:support:write'
  | 'taxi:provider:readiness';

export type TaxiRuntimeReadinessState001V =
  | 'contract_ready_safe_disabled'
  | 'admin_config_required'
  | 'provider_config_required'
  | 'db_schema_required'
  | 'wallet_provider_required'
  | 'exact_owner_approval_required';

export type TaxiRuntimePayloadRequirement001V =
  | 'authenticated_identity'
  | 'idempotency_key'
  | 'geo_point'
  | 'route_points'
  | 'tariff_code'
  | 'country_region_city'
  | 'admin_config_version'
  | 'driver_verification_status'
  | 'vehicle_review_status'
  | 'provider_readiness_snapshot'
  | 'wallet_payment_provider_status'
  | 'support_evidence_bundle'
  | 'audit_reason_code';

export interface TaxiRuntimeApiContract001V {
  readonly id: string;
  readonly domain: TaxiRuntimeApiDomain001V;
  readonly method: TaxiRuntimeHttpMethod001V;
  readonly path: string;
  readonly authScopes: readonly TaxiRuntimeAuthScope001V[];
  readonly readiness: TaxiRuntimeReadinessState001V;
  readonly payloadRequirements: readonly TaxiRuntimePayloadRequirement001V[];
  readonly adminFirst: true;
  readonly mountedNow: false;
  readonly runtimeEnabledNow: false;
  readonly dbReadEnabledNow: false;
  readonly dbWriteEnabledNow: false;
  readonly providerDispatchEnabledNow: false;
  readonly walletMutationEnabledNow: false;
  readonly paymentEnabledNow: false;
  readonly payoutEnabledNow: false;
  readonly fakeSuccessBlocked: true;
  readonly exactOwnerApprovalRequired: true;
  readonly notes: string;
}

export interface TaxiRuntimeApiDomainSummary001V {
  readonly domain: TaxiRuntimeApiDomain001V;
  readonly contractCount: number;
  readonly runtimeEnabledNow: false;
  readonly mountedNow: false;
  readonly unresolvedReadiness: readonly TaxiRuntimeReadinessState001V[];
}

export interface TaxiRuntimeAdminActionContract001V {
  readonly id: string;
  readonly panelId: string;
  readonly action: string;
  readonly authScope: TaxiRuntimeAuthScope001V;
  readonly writesRuntimeNow: false;
  readonly requiresAuditReason: true;
  readonly requiresMakerCheckerForMoney: true;
  readonly requiresProviderReadiness: true;
  readonly exactOwnerApprovalRequired: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiRuntimeSchemaCandidate001V {
  readonly modelName: string;
  readonly purpose: string;
  readonly migrationExecutedNow: false;
  readonly prismaGenerateExecutedNow: false;
  readonly dbWriteExecutedNow: false;
  readonly ownerApprovalRequiredBeforeMigration: true;
}

export interface TaxiRuntimeProviderContract001V {
  readonly providerArea: 'maps_routes_eta' | 'dispatch_matching' | 'payments_wallet' | 'notifications' | 'fraud_safety';
  readonly requiredCapabilities: readonly string[];
  readonly envReadNow: false;
  readonly providerCallNow: false;
  readonly activationNow: false;
  readonly referenceLabelsOnlyNow: true;
  readonly fakeProviderSuccessBlocked: true;
}

export interface TaxiRuntimeApiSnapshot001V {
  readonly version: TaxiRuntimeApiContractVersion001V;
  readonly status: 'runtime_api_contracts_ready_safe_disabled';
  readonly contracts: readonly TaxiRuntimeApiContract001V[];
  readonly domainSummaries: readonly TaxiRuntimeApiDomainSummary001V[];
  readonly adminActions: readonly TaxiRuntimeAdminActionContract001V[];
  readonly schemaCandidates: readonly TaxiRuntimeSchemaCandidate001V[];
  readonly providerContracts: readonly TaxiRuntimeProviderContract001V[];
  readonly runtimeRoutesMounted: false;
  readonly adminUiRuntimeMounted: false;
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

export interface TaxiRuntimeReadinessInput001V {
  readonly countryCode: string;
  readonly cityId: string;
  readonly tariffCode: TaxiTariffCode;
  readonly adminConfigVersion?: string;
  readonly routeProviderConfigured: boolean;
  readonly dispatchProviderConfigured: boolean;
  readonly paymentProviderConfigured: boolean;
  readonly walletProviderConfigured: boolean;
  readonly dbSchemaMigrated: boolean;
  readonly driverVerificationRuntimeReady: boolean;
}

export interface TaxiRuntimeReadinessDecision001V {
  readonly canMountRuntimeRoutesNow: false;
  readonly canEnableDispatchNow: false;
  readonly canEnablePaymentNow: false;
  readonly canEnableWalletSettlementNow: false;
  readonly canExecuteProviderCallNow: false;
  readonly missingReadiness: readonly TaxiRuntimeReadinessState001V[];
  readonly selectedTariff: TaxiTariffCode;
  readonly safeDisabled: true;
  readonly exactOwnerApprovalRequired: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiQuoteContractPreviewInput001V {
  readonly tariffCode: TaxiTariffCode;
  readonly currency: TaxiMoneyAmount['currency'];
  readonly distanceMeters: number;
  readonly durationSeconds: number;
  readonly adminConfiguredBaseFareMinor?: number;
  readonly adminConfiguredPerKmMinor?: number;
  readonly adminConfiguredPerMinuteMinor?: number;
}

export interface TaxiQuoteContractPreview001V {
  readonly tariffCode: TaxiTariffCode;
  readonly estimatedFare: TaxiMoneyAmount;
  readonly providerQuoteLockedNow: false;
  readonly priceChargedNow: false;
  readonly walletHoldCreatedNow: false;
  readonly dbQuotePersistedNow: false;
  readonly adminConfigRequiredForProduction: true;
  readonly fakeQuoteSuccessBlocked: true;
}
