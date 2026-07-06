import type {
  TaxiRuntimeHandlerDraft001Y,
  TaxiRuntimeRouteAuthScope001Y,
  TaxiRuntimeRouteDomain001Y,
  TaxiRuntimeRouteDraft001Y,
  TaxiRuntimeRouteGate001Y,
  TaxiRuntimeRouteMethod001Y,
  TaxiRuntimeRouteMountPlan001Y,
} from './types';

export const TAXI_RUNTIME_ROUTE_DRAFTS_VERSION_001Y = 'TAXI-BACKEND-FOUNDATION-001Y-MEGA' as const;

const COMMON_ROUTE_GATES_001Y: readonly TaxiRuntimeRouteGate001Y[] = [
  'admin_first_configuration_required',
  'schema_migration_approval_required',
  'runtime_mount_approval_required',
  'idempotency_required',
  'rate_limit_required',
  'fake_success_blocked',
];

const ADMIN_ROUTE_GATES_001Y: readonly TaxiRuntimeRouteGate001Y[] = [
  'admin_token_scope_required',
  'maker_checker_required',
  'audit_reason_required',
  'fake_success_blocked',
];

const PROVIDER_ROUTE_GATES_001Y: readonly TaxiRuntimeRouteGate001Y[] = [
  'provider_reference_labels_required',
  'route_provider_required',
  'dispatch_provider_required',
  'payment_provider_required',
  'wallet_boundary_approval_required',
  'fake_success_blocked',
];

export const TAXI_RUNTIME_ROUTE_DRAFTS_001Y: readonly TaxiRuntimeRouteDraft001Y[] = [
  routeDraft('taxi-rider-request-create-001y', 'rider_request', 'POST', '/api/taxi/rider/requests', 'draftTaxiRiderRequestCreate001Y', 'Create rider request draft with pickup/dropoff, but return safe-disabled until DB/provider/payment gates are approved.', 'TaxiRiderRequestCreateBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:rider:write'], ['rider_auth_required']),
  routeDraft('taxi-rider-request-read-001y', 'rider_request', 'GET', '/api/taxi/rider/requests/:requestId', 'draftTaxiRiderRequestRead001Y', 'Read rider request snapshot draft after schema/runtime approval.', 'TaxiRequestIdParams001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:rider:read'], ['rider_auth_required']),
  routeDraft('taxi-rider-request-cancel-001y', 'rider_request', 'PATCH', '/api/taxi/rider/requests/:requestId/cancel', 'draftTaxiRiderRequestCancel001Y', 'Cancel rider request draft with cancellation evidence and audit link.', 'TaxiRiderCancelBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:rider:write'], ['rider_auth_required', 'audit_reason_required']),
  routeDraft('taxi-rider-active-trip-001y', 'rider_request', 'GET', '/api/taxi/rider/active-trip', 'draftTaxiRiderActiveTrip001Y', 'Read active trip draft for rider without direct provider or DB read now.', 'TaxiRiderActiveTripQuery001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:rider:read'], ['rider_auth_required']),

  routeDraft('taxi-quote-preview-001y', 'quote_route_eta', 'POST', '/api/taxi/quote/preview', 'draftTaxiQuotePreview001Y', 'Preview quote contract requiring Admin tariff and route provider before runtime.', 'TaxiQuotePreviewBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:rider:write'], ['rider_auth_required', 'tariff_region_config_required', 'route_provider_required']),
  routeDraft('taxi-route-eta-preview-001y', 'quote_route_eta', 'POST', '/api/taxi/route/eta-preview', 'draftTaxiRouteEtaPreview001Y', 'Preview route, ETA, traffic and distance provider boundary contract.', 'TaxiRouteEtaPreviewBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:rider:write'], ['route_provider_required', 'provider_reference_labels_required']),
  routeDraft('taxi-quote-lock-001y', 'quote_route_eta', 'PATCH', '/api/taxi/quote/:quoteId/lock', 'draftTaxiQuoteLock001Y', 'Lock quote draft only after provider and payment hold gates.', 'TaxiQuoteLockBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:rider:write'], ['payment_provider_required', 'wallet_boundary_approval_required']),
  routeDraft('taxi-quote-expire-001y', 'quote_route_eta', 'PATCH', '/api/taxi/quote/:quoteId/expire', 'draftTaxiQuoteExpire001Y', 'Expire quote draft with audit trace.', 'TaxiQuoteExpireBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['admin_token_scope_required', 'audit_reason_required']),

  routeDraft('taxi-dispatch-pool-preview-001y', 'dispatch_matching', 'GET', '/api/taxi/dispatch/pool-preview', 'draftTaxiDispatchPoolPreview001Y', 'Preview dispatch pool contract with no matching execution now.', 'TaxiDispatchPoolQuery001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:dispatch:read'], ['dispatch_provider_required', 'driver_kyc_required', 'vehicle_documents_required']),
  routeDraft('taxi-dispatch-offer-create-001y', 'dispatch_matching', 'POST', '/api/taxi/dispatch/offers', 'draftTaxiDispatchOfferCreate001Y', 'Create dispatch offer draft but never notify provider/driver until runtime approval.', 'TaxiDispatchOfferCreateBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:dispatch:write'], ['dispatch_provider_required', 'maker_checker_required']),
  routeDraft('taxi-dispatch-offer-accept-001y', 'dispatch_matching', 'PATCH', '/api/taxi/dispatch/offers/:offerId/accept', 'draftTaxiDispatchOfferAccept001Y', 'Driver accept offer draft requiring online reserve and provider state.', 'TaxiDispatchOfferAcceptBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:driver:write'], ['driver_auth_required', 'driver_kyc_required', 'vehicle_documents_required']),
  routeDraft('taxi-dispatch-offer-reject-001y', 'dispatch_matching', 'PATCH', '/api/taxi/dispatch/offers/:offerId/reject', 'draftTaxiDispatchOfferReject001Y', 'Reject offer draft with anti-abuse audit contract.', 'TaxiDispatchOfferRejectBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:driver:write'], ['driver_auth_required', 'audit_reason_required']),
  routeDraft('taxi-dispatch-rebalance-001y', 'dispatch_matching', 'POST', '/api/taxi/admin/dispatch/rebalance-preview', 'draftTaxiDispatchRebalancePreview001Y', 'Admin dispatch rebalance preview only; no provider dispatch now.', 'TaxiDispatchRebalanceBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['admin_token_scope_required', 'dispatch_provider_required']),

  routeDraft('taxi-driver-application-create-001y', 'driver_verification', 'POST', '/api/taxi/driver/applications', 'draftTaxiDriverApplicationCreate001Y', 'Driver application draft with KYC/KYB/document requirements.', 'TaxiDriverApplicationBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:driver:write'], ['driver_auth_required', 'driver_kyc_required']),
  routeDraft('taxi-driver-application-read-001y', 'driver_verification', 'GET', '/api/taxi/driver/applications/:applicationId', 'draftTaxiDriverApplicationRead001Y', 'Driver application read draft without DB read now.', 'TaxiApplicationIdParams001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:driver:read'], ['driver_auth_required']),
  routeDraft('taxi-admin-driver-review-001y', 'driver_verification', 'PATCH', '/api/taxi/admin/drivers/:driverId/review', 'draftTaxiAdminDriverReview001Y', 'Admin driver approval/rejection draft with maker-checker.', 'TaxiAdminDriverReviewBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['admin_token_scope_required', 'maker_checker_required', 'audit_reason_required']),
  routeDraft('taxi-driver-online-readiness-001y', 'driver_verification', 'GET', '/api/taxi/driver/online-readiness', 'draftTaxiDriverOnlineReadiness001Y', 'Driver online readiness draft: KYC, vehicle, balance, provider locks.', 'TaxiDriverOnlineReadinessQuery001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:driver:read'], ['driver_auth_required', 'driver_kyc_required', 'vehicle_documents_required']),

  routeDraft('taxi-vehicle-create-001y', 'vehicle_park_review', 'POST', '/api/taxi/driver/vehicles', 'draftTaxiVehicleCreate001Y', 'Vehicle profile draft requiring documents and park review.', 'TaxiVehicleCreateBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:driver:write'], ['driver_auth_required', 'vehicle_documents_required']),
  routeDraft('taxi-vehicle-read-001y', 'vehicle_park_review', 'GET', '/api/taxi/driver/vehicles/:vehicleId', 'draftTaxiVehicleRead001Y', 'Vehicle read draft without DB read now.', 'TaxiVehicleIdParams001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:driver:read'], ['driver_auth_required']),
  routeDraft('taxi-admin-vehicle-review-001y', 'vehicle_park_review', 'PATCH', '/api/taxi/admin/vehicles/:vehicleId/review', 'draftTaxiAdminVehicleReview001Y', 'Admin vehicle approval/rejection draft.', 'TaxiAdminVehicleReviewBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['admin_token_scope_required', 'vehicle_documents_required', 'maker_checker_required']),
  routeDraft('taxi-admin-park-review-001y', 'vehicle_park_review', 'PATCH', '/api/taxi/admin/parks/:parkId/review', 'draftTaxiAdminParkReview001Y', 'Driver park approval/rejection draft.', 'TaxiAdminParkReviewBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['admin_token_scope_required', 'maker_checker_required']),

  routeDraft('taxi-trip-create-from-offer-001y', 'trip_lifecycle', 'POST', '/api/taxi/trips/from-offer', 'draftTaxiTripCreateFromOffer001Y', 'Create trip from accepted offer draft; never starts live trip now.', 'TaxiTripCreateFromOfferBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:dispatch:write'], ['dispatch_provider_required', 'payment_provider_required']),
  routeDraft('taxi-trip-pickup-arrived-001y', 'trip_lifecycle', 'PATCH', '/api/taxi/trips/:tripId/pickup-arrived', 'draftTaxiTripPickupArrived001Y', 'Pickup arrived status draft requiring provider trip state.', 'TaxiTripStatusBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:driver:write'], ['driver_auth_required', 'dispatch_provider_required']),
  routeDraft('taxi-trip-start-001y', 'trip_lifecycle', 'PATCH', '/api/taxi/trips/:tripId/start', 'draftTaxiTripStart001Y', 'Start trip draft after pickup verification and payment hold.', 'TaxiTripStartBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:driver:write'], ['driver_auth_required', 'payment_provider_required']),
  routeDraft('taxi-trip-complete-001y', 'trip_lifecycle', 'PATCH', '/api/taxi/trips/:tripId/complete', 'draftTaxiTripComplete001Y', 'Complete trip draft; commission/settlement still blocked.', 'TaxiTripCompleteBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:driver:write'], ['driver_auth_required', 'settlement_review_required']),
  routeDraft('taxi-trip-admin-monitor-001y', 'trip_lifecycle', 'GET', '/api/taxi/admin/trips/monitor', 'draftTaxiTripAdminMonitor001Y', 'Admin trip monitor draft with no runtime read now.', 'TaxiTripMonitorQuery001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:read'], ['admin_token_scope_required']),

  routeDraft('taxi-admin-tariff-upsert-001y', 'admin_tariff_region', 'POST', '/api/taxi/admin/tariffs', 'draftTaxiAdminTariffUpsert001Y', 'Admin tariff matrix upsert draft with maker-checker.', 'TaxiAdminTariffUpsertBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['admin_token_scope_required', 'tariff_region_config_required', 'maker_checker_required']),
  routeDraft('taxi-admin-region-upsert-001y', 'admin_tariff_region', 'POST', '/api/taxi/admin/regions', 'draftTaxiAdminRegionUpsert001Y', 'Admin country/city/zone region draft.', 'TaxiAdminRegionUpsertBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['admin_token_scope_required', 'maker_checker_required']),
  routeDraft('taxi-admin-commission-rule-001y', 'admin_tariff_region', 'POST', '/api/taxi/admin/commission-rules', 'draftTaxiAdminCommissionRule001Y', 'Admin configured commission basis-points rule draft; no fixed foundation percent.', 'TaxiAdminCommissionRuleBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['admin_token_scope_required', 'maker_checker_required']),
  routeDraft('taxi-admin-tariff-readiness-001y', 'admin_tariff_region', 'GET', '/api/taxi/admin/tariff-readiness', 'draftTaxiAdminTariffReadiness001Y', 'Admin tariff readiness draft.', 'TaxiAdminTariffReadinessQuery001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:read'], ['admin_token_scope_required']),

  routeDraft('taxi-payment-hold-preview-001y', 'payment_settlement', 'POST', '/api/taxi/payments/hold-preview', 'draftTaxiPaymentHoldPreview001Y', 'Payment hold preview only; no payment capture now.', 'TaxiPaymentHoldPreviewBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:rider:write'], ['payment_provider_required', 'wallet_boundary_approval_required']),
  routeDraft('taxi-payment-capture-review-001y', 'payment_settlement', 'PATCH', '/api/taxi/admin/payments/:paymentId/capture-review', 'draftTaxiPaymentCaptureReview001Y', 'Admin capture review draft; payment execution blocked.', 'TaxiPaymentCaptureReviewBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['admin_token_scope_required', 'payment_provider_required', 'maker_checker_required']),
  routeDraft('taxi-refund-review-001y', 'payment_settlement', 'PATCH', '/api/taxi/admin/refunds/:refundId/review', 'draftTaxiRefundReview001Y', 'Refund review draft; payout/payment mutation blocked.', 'TaxiRefundReviewBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['admin_token_scope_required', 'settlement_review_required']),
  routeDraft('taxi-driver-settlement-preview-001y', 'payment_settlement', 'POST', '/api/taxi/admin/settlements/driver-preview', 'draftTaxiDriverSettlementPreview001Y', 'Driver settlement preview with Admin commission basis points.', 'TaxiDriverSettlementPreviewBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['wallet_boundary_approval_required', 'settlement_review_required']),
  routeDraft('taxi-driver-settlement-approve-001y', 'payment_settlement', 'PATCH', '/api/taxi/admin/settlements/:settlementId/approve', 'draftTaxiDriverSettlementApprove001Y', 'Settlement approval draft; payout execution blocked.', 'TaxiSettlementApproveBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['maker_checker_required', 'wallet_boundary_approval_required', 'audit_reason_required']),

  routeDraft('taxi-support-case-create-001y', 'support_dispute_safety', 'POST', '/api/taxi/support/cases', 'draftTaxiSupportCaseCreate001Y', 'Support case creation draft with evidence requirements.', 'TaxiSupportCaseCreateBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:support:write'], ['support_safety_policy_required', 'audit_reason_required']),
  routeDraft('taxi-support-case-read-001y', 'support_dispute_safety', 'GET', '/api/taxi/support/cases/:caseId', 'draftTaxiSupportCaseRead001Y', 'Support case read draft.', 'TaxiSupportCaseParams001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:support:read'], ['support_safety_policy_required']),
  routeDraft('taxi-dispute-open-001y', 'support_dispute_safety', 'POST', '/api/taxi/disputes', 'draftTaxiDisputeOpen001Y', 'Dispute opening draft with trip evidence.', 'TaxiDisputeOpenBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:support:write'], ['support_safety_policy_required', 'audit_reason_required']),
  routeDraft('taxi-dispute-review-001y', 'support_dispute_safety', 'PATCH', '/api/taxi/admin/disputes/:disputeId/review', 'draftTaxiDisputeReview001Y', 'Admin dispute review draft with maker-checker.', 'TaxiDisputeReviewBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['admin_token_scope_required', 'maker_checker_required', 'settlement_review_required']),
  routeDraft('taxi-sos-event-create-001y', 'support_dispute_safety', 'POST', '/api/taxi/safety/sos-events', 'draftTaxiSosEventCreate001Y', 'SOS safety event draft, provider/emergency runtime not enabled now.', 'TaxiSosEventCreateBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:rider:write', 'taxi:driver:write'], ['support_safety_policy_required', 'provider_reference_labels_required']),

  routeDraft('taxi-provider-readiness-snapshot-001y', 'provider_readiness', 'GET', '/api/taxi/admin/provider-readiness', 'draftTaxiProviderReadinessSnapshot001Y', 'Admin provider readiness snapshot draft without env read.', 'TaxiProviderReadinessQuery001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:provider-readiness:read'], ['admin_token_scope_required', 'provider_reference_labels_required']),
  routeDraft('taxi-provider-labels-validate-001y', 'provider_readiness', 'POST', '/api/taxi/admin/provider-labels/validate', 'draftTaxiProviderLabelsValidate001Y', 'Validate non-secret provider reference labels only; no raw secrets.', 'TaxiProviderLabelsValidateBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['admin_token_scope_required', 'provider_reference_labels_required', 'audit_reason_required']),
  routeDraft('taxi-provider-capabilities-preview-001y', 'provider_readiness', 'GET', '/api/taxi/admin/provider-capabilities-preview', 'draftTaxiProviderCapabilitiesPreview001Y', 'Provider capabilities preview without provider calls.', 'TaxiProviderCapabilitiesQuery001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:provider-readiness:read'], ['provider_reference_labels_required']),

  routeDraft('taxi-audit-readiness-export-001y', 'audit_compliance', 'GET', '/api/taxi/admin/audit/readiness-export', 'draftTaxiAuditReadinessExport001Y', 'Audit readiness export draft without DB/export runtime.', 'TaxiAuditReadinessQuery001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:audit:read'], ['admin_token_scope_required', 'audit_reason_required']),
  routeDraft('taxi-audit-action-log-preview-001y', 'audit_compliance', 'GET', '/api/taxi/admin/audit/action-log-preview', 'draftTaxiAuditActionLogPreview001Y', 'Action log preview draft.', 'TaxiAuditActionLogQuery001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:audit:read'], ['admin_token_scope_required']),
  routeDraft('taxi-compliance-report-preview-001y', 'audit_compliance', 'POST', '/api/taxi/admin/compliance/report-preview', 'draftTaxiComplianceReportPreview001Y', 'Compliance report preview draft.', 'TaxiComplianceReportPreviewBody001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:write'], ['admin_token_scope_required', 'audit_reason_required']),

  routeDraft('taxi-realtime-trip-shadow-001y', 'realtime_shadow', 'GET', '/api/taxi/realtime/trip-shadow/:tripId', 'draftTaxiRealtimeTripShadow001Y', 'Realtime trip shadow draft; no websocket/provider runtime now.', 'TaxiRealtimeTripShadowParams001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:dispatch:read'], ['dispatch_provider_required', 'runtime_mount_approval_required']),
  routeDraft('taxi-realtime-driver-presence-shadow-001y', 'realtime_shadow', 'GET', '/api/taxi/realtime/driver-presence-shadow/:driverId', 'draftTaxiRealtimeDriverPresenceShadow001Y', 'Driver presence shadow draft without live socket runtime.', 'TaxiRealtimeDriverPresenceParams001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:dispatch:read'], ['driver_auth_required', 'dispatch_provider_required']),
  routeDraft('taxi-realtime-admin-ops-shadow-001y', 'realtime_shadow', 'GET', '/api/taxi/admin/realtime/ops-shadow', 'draftTaxiRealtimeAdminOpsShadow001Y', 'Admin ops realtime shadow draft with no gateway binding.', 'TaxiRealtimeAdminOpsQuery001Y', 'TaxiSafeDisabledRouteResponse001Y', ['taxi:admin:read'], ['admin_token_scope_required', 'runtime_mount_approval_required']),
];

export const TAXI_RUNTIME_HANDLER_DRAFTS_001Y: readonly TaxiRuntimeHandlerDraft001Y[] = [
  handlerDraft('handler-rider-request-001y', 'draftTaxiRiderRequestCreate001Y', 'rider_request', true, false),
  handlerDraft('handler-rider-read-001y', 'draftTaxiRiderRequestRead001Y', 'rider_request', false, false),
  handlerDraft('handler-quote-preview-001y', 'draftTaxiQuotePreview001Y', 'quote_route_eta', true, false),
  handlerDraft('handler-route-eta-001y', 'draftTaxiRouteEtaPreview001Y', 'quote_route_eta', true, false),
  handlerDraft('handler-dispatch-pool-001y', 'draftTaxiDispatchPoolPreview001Y', 'dispatch_matching', false, false),
  handlerDraft('handler-dispatch-offer-001y', 'draftTaxiDispatchOfferCreate001Y', 'dispatch_matching', true, true),
  handlerDraft('handler-driver-application-001y', 'draftTaxiDriverApplicationCreate001Y', 'driver_verification', true, true),
  handlerDraft('handler-driver-review-001y', 'draftTaxiAdminDriverReview001Y', 'driver_verification', true, true),
  handlerDraft('handler-vehicle-create-001y', 'draftTaxiVehicleCreate001Y', 'vehicle_park_review', true, false),
  handlerDraft('handler-vehicle-review-001y', 'draftTaxiAdminVehicleReview001Y', 'vehicle_park_review', true, true),
  handlerDraft('handler-trip-create-001y', 'draftTaxiTripCreateFromOffer001Y', 'trip_lifecycle', true, true),
  handlerDraft('handler-trip-complete-001y', 'draftTaxiTripComplete001Y', 'trip_lifecycle', true, true),
  handlerDraft('handler-tariff-upsert-001y', 'draftTaxiAdminTariffUpsert001Y', 'admin_tariff_region', true, true),
  handlerDraft('handler-region-upsert-001y', 'draftTaxiAdminRegionUpsert001Y', 'admin_tariff_region', true, true),
  handlerDraft('handler-payment-hold-001y', 'draftTaxiPaymentHoldPreview001Y', 'payment_settlement', true, false),
  handlerDraft('handler-settlement-preview-001y', 'draftTaxiDriverSettlementPreview001Y', 'payment_settlement', true, true),
  handlerDraft('handler-support-case-001y', 'draftTaxiSupportCaseCreate001Y', 'support_dispute_safety', true, true),
  handlerDraft('handler-dispute-review-001y', 'draftTaxiDisputeReview001Y', 'support_dispute_safety', true, true),
  handlerDraft('handler-provider-readiness-001y', 'draftTaxiProviderReadinessSnapshot001Y', 'provider_readiness', false, true),
  handlerDraft('handler-provider-labels-001y', 'draftTaxiProviderLabelsValidate001Y', 'provider_readiness', true, true),
  handlerDraft('handler-audit-export-001y', 'draftTaxiAuditReadinessExport001Y', 'audit_compliance', false, true),
  handlerDraft('handler-compliance-report-001y', 'draftTaxiComplianceReportPreview001Y', 'audit_compliance', true, true),
  handlerDraft('handler-realtime-trip-shadow-001y', 'draftTaxiRealtimeTripShadow001Y', 'realtime_shadow', false, false),
  handlerDraft('handler-realtime-ops-shadow-001y', 'draftTaxiRealtimeAdminOpsShadow001Y', 'realtime_shadow', false, true),
];

export const TAXI_RUNTIME_ROUTE_MOUNT_PLAN_001Y: readonly TaxiRuntimeRouteMountPlan001Y[] = [
  mountPlan('route-draft-freeze-001y', 'draft_only', 'Keep all route descriptors source-only until schema/app mount approval.', ['taxi-rider-request-create-001y', 'taxi-quote-preview-001y', 'taxi-dispatch-offer-create-001y'], ['runtime_mount_approval_required']),
  mountPlan('schema-compile-readiness-001y', 'compile_only', 'Compile route draft handlers after TypeScript passes and before app mount.', ['taxi-driver-application-create-001y', 'taxi-vehicle-create-001y', 'taxi-admin-tariff-upsert-001y'], ['schema_migration_approval_required']),
  mountPlan('admin-route-mount-approval-001y', 'mount_after_approval', 'Mount Admin routes only after owner approval and maker-checker gates.', ['taxi-admin-driver-review-001y', 'taxi-admin-vehicle-review-001y', 'taxi-payment-capture-review-001y', 'taxi-dispute-review-001y'], ['admin_token_scope_required', 'maker_checker_required', 'audit_reason_required']),
  mountPlan('rider-driver-route-mount-approval-001y', 'mount_after_approval', 'Mount rider/driver routes only after auth, rate limit and idempotency gates.', ['taxi-rider-request-create-001y', 'taxi-dispatch-offer-accept-001y', 'taxi-trip-start-001y', 'taxi-trip-complete-001y'], ['rider_auth_required', 'driver_auth_required', 'idempotency_required', 'rate_limit_required']),
  mountPlan('provider-runtime-smoke-approval-001y', 'runtime_smoke_after_mount', 'Smoke only provider_not_configured/safe_disabled responses before any provider call.', ['taxi-route-eta-preview-001y', 'taxi-dispatch-pool-preview-001y', 'taxi-provider-readiness-snapshot-001y'], ['provider_reference_labels_required', 'route_provider_required', 'dispatch_provider_required']),
  mountPlan('money-runtime-smoke-approval-001y', 'runtime_smoke_after_mount', 'Smoke payment/settlement endpoints only as provider_not_configured and safe-disabled.', ['taxi-payment-hold-preview-001y', 'taxi-refund-review-001y', 'taxi-driver-settlement-approve-001y'], ['payment_provider_required', 'wallet_boundary_approval_required', 'settlement_review_required']),
];

function routeDraft(
  id: string,
  domain: TaxiRuntimeRouteDomain001Y,
  method: TaxiRuntimeRouteMethod001Y,
  path: string,
  handlerName: string,
  purpose: string,
  requestContract: string,
  responseContract: string,
  authScopes: readonly TaxiRuntimeRouteAuthScope001Y[],
  gates: readonly TaxiRuntimeRouteGate001Y[],
): TaxiRuntimeRouteDraft001Y {
  return {
    id,
    domain,
    method,
    path,
    handlerName,
    purpose,
    requestContract,
    responseContract,
    authScopes,
    gates: [...COMMON_ROUTE_GATES_001Y, ...ADMIN_ROUTE_GATES_001Y.filter((gate) => authScopes.some((scope) => scope.startsWith('taxi:admin'))), ...PROVIDER_ROUTE_GATES_001Y.filter((gate) => purpose.toLowerCase().includes('provider') || purpose.toLowerCase().includes('payment') || purpose.toLowerCase().includes('dispatch')), ...gates],
    mountedNow: false,
    runtimeEnabledNow: false,
    routeRuntimeMountedNow: false,
    handlerExecutesNow: false,
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
    exactOwnerApprovalRequired: true,
  };
}

function handlerDraft(id: string, handlerName: string, domain: TaxiRuntimeRouteDomain001Y, requiresIdempotency: boolean, requiresAuditReason: boolean): TaxiRuntimeHandlerDraft001Y {
  return {
    id,
    handlerName,
    domain,
    validatesInput: true,
    requiresIdempotency,
    requiresAuditReason,
    returnsProviderNotConfigured: true,
    returnsSafeDisabled: true,
    readsEnvNow: false,
    readsDbNow: false,
    writesDbNow: false,
    mutatesWalletNow: false,
    capturesPaymentNow: false,
    executesPayoutNow: false,
    dispatchesProviderNow: false,
    fakeSuccessBlocked: true,
  };
}

function mountPlan(
  id: string,
  phase: TaxiRuntimeRouteMountPlan001Y['phase'],
  title: string,
  routeIds: readonly string[],
  requiredGates: readonly TaxiRuntimeRouteGate001Y[],
): TaxiRuntimeRouteMountPlan001Y {
  return {
    id,
    phase,
    title,
    routeIds,
    requiredGates,
    canRunNow: false,
    sourceWriteAllowedNow: false,
    appMountAllowedNow: false,
    dbAllowedNow: false,
    providerAllowedNow: false,
    walletAllowedNow: false,
    exactOwnerApprovalRequired: true,
    fakeSuccessBlocked: true,
  };
}
