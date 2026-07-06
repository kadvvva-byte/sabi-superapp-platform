import type { TaxiMoneyAmount } from '../taxiFoundation.types';
import {
  TAXI_ADMIN_CONTROL_PANELS_001U,
  TAXI_DISPATCH_MATRIX_001U,
  TAXI_MEGA_FOUNDATION_VERSION_001U,
  TAXI_MEGA_GATES_001U,
  TAXI_SUPPORT_DISPUTE_RULES_001U,
  TAXI_TARIFF_REGION_MATRIX_001U,
  TAXI_VERIFICATION_PROFILES_001U,
} from './constants';
import type {
  TaxiDispatchReadinessCode001U,
  TaxiMegaFoundationSnapshot001U,
  TaxiMegaReadinessDecision001U,
  TaxiMegaReadinessInput001U,
  TaxiSupportCaseType001U,
  TaxiVerificationRequirement001U,
} from './types';

const TAXI_PROVIDER_RUNTIME_LOCK_DOMAIN_001U = 'provider_runtime_lock' as const;

export function getTaxiMegaFoundationSnapshot001U(): TaxiMegaFoundationSnapshot001U {
  return {
    version: TAXI_MEGA_FOUNDATION_VERSION_001U,
    module: 'taxi',
    status: 'mega_foundation_safe_disabled_ready',
    adminFirst: true,
    sourceOnlyFoundation: true,
    runtimeRoutesMounted: false,
    adminUiRuntimeMounted: false,
    dbReadEnabled: false,
    dbWriteEnabled: false,
    prismaSchemaWriteEnabled: false,
    prismaGenerateEnabled: false,
    prismaMigrationEnabled: false,
    walletMutationEnabled: false,
    paymentEnabled: false,
    payoutEnabled: false,
    providerDispatchEnabled: false,
    mobileKernelAllowed: false,
    gates: TAXI_MEGA_GATES_001U,
    verificationProfiles: TAXI_VERIFICATION_PROFILES_001U,
    tariffRegionMatrix: TAXI_TARIFF_REGION_MATRIX_001U,
    dispatchMatrix: TAXI_DISPATCH_MATRIX_001U,
    supportDisputeRules: TAXI_SUPPORT_DISPUTE_RULES_001U,
    adminControlPanels: TAXI_ADMIN_CONTROL_PANELS_001U,
  };
}

export function previewTaxiMegaReadiness001U(input: TaxiMegaReadinessInput001U): TaxiMegaReadinessDecision001U {
  const profile = TAXI_VERIFICATION_PROFILES_001U.find((item) => item.role === input.role);
  const requiredVerification = profile?.required ?? [];
  const verificationPresent = new Set<TaxiVerificationRequirement001U>(input.verificationPresent);
  const dispatchPresent = new Set<TaxiDispatchReadinessCode001U>(input.dispatchPresent);

  const missingVerification = requiredVerification.filter((requirement) => !verificationPresent.has(requirement));
  const missingDispatch = TAXI_DISPATCH_MATRIX_001U
    .map((rule) => rule.code)
    .filter((code) => !dispatchPresent.has(code));

  const blockedLifecycleStages: TaxiMegaReadinessDecision001U['blockedLifecycleStages'] = Array.from(
    new Set([
      ...(missingVerification.length > 0 ? ['driver_acceptance_locked' as const] : []),
      ...(missingDispatch.includes('route_provider_configured') ? ['provider_route_required' as const, 'pickup_navigation_locked' as const] : []),
      ...(missingDispatch.includes('dispatch_provider_configured') ? ['dispatch_offer_locked' as const] : []),
      ...(missingDispatch.includes('rider_payment_or_cash_policy_ready') ? ['post_trip_settlement_locked' as const] : []),
      ...(input.hasOpenSupportCase ? ['support_or_dispute_review' as const] : []),
    ]),
  );

  return {
    version: TAXI_MEGA_FOUNDATION_VERSION_001U,
    canEnableRuntimeNow: false,
    canCreateRuntimeTripNow: false,
    canSendRuntimeDispatchOfferNow: false,
    canMutateWalletNow: false,
    canCapturePaymentNow: false,
    canSettleDriverNow: false,
    missingVerification,
    missingDispatch,
    blockedLifecycleStages,
    supportDisputeLocks: input.openSupportCaseTypes,
    estimatedCommissionPreview: previewAdminConfiguredCommission001U(
      input.grossFareMinor ?? 0,
      input.currency ?? 'UZS',
      input.adminConfiguredCommissionBasisPoints,
    ),
    safeDisabled: true,
    exactOwnerApprovalRequired: true,
    fakeSuccessBlocked: true,
  };
}

export function listTaxiRuntimeBlockedDomains001U(): readonly string[] {
  const blockedDomains = TAXI_MEGA_GATES_001U.map((gate) => gate.domain);
  return blockedDomains.includes(TAXI_PROVIDER_RUNTIME_LOCK_DOMAIN_001U)
    ? blockedDomains
    : [...blockedDomains, TAXI_PROVIDER_RUNTIME_LOCK_DOMAIN_001U];
}

export function listTaxiAdminControlPanelIds001U(): readonly string[] {
  return TAXI_ADMIN_CONTROL_PANELS_001U.map((panel) => panel.id);
}

export function listTaxiSupportCaseTypes001U(): readonly TaxiSupportCaseType001U[] {
  return TAXI_SUPPORT_DISPUTE_RULES_001U.map((rule) => rule.caseType);
}

function previewAdminConfiguredCommission001U(
  amountMinor: number,
  currency: TaxiMoneyAmount['currency'],
  adminConfiguredCommissionBasisPoints?: number,
): TaxiMoneyAmount | undefined {
  if (adminConfiguredCommissionBasisPoints === undefined) {
    return undefined;
  }

  const normalized = Math.max(0, Math.floor(amountMinor));
  const normalizedBasisPoints = Math.max(0, Math.min(10_000, Math.floor(adminConfiguredCommissionBasisPoints)));

  return {
    currency,
    amountMinor: Math.floor((normalized * normalizedBasisPoints) / 10_000),
  };
}
