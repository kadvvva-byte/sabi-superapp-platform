export const TAXI_039W_PROVIDER_CONFIG_FINAL_EVIDENCE_PREFLIGHT_VERSION = 'TAXI-039W-PROVIDER-CONFIG-FINAL-EVIDENCE-PREFLIGHT-NO-SECRET-VALUE-NO-PROVIDER-CALL-CHECK';
export const TAXI_039W_SCOPE = 'provider_config_final_evidence_preflight_no_secret_value_no_provider_call';
export const TAXI_039W_RULES = Object.freeze({
  taxiMustNotHaveStandaloneWallet: true,
  taxiUsesMainGlobalWallet: true,
  rideFareDirectNoCommission: true,
  taxiCommissionBps: 0,
  visaCardCashbackBps: 200,
  providerConfigFinalEvidencePreflightReady: true,
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
