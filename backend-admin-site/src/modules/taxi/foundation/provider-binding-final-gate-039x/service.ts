import { TAXI_039X_STAGE } from './constants';
import type { Taxi039XProviderBindingFinalGateReadiness } from './types';

export function getTaxi039XProviderBindingFinalGateReadiness(): Taxi039XProviderBindingFinalGateReadiness {
  return {
    stage: TAXI_039X_STAGE,
    ready: true,
    providerBindingFinalGateReady: true,
    exactOwnerApprovalRequiredBeforeProviderBinding: true,
    exactOwnerApprovalRequiredBeforeRawApiKeyIntake: true,
    apiKeyValueAcceptedByThisStage: false,
    envReadOrDumped: false,
    secretValuesReadOrPrinted: false,
    providerCallPerformed: false,
    dbWritePerformed: false,
    walletMutationPerformed: false,
    moneyMovementPerformed: false,
    productionLaunchClaimed: false,
  };
}

export function getTaxi039XProviderBindingFinalGateSummary() {
  return {
    ...getTaxi039XProviderBindingFinalGateReadiness(),
    taxiMustNotHaveStandaloneWallet: true,
    taxiUsesMainGlobalWallet: true,
    rideFareDirectNoCommission: true,
    visaCardCashbackPercent: 2,
    allowedThisStage: ['safe_provider_binding_final_gate_contract', 'owner_approval_gate_metadata', 'read_only_runtime_smoke'],
    forbiddenThisStage: ['raw_api_key', 'secret_value', 'env_read', 'secret_read', 'provider_call', 'db_write', 'wallet_mutation', 'money_movement', 'payment', 'payout', 'production_launch'],
  };
}
