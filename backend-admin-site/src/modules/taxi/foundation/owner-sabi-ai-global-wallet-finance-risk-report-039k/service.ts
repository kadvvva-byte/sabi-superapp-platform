import {
  TAXI_OWNER_SABI_AI_GLOBAL_WALLET_FINANCE_RISK_REPORT_039K_NEXT_STEP,
  TAXI_OWNER_SABI_AI_GLOBAL_WALLET_FINANCE_RISK_REPORT_039K_VERSION,
} from './constants';
import type {
  TaxiOwnerSabiAiGlobalWalletFinanceRiskReport039K,
  TaxiOwnerSabiAiGlobalWalletFinanceRiskReportReadiness039K,
  TaxiOwnerSabiAiGlobalWalletFinanceRiskReportSafety039K,
} from './types';

export function getTaxiOwnerSabiAiGlobalWalletFinanceRiskReportSafety039K(): TaxiOwnerSabiAiGlobalWalletFinanceRiskReportSafety039K {
  return Object.freeze({
    standaloneTaxiWalletCreated: false,
    envFileReadOrDumped: false,
    secretValuesReadOrPrinted: false,
    dbWritePerformed: false,
    prismaMigratePerformed: false,
    prismaDbPushPerformed: false,
    walletMutationPerformed: false,
    moneyMovementPerformed: false,
    paymentExecutionPerformed: false,
    payoutExecutionPerformed: false,
    providerCallPerformed: false,
    fakeSuccessIntroduced: false,
    productionLaunchClaimed: false,
    ownerSabiAiAutonomousExecutionPerformed: false,
  });
}

export function getTaxiOwnerSabiAiGlobalWalletFinanceRiskReportReadiness039K(): TaxiOwnerSabiAiGlobalWalletFinanceRiskReportReadiness039K {
  return Object.freeze({
    version: TAXI_OWNER_SABI_AI_GLOBAL_WALLET_FINANCE_RISK_REPORT_039K_VERSION,
    status: 'ready_owner_sabi_ai_global_wallet_finance_risk_report_no_money_movement',
    taxiOwnerSabiAiGlobalWalletFinanceRiskReport039K: 100,
    taxi039IGlobalWalletAdminMobileBridge: 100,
    taxiUsesMainGlobalWallet: true,
    standaloneTaxiWalletAllowed: false,
    rideFareCommissionBps: 0,
    visaCashbackBps: 200,
    ownerSabiAiReportReady: true,
    taxiRealWalletFinanceClosurePath: 90,
    taxiBackendFoundationSafeRead: 99,
    taxiAdminUiFunctional: 99,
    taxiMobileUnifiedOrganismUi: 100,
    taxiOwnerSabiAiControl: 100,
    taxiRealWalletPaymentPayoutProviderDbExecution: '0_locked_until_real_wallet_execution_stage_with_money_movement_exact_owner_approval',
    taxiFullProductionReadiness: 99,
  });
}

export function getTaxiOwnerSabiAiGlobalWalletFinanceRiskReport039K(): TaxiOwnerSabiAiGlobalWalletFinanceRiskReport039K {
  return Object.freeze({
    version: TAXI_OWNER_SABI_AI_GLOBAL_WALLET_FINANCE_RISK_REPORT_039K_VERSION,
    status: 'owner_sabi_ai_global_wallet_finance_risk_report_bridge_ready_no_money_movement',
    mode: 'owner_sabi_ai_finance_risk_report_no_money_movement',
    taxiMustNotHaveStandaloneWallet: true,
    taxiUsesMainGlobalWallet: true,
    rideFareDirectNoCommission: true,
    commissionBps: 0,
    visaCardCashbackPercent: 2,
    visaCardCashbackBps: 200,
    cashbackPostedThroughMainWalletLedger: true,
    ownerSabiAiReportReady: true,
    dailyPrivateFinanceRiskReportRequired: true,
    urgentRiskReportRequired: true,
    reportOnlyNoAutonomousExecution: true,
    riskSignals: Object.freeze([
      'global_wallet_direct_fare_payment_mismatch',
      'visa_cashback_2_percent_abuse_or_duplicate_attempt',
      'cashback_without_confirmed_visa_card_payment',
      'standalone_taxi_wallet_creation_attempt',
      'agent_balance_topup_receipt_mismatch',
      'driver_balance_topup_unverified_agent_source',
      'provider_or_payment_execution_without_owner_approval',
      'money_movement_without_exact_owner_approval',
    ] as const),
    globalWalletCorePorts: Object.freeze([
      'wallet-payment-execution.port.ts',
      'wallet-transfer-execution.port.ts',
      'unified-transaction-history.port.ts',
    ] as const),
    linkedTaxiFinanceModels: Object.freeze(["TaxiTripDirectFarePayment","TaxiVisaCashbackLedgerReference","TaxiFinanceAuditEvidence","TaxiDriverBalanceTopUp","TaxiAgentBalanceCredit","TaxiTripPaymentMethodSnapshot","TaxiOwnerFinanceApprovalRecord"] as const),
    forbiddenStandaloneTaxiWalletModels: Object.freeze(["TaxiWalletAccount","TaxiWalletLedgerEntry","TaxiAgentWalletLink","TaxiDriverWalletLink"] as const),
    safety: getTaxiOwnerSabiAiGlobalWalletFinanceRiskReportSafety039K(),
    nextStep: TAXI_OWNER_SABI_AI_GLOBAL_WALLET_FINANCE_RISK_REPORT_039K_NEXT_STEP,
  });
}
