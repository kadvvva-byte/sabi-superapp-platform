import {
  TAXI_AGENT_FINANCE_ADMIN_MOBILE_BRIDGE_030A_VERSION,
  TAXI_AGENT_FINANCE_ADMIN_MOBILE_BRIDGE_ROUTES_030A,
  TAXI_AGENT_FINANCE_CHAT_REQUIRED_PROOF_FIELDS_030A,
  TAXI_AGENT_APPLICATION_REQUIRED_FIELDS_030B,
} from './constants';
import type {
  TaxiAgentFinanceAdminMobileBridgeReadiness030A,
  TaxiAgentFinanceAdminMobileBridgeSafeDisabledResponse030A,
} from './types';

export function getTaxiAgentFinanceAdminMobileBridgeReadiness030A(): TaxiAgentFinanceAdminMobileBridgeReadiness030A {
  return Object.freeze({
    version: TAXI_AGENT_FINANCE_ADMIN_MOBILE_BRIDGE_030A_VERSION,
    status: 'source_ready_safe_disabled_until_db_storage_wallet_provider_mobile_auth',
    adminUiFoundationReady: true,
    mobileTaxiFoundationReady: true,
    mobileAgentToAdminChatBridgeReady: true,
    agentSendsFilePhotoScreenshotInChat: true,
    ownerAdminSeesProofInsideChat: true,
    ownerAdminPaymentAccountFromServerOnly: true,
    agentCountryCurrencyFromServerOnly: true,
    ownerAdminConfirmsAgentBalanceCreditOnlyAfterVerification: true,
    reportAndArchiveContractsReady: true,
    agentApplicationInTaxiFinanceReady: true,
    agentApplicationFullDataRequired: true,
    ownerAdminReviewsAgentApplicationInFinance: true,
    approvedAgentAccessGateReady: true,
    noDriverFlowInFinance: true,
    noDriverSelfTopup: true,
    noFakeSuccess: true,
    noDbWriteByReadiness: true,
    noWalletMutationByReadiness: true,
    providerCallPerformed: false,
    moneyMovementPerformed: false,
    routes: TAXI_AGENT_FINANCE_ADMIN_MOBILE_BRIDGE_ROUTES_030A,
    proofFields: TAXI_AGENT_FINANCE_CHAT_REQUIRED_PROOF_FIELDS_030A,
    applicationRequiredFields: TAXI_AGENT_APPLICATION_REQUIRED_FIELDS_030B,
  });
}

export function createTaxiAgentFinanceBridgeSafeDisabledResponse030A(
  code: string,
  error = 'taxi_agent_finance_bridge_safe_disabled_until_runtime_binding',
): TaxiAgentFinanceAdminMobileBridgeSafeDisabledResponse030A {
  return Object.freeze({
    ok: false,
    error,
    code,
    version: TAXI_AGENT_FINANCE_ADMIN_MOBILE_BRIDGE_030A_VERSION,
    safeDisabled: true,
    adminUiFoundationReady: true,
    mobileTaxiFoundationReady: true,
    dbWritePerformed: false,
    walletMutationPerformed: false,
    providerCallPerformed: false,
    moneyMovementPerformed: false,
    fakeSuccessBlocked: true,
    noDriverFlowInFinance: true,
    noDriverSelfTopup: true,
    ownerAdminPaymentAccountFromServerOnly: true,
    agentCountryCurrencyFromServerOnly: true,
    agentApplicationInTaxiFinanceReady: true,
    agentApplicationRequiresOwnerAdminApproval: true,
    requiredProofFields: TAXI_AGENT_FINANCE_CHAT_REQUIRED_PROOF_FIELDS_030A,
    requiredApplicationFields: TAXI_AGENT_APPLICATION_REQUIRED_FIELDS_030B,
  });
}
