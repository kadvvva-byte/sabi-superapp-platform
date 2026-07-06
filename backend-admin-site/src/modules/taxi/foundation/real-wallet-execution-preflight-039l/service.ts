import {
  TAXI_REAL_WALLET_EXECUTION_PREFLIGHT_039L_NEXT_STEP,
  TAXI_REAL_WALLET_EXECUTION_PREFLIGHT_039L_VERSION,
} from './constants';
import type {
  TaxiRealWalletExecutionPreflight039L,
  TaxiRealWalletExecutionPreflightReadiness039L,
  TaxiRealWalletExecutionPreflightSafety039L,
} from './types';

export function getTaxiRealWalletExecutionPreflightSafety039L(): TaxiRealWalletExecutionPreflightSafety039L {
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

export function getTaxiRealWalletExecutionPreflightReadiness039L(): TaxiRealWalletExecutionPreflightReadiness039L {
  return Object.freeze({
    version: TAXI_REAL_WALLET_EXECUTION_PREFLIGHT_039L_VERSION,
    status: 'ready_real_wallet_execution_preflight_no_money_movement',
    taxiRealWalletExecutionPreflight039L: 100,
    taxi039IGlobalWalletAdminMobileBridge: 100,
    taxiUsesMainGlobalWallet: true,
    standaloneTaxiWalletAllowed: false,
    rideFareCommissionBps: 0,
    visaCashbackBps: 200,
    ownerSabiAiReportReady: true,
    taxiRealWalletFinanceClosurePath: 95,
    taxiBackendFoundationSafeRead: 99,
    taxiAdminUiFunctional: 99,
    taxiMobileUnifiedOrganismUi: 100,
    taxiOwnerSabiAiControl: 100,
    taxiRealWalletPaymentPayoutProviderDbExecution: '0_locked_until_real_wallet_execution_stage_with_money_movement_exact_owner_approval',
    taxiFullProductionReadiness: 99,
  });
}

export function getTaxiRealWalletExecutionPreflight039L(): TaxiRealWalletExecutionPreflight039L {
  return Object.freeze({
    version: TAXI_REAL_WALLET_EXECUTION_PREFLIGHT_039L_VERSION,
    status: 'real_wallet_execution_preflight_ready_no_money_movement',
    mode: 'real_wallet_execution_preflight_no_money_movement',
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
    linkedTaxiFinanceModels: Object.freeze([
      'TaxiTripDirectFarePayment',
      'TaxiVisaCashbackLedgerReference',
      'TaxiFinanceAuditEvidence',
      'TaxiDriverBalanceTopUp',
      'TaxiAgentBalanceCredit',
      'TaxiTripPaymentMethodSnapshot',
      'TaxiOwnerFinanceApprovalRecord',
    ] as const),
    forbiddenStandaloneTaxiWalletModels: Object.freeze([
      'TaxiWalletAccount',
      'TaxiWalletLedgerEntry',
      'TaxiAgentWalletLink',
      'TaxiDriverWalletLink',
    ] as const),
    safety: getTaxiRealWalletExecutionPreflightSafety039L(),
    nextStep: TAXI_REAL_WALLET_EXECUTION_PREFLIGHT_039L_NEXT_STEP,
  });
}
