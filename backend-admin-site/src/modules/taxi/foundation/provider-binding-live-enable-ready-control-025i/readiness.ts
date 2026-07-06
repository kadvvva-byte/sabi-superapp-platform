import { getTaxiProviderBindingLiveEnableReadyControl025I } from './control';

export const taxiProviderBindingLiveEnableReadyReadiness025I = Object.freeze({
  ...getTaxiProviderBindingLiveEnableReadyControl025I(),
  status: 'ready_for_separate_runtime_live_execution_approval',
  safeDisabledSourceSwitchPrepared: true,
  safeDisabledRegistryRequired: true,
  liveExecutionApprovalStillRequired: true,
  providerReferenceLabelsOnly: true,
  branchlessProviderRoutingPreserved: true,
  driverSelfTopupDisabledNowPreserved: true,
  countryCurrencyRoutesPreserved: true,
  driverBalanceTopupOnlyViaApprovedAgentNow: true,
});

export function getTaxiProviderBindingLiveEnableReadyReadiness025I() {
  return taxiProviderBindingLiveEnableReadyReadiness025I;
}
