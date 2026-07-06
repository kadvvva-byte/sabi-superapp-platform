import type {
  TAXI_AGENT_APPLICATION_ACCESS_029A_VERSION,
  TAXI_AGENT_APPLICATION_REQUIRED_FIELDS_029A,
  TAXI_AGENT_APPLICATION_ACCESS_ROUTES_029A,
} from './constants';

export type TaxiAgentApplicationRequiredField029A = typeof TAXI_AGENT_APPLICATION_REQUIRED_FIELDS_029A[number];
export type TaxiAgentApplicationAccessRoute029A = typeof TAXI_AGENT_APPLICATION_ACCESS_ROUTES_029A[number];

export type TaxiAgentApplicationAccessReadiness029A = Readonly<{
  version: typeof TAXI_AGENT_APPLICATION_ACCESS_029A_VERSION;
  status: 'source_ready_safe_disabled_until_db_mobile_auth_wallet_provider';
  agentApplicationRequiredBeforeAgentRole: true;
  fullAgentDataRequired: true;
  adminApprovalRequiredBeforeMobileAgentScreen: true;
  mobileAgentScreenLockedForNonAgents: true;
  approvedTaxiAgentOnlyCanRequestDriverBalanceTopup: true;
  driverSelfTopupAllowedNow: false;
  driverBalanceTopupOnlyViaApprovedAgentNow: true;
  officialPaymentLinkRequired: true;
  proofOrTxHashRequiredBeforeCredit: true;
  serverCountryCurrencyAndFxOnly: true;
  noFixedCurrencyInClient: true;
  noFakeApplicationApproval: true;
  noFakePaymentSuccess: true;
  noWalletMutation: true;
  noDbWriteByReadiness: true;
  providerCallPerformed: false;
  moneyMovementPerformed: false;
  routes: readonly TaxiAgentApplicationAccessRoute029A[];
  requiredFields: readonly TaxiAgentApplicationRequiredField029A[];
}>;

export type TaxiAgentApplicationSafeDisabledResponse029A = Readonly<{
  ok: false;
  error: string;
  code: string;
  version: typeof TAXI_AGENT_APPLICATION_ACCESS_029A_VERSION;
  safeDisabled: true;
  dbWritePerformed: false;
  walletMutationPerformed: false;
  providerCallPerformed: false;
  moneyMovementPerformed: false;
  fakeSuccessBlocked: true;
  driverSelfTopupAllowedNow: false;
  driverBalanceTopupOnlyViaApprovedAgentNow: true;
  mobileAgentScreenLockedForNonAgents: true;
  requiredFields: readonly TaxiAgentApplicationRequiredField029A[];
}>;
