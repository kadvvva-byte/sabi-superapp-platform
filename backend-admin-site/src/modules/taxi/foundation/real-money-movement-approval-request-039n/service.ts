import {
  TAXI_REAL_MONEY_MOVEMENT_APPROVAL_REQUEST_039N_NEXT_STEP,
  TAXI_REAL_MONEY_MOVEMENT_APPROVAL_REQUEST_039N_VERSION,
} from './constants';
import type {
  TaxiRealMoneyMovementApprovalRequest039N,
  TaxiRealMoneyMovementApprovalRequestReadiness039N,
  TaxiRealMoneyMovementApprovalRequestSafety039N,
} from './types';

export function getTaxiRealMoneyMovementApprovalRequestSafety039N(): TaxiRealMoneyMovementApprovalRequestSafety039N {
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

export function getTaxiRealMoneyMovementApprovalRequestReadiness039N(): TaxiRealMoneyMovementApprovalRequestReadiness039N {
  return Object.freeze({
    version: TAXI_REAL_MONEY_MOVEMENT_APPROVAL_REQUEST_039N_VERSION,
    status: 'ready_real_money_movement_approval_request_locked_no_execution',
    taxi039NRealMoneyMovementApprovalRequestLockedNoExecution: 100,
    taxi039MRealWalletExecutionLockedGateNoMoneyMovement: 100,
    taxi039LRealWalletExecutionPreflightExactOwnerApprovalNoMoneyYet: 100,
    taxiUsesMainGlobalWallet: true,
    standaloneTaxiWalletAllowed: false,
    rideFareCommissionBps: 0,
    visaCashbackBps: 200,
    realMoneyMovementApprovalRequired: true,
    exactOwnerApprovalRequiredBeforeMoneyMovement: true,
    taxiRealWalletFinanceClosurePath: 99,
    taxiBackendFoundationSafeRead: 99,
    taxiAdminUiFunctional: 99,
    taxiMobileUnifiedOrganismUi: 100,
    taxiOwnerSabiAiControl: 100,
    taxiRealWalletPaymentPayoutProviderDbExecution: '0_locked_until_separate_exact_owner_approval_and_verified_provider_wallet_runtime',
    taxiFullProductionReadiness: 99,
  });
}

export function getTaxiRealMoneyMovementApprovalRequest039N(): TaxiRealMoneyMovementApprovalRequest039N {
  return Object.freeze({
    version: TAXI_REAL_MONEY_MOVEMENT_APPROVAL_REQUEST_039N_VERSION,
    status: 'real_money_movement_approval_required_locked_no_execution',
    mode: 'real_money_movement_approval_request_locked_no_execution',
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
    realMoneyMovementApprovalRequired: true,
    exactOwnerApprovalRequiredBeforeMoneyMovement: true,
    finalMoneyMovementLockedUntilOwnerApproval: true,
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
    safety: getTaxiRealMoneyMovementApprovalRequestSafety039N(),
    nextStep: TAXI_REAL_MONEY_MOVEMENT_APPROVAL_REQUEST_039N_NEXT_STEP,
  });
}
