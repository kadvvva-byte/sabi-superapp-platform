import { TAXI_DRIVER_BALANCE_POLICY } from '../taxiFoundation.constants';
import type { TaxiMoneyAmount } from '../taxiFoundation.types';
import {
  TAXI_TRIP_LIFECYCLE_CONTROL_VERSION_001T,
  TAXI_TRIP_LIFECYCLE_GATES_001T,
  TAXI_TRIP_QUOTE_POLICY_001T,
  TAXI_TRIP_SETTLEMENT_POLICY_001T,
} from './constants';
import type {
  TaxiDispatchOfferPreviewDecision001T,
  TaxiDispatchOfferPreviewInput001T,
  TaxiTripCompletionPreviewDecision001T,
  TaxiTripCompletionPreviewInput001T,
  TaxiTripLifecycleControlSnapshot001T,
  TaxiTripLifecycleStage001T,
  TaxiTripRequestPreviewDecision001T,
  TaxiTripRequestPreviewInput001T,
} from './types';

export function getTaxiTripLifecycleControlSnapshot001T(): TaxiTripLifecycleControlSnapshot001T {
  return {
    version: TAXI_TRIP_LIFECYCLE_CONTROL_VERSION_001T,
    module: 'taxi',
    feature: 'trip_lifecycle_control',
    status: 'safe_disabled_foundation_ready',
    runtimeRoutesMounted: false,
    providerRuntimeEnabled: false,
    walletRuntimeEnabled: false,
    paymentRuntimeEnabled: false,
    dbWriteEnabled: false,
    adminFirstConfigurationRequired: true,
    quotePolicy: TAXI_TRIP_QUOTE_POLICY_001T,
    settlementPolicy: TAXI_TRIP_SETTLEMENT_POLICY_001T,
    lifecycleGates: TAXI_TRIP_LIFECYCLE_GATES_001T,
  };
}

export function previewTaxiTripRequest001T(input: TaxiTripRequestPreviewInput001T): TaxiTripRequestPreviewDecision001T {
  const missing: string[] = [];
  const blockedStages = new Set<TaxiTripLifecycleStage001T>();

  if (!input.hasPickupLocation) {
    missing.push('pickup_location_required');
    blockedStages.add('rider_request_draft');
  }
  if (!input.hasDropoffLocation) {
    missing.push('dropoff_location_required');
    blockedStages.add('rider_request_draft');
  }
  if (!input.adminTariffConfigured) {
    missing.push('admin_tariff_configuration_required');
    blockedStages.add('quote_preview_locked');
  }
  if (!input.adminCommissionConfigured) {
    missing.push('admin_commission_configuration_required');
    blockedStages.add('post_trip_settlement_locked');
  }
  if (!input.routeProviderConfigured) {
    missing.push('route_provider_not_configured');
    blockedStages.add('provider_route_required');
    blockedStages.add('quote_preview_locked');
  }
  if (!input.dispatchProviderConfigured) {
    missing.push('dispatch_provider_not_configured');
    blockedStages.add('dispatch_offer_locked');
  }
  if (!input.paymentProviderConfigured && input.paymentMode !== 'cash') {
    missing.push('payment_provider_not_configured');
    blockedStages.add('post_trip_settlement_locked');
  }
  if (!input.walletProviderConfigured && input.paymentMode === 'wallet_balance') {
    missing.push('wallet_provider_not_configured');
    blockedStages.add('post_trip_settlement_locked');
  }

  const canShowLockedQuotePreview =
    input.hasPickupLocation && input.hasDropoffLocation && input.adminTariffConfigured && input.adminCommissionConfigured;

  return {
    canShowLockedQuotePreview,
    canCreateRuntimeTrip: false,
    canDispatchToDriver: false,
    missing,
    blockedStages: Array.from(blockedStages),
    requiredEvidence: [
      'pickup_location_provider_fix',
      'dropoff_location_provider_fix',
      'route_distance_duration_provider_fix',
      'payment_authorization_reference',
    ],
    runtimeBlocked: true,
    safeDisabled: true,
  };
}

export function previewTaxiDispatchOffer001T(input: TaxiDispatchOfferPreviewInput001T): TaxiDispatchOfferPreviewDecision001T {
  const missing: string[] = [];
  const blockedStages = new Set<TaxiTripLifecycleStage001T>(['dispatch_offer_locked']);
  const driverBalanceMissingReserveMinor = Math.max(
    0,
    TAXI_DRIVER_BALANCE_POLICY.minimumOnlineReserveMinor - Math.max(0, Math.floor(input.driverBalanceMinor)),
  );

  if (driverBalanceMissingReserveMinor > 0) {
    missing.push('driver_balance_below_minimum_online_reserve');
    blockedStages.add('driver_acceptance_locked');
  }
  if (!input.hasApprovedDocuments) {
    missing.push('driver_documents_not_approved');
    blockedStages.add('driver_acceptance_locked');
  }
  if (!input.hasAdminApproval) {
    missing.push('driver_admin_approval_required');
    blockedStages.add('driver_acceptance_locked');
  }
  if (!input.providerConfigured) {
    missing.push('dispatch_provider_not_configured');
    blockedStages.add('dispatch_offer_locked');
  }
  if (!input.riderPaymentAuthorized) {
    missing.push('rider_payment_authorization_required_before_dispatch');
    blockedStages.add('post_trip_settlement_locked');
  }
  if (!input.routeProviderConfigured) {
    missing.push('route_provider_not_configured');
    blockedStages.add('provider_route_required');
    blockedStages.add('pickup_navigation_locked');
  }

  return {
    canSendRuntimeOffer: false,
    canDriverAcceptRuntimeOffer: false,
    canStartPickupNavigation: false,
    missing,
    driverBalanceMissingReserveMinor,
    blockedStages: Array.from(blockedStages),
    fakeDriverAssignmentBlocked: true,
    exactApprovalRequired: true,
    safeDisabled: true,
  };
}

export function previewTaxiTripCompletion001T(input: TaxiTripCompletionPreviewInput001T): TaxiTripCompletionPreviewDecision001T {
  const missing: string[] = [];
  const blockedStages = new Set<TaxiTripLifecycleStage001T>(['backend_completion_required', 'post_trip_settlement_locked']);

  if (!input.hasTripStartedEvidence) {
    missing.push('trip_started_backend_evidence_required');
    blockedStages.add('active_trip_locked');
  }
  if (!input.hasTripCompletedEvidence) {
    missing.push('trip_completed_backend_evidence_required');
    blockedStages.add('backend_completion_required');
  }
  if (!input.hasProviderDistanceDurationEvidence) {
    missing.push('provider_distance_duration_evidence_required');
    blockedStages.add('provider_route_required');
  }
  if (!input.hasPaymentOrCashReconciliationEvidence) {
    missing.push('payment_or_cash_reconciliation_evidence_required');
    blockedStages.add('post_trip_settlement_locked');
  }
  if (input.hasOpenDispute) {
    missing.push('support_or_dispute_review_required');
    blockedStages.add('support_or_dispute_review');
  }

  return {
    evidenceReadyForFinalFarePreview:
      input.hasTripStartedEvidence &&
      input.hasTripCompletedEvidence &&
      input.hasProviderDistanceDurationEvidence &&
      !input.hasOpenDispute,
    canFinalizeFare: false,
    canDebitCommission: false,
    canCreditDriver: false,
    canIssueReceipt: false,
    missing,
    grossFare: money(input.currency, Math.max(0, Math.floor(input.grossFareMinor))),
    settlementPolicy: TAXI_TRIP_SETTLEMENT_POLICY_001T,
    blockedStages: Array.from(blockedStages),
    fakeTripCompletionBlocked: true,
    fakeCommissionDebitBlocked: true,
    fakeRewardOrPayoutBlocked: true,
    safeDisabled: true,
  };
}

function money(currency: TaxiMoneyAmount['currency'], amountMinor: number): TaxiMoneyAmount {
  return {
    currency,
    amountMinor,
  };
}
