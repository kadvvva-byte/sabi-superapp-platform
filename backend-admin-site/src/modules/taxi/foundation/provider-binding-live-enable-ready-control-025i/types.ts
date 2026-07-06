export const TAXI_PROVIDER_BINDING_LIVE_ENABLE_READY_CONTROL_025I_VERSION = 'TAXI-PROVIDER-BINDING-LIVE-ENABLE-READY-CONTROL-025I' as const;

export type TaxiProviderBindingLiveEnablementMode025I = 'safe_disabled_live_enablement_ready_only';

export type TaxiProviderBindingLiveEnableReadyControl025I = Readonly<{
  version: typeof TAXI_PROVIDER_BINDING_LIVE_ENABLE_READY_CONTROL_025I_VERSION;
  mode: TaxiProviderBindingLiveEnablementMode025I;
  sourceRegistry: 'provider-binding-safe-disabled-registry-025g';
  registrySafeDisabled: true;
  liveProviderBindingEnabled: false;
  runtimeLiveProviderCallEnabled: false;
  providerCallEnabled: false;
  walletMutationEnabled: false;
  dbWriteEnabled: false;
  moneyMovementEnabled: false;
  candidateValuesPrinted: false;
  rawSecretValuesPrinted: false;
  envReadEnabled: false;
  separateRuntimeLiveExecutionApprovalRequired: true;
  routeCount: 8;
  allowedOperations: readonly ['readiness', 'metadata_only'];
  blockedOperations: readonly [
    'env_read',
    'provider_call',
    'wallet_mutation',
    'db_write',
    'money_movement',
    'runtime_live_provider_call'
  ];
}>;
