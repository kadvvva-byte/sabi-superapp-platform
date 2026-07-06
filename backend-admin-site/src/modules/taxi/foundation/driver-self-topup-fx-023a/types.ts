export type TaxiDriverTopupChannel023A = 'agent_official_payment_link' | 'agent_proof_tx_hash';

export type TaxiDriverTopupCurrencyMode023A = 'country_configured_currency';

export type TaxiDriverTopupFxProviderStatus023A = 'agent_only_required_safe_disabled_until_provider_configured';

export type TaxiDriverBalanceTopupActor023A = 'approved_taxi_agent_only';

export type TaxiDriverSelfTopupFxReadiness023A = Readonly<{
  version: 'TAXI-DRIVER-SELF-TOPUP-FX-023A';
  driverSelfTopupOnly: false;
  driverSelfTopupDisabledNow: true;
  driverBalanceTopupActor: TaxiDriverBalanceTopupActor023A;
  taxiAgentApplicationRequired: true;
  taxiAgentAdminApprovalRequired: true;
  taxiAgentMobileScreenLockedUntilApproved: true;
  nonAgentMobileAccessBlocked: true;
  driverDirectTopupUiAllowed: false;
  adminManualTopupAllowed: false;
  adminManualTransferAllowed: false;
  adminManualPayoutAllowed: false;
  adminWalletCreditDebitAllowed: false;
  acceptedTopupChannels: readonly TaxiDriverTopupChannel023A[];
  officialPaymentLinkRequired: true;
  proofOrTxHashRequiredBeforeCredit: true;
  visaCardTopupSupportedByContract: false;
  sabiWalletTopupSupportedByContract: false;
  countryCurrencyMode: TaxiDriverTopupCurrencyMode023A;
  noFixedGlobalCurrency: true;
  perCountryCurrencyRequired: true;
  currentExchangeRateRequiredWhenConversionNeeded: true;
  fxRateSnapshotRequired: true;
  providerConfirmationRequiredBeforeCredit: true;
  idempotencyRequired: true;
  auditRequired: true;
  sabiAiFxMonitoringRequired: true;
  sabiAiProviderCoverageMonitoringRequired: true;
  sabiAiReportOnlyNoMoneyMutation: true;
  noPhysicalBranchRequiredByProductFlow: true;
  branchlessProviderCoverageModel: true;
  driverBalanceAutoUnlockByRealBalanceAfterTopup: true;
  orderStartPositiveBalanceRequired: true;
  noBalanceAutoBlock: true;
  fakePaymentGenerated: false;
  fakeWalletCreditGenerated: false;
  fakePayoutGenerated: false;
  providerCallPerformedByReadiness: false;
  walletMutationPerformedByReadiness: false;
  dbWritePerformedByReadiness: false;
}>;
