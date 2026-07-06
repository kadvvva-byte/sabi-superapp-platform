import type {
  TaxiCountryLeagueRule,
  TaxiDriverBalancePolicy,
  TaxiLeaguePointsRule,
  TaxiRuntimeGate,
  TaxiSabiAiFairnessRule,
} from './taxiFoundation.types';

export const TAXI_FOUNDATION_VERSION = 'TAXI-BACKEND-FOUNDATION-001S' as const;
export const TAXI_MOBILE_UI_SOURCE_STAGE = 'TAXI-MOBILE-UI-001X' as const;

export const TAXI_DRIVER_BALANCE_POLICY: TaxiDriverBalancePolicy = {
  minimumOnlineReserveMinor: 50_000,
  commissionSource: 'admin_configured',
  adminConfiguredCommissionRequired: true,
  balanceRequiredBeforeOffer: true,
  canReceiveOfferWhenBalanceLow: false,
  canAcceptOfferWhenBalanceLow: false,
  topUpFakeSuccessBlocked: true,
  debitBeforeBackendTripCompletedBlocked: true,
};

export const TAXI_RUNTIME_GATES: readonly TaxiRuntimeGate[] = [
  {
    capability: 'location_runtime',
    status: 'provider_required',
    reason: 'Real location tracking must start only for an active Taxi session/trip and must stop on clean close.',
    exactApprovalRequired: true,
    fakeSuccessBlocked: true,
  },
  {
    capability: 'route_provider',
    status: 'provider_required',
    reason: 'Traffic, cameras, radars, speed and ETA are provider-backed signals, not UI success states.',
    exactApprovalRequired: true,
    fakeSuccessBlocked: true,
  },
  {
    capability: 'dispatch_provider',
    status: 'provider_required',
    reason: 'Driver matching, offers and dispatch pool require backend/provider runtime.',
    exactApprovalRequired: true,
    fakeSuccessBlocked: true,
  },
  {
    capability: 'payment_provider',
    status: 'provider_required',
    reason: 'Fare hold, charge, receipt, tips and refunds require real payment provider integration.',
    exactApprovalRequired: true,
    fakeSuccessBlocked: true,
  },
  {
    capability: 'driver_balance_wallet',
    status: 'provider_required',
    reason: 'Driver top-up and balance ledger require Wallet/provider backend integration.',
    exactApprovalRequired: true,
    fakeSuccessBlocked: true,
  },
  {
    capability: 'commission_debit',
    status: 'exact_approval_required',
    reason: 'The Admin-configured commission may be debited only after verified backend trip completion.',
    exactApprovalRequired: true,
    fakeSuccessBlocked: true,
  },
  {
    capability: 'contest_points_ledger',
    status: 'admin_required',
    reason: 'Stars, points, penalties, restoration and prize eligibility require verified ledger evidence.',
    exactApprovalRequired: true,
    fakeSuccessBlocked: true,
  },
  {
    capability: 'reward_payout',
    status: 'exact_approval_required',
    reason: 'Top-3 country prizes are frozen until Sabi AI, backend evidence, Admin/legal/payment approval.',
    exactApprovalRequired: true,
    fakeSuccessBlocked: true,
  },
  {
    capability: 'sabi_ai_fairness',
    status: 'admin_required',
    reason: 'Sabi AI fairness signals are advisory until backend evidence and Admin review are connected.',
    exactApprovalRequired: true,
    fakeSuccessBlocked: true,
  },
  {
    capability: 'admin_review',
    status: 'admin_required',
    reason: 'Heavy actions such as long block, reward freeze, payout stop or restoration require Admin review.',
    exactApprovalRequired: true,
    fakeSuccessBlocked: true,
  },
];

export const TAXI_LEAGUE_POINTS_RULES: readonly TaxiLeaguePointsRule[] = [
  {
    id: 'verified_trip_count',
    label: 'Verified completed trips increase country league score.',
    role: 'both',
    effect: 'increase',
    backendVerifiedOnly: true,
  },
  {
    id: 'driver_stars_from_rider',
    label: 'Passenger stars for driver: politeness, clean car, safe driving, punctuality.',
    role: 'driver',
    effect: 'increase',
    backendVerifiedOnly: true,
  },
  {
    id: 'rider_stars_from_driver',
    label: 'Driver stars for passenger: politeness, punctuality, cleanliness, safe behavior.',
    role: 'rider',
    effect: 'increase',
    backendVerifiedOnly: true,
  },
  {
    id: 'verified_daily_complaint',
    label: 'Verified daily complaint removes points and may trigger cooldown/block by daily count.',
    role: 'both',
    effect: 'decrease',
    backendVerifiedOnly: true,
  },
  {
    id: 'false_complaint',
    label: 'False complaint is a violation against the reporter after evidence review.',
    role: 'both',
    effect: 'decrease',
    backendVerifiedOnly: true,
  },
  {
    id: 'contractual_cancellation',
    label: 'Contractual cancellation or trip after cancellation is a violation and freezes contest progress.',
    role: 'both',
    effect: 'freeze',
    backendVerifiedOnly: true,
  },
  {
    id: 'dispute_open',
    label: 'Open dispute freezes prize eligibility until Sabi AI/Admin final decision.',
    role: 'both',
    effect: 'freeze',
    backendVerifiedOnly: true,
  },
];

export const TAXI_COUNTRY_LEAGUES: readonly TaxiCountryLeagueRule[] = [
  { countryCode: 'UZ', countryLabel: 'Uzbekistan', separatedLeaderboard: true, seasonConfiguredByAdmin: true, topPlaces: createTopPlaces() },
  { countryCode: 'KZ', countryLabel: 'Kazakhstan', separatedLeaderboard: true, seasonConfiguredByAdmin: true, topPlaces: createTopPlaces() },
  { countryCode: 'KG', countryLabel: 'Kyrgyzstan', separatedLeaderboard: true, seasonConfiguredByAdmin: true, topPlaces: createTopPlaces() },
  { countryCode: 'TJ', countryLabel: 'Tajikistan', separatedLeaderboard: true, seasonConfiguredByAdmin: true, topPlaces: createTopPlaces() },
  { countryCode: 'TM', countryLabel: 'Turkmenistan', separatedLeaderboard: true, seasonConfiguredByAdmin: true, topPlaces: createTopPlaces() },
  { countryCode: 'RU', countryLabel: 'Russia', separatedLeaderboard: true, seasonConfiguredByAdmin: true, topPlaces: createTopPlaces() },
  { countryCode: 'AE', countryLabel: 'United Arab Emirates', separatedLeaderboard: true, seasonConfiguredByAdmin: true, topPlaces: createTopPlaces() },
  { countryCode: 'TR', countryLabel: 'Türkiye', separatedLeaderboard: true, seasonConfiguredByAdmin: true, topPlaces: createTopPlaces() },
  { countryCode: 'OTHER', countryLabel: 'Other country', separatedLeaderboard: true, seasonConfiguredByAdmin: true, topPlaces: createTopPlaces() },
];

export const TAXI_SABI_AI_FAIRNESS_RULES: readonly TaxiSabiAiFairnessRule[] = [
  {
    signal: 'daily_verified_complaint_window',
    description: 'Complaint escalation is counted by country + participant + local calendar day.',
    appliesToRoles: ['driver', 'rider'],
    blocksFakeSuccess: true,
    adminReviewForHeavyAction: true,
  },
  {
    signal: 'contractual_cancellation_pattern',
    description: 'Cancellation followed by an off-platform or repeated route trip is treated as a violation signal.',
    appliesToRoles: ['driver', 'rider'],
    blocksFakeSuccess: true,
    adminReviewForHeavyAction: true,
  },
  {
    signal: 'stars_vs_complaints_conflict',
    description: 'High stars combined with repeated complaints or suspicious clusters requires evidence review.',
    appliesToRoles: ['driver', 'rider'],
    blocksFakeSuccess: true,
    adminReviewForHeavyAction: true,
  },
  {
    signal: 'false_complaint_detection',
    description: 'False complaints are violations by the reporter after backend evidence and Admin/Sabi AI review.',
    appliesToRoles: ['driver', 'rider'],
    blocksFakeSuccess: true,
    adminReviewForHeavyAction: true,
  },
  {
    signal: 'country_account_device_mismatch',
    description: 'Country leaderboard eligibility requires account, country, document and device consistency checks.',
    appliesToRoles: ['driver', 'rider'],
    blocksFakeSuccess: true,
    adminReviewForHeavyAction: true,
  },
  {
    signal: 'reward_abuse_or_fake_trip_attempt',
    description: 'Fake trips, fake stars, reward abuse and collusion freeze prize eligibility pending review.',
    appliesToRoles: ['driver', 'rider'],
    blocksFakeSuccess: true,
    adminReviewForHeavyAction: true,
  },
];

function createTopPlaces() {
  return [
    { place: 1, label: '1st place prize', rewardLockedUntilAdminReview: true, payoutExecutedByUi: false },
    { place: 2, label: '2nd place prize', rewardLockedUntilAdminReview: true, payoutExecutedByUi: false },
    { place: 3, label: '3rd place prize', rewardLockedUntilAdminReview: true, payoutExecutedByUi: false },
  ] as const;
}
