import type {
  TaxiRuntimeAdminActionContract001V,
  TaxiRuntimeApiContract001V,
  TaxiRuntimeApiContractVersion001V,
  TaxiRuntimeProviderContract001V,
  TaxiRuntimeSchemaCandidate001V,
} from './types';

export const TAXI_RUNTIME_API_CONTRACT_VERSION_001V: TaxiRuntimeApiContractVersion001V = 'TAXI-BACKEND-FOUNDATION-001V-MEGA';

function contract(input: Omit<TaxiRuntimeApiContract001V, 'adminFirst' | 'mountedNow' | 'runtimeEnabledNow' | 'dbReadEnabledNow' | 'dbWriteEnabledNow' | 'providerDispatchEnabledNow' | 'walletMutationEnabledNow' | 'paymentEnabledNow' | 'payoutEnabledNow' | 'fakeSuccessBlocked' | 'exactOwnerApprovalRequired'>): TaxiRuntimeApiContract001V {
  return {
    ...input,
    adminFirst: true,
    mountedNow: false,
    runtimeEnabledNow: false,
    dbReadEnabledNow: false,
    dbWriteEnabledNow: false,
    providerDispatchEnabledNow: false,
    walletMutationEnabledNow: false,
    paymentEnabledNow: false,
    payoutEnabledNow: false,
    fakeSuccessBlocked: true,
    exactOwnerApprovalRequired: true,
  };
}

export const TAXI_RUNTIME_API_CONTRACTS_001V: readonly TaxiRuntimeApiContract001V[] = [
  contract({ id: 'rider-request-create', domain: 'rider_request', method: 'POST', path: '/api/taxi/rider/requests', authScopes: ['taxi:rider'], readiness: 'db_schema_required', payloadRequirements: ['authenticated_identity', 'idempotency_key', 'geo_point', 'route_points', 'tariff_code', 'country_region_city'], notes: 'Creates a rider trip request only after DB schema, quote lock and provider readiness exist.' }),
  contract({ id: 'rider-request-cancel', domain: 'rider_request', method: 'POST', path: '/api/taxi/rider/requests/:requestId/cancel', authScopes: ['taxi:rider'], readiness: 'db_schema_required', payloadRequirements: ['authenticated_identity', 'idempotency_key', 'audit_reason_code'], notes: 'Cancellation must be persisted and scored; no UI-only cancellation success.' }),
  contract({ id: 'rider-request-status', domain: 'rider_request', method: 'GET', path: '/api/taxi/rider/requests/:requestId', authScopes: ['taxi:rider'], readiness: 'db_schema_required', payloadRequirements: ['authenticated_identity'], notes: 'Status read contract for request, quote, matching and safety states.' }),
  contract({ id: 'quote-preview', domain: 'quote_route_eta', method: 'POST', path: '/api/taxi/quotes/preview', authScopes: ['taxi:rider'], readiness: 'admin_config_required', payloadRequirements: ['authenticated_identity', 'geo_point', 'route_points', 'tariff_code', 'country_region_city', 'admin_config_version'], notes: 'Preview is config-bound and not chargeable until provider quote lock exists.' }),
  contract({ id: 'quote-lock', domain: 'quote_route_eta', method: 'POST', path: '/api/taxi/quotes/:quoteId/lock', authScopes: ['taxi:rider'], readiness: 'provider_config_required', payloadRequirements: ['authenticated_identity', 'idempotency_key', 'provider_readiness_snapshot'], notes: 'Provider route/ETA lock required before dispatch can start.' }),
  contract({ id: 'route-eta-refresh', domain: 'quote_route_eta', method: 'POST', path: '/api/taxi/routes/:routeId/eta-refresh', authScopes: ['taxi:rider', 'taxi:driver'], readiness: 'provider_config_required', payloadRequirements: ['authenticated_identity', 'geo_point', 'provider_readiness_snapshot'], notes: 'ETA must be provider backed; fake location/traffic success blocked.' }),
  contract({ id: 'driver-online-intent', domain: 'driver_dispatch', method: 'POST', path: '/api/taxi/driver/online-intent', authScopes: ['taxi:driver'], readiness: 'wallet_provider_required', payloadRequirements: ['authenticated_identity', 'idempotency_key', 'driver_verification_status', 'vehicle_review_status', 'wallet_payment_provider_status'], notes: 'Driver enters online pool only after verification, balance reserve and Admin approval.' }),
  contract({ id: 'dispatch-offer-create', domain: 'driver_dispatch', method: 'POST', path: '/api/taxi/dispatch/offers', authScopes: ['taxi:provider:readiness'], readiness: 'provider_config_required', payloadRequirements: ['provider_readiness_snapshot', 'driver_verification_status', 'vehicle_review_status'], notes: 'Offer creation is backend/provider-only; UI cannot assign drivers.' }),
  contract({ id: 'dispatch-offer-accept', domain: 'driver_dispatch', method: 'POST', path: '/api/taxi/driver/offers/:offerId/accept', authScopes: ['taxi:driver'], readiness: 'db_schema_required', payloadRequirements: ['authenticated_identity', 'idempotency_key', 'provider_readiness_snapshot'], notes: 'Accept requires active offer, driver reserve and conflict checks.' }),
  contract({ id: 'dispatch-offer-reject', domain: 'driver_dispatch', method: 'POST', path: '/api/taxi/driver/offers/:offerId/reject', authScopes: ['taxi:driver'], readiness: 'db_schema_required', payloadRequirements: ['authenticated_identity', 'audit_reason_code'], notes: 'Reject/no-show effects must be persisted for fairness and support.' }),
  contract({ id: 'driver-application-submit', domain: 'driver_verification', method: 'POST', path: '/api/taxi/driver/applications', authScopes: ['taxi:driver'], readiness: 'db_schema_required', payloadRequirements: ['authenticated_identity', 'idempotency_key', 'driver_verification_status', 'vehicle_review_status'], notes: 'Driver onboarding application contract; no auto approval.' }),
  contract({ id: 'driver-application-admin-approve', domain: 'driver_verification', method: 'POST', path: '/api/admin/taxi/driver-applications/:applicationId/approve', authScopes: ['taxi:admin:write'], readiness: 'exact_owner_approval_required', payloadRequirements: ['authenticated_identity', 'audit_reason_code', 'support_evidence_bundle'], notes: 'Admin maker-checker approval required before driver can receive offers.' }),
  contract({ id: 'vehicle-park-admin-review', domain: 'driver_verification', method: 'POST', path: '/api/admin/taxi/vehicles/:vehicleId/review', authScopes: ['taxi:admin:write'], readiness: 'exact_owner_approval_required', payloadRequirements: ['authenticated_identity', 'audit_reason_code', 'vehicle_review_status'], notes: 'Vehicle and park documents must be reviewed, audited and reversible.' }),
  contract({ id: 'trip-pickup-arrived', domain: 'trip_lifecycle', method: 'POST', path: '/api/taxi/trips/:tripId/pickup-arrived', authScopes: ['taxi:driver'], readiness: 'provider_config_required', payloadRequirements: ['authenticated_identity', 'idempotency_key', 'geo_point'], notes: 'Pickup arrival requires route/provider validation and active accepted trip.' }),
  contract({ id: 'trip-start', domain: 'trip_lifecycle', method: 'POST', path: '/api/taxi/trips/:tripId/start', authScopes: ['taxi:driver'], readiness: 'db_schema_required', payloadRequirements: ['authenticated_identity', 'idempotency_key', 'geo_point', 'provider_readiness_snapshot'], notes: 'Trip start must transition from accepted/pickup only; no UI-only start.' }),
  contract({ id: 'trip-complete', domain: 'trip_lifecycle', method: 'POST', path: '/api/taxi/trips/:tripId/complete', authScopes: ['taxi:driver'], readiness: 'wallet_provider_required', payloadRequirements: ['authenticated_identity', 'idempotency_key', 'geo_point', 'wallet_payment_provider_status'], notes: 'Completion triggers fare finalization, commission and settlement locks only after backend evidence.' }),
  contract({ id: 'trip-admin-monitor', domain: 'trip_lifecycle', method: 'GET', path: '/api/admin/taxi/trips/:tripId/monitor', authScopes: ['taxi:admin:read'], readiness: 'db_schema_required', payloadRequirements: ['authenticated_identity'], notes: 'Admin trip monitor contract for live operational visibility.' }),
  contract({ id: 'tariff-region-upsert', domain: 'tariff_region_admin', method: 'POST', path: '/api/admin/taxi/tariffs/regions', authScopes: ['taxi:admin:write'], readiness: 'exact_owner_approval_required', payloadRequirements: ['authenticated_identity', 'idempotency_key', 'country_region_city', 'admin_config_version', 'audit_reason_code'], notes: 'Tariff/commission is Admin-configured; foundation must not hardcode production fares.' }),
  contract({ id: 'commission-config-upsert', domain: 'tariff_region_admin', method: 'POST', path: '/api/admin/taxi/commission/config', authScopes: ['taxi:admin:write'], readiness: 'exact_owner_approval_required', payloadRequirements: ['authenticated_identity', 'admin_config_version', 'audit_reason_code'], notes: 'Commission basis points are Admin config; no fixed percent in runtime contract.' }),
  contract({ id: 'payment-hold-create', domain: 'payment_wallet_settlement', method: 'POST', path: '/api/taxi/payments/holds', authScopes: ['taxi:rider'], readiness: 'wallet_provider_required', payloadRequirements: ['authenticated_identity', 'idempotency_key', 'wallet_payment_provider_status'], notes: 'Payment hold requires real Wallet/payment provider and cannot be faked.' }),
  contract({ id: 'driver-settlement-release', domain: 'payment_wallet_settlement', method: 'POST', path: '/api/admin/taxi/driver-settlements/:settlementId/release', authScopes: ['taxi:admin:write'], readiness: 'exact_owner_approval_required', payloadRequirements: ['authenticated_identity', 'audit_reason_code', 'wallet_payment_provider_status'], notes: 'Driver settlement release is locked behind Admin, evidence and provider readiness.' }),
  contract({ id: 'refund-review-decision', domain: 'payment_wallet_settlement', method: 'POST', path: '/api/admin/taxi/refunds/:refundId/decision', authScopes: ['taxi:admin:write'], readiness: 'exact_owner_approval_required', payloadRequirements: ['authenticated_identity', 'audit_reason_code', 'support_evidence_bundle'], notes: 'Refund decision requires support evidence, audit and provider readiness.' }),
  contract({ id: 'support-case-create', domain: 'support_dispute_safety', method: 'POST', path: '/api/taxi/support/cases', authScopes: ['taxi:rider', 'taxi:driver'], readiness: 'db_schema_required', payloadRequirements: ['authenticated_identity', 'idempotency_key', 'support_evidence_bundle'], notes: 'Support case creation contract for no-show, safety, refund, route and behavior issues.' }),
  contract({ id: 'support-case-admin-decision', domain: 'support_dispute_safety', method: 'POST', path: '/api/admin/taxi/support/cases/:caseId/decision', authScopes: ['taxi:support:write'], readiness: 'exact_owner_approval_required', payloadRequirements: ['authenticated_identity', 'audit_reason_code', 'support_evidence_bundle'], notes: 'Support/admin decision may affect points, refunds, blocks or settlement holds.' }),
  contract({ id: 'safety-sos-event', domain: 'support_dispute_safety', method: 'POST', path: '/api/taxi/safety/sos', authScopes: ['taxi:rider', 'taxi:driver'], readiness: 'provider_config_required', payloadRequirements: ['authenticated_identity', 'idempotency_key', 'geo_point', 'support_evidence_bundle'], notes: 'SOS is a real safety event contract and must not be simulated as success.' }),
  contract({ id: 'audit-log-query', domain: 'audit_compliance', method: 'GET', path: '/api/admin/taxi/audit-log', authScopes: ['taxi:admin:read'], readiness: 'db_schema_required', payloadRequirements: ['authenticated_identity'], notes: 'Admin audit log query for driver, rider, trip, tariff, payment and support actions.' }),
  contract({ id: 'provider-readiness-snapshot', domain: 'provider_readiness', method: 'GET', path: '/api/admin/taxi/provider-readiness', authScopes: ['taxi:admin:read', 'taxi:provider:readiness'], readiness: 'provider_config_required', payloadRequirements: ['authenticated_identity', 'provider_readiness_snapshot'], notes: 'Shows readiness labels only; no provider secrets or env values are read.' }),
];

function adminAction(input: Omit<TaxiRuntimeAdminActionContract001V, 'writesRuntimeNow' | 'requiresAuditReason' | 'requiresMakerCheckerForMoney' | 'requiresProviderReadiness' | 'exactOwnerApprovalRequired' | 'fakeSuccessBlocked'>): TaxiRuntimeAdminActionContract001V {
  return {
    ...input,
    writesRuntimeNow: false,
    requiresAuditReason: true,
    requiresMakerCheckerForMoney: true,
    requiresProviderReadiness: true,
    exactOwnerApprovalRequired: true,
    fakeSuccessBlocked: true,
  };
}

export const TAXI_RUNTIME_ADMIN_ACTIONS_001V: readonly TaxiRuntimeAdminActionContract001V[] = [
  adminAction({ id: 'admin-driver-approve', panelId: 'taxi-driver-verification', action: 'Approve driver application after document and risk review.', authScope: 'taxi:admin:write' }),
  adminAction({ id: 'admin-vehicle-approve', panelId: 'taxi-vehicle-park-review', action: 'Approve vehicle/park binding after evidence review.', authScope: 'taxi:admin:write' }),
  adminAction({ id: 'admin-tariff-publish', panelId: 'taxi-tariff-region', action: 'Publish region/tariff/commission config version.', authScope: 'taxi:admin:write' }),
  adminAction({ id: 'admin-provider-lock-review', panelId: 'taxi-provider-readiness', action: 'Review provider labels and keep runtime disabled until exact approval.', authScope: 'taxi:admin:write' }),
  adminAction({ id: 'admin-support-decision', panelId: 'taxi-support-dispute', action: 'Decide dispute/refund/safety case with audit reason.', authScope: 'taxi:support:write' }),
  adminAction({ id: 'admin-settlement-release', panelId: 'taxi-driver-settlement', action: 'Release driver settlement only after provider and evidence checks.', authScope: 'taxi:admin:write' }),
  adminAction({ id: 'admin-safety-block', panelId: 'taxi-safety-risk', action: 'Block or restore participant only with evidence and audit.', authScope: 'taxi:admin:write' }),
  adminAction({ id: 'admin-audit-export', panelId: 'taxi-audit-compliance', action: 'Export audit evidence without secrets or payment credentials.', authScope: 'taxi:admin:read' }),
];

export const TAXI_RUNTIME_SCHEMA_CANDIDATES_001V: readonly TaxiRuntimeSchemaCandidate001V[] = [
  { modelName: 'TaxiRiderRequest', purpose: 'Rider request, quote linkage, current matching state.', migrationExecutedNow: false, prismaGenerateExecutedNow: false, dbWriteExecutedNow: false, ownerApprovalRequiredBeforeMigration: true },
  { modelName: 'TaxiQuoteLock', purpose: 'Admin tariff version, provider route/ETA lock and expiry.', migrationExecutedNow: false, prismaGenerateExecutedNow: false, dbWriteExecutedNow: false, ownerApprovalRequiredBeforeMigration: true },
  { modelName: 'TaxiDriverApplication', purpose: 'Driver verification, KYC/KYB, license and Admin decision.', migrationExecutedNow: false, prismaGenerateExecutedNow: false, dbWriteExecutedNow: false, ownerApprovalRequiredBeforeMigration: true },
  { modelName: 'TaxiVehicleReview', purpose: 'Vehicle document, park binding and inspection evidence.', migrationExecutedNow: false, prismaGenerateExecutedNow: false, dbWriteExecutedNow: false, ownerApprovalRequiredBeforeMigration: true },
  { modelName: 'TaxiDispatchOffer', purpose: 'Backend/provider offer lifecycle and driver responses.', migrationExecutedNow: false, prismaGenerateExecutedNow: false, dbWriteExecutedNow: false, ownerApprovalRequiredBeforeMigration: true },
  { modelName: 'TaxiTrip', purpose: 'Accepted pickup, active trip, completion and cancellation state machine.', migrationExecutedNow: false, prismaGenerateExecutedNow: false, dbWriteExecutedNow: false, ownerApprovalRequiredBeforeMigration: true },
  { modelName: 'TaxiTariffRegionConfig', purpose: 'Country/city/tariff/commission Admin-published version.', migrationExecutedNow: false, prismaGenerateExecutedNow: false, dbWriteExecutedNow: false, ownerApprovalRequiredBeforeMigration: true },
  { modelName: 'TaxiPaymentHold', purpose: 'Wallet/payment provider hold, capture, refund and receipt refs.', migrationExecutedNow: false, prismaGenerateExecutedNow: false, dbWriteExecutedNow: false, ownerApprovalRequiredBeforeMigration: true },
  { modelName: 'TaxiDriverSettlement', purpose: 'Driver net, commission, payout lock and settlement release.', migrationExecutedNow: false, prismaGenerateExecutedNow: false, dbWriteExecutedNow: false, ownerApprovalRequiredBeforeMigration: true },
  { modelName: 'TaxiSupportCase', purpose: 'Support/dispute/safety/refund evidence and decisions.', migrationExecutedNow: false, prismaGenerateExecutedNow: false, dbWriteExecutedNow: false, ownerApprovalRequiredBeforeMigration: true },
  { modelName: 'TaxiAuditEvent', purpose: 'Immutable Admin/runtime evidence for compliance and appeals.', migrationExecutedNow: false, prismaGenerateExecutedNow: false, dbWriteExecutedNow: false, ownerApprovalRequiredBeforeMigration: true },
  { modelName: 'TaxiProviderReadinessSnapshot', purpose: 'Provider capability labels without secret values.', migrationExecutedNow: false, prismaGenerateExecutedNow: false, dbWriteExecutedNow: false, ownerApprovalRequiredBeforeMigration: true },
];

export const TAXI_RUNTIME_PROVIDER_CONTRACTS_001V: readonly TaxiRuntimeProviderContract001V[] = [
  { providerArea: 'maps_routes_eta', requiredCapabilities: ['geocoding', 'route_polyline', 'traffic_eta', 'distance_matrix', 'pickup_snap_to_road'], envReadNow: false, providerCallNow: false, activationNow: false, referenceLabelsOnlyNow: true, fakeProviderSuccessBlocked: true },
  { providerArea: 'dispatch_matching', requiredCapabilities: ['driver_pool', 'offer_timeout', 'nearest_driver_matching', 'surge_readiness', 'retry_queue'], envReadNow: false, providerCallNow: false, activationNow: false, referenceLabelsOnlyNow: true, fakeProviderSuccessBlocked: true },
  { providerArea: 'payments_wallet', requiredCapabilities: ['fare_hold', 'capture', 'refund', 'driver_settlement', 'commission_ledger'], envReadNow: false, providerCallNow: false, activationNow: false, referenceLabelsOnlyNow: true, fakeProviderSuccessBlocked: true },
  { providerArea: 'notifications', requiredCapabilities: ['driver_offer_push', 'rider_status_push', 'safety_alert', 'support_case_update'], envReadNow: false, providerCallNow: false, activationNow: false, referenceLabelsOnlyNow: true, fakeProviderSuccessBlocked: true },
  { providerArea: 'fraud_safety', requiredCapabilities: ['device_risk', 'fake_gps_detection', 'duplicate_account_signal', 'incident_escalation'], envReadNow: false, providerCallNow: false, activationNow: false, referenceLabelsOnlyNow: true, fakeProviderSuccessBlocked: true },
];
