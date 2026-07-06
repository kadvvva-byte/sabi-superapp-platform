import type {
  TaxiAdminControlPanel001U,
  TaxiDispatchMatrixRule001U,
  TaxiMegaGate001U,
  TaxiSupportDisputeRule001U,
  TaxiTariffRegionCell001U,
  TaxiVerificationProfile001U,
} from './types';

export const TAXI_MEGA_FOUNDATION_VERSION_001U = 'TAXI-BACKEND-FOUNDATION-001U' as const;

export const TAXI_MEGA_GATES_001U: readonly TaxiMegaGate001U[] = [
  gate('admin_first_control', 'Admin must configure country, city/region, tariff, commission, verification, provider and safety rules before Taxi runtime.'),
  gate('rider_verification', 'Rider request runtime requires phone/profile/age-region/risk checks, not mobile UI success.'),
  gate('driver_verification', 'Driver runtime requires license, document, liveness, risk and Admin approval evidence.'),
  gate('vehicle_and_park_review', 'Vehicle, fleet/park contract and park moderation are Admin/backend evidence gates.'),
  gate('tariff_region_matrix', 'Every region/tariff/commission/cash/surge rule must be Admin-configured before runtime quotes.'),
  gate('quote_route_eta_control', 'Route, distance, ETA, traffic, camera/radar signals require real provider configuration.'),
  gate('dispatch_matching_control', 'Driver matching and dispatch offers remain locked until provider and backend matching runtime are approved.'),
  gate('trip_lifecycle_control', 'Trip state changes require backend evidence from request through completion and settlement.'),
  gate('safety_support_dispute', 'Complaints, unsafe behavior, no-show, lost item, refund and dispute cases require Admin evidence flow.'),
  gate('wallet_payment_settlement_lock', 'Wallet/payment/cash reconciliation/driver settlement stay safe-disabled until exact approval.'),
  gate('provider_runtime_lock', 'Provider calls, route calls, dispatch calls and payment calls are locked behind exact owner approval.'),
  gate('audit_compliance_readiness', 'All heavy Admin actions require audit trail, reason, actor, country, policy and evidence reference.'),
];

export const TAXI_VERIFICATION_PROFILES_001U: readonly TaxiVerificationProfile001U[] = [
  {
    role: 'rider',
    required: [
      'phone_verified',
      'profile_complete',
      'age_region_allowed',
      'risk_score_reviewed',
      'sanctions_or_fraud_screen_clear',
      'local_regulation_policy_configured',
    ],
    adminApprovalRequired: true,
    automatedDecisionMayRejectUser: false,
    runtimeActivationNow: false,
    fakeApprovalBlocked: true,
  },
  {
    role: 'driver',
    required: [
      'phone_verified',
      'profile_complete',
      'age_region_allowed',
      'document_uploaded',
      'document_admin_approved',
      'selfie_liveness_required',
      'vehicle_document_approved',
      'driver_license_approved',
      'park_contract_approved',
      'risk_score_reviewed',
      'sanctions_or_fraud_screen_clear',
      'local_regulation_policy_configured',
    ],
    adminApprovalRequired: true,
    automatedDecisionMayRejectUser: false,
    runtimeActivationNow: false,
    fakeApprovalBlocked: true,
  },
];

export const TAXI_TARIFF_REGION_MATRIX_001U: readonly TaxiTariffRegionCell001U[] = [
  ...countryCells('UZ'),
  ...countryCells('KZ'),
  ...countryCells('KG'),
  ...countryCells('TJ'),
  ...countryCells('TM'),
  ...countryCells('RU'),
  ...countryCells('AE'),
  ...countryCells('TR'),
  ...countryCells('OTHER'),
];

export const TAXI_DISPATCH_MATRIX_001U: readonly TaxiDispatchMatrixRule001U[] = [
  dispatch('admin_tariff_configured', false),
  dispatch('admin_commission_configured', false),
  dispatch('region_enabled', false),
  dispatch('route_provider_configured', true),
  dispatch('dispatch_provider_configured', true),
  dispatch('driver_online_allowed', true),
  dispatch('driver_balance_reserve_ok', false),
  dispatch('driver_documents_approved', false),
  dispatch('vehicle_approved', false),
  dispatch('rider_payment_or_cash_policy_ready', true),
  dispatch('fraud_and_safety_clear', false),
];

export const TAXI_SUPPORT_DISPUTE_RULES_001U: readonly TaxiSupportDisputeRule001U[] = [
  support('price_dispute', true, true, ['final_fare_snapshot', 'route_distance_duration_provider_evidence', 'admin_tariff_version']),
  support('route_dispute', true, true, ['pickup_dropoff_provider_fix', 'route_polyline_provider_reference', 'eta_distance_provider_reference']),
  support('driver_no_show', true, false, ['driver_arrival_timestamp', 'rider_waiting_evidence', 'provider_location_trace']),
  support('rider_no_show', true, false, ['driver_arrival_timestamp', 'rider_contact_attempts', 'provider_location_trace']),
  support('unsafe_behavior', true, true, ['complaint_statement', 'trip_timeline', 'safety_moderation_review']),
  support('cash_reconciliation', true, true, ['cash_policy_version', 'driver_cash_confirmation', 'rider_cash_confirmation_or_dispute']),
  support('lost_item', false, false, ['trip_reference', 'participant_contact_policy', 'support_case_reference']),
  support('fake_trip_or_collusion', true, true, ['account_device_graph', 'route_timeline', 'sabi_ai_fairness_review']),
  support('accident_or_emergency', true, true, ['emergency_report', 'trip_timeline', 'admin_safety_review']),
  support('refund_review', true, true, ['payment_reference', 'refund_reason', 'admin_approval_reference']),
];

export const TAXI_ADMIN_CONTROL_PANELS_001U: readonly TaxiAdminControlPanel001U[] = [
  panel('taxi-driver-verification', 'Driver verification and approval', ['approve_driver', 'reject_driver', 'freeze_driver']),
  panel('taxi-rider-risk', 'Rider risk and region eligibility', ['freeze_rider', 'resolve_dispute']),
  panel('taxi-vehicle-park', 'Vehicle and driver park review', ['approve_vehicle', 'freeze_driver']),
  panel('taxi-tariff-region', 'Tariff, region, commission and cash policy', ['configure_tariff', 'configure_commission', 'enable_region', 'lock_region']),
  panel('taxi-live-dispatch-lock', 'Dispatch/provider runtime lock center', ['unlock_provider_runtime', 'freeze_driver']),
  panel('taxi-support-dispute', 'Support, dispute, refund and safety review', ['resolve_dispute', 'approve_refund', 'freeze_driver', 'freeze_rider']),
];

function gate(domain: TaxiMegaGate001U['domain'], reason: string): TaxiMegaGate001U {
  return {
    domain,
    adminVisible: true,
    runtimeMountedNow: false,
    dbWriteEnabledNow: false,
    walletMutationEnabledNow: false,
    paymentEnabledNow: false,
    payoutEnabledNow: false,
    providerDispatchEnabledNow: false,
    exactOwnerApprovalRequired: true,
    fakeSuccessBlocked: true,
    reason,
  };
}

function countryCells(countryCode: TaxiTariffRegionCell001U['countryCode']): readonly TaxiTariffRegionCell001U[] {
  const tariffs: readonly TaxiTariffRegionCell001U['tariffCode'][] = [
    'economy',
    'comfort',
    'business',
    'premium',
    'delivery',
    'courier',
    'cargo',
    'express',
    'intercity',
  ];

  return tariffs.map((tariffCode) => ({
    countryCode,
    tariffCode,
    regionConfiguredByAdmin: true,
    commissionConfiguredByAdmin: true,
    minFareConfiguredByAdmin: true,
    surgeRulesConfiguredByAdmin: true,
    cashPolicyConfiguredByAdmin: true,
    runtimeQuoteEnabledNow: false,
    fakeFareSuccessBlocked: true,
  }));
}

function dispatch(code: TaxiDispatchMatrixRule001U['code'], providerBackedWhenRuntimeEnabled: boolean): TaxiDispatchMatrixRule001U {
  return {
    code,
    requiredBeforeRuntimeOffer: true,
    blocksDriverOfferWhenMissing: true,
    adminVisible: true,
    providerBackedWhenRuntimeEnabled,
  };
}

function support(
  caseType: TaxiSupportDisputeRule001U['caseType'],
  freezesSettlement: boolean,
  freezesRewards: boolean,
  evidenceRequired: readonly string[],
): TaxiSupportDisputeRule001U {
  return {
    caseType,
    freezesSettlement,
    freezesRewards,
    adminReviewRequired: true,
    evidenceRequired,
    uiMayResolveAutomatically: false,
    fakeResolutionBlocked: true,
  };
}

function panel(id: string, title: string, actions: TaxiAdminControlPanel001U['actions']): TaxiAdminControlPanel001U {
  return {
    id,
    title,
    actions,
    routeMountedNow: false,
    runtimeWritesEnabledNow: false,
    auditRequired: true,
  };
}
