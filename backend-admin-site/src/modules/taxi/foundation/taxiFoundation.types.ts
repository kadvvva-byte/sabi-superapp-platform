export type TaxiFoundationVersion = 'TAXI-BACKEND-FOUNDATION-001A' | 'TAXI-BACKEND-FOUNDATION-001S';

export type TaxiCountryCode =
  | 'UZ'
  | 'KZ'
  | 'KG'
  | 'TJ'
  | 'TM'
  | 'RU'
  | 'AE'
  | 'TR'
  | 'OTHER';

export type TaxiParticipantRole = 'driver' | 'rider';

export type TaxiTariffCode =
  | 'economy'
  | 'comfort'
  | 'business'
  | 'premium'
  | 'delivery'
  | 'courier'
  | 'cargo'
  | 'express'
  | 'intercity';

export type TaxiRuntimeCapability =
  | 'location_runtime'
  | 'route_provider'
  | 'dispatch_provider'
  | 'payment_provider'
  | 'driver_balance_wallet'
  | 'commission_debit'
  | 'contest_points_ledger'
  | 'reward_payout'
  | 'sabi_ai_fairness'
  | 'admin_review';

export type TaxiRuntimeCapabilityStatus = 'locked' | 'provider_required' | 'admin_required' | 'exact_approval_required';

export type TaxiComplaintEscalationCode =
  | 'no_verified_complaints_today'
  | 'one_verified_complaint_points_penalty'
  | 'two_verified_complaints_points_penalty_one_hour_cooldown'
  | 'three_verified_complaints_points_penalty_three_hour_cooldown'
  | 'more_than_three_verified_complaints_blocked_pending_review';

export type TaxiViolationCode =
  | 'verified_complaint'
  | 'false_complaint'
  | 'contractual_cancellation'
  | 'trip_after_cancellation'
  | 'fake_trip_attempt'
  | 'fake_star_attempt'
  | 'unsafe_behavior'
  | 'rude_behavior'
  | 'vehicle_cleanliness_issue'
  | 'rider_cleanliness_issue'
  | 'device_account_country_mismatch'
  | 'reward_abuse_attempt';

export type TaxiTrustStatus = 'clear' | 'warning' | 'cooldown' | 'blocked_pending_review' | 'appeal_pending' | 'restored';

export interface TaxiMoneyAmount {
  readonly currency: 'UZS' | 'USD' | 'KZT' | 'RUB' | 'AED' | 'TRY';
  readonly amountMinor: number;
}

export interface TaxiRuntimeGate {
  readonly capability: TaxiRuntimeCapability;
  readonly status: TaxiRuntimeCapabilityStatus;
  readonly reason: string;
  readonly exactApprovalRequired: boolean;
  readonly fakeSuccessBlocked: boolean;
}

export interface TaxiDriverBalancePolicy {
  readonly minimumOnlineReserveMinor: number;
  readonly commissionSource: 'admin_configured';
  readonly adminConfiguredCommissionRequired: true;
  readonly balanceRequiredBeforeOffer: true;
  readonly canReceiveOfferWhenBalanceLow: false;
  readonly canAcceptOfferWhenBalanceLow: false;
  readonly topUpFakeSuccessBlocked: true;
  readonly debitBeforeBackendTripCompletedBlocked: true;
}

export interface TaxiDispatchAccessInput {
  readonly participantId: string;
  readonly countryCode: TaxiCountryCode;
  readonly driverBalanceMinor: number;
  readonly hasApprovedDocuments: boolean;
  readonly hasAdminApproval: boolean;
  readonly providerConfigured: boolean;
}

export interface TaxiDispatchAccessDecision {
  readonly canEnterDispatchPool: boolean;
  readonly canReceiveOffer: boolean;
  readonly canAcceptOffer: boolean;
  readonly missingReserveMinor: number;
  readonly reasons: readonly string[];
  readonly safeDisabled: boolean;
}

export interface TaxiCommissionPreviewInput {
  readonly tripPriceMinor: number;
  readonly currency: TaxiMoneyAmount['currency'];
}

export interface TaxiCommissionPreview {
  readonly grossFare: TaxiMoneyAmount;
  readonly commissionSource: 'admin_configured';
  readonly adminConfiguredCommissionRequired: true;
  readonly commission: TaxiMoneyAmount | null;
  readonly driverNetBeforeOtherAdjustments: TaxiMoneyAmount | null;
  readonly calculationExecutedNow: false;
  readonly debitTiming: 'after_backend_trip_completed_only';
  readonly realDebitExecutedNow: false;
  readonly payoutExecutedNow: false;
  readonly exactApprovalRequired: true;
}

export interface TaxiDailyComplaintInput {
  readonly participantId: string;
  readonly role: TaxiParticipantRole;
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly verifiedComplaintsToday: number;
}

export interface TaxiDailyComplaintDecision {
  readonly escalation: TaxiComplaintEscalationCode;
  readonly trustStatus: TaxiTrustStatus;
  readonly pointsPenaltyRequired: boolean;
  readonly cooldownMinutes: number;
  readonly blockedPendingReview: boolean;
  readonly explanationRequired: boolean;
  readonly appliesToDriver: boolean;
  readonly appliesToRider: boolean;
  readonly backendVerificationRequired: true;
  readonly adminReviewRequired: boolean;
  readonly uiMayExecuteSanction: false;
}

export interface TaxiLeaguePointsRule {
  readonly id: string;
  readonly label: string;
  readonly role: TaxiParticipantRole | 'both';
  readonly effect: 'increase' | 'decrease' | 'freeze';
  readonly backendVerifiedOnly: true;
}

export interface TaxiLeaguePrizeRule {
  readonly place: 1 | 2 | 3;
  readonly label: string;
  readonly rewardLockedUntilAdminReview: true;
  readonly payoutExecutedByUi: false;
}

export interface TaxiCountryLeagueRule {
  readonly countryCode: TaxiCountryCode;
  readonly countryLabel: string;
  readonly separatedLeaderboard: true;
  readonly seasonConfiguredByAdmin: true;
  readonly topPlaces: readonly TaxiLeaguePrizeRule[];
}

export interface TaxiSabiAiFairnessRule {
  readonly signal: string;
  readonly description: string;
  readonly appliesToRoles: readonly TaxiParticipantRole[];
  readonly blocksFakeSuccess: true;
  readonly adminReviewForHeavyAction: true;
}

export interface TaxiFoundationSnapshot {
  readonly version: TaxiFoundationVersion;
  readonly module: 'taxi';
  readonly status: 'safe_disabled_foundation_ready';
  readonly mobileUiSourceStage: 'TAXI-MOBILE-UI-001X';
  readonly backendRuntimeMounted: false;
  readonly providerRuntimeEnabled: false;
  readonly paymentRuntimeEnabled: false;
  readonly payoutRuntimeEnabled: false;
  readonly dbWriteEnabled: false;
  readonly fakeLocationSuccessBlocked: true;
  readonly fakeDriverAssignmentBlocked: true;
  readonly fakePaymentSuccessBlocked: true;
  readonly fakeTripCompletionBlocked: true;
  readonly fakeTopUpSuccessBlocked: true;
  readonly fakeCommissionDebitBlocked: true;
  readonly fakeRewardPayoutBlocked: true;
  readonly driverBalancePolicy: TaxiDriverBalancePolicy;
  readonly runtimeGates: readonly TaxiRuntimeGate[];
  readonly leaguePointsRules: readonly TaxiLeaguePointsRule[];
  readonly countryLeagues: readonly TaxiCountryLeagueRule[];
  readonly sabiAiFairnessRules: readonly TaxiSabiAiFairnessRule[];
}

export interface TaxiRouteDescriptor {
  readonly method: 'GET' | 'POST';
  readonly path: string;
  readonly authRequired: boolean;
  readonly mountedNow: false;
  readonly runtimeEnabled: false;
  readonly exactApprovalRequiredForRuntime: boolean;
  readonly description: string;
}
