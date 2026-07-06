export type TaxiBranchlessProviderTopupChannel024A = 'visa_card' | 'sabi_wallet';

export type TaxiBranchlessProviderCoverageStatus024A =
  | 'configured_safe_disabled_until_owner_provider_binding'
  | 'missing_provider_config'
  | 'monitoring_only';

export type TaxiBranchlessProviderFxSourceStatus024A =
  | 'configured_safe_disabled_until_owner_fx_binding'
  | 'missing_fx_source_config'
  | 'monitoring_only';

export type TaxiBranchlessCountryProviderRoute024A = Readonly<{
  countryCode: 'UZ' | 'KZ' | 'KG' | 'TJ' | 'RU' | 'AZ' | 'TR' | 'AE';
  currencyCode: 'UZS' | 'KZT' | 'KGS' | 'TJS' | 'RUB' | 'AZN' | 'TRY' | 'AED';
  acceptedTopupChannels: readonly TaxiBranchlessProviderTopupChannel024A[];
  cardProviderRouteRequired: true;
  walletProviderRouteRequired: true;
  fxSourceRequiredWhenCurrencyConversionNeeded: true;
  fxRateSnapshotRequired: true;
  providerConfirmationRequiredBeforeCredit: true;
  sabiAiCoverageMonitoringRequired: true;
  sabiAiFxRateFreshnessMonitoringRequired: true;
  sabiAiReportOnlyNoMoneyMutation: true;
  physicalBranchRequired: false;
  adminManualMoneyMovementAllowed: false;
  status: TaxiBranchlessProviderCoverageStatus024A;
  fxSourceStatus: TaxiBranchlessProviderFxSourceStatus024A;
}>;

export type TaxiBranchlessProviderRoutingFxReadiness024A = Readonly<{
  version: 'TAXI-BRANCHLESS-PROVIDER-ROUTING-FX-024A';
  branchlessProviderCoverageModel: true;
  noPhysicalBranchRequiredByProductFlow: true;
  perCountryProviderRouteRequired: true;
  perCountryCurrencyRequired: true;
  noFixedGlobalCurrency: true;
  driverSelfTopupOnly: false;
  driverBalanceTopupOnlyViaApprovedAgentNow: true;
  taxiAgentApplicationRequiredBeforeTopup: true;
  topupChannels: readonly TaxiBranchlessProviderTopupChannel024A[];
  cardTopupAllowedByDriverOnly: false;
  sabiWalletTopupAllowedByDriverOnly: false;
  officialPaymentLinkRequired: true;
  proofOrTxHashRequiredBeforeCredit: true;
  adminManualTopupAllowed: false;
  adminManualTransferAllowed: false;
  adminManualPayoutAllowed: false;
  adminWalletCreditDebitAllowed: false;
  providerSecretReferenceLabelsOnly: true;
  rawProviderSecretValuesAllowedInSource: false;
  rawFxProviderSecretValuesAllowedInSource: false;
  ownerFilledProviderConfigRequiredBeforeRuntimeEnablement: true;
  ownerFilledFxSourceConfigRequiredBeforeRuntimeEnablement: true;
  providerCallPerformedByReadiness: false;
  walletMutationPerformedByReadiness: false;
  dbWritePerformedByReadiness: false;
  protectedWriteWithApprovalPerformedByReadiness: false;
  fakeFxRateGenerated: false;
  fakePaymentGenerated: false;
  fakeWalletCreditGenerated: false;
  fakePayoutGenerated: false;
  currentExchangeRateRequiredWhenConversionNeeded: true;
  fxRateSnapshotRequired: true;
  providerConfirmationRequiredBeforeCredit: true;
  idempotencyRequired: true;
  auditRequired: true;
  orderStartPositiveBalanceRequired: true;
  noBalanceAutoBlock: true;
  driverBalanceAutoUnlockByRealBalanceAfterTopup: true;
  sabiAiProviderCoverageMonitoringRequired: true;
  sabiAiFxRateFreshnessMonitoringRequired: true;
  sabiAiSuspiciousTopupMonitoringRequired: true;
  sabiAiReportOnlyNoMoneyMutation: true;
  countryRoutes: readonly TaxiBranchlessCountryProviderRoute024A[];
}>;
