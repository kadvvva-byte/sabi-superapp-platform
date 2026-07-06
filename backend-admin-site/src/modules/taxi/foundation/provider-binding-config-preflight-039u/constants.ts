export const TAXI_039U_PROVIDER_BINDING_CONFIG_PREFLIGHT_VERSION = 'TAXI-039U-PROVIDER-BINDING-CONFIG-PREFLIGHT-NO-SECRET-VALUE-NO-PROVIDER-CALL-CHECK';
export const TAXI_039U_SCOPE = 'provider_binding_config_preflight_no_secret_value_no_provider_call';
export const TAXI_039U_RULES = Object.freeze({
  taxiMustNotHaveStandaloneWallet: true,
  taxiUsesMainGlobalWallet: true,
  rideFareDirectNoCommission: true,
  taxiCommissionBps: 0,
  visaCardCashbackBps: 200,
  providerBindingConfigPreflightReady: true,
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
