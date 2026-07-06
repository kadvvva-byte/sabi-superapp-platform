import {
  TAXI_PROVIDER_BINDING_LIVE_ENABLE_READY_CONTROL_025I_VERSION,
  type TaxiProviderBindingLiveEnableReadyControl025I,
} from './types';

export const taxiProviderBindingLiveEnableReadyControl025I: TaxiProviderBindingLiveEnableReadyControl025I = Object.freeze({
  version: TAXI_PROVIDER_BINDING_LIVE_ENABLE_READY_CONTROL_025I_VERSION,
  mode: 'safe_disabled_live_enablement_ready_only',
  sourceRegistry: 'provider-binding-safe-disabled-registry-025g',
  registrySafeDisabled: true,
  liveProviderBindingEnabled: false,
  runtimeLiveProviderCallEnabled: false,
  providerCallEnabled: false,
  walletMutationEnabled: false,
  dbWriteEnabled: false,
  moneyMovementEnabled: false,
  candidateValuesPrinted: false,
  rawSecretValuesPrinted: false,
  envReadEnabled: false,
  separateRuntimeLiveExecutionApprovalRequired: true,
  routeCount: 8,
  allowedOperations: ['readiness', 'metadata_only'],
  blockedOperations: [
    'env_read',
    'provider_call',
    'wallet_mutation',
    'db_write',
    'money_movement',
    'runtime_live_provider_call',
  ],
});

export function getTaxiProviderBindingLiveEnableReadyControl025I(): TaxiProviderBindingLiveEnableReadyControl025I {
  return taxiProviderBindingLiveEnableReadyControl025I;
}
