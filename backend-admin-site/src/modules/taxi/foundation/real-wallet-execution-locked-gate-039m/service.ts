import {
  TAXI_REAL_WALLET_EXECUTION_LOCKED_GATE_039M_NEXT_STEP,
  TAXI_REAL_WALLET_EXECUTION_LOCKED_GATE_039M_VERSION,
} from './constants';
import type {
  TaxiRealWalletExecutionLockedGate039M,
  TaxiRealWalletExecutionLockedGateReadiness039M,
  TaxiRealWalletExecutionLockedGateSafety039M,
} from './types';

export function getTaxiRealWalletExecutionLockedGateSafety039M(): TaxiRealWalletExecutionLockedGateSafety039M {
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

export function getTaxiRealWalletExecutionLockedGateReadiness039M(): TaxiRealWalletExecutionLockedGateReadiness039M {
  return Object.freeze({
    version: TAXI_REAL_WALLET_EXECUTION_LOCKED_GATE_039M_VERSION,
    status: 'ready_real_wallet_execution_locked_gate_no_money_movement',
    taxi039MRealWalletExecutionLockedGateNoMoneyMovement: 100,
    taxi039LRealWalletExecutionPreflightExactOwnerApprovalNoMoneyYet: 100,
    taxiUsesMainGlobalWallet: true,
    standaloneTaxiWalletAllowed: false,
    rideFareCommissionBps: 0,
    visaCashbackBps: 200,
    realWalletExecutionLocked: true,
    exactOwnerApprovalRequiredBeforeMoneyMovement: true,
    taxiRealWalletFinanceClosurePath: 98,
    taxiBackendFoundationSafeRead: 99,
    taxiAdminUiFunctional: 99,
    taxiMobileUnifiedOrganismUi: 100,
    taxiOwnerSabiAiControl: 100,
    taxiRealWalletPaymentPayoutProviderDbExecution: '0_locked_until_real_money_movement_exact_owner_approval_and_verified_provider_wallet_runtime',
    taxiFullProductionReadiness: 99,
  });
}

export function getTaxiRealWalletExecutionLockedGate039M(): TaxiRealWalletExecutionLockedGate039M {
  return Object.freeze({
    version: TAXI_REAL_WALLET_EXECUTION_LOCKED_GATE_039M_VERSION,
    status: 'real_wallet_execution_locked_until_exact_owner_approval_no_money_movement',
    mode: 'real_wallet_execution_locked_gate_no_money_movement',
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
    realWalletExecutionLocked: true,
    exactOwnerApprovalRequiredBeforeMoneyMovement: true,
    finalExecutionLockedUntilOwnerApproval: true,
    blockedExecutionTargets: Object.freeze([
      'direct_fare_payment_capture',
      'visa_cashback_ledger_credit',
      'wallet_transfer',
      'wallet_credit_debit',
      'provider_payment_call',
      'payout_execution',
      'db_write_runtime_mutation',
      'production_launch',
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
    safety: getTaxiRealWalletExecutionLockedGateSafety039M(),
    nextStep: TAXI_REAL_WALLET_EXECUTION_LOCKED_GATE_039M_NEXT_STEP,
  });
}
