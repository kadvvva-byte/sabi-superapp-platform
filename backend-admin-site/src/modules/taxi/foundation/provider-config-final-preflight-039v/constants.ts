export const TAXI_039V_PROVIDER_CONFIG_FINAL_PREFLIGHT_VERSION = 'TAXI-039V-PROVIDER-CONFIG-FINAL-PREFLIGHT-NO-SECRET-VALUE-NO-PROVIDER-CALL-CHECK';
export const TAXI_039V_SCOPE = 'provider_config_final_preflight_no_secret_value_no_provider_call';
export const TAXI_039V_RULES = Object.freeze({
  taxiMustNotHaveStandaloneWallet: true,
  taxiUsesMainGlobalWallet: true,
  rideFareDirectNoCommission: true,
  taxiCommissionBps: 0,
  visaCardCashbackBps: 200,
  providerConfigFinalPreflightReady: true,
  rawApiKeyValueAcceptedByThisStage: false,
  envReadOrDumped: false,
  secretValuesReadOrPrinted: false,
  providerCallPerformed: false,
  dbWritePerformed: false,
  walletMutationPerformed: false,
  moneyMovementPerformed: false,
  paymentExecutionPerformed: false,
  payoutExecutionPerformed: false,
  productionLaunchClaimed: false,
});
