import type {
  TaxiBranchlessCountryProviderRoute024A,
  TaxiBranchlessProviderRoutingFxReadiness024A,
} from './types';

const acceptedTopupChannels024A = Object.freeze(['visa_card', 'sabi_wallet'] as const);

export const taxiBranchlessCountryProviderRoutes024A: readonly TaxiBranchlessCountryProviderRoute024A[] = Object.freeze([
  Object.freeze({ countryCode: 'UZ', currencyCode: 'UZS', acceptedTopupChannels: acceptedTopupChannels024A, cardProviderRouteRequired: true, walletProviderRouteRequired: true, fxSourceRequiredWhenCurrencyConversionNeeded: true, fxRateSnapshotRequired: true, providerConfirmationRequiredBeforeCredit: true, sabiAiCoverageMonitoringRequired: true, sabiAiFxRateFreshnessMonitoringRequired: true, sabiAiReportOnlyNoMoneyMutation: true, physicalBranchRequired: false, adminManualMoneyMovementAllowed: false, status: 'configured_safe_disabled_until_owner_provider_binding', fxSourceStatus: 'configured_safe_disabled_until_owner_fx_binding' }),
  Object.freeze({ countryCode: 'KZ', currencyCode: 'KZT', acceptedTopupChannels: acceptedTopupChannels024A, cardProviderRouteRequired: true, walletProviderRouteRequired: true, fxSourceRequiredWhenCurrencyConversionNeeded: true, fxRateSnapshotRequired: true, providerConfirmationRequiredBeforeCredit: true, sabiAiCoverageMonitoringRequired: true, sabiAiFxRateFreshnessMonitoringRequired: true, sabiAiReportOnlyNoMoneyMutation: true, physicalBranchRequired: false, adminManualMoneyMovementAllowed: false, status: 'configured_safe_disabled_until_owner_provider_binding', fxSourceStatus: 'configured_safe_disabled_until_owner_fx_binding' }),
  Object.freeze({ countryCode: 'KG', currencyCode: 'KGS', acceptedTopupChannels: acceptedTopupChannels024A, cardProviderRouteRequired: true, walletProviderRouteRequired: true, fxSourceRequiredWhenCurrencyConversionNeeded: true, fxRateSnapshotRequired: true, providerConfirmationRequiredBeforeCredit: true, sabiAiCoverageMonitoringRequired: true, sabiAiFxRateFreshnessMonitoringRequired: true, sabiAiReportOnlyNoMoneyMutation: true, physicalBranchRequired: false, adminManualMoneyMovementAllowed: false, status: 'configured_safe_disabled_until_owner_provider_binding', fxSourceStatus: 'configured_safe_disabled_until_owner_fx_binding' }),
  Object.freeze({ countryCode: 'TJ', currencyCode: 'TJS', acceptedTopupChannels: acceptedTopupChannels024A, cardProviderRouteRequired: true, walletProviderRouteRequired: true, fxSourceRequiredWhenCurrencyConversionNeeded: true, fxRateSnapshotRequired: true, providerConfirmationRequiredBeforeCredit: true, sabiAiCoverageMonitoringRequired: true, sabiAiFxRateFreshnessMonitoringRequired: true, sabiAiReportOnlyNoMoneyMutation: true, physicalBranchRequired: false, adminManualMoneyMovementAllowed: false, status: 'configured_safe_disabled_until_owner_provider_binding', fxSourceStatus: 'configured_safe_disabled_until_owner_fx_binding' }),
  Object.freeze({ countryCode: 'RU', currencyCode: 'RUB', acceptedTopupChannels: acceptedTopupChannels024A, cardProviderRouteRequired: true, walletProviderRouteRequired: true, fxSourceRequiredWhenCurrencyConversionNeeded: true, fxRateSnapshotRequired: true, providerConfirmationRequiredBeforeCredit: true, sabiAiCoverageMonitoringRequired: true, sabiAiFxRateFreshnessMonitoringRequired: true, sabiAiReportOnlyNoMoneyMutation: true, physicalBranchRequired: false, adminManualMoneyMovementAllowed: false, status: 'configured_safe_disabled_until_owner_provider_binding', fxSourceStatus: 'configured_safe_disabled_until_owner_fx_binding' }),
  Object.freeze({ countryCode: 'AZ', currencyCode: 'AZN', acceptedTopupChannels: acceptedTopupChannels024A, cardProviderRouteRequired: true, walletProviderRouteRequired: true, fxSourceRequiredWhenCurrencyConversionNeeded: true, fxRateSnapshotRequired: true, providerConfirmationRequiredBeforeCredit: true, sabiAiCoverageMonitoringRequired: true, sabiAiFxRateFreshnessMonitoringRequired: true, sabiAiReportOnlyNoMoneyMutation: true, physicalBranchRequired: false, adminManualMoneyMovementAllowed: false, status: 'configured_safe_disabled_until_owner_provider_binding', fxSourceStatus: 'configured_safe_disabled_until_owner_fx_binding' }),
  Object.freeze({ countryCode: 'TR', currencyCode: 'TRY', acceptedTopupChannels: acceptedTopupChannels024A, cardProviderRouteRequired: true, walletProviderRouteRequired: true, fxSourceRequiredWhenCurrencyConversionNeeded: true, fxRateSnapshotRequired: true, providerConfirmationRequiredBeforeCredit: true, sabiAiCoverageMonitoringRequired: true, sabiAiFxRateFreshnessMonitoringRequired: true, sabiAiReportOnlyNoMoneyMutation: true, physicalBranchRequired: false, adminManualMoneyMovementAllowed: false, status: 'configured_safe_disabled_until_owner_provider_binding', fxSourceStatus: 'configured_safe_disabled_until_owner_fx_binding' }),
  Object.freeze({ countryCode: 'AE', currencyCode: 'AED', acceptedTopupChannels: acceptedTopupChannels024A, cardProviderRouteRequired: true, walletProviderRouteRequired: true, fxSourceRequiredWhenCurrencyConversionNeeded: true, fxRateSnapshotRequired: true, providerConfirmationRequiredBeforeCredit: true, sabiAiCoverageMonitoringRequired: true, sabiAiFxRateFreshnessMonitoringRequired: true, sabiAiReportOnlyNoMoneyMutation: true, physicalBranchRequired: false, adminManualMoneyMovementAllowed: false, status: 'configured_safe_disabled_until_owner_provider_binding', fxSourceStatus: 'configured_safe_disabled_until_owner_fx_binding' }),
]);

export const taxiBranchlessProviderRoutingFxReadiness024A: TaxiBranchlessProviderRoutingFxReadiness024A = Object.freeze({
  version: 'TAXI-BRANCHLESS-PROVIDER-ROUTING-FX-024A',
  branchlessProviderCoverageModel: true,
  noPhysicalBranchRequiredByProductFlow: true,
  perCountryProviderRouteRequired: true,
  perCountryCurrencyRequired: true,
  noFixedGlobalCurrency: true,
  driverSelfTopupOnly: false,
  driverBalanceTopupOnlyViaApprovedAgentNow: true,
  taxiAgentApplicationRequiredBeforeTopup: true,
  topupChannels: acceptedTopupChannels024A,
  cardTopupAllowedByDriverOnly: false,
  sabiWalletTopupAllowedByDriverOnly: false,
  officialPaymentLinkRequired: true,
  proofOrTxHashRequiredBeforeCredit: true,
  adminManualTopupAllowed: false,
  adminManualTransferAllowed: false,
  adminManualPayoutAllowed: false,
  adminWalletCreditDebitAllowed: false,
  providerSecretReferenceLabelsOnly: true,
  rawProviderSecretValuesAllowedInSource: false,
  rawFxProviderSecretValuesAllowedInSource: false,
  ownerFilledProviderConfigRequiredBeforeRuntimeEnablement: true,
  ownerFilledFxSourceConfigRequiredBeforeRuntimeEnablement: true,
  providerCallPerformedByReadiness: false,
  walletMutationPerformedByReadiness: false,
  dbWritePerformedByReadiness: false,
  protectedWriteWithApprovalPerformedByReadiness: false,
  fakeFxRateGenerated: false,
  fakePaymentGenerated: false,
  fakeWalletCreditGenerated: false,
  fakePayoutGenerated: false,
  currentExchangeRateRequiredWhenConversionNeeded: true,
  fxRateSnapshotRequired: true,
  providerConfirmationRequiredBeforeCredit: true,
  idempotencyRequired: true,
  auditRequired: true,
  orderStartPositiveBalanceRequired: true,
  noBalanceAutoBlock: true,
  driverBalanceAutoUnlockByRealBalanceAfterTopup: true,
  sabiAiProviderCoverageMonitoringRequired: true,
  sabiAiFxRateFreshnessMonitoringRequired: true,
  sabiAiSuspiciousTopupMonitoringRequired: true,
  sabiAiReportOnlyNoMoneyMutation: true,
  countryRoutes: taxiBranchlessCountryProviderRoutes024A,
});

export function getTaxiBranchlessProviderRoutingFxReadiness024A(): TaxiBranchlessProviderRoutingFxReadiness024A {
  return taxiBranchlessProviderRoutingFxReadiness024A;
}
