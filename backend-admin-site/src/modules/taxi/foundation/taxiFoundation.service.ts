import {
  TAXI_COUNTRY_LEAGUES,
  TAXI_DRIVER_BALANCE_POLICY,
  TAXI_FOUNDATION_VERSION,
  TAXI_LEAGUE_POINTS_RULES,
  TAXI_MOBILE_UI_SOURCE_STAGE,
  TAXI_RUNTIME_GATES,
  TAXI_SABI_AI_FAIRNESS_RULES,
} from './taxiFoundation.constants';
import type {
  TaxiCommissionPreview,
  TaxiCommissionPreviewInput,
  TaxiDailyComplaintDecision,
  TaxiDailyComplaintInput,
  TaxiDispatchAccessDecision,
  TaxiDispatchAccessInput,
  TaxiFoundationSnapshot,
  TaxiMoneyAmount,
} from './taxiFoundation.types';


export function getTaxiFoundationSnapshot(): TaxiFoundationSnapshot {
  return {
    version: TAXI_FOUNDATION_VERSION,
    module: 'taxi',
    status: 'safe_disabled_foundation_ready',
    mobileUiSourceStage: TAXI_MOBILE_UI_SOURCE_STAGE,
    backendRuntimeMounted: false,
    providerRuntimeEnabled: false,
    paymentRuntimeEnabled: false,
    payoutRuntimeEnabled: false,
    dbWriteEnabled: false,
    fakeLocationSuccessBlocked: true,
    fakeDriverAssignmentBlocked: true,
    fakePaymentSuccessBlocked: true,
    fakeTripCompletionBlocked: true,
    fakeTopUpSuccessBlocked: true,
    fakeCommissionDebitBlocked: true,
    fakeRewardPayoutBlocked: true,
    driverBalancePolicy: TAXI_DRIVER_BALANCE_POLICY,
    runtimeGates: TAXI_RUNTIME_GATES,
    leaguePointsRules: TAXI_LEAGUE_POINTS_RULES,
    countryLeagues: TAXI_COUNTRY_LEAGUES,
    sabiAiFairnessRules: TAXI_SABI_AI_FAIRNESS_RULES,
  };
}

export function evaluateTaxiDriverDispatchAccess(input: TaxiDispatchAccessInput): TaxiDispatchAccessDecision {
  const reasons: string[] = [];
  const missingReserveMinor = Math.max(0, TAXI_DRIVER_BALANCE_POLICY.minimumOnlineReserveMinor - input.driverBalanceMinor);

  if (missingReserveMinor > 0) {
    reasons.push('driver_balance_below_minimum_online_reserve');
  }
  if (!input.hasApprovedDocuments) {
    reasons.push('driver_documents_not_approved');
  }
  if (!input.hasAdminApproval) {
    reasons.push('driver_admin_approval_required');
  }
  if (!input.providerConfigured) {
    reasons.push('dispatch_provider_not_configured');
  }

  const canEnterDispatchPool = reasons.length === 0;
  return {
    canEnterDispatchPool,
    canReceiveOffer: canEnterDispatchPool,
    canAcceptOffer: canEnterDispatchPool,
    missingReserveMinor,
    reasons,
    safeDisabled: true,
  };
}

export function previewTaxiCommission(input: TaxiCommissionPreviewInput): TaxiCommissionPreview {
  const sanitizedTripPriceMinor = Math.max(0, Math.floor(input.tripPriceMinor));

  return {
    grossFare: money(input.currency, sanitizedTripPriceMinor),
    commissionSource: 'admin_configured',
    adminConfiguredCommissionRequired: true,
    commission: null,
    driverNetBeforeOtherAdjustments: null,
    calculationExecutedNow: false,
    debitTiming: 'after_backend_trip_completed_only',
    realDebitExecutedNow: false,
    payoutExecutedNow: false,
    exactApprovalRequired: true,
  };
}

export function evaluateTaxiDailyComplaints(input: TaxiDailyComplaintInput): TaxiDailyComplaintDecision {
  const count = Math.max(0, Math.floor(input.verifiedComplaintsToday));
  const base = {
    appliesToDriver: input.role === 'driver',
    appliesToRider: input.role === 'rider',
    backendVerificationRequired: true as const,
    uiMayExecuteSanction: false as const,
  };

  if (count <= 0) {
    return {
      ...base,
      escalation: 'no_verified_complaints_today',
      trustStatus: 'clear',
      pointsPenaltyRequired: false,
      cooldownMinutes: 0,
      blockedPendingReview: false,
      explanationRequired: false,
      adminReviewRequired: false,
    };
  }

  if (count === 1) {
    return {
      ...base,
      escalation: 'one_verified_complaint_points_penalty',
      trustStatus: 'warning',
      pointsPenaltyRequired: true,
      cooldownMinutes: 0,
      blockedPendingReview: false,
      explanationRequired: false,
      adminReviewRequired: false,
    };
  }

  if (count === 2) {
    return {
      ...base,
      escalation: 'two_verified_complaints_points_penalty_one_hour_cooldown',
      trustStatus: 'cooldown',
      pointsPenaltyRequired: true,
      cooldownMinutes: 60,
      blockedPendingReview: false,
      explanationRequired: false,
      adminReviewRequired: false,
    };
  }

  if (count === 3) {
    return {
      ...base,
      escalation: 'three_verified_complaints_points_penalty_three_hour_cooldown',
      trustStatus: 'cooldown',
      pointsPenaltyRequired: true,
      cooldownMinutes: 180,
      blockedPendingReview: false,
      explanationRequired: false,
      adminReviewRequired: true,
    };
  }

  return {
    ...base,
    escalation: 'more_than_three_verified_complaints_blocked_pending_review',
    trustStatus: 'blocked_pending_review',
    pointsPenaltyRequired: true,
    cooldownMinutes: 0,
    blockedPendingReview: true,
    explanationRequired: true,
    adminReviewRequired: true,
  };
}

function money(currency: TaxiMoneyAmount['currency'], amountMinor: number): TaxiMoneyAmount {
  return {
    currency,
    amountMinor,
  };
}
