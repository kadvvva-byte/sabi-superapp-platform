import {
  TAXI_AGENT_APPLICATION_ACCESS_029A_VERSION,
  TAXI_AGENT_APPLICATION_ACCESS_ROUTES_029A,
  TAXI_AGENT_APPLICATION_REQUIRED_FIELDS_029A,
} from './constants';
import type {
  TaxiAgentApplicationAccessReadiness029A,
  TaxiAgentApplicationSafeDisabledResponse029A,
} from './types';

export function getTaxiAgentApplicationAccessReadiness029A(): TaxiAgentApplicationAccessReadiness029A {
  return Object.freeze({
    version: TAXI_AGENT_APPLICATION_ACCESS_029A_VERSION,
    status: 'source_ready_safe_disabled_until_db_mobile_auth_wallet_provider',
    agentApplicationRequiredBeforeAgentRole: true,
    fullAgentDataRequired: true,
    adminApprovalRequiredBeforeMobileAgentScreen: true,
    mobileAgentScreenLockedForNonAgents: true,
    approvedTaxiAgentOnlyCanRequestDriverBalanceTopup: true,
    driverSelfTopupAllowedNow: false,
    driverBalanceTopupOnlyViaApprovedAgentNow: true,
    officialPaymentLinkRequired: true,
    proofOrTxHashRequiredBeforeCredit: true,
    serverCountryCurrencyAndFxOnly: true,
    noFixedCurrencyInClient: true,
    noFakeApplicationApproval: true,
    noFakePaymentSuccess: true,
    noWalletMutation: true,
    noDbWriteByReadiness: true,
    providerCallPerformed: false,
    moneyMovementPerformed: false,
    routes: TAXI_AGENT_APPLICATION_ACCESS_ROUTES_029A,
    requiredFields: TAXI_AGENT_APPLICATION_REQUIRED_FIELDS_029A,
  });
}

export function createTaxiAgentSafeDisabledResponse029A(code: string, error = 'taxi_agent_flow_safe_disabled_until_runtime_binding'): TaxiAgentApplicationSafeDisabledResponse029A {
  return Object.freeze({
    ok: false,
    error,
    code,
    version: TAXI_AGENT_APPLICATION_ACCESS_029A_VERSION,
    safeDisabled: true,
    dbWritePerformed: false,
    walletMutationPerformed: false,
    providerCallPerformed: false,
    moneyMovementPerformed: false,
    fakeSuccessBlocked: true,
    driverSelfTopupAllowedNow: false,
    driverBalanceTopupOnlyViaApprovedAgentNow: true,
    mobileAgentScreenLockedForNonAgents: true,
    requiredFields: TAXI_AGENT_APPLICATION_REQUIRED_FIELDS_029A,
  });
}
