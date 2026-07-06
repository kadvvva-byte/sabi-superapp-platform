import type {
  TAXI_AGENT_FINANCE_ADMIN_MOBILE_BRIDGE_030A_VERSION,
  TAXI_AGENT_FINANCE_ADMIN_MOBILE_BRIDGE_ROUTES_030A,
  TAXI_AGENT_FINANCE_CHAT_REQUIRED_PROOF_FIELDS_030A,
  TAXI_AGENT_APPLICATION_REQUIRED_FIELDS_030B,
} from './constants';

export type TaxiAgentFinanceAdminMobileBridgeRoute030A = typeof TAXI_AGENT_FINANCE_ADMIN_MOBILE_BRIDGE_ROUTES_030A[number];
export type TaxiAgentFinanceProofField030A = typeof TAXI_AGENT_FINANCE_CHAT_REQUIRED_PROOF_FIELDS_030A[number];
export type TaxiAgentApplicationRequiredField030B = typeof TAXI_AGENT_APPLICATION_REQUIRED_FIELDS_030B[number];

export type TaxiAgentFinanceAdminMobileBridgeReadiness030A = Readonly<{
  version: typeof TAXI_AGENT_FINANCE_ADMIN_MOBILE_BRIDGE_030A_VERSION;
  status: 'source_ready_safe_disabled_until_db_storage_wallet_provider_mobile_auth';
  adminUiFoundationReady: true;
  mobileTaxiFoundationReady: true;
  mobileAgentToAdminChatBridgeReady: true;
  agentSendsFilePhotoScreenshotInChat: true;
  ownerAdminSeesProofInsideChat: true;
  ownerAdminPaymentAccountFromServerOnly: true;
  agentCountryCurrencyFromServerOnly: true;
  ownerAdminConfirmsAgentBalanceCreditOnlyAfterVerification: true;
  reportAndArchiveContractsReady: true;
  agentApplicationInTaxiFinanceReady: true;
  agentApplicationFullDataRequired: true;
  ownerAdminReviewsAgentApplicationInFinance: true;
  approvedAgentAccessGateReady: true;
  noDriverFlowInFinance: true;
  noDriverSelfTopup: true;
  noFakeSuccess: true;
  noDbWriteByReadiness: true;
  noWalletMutationByReadiness: true;
  providerCallPerformed: false;
  moneyMovementPerformed: false;
  routes: readonly TaxiAgentFinanceAdminMobileBridgeRoute030A[];
  proofFields: readonly TaxiAgentFinanceProofField030A[];
  applicationRequiredFields: readonly TaxiAgentApplicationRequiredField030B[];
}>;

export type TaxiAgentFinanceAdminMobileBridgeSafeDisabledResponse030A = Readonly<{
  ok: false;
  error: string;
  code: string;
  version: typeof TAXI_AGENT_FINANCE_ADMIN_MOBILE_BRIDGE_030A_VERSION;
  safeDisabled: true;
  adminUiFoundationReady: true;
  mobileTaxiFoundationReady: true;
  dbWritePerformed: false;
  walletMutationPerformed: false;
  providerCallPerformed: false;
  moneyMovementPerformed: false;
  fakeSuccessBlocked: true;
  noDriverFlowInFinance: true;
  noDriverSelfTopup: true;
  ownerAdminPaymentAccountFromServerOnly: true;
  agentCountryCurrencyFromServerOnly: true;
  agentApplicationInTaxiFinanceReady: true;
  agentApplicationRequiresOwnerAdminApproval: true;
  requiredProofFields: readonly TaxiAgentFinanceProofField030A[];
  requiredApplicationFields: readonly TaxiAgentApplicationRequiredField030B[];
}>;
