import type { TaxiCountryCode, TaxiMoneyAmount, TaxiParticipantRole, TaxiTariffCode } from '../taxiFoundation.types';

export type TaxiTripLifecycleControlVersion001T = 'TAXI-BACKEND-FOUNDATION-001T';

export type TaxiTripLifecycleStage001T =
  | 'rider_request_draft'
  | 'quote_preview_locked'
  | 'provider_route_required'
  | 'dispatch_offer_locked'
  | 'driver_acceptance_locked'
  | 'pickup_navigation_locked'
  | 'active_trip_locked'
  | 'backend_completion_required'
  | 'post_trip_settlement_locked'
  | 'support_or_dispute_review';

export type TaxiTripLifecycleGateStatus001T =
  | 'admin_config_required'
  | 'provider_required'
  | 'wallet_provider_required'
  | 'backend_evidence_required'
  | 'exact_owner_approval_required'
  | 'safe_disabled_locked';

export type TaxiTripPaymentMode001T = 'cash' | 'wallet_balance' | 'payment_card' | 'corporate_account' | 'promo_or_voucher';

export type TaxiTripEvidenceCode001T =
  | 'pickup_location_provider_fix'
  | 'dropoff_location_provider_fix'
  | 'route_distance_duration_provider_fix'
  | 'driver_acceptance_timestamp'
  | 'rider_boarded_confirmation'
  | 'driver_arrived_confirmation'
  | 'trip_started_timestamp'
  | 'trip_completed_timestamp'
  | 'fare_recalculation_reason'
  | 'payment_authorization_reference'
  | 'commission_ledger_reference'
  | 'support_dispute_reference';

export interface TaxiTripLifecycleGate001T {
  readonly stage: TaxiTripLifecycleStage001T;
  readonly status: TaxiTripLifecycleGateStatus001T;
  readonly adminVisible: true;
  readonly exactApprovalRequired: true;
  readonly runtimeMountedNow: false;
  readonly fakeSuccessBlocked: true;
  readonly reason: string;
}

export interface TaxiTripQuotePolicy001T {
  readonly adminConfiguredTariffRequired: true;
  readonly adminConfiguredCommissionRequired: true;
  readonly providerRouteRequiredForRuntime: true;
  readonly trafficCameraRadarProviderRequired: true;
  readonly distanceDurationProviderRequired: true;
  readonly upfrontQuotePreviewAllowed: true;
  readonly finalFareRequiresBackendTripCompletion: true;
  readonly paymentAuthorizationBeforeDispatchRequired: true;
  readonly cashModeRequiresDriverAndRiderRegionPolicy: true;
  readonly fakeFareSuccessBlocked: true;
  readonly fakeSurgeSuccessBlocked: true;
  readonly uiMayCreateTrip: false;
}

export interface TaxiTripSettlementPolicy001T {
  readonly commissionDebitTiming: 'after_backend_trip_completed_only';
  readonly driverCreditTiming: 'after_payment_or_cash_reconciliation';
  readonly riderReceiptTiming: 'after_backend_fare_finalization';
  readonly tipsRequireSeparateProviderLedger: true;
  readonly refundsRequireAdminOrPolicyReview: true;
  readonly promoLiabilityRequiresAdminConfig: true;
  readonly walletMutationExecutedNow: false;
  readonly paymentCapturedNow: false;
  readonly payoutExecutedNow: false;
}

export interface TaxiTripRequestPreviewInput001T {
  readonly riderId: string;
  readonly countryCode: TaxiCountryCode;
  readonly tariffCode: TaxiTariffCode;
  readonly paymentMode: TaxiTripPaymentMode001T;
  readonly hasPickupLocation: boolean;
  readonly hasDropoffLocation: boolean;
  readonly adminTariffConfigured: boolean;
  readonly adminCommissionConfigured: boolean;
  readonly routeProviderConfigured: boolean;
  readonly dispatchProviderConfigured: boolean;
  readonly paymentProviderConfigured: boolean;
  readonly walletProviderConfigured: boolean;
}

export interface TaxiTripRequestPreviewDecision001T {
  readonly canShowLockedQuotePreview: boolean;
  readonly canCreateRuntimeTrip: false;
  readonly canDispatchToDriver: false;
  readonly missing: readonly string[];
  readonly blockedStages: readonly TaxiTripLifecycleStage001T[];
  readonly requiredEvidence: readonly TaxiTripEvidenceCode001T[];
  readonly runtimeBlocked: true;
  readonly safeDisabled: true;
}

export interface TaxiDispatchOfferPreviewInput001T {
  readonly driverId: string;
  readonly countryCode: TaxiCountryCode;
  readonly tariffCode: TaxiTariffCode;
  readonly driverBalanceMinor: number;
  readonly hasApprovedDocuments: boolean;
  readonly hasAdminApproval: boolean;
  readonly providerConfigured: boolean;
  readonly riderPaymentAuthorized: boolean;
  readonly routeProviderConfigured: boolean;
}

export interface TaxiDispatchOfferPreviewDecision001T {
  readonly canSendRuntimeOffer: false;
  readonly canDriverAcceptRuntimeOffer: false;
  readonly canStartPickupNavigation: false;
  readonly missing: readonly string[];
  readonly driverBalanceMissingReserveMinor: number;
  readonly blockedStages: readonly TaxiTripLifecycleStage001T[];
  readonly fakeDriverAssignmentBlocked: true;
  readonly exactApprovalRequired: true;
  readonly safeDisabled: true;
}

export interface TaxiTripCompletionPreviewInput001T {
  readonly role: TaxiParticipantRole;
  readonly grossFareMinor: number;
  readonly currency: TaxiMoneyAmount['currency'];
  readonly hasTripStartedEvidence: boolean;
  readonly hasTripCompletedEvidence: boolean;
  readonly hasProviderDistanceDurationEvidence: boolean;
  readonly hasPaymentOrCashReconciliationEvidence: boolean;
  readonly hasOpenDispute: boolean;
}

export interface TaxiTripCompletionPreviewDecision001T {
  readonly evidenceReadyForFinalFarePreview: boolean;
  readonly canFinalizeFare: false;
  readonly canDebitCommission: false;
  readonly canCreditDriver: false;
  readonly canIssueReceipt: false;
  readonly missing: readonly string[];
  readonly grossFare: TaxiMoneyAmount;
  readonly settlementPolicy: TaxiTripSettlementPolicy001T;
  readonly blockedStages: readonly TaxiTripLifecycleStage001T[];
  readonly fakeTripCompletionBlocked: true;
  readonly fakeCommissionDebitBlocked: true;
  readonly fakeRewardOrPayoutBlocked: true;
  readonly safeDisabled: true;
}

export interface TaxiTripLifecycleControlSnapshot001T {
  readonly version: TaxiTripLifecycleControlVersion001T;
  readonly module: 'taxi';
  readonly feature: 'trip_lifecycle_control';
  readonly status: 'safe_disabled_foundation_ready';
  readonly runtimeRoutesMounted: false;
  readonly providerRuntimeEnabled: false;
  readonly walletRuntimeEnabled: false;
  readonly paymentRuntimeEnabled: false;
  readonly dbWriteEnabled: false;
  readonly adminFirstConfigurationRequired: true;
  readonly quotePolicy: TaxiTripQuotePolicy001T;
  readonly settlementPolicy: TaxiTripSettlementPolicy001T;
  readonly lifecycleGates: readonly TaxiTripLifecycleGate001T[];
}
