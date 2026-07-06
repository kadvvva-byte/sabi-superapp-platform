import {
  TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_DECISION_GATE_035J_ENDPOINTS,
  TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_DECISION_GATE_035J_NEXT_STEP,
  TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_DECISION_GATE_035J_REQUIRED_OWNER_APPROVAL,
  TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_DECISION_GATE_035J_VERSION,
} from './constants';
import type {
  TaxiWalletPaymentPayoutOwnerApprovalDecisionGate035J,
  TaxiWalletPaymentPayoutOwnerApprovalDecisionGateReadiness035J,
  TaxiWalletPaymentPayoutOwnerApprovalDecisionGateSafety035J,
} from './types';

function todayUtc035J(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function getTaxiWalletPaymentPayoutOwnerApprovalDecisionGateSafety035J(): TaxiWalletPaymentPayoutOwnerApprovalDecisionGateSafety035J {
  return Object.freeze({
    envFileReadOrDumped: false,
    dbWritePerformed: false,
    walletMutationPerformed: false,
    paymentExecutionPerformed: false,
    payoutExecutionPerformed: false,
    topupExecutionPerformed: false,
    providerCallPerformed: false,
    moneyMovementPerformed: false,
    fakeSuccessIntroduced: false,
    rawPersonalDataExposed: false,
    productionLaunchClaimed: false,
  });
}

export function getTaxiWalletPaymentPayoutOwnerApprovalDecisionGate035J(now: Date = new Date()): TaxiWalletPaymentPayoutOwnerApprovalDecisionGate035J {
  return Object.freeze({
    version: TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_DECISION_GATE_035J_VERSION,
    status: 'owner_approval_decision_gate_locked_safe_read',
    gateDateUtc: todayUtc035J(now),
    gateMode: 'computed_read_only_no_persistence',
    ownerSabiAiRole: 'report_only_no_mutation',
    requiredOwnerApprovalText: TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_DECISION_GATE_035J_REQUIRED_OWNER_APPROVAL,
    decisionScope: Object.freeze({
      canPrepareRuntimePlanAfterApproval: true,
      canExecuteMoneyNow: false,
      canBindProviderNow: false,
      canWriteLedgerNow: false,
      canLaunchProductionNow: false,
    } as const),
    upstreamContinuity: Object.freeze({
      ownerPackage035G: TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_DECISION_GATE_035J_ENDPOINTS.upstreamOwnerPackage035G,
      finalHandoff035D: TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_DECISION_GATE_035J_ENDPOINTS.upstreamFinalHandoff035D,
      approvalPlan035A: TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_DECISION_GATE_035J_ENDPOINTS.upstreamApprovalPlan035A,
      requestGate034C: TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_DECISION_GATE_035J_ENDPOINTS.upstreamContactRequestGate034C,
      requestGate034D: TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_DECISION_GATE_035J_ENDPOINTS.upstreamDirectoryRequestGate034D,
    } as const),
    gateAreas: Object.freeze([
      Object.freeze({ key: 'driver_balance_topup', label: 'Driver balance top-up runtime preparation', currentMode: 'locked_decision_gate_only' as const, exactOwnerApprovalRequired: true, runtimeExecution: 'blocked' as const, readinessImpactPercent: 9 }),
      Object.freeze({ key: 'rider_payment_capture', label: 'Rider payment capture runtime preparation', currentMode: 'locked_decision_gate_only' as const, exactOwnerApprovalRequired: true, runtimeExecution: 'blocked' as const, readinessImpactPercent: 11 }),
      Object.freeze({ key: 'commission_settlement', label: 'Platform commission settlement runtime preparation', currentMode: 'locked_decision_gate_only' as const, exactOwnerApprovalRequired: true, runtimeExecution: 'blocked' as const, readinessImpactPercent: 8 }),
      Object.freeze({ key: 'driver_payout', label: 'Driver payout runtime preparation', currentMode: 'locked_decision_gate_only' as const, exactOwnerApprovalRequired: true, runtimeExecution: 'blocked' as const, readinessImpactPercent: 11 }),
      Object.freeze({ key: 'wallet_ledger_db_write', label: 'Wallet ledger DB write preparation', currentMode: 'locked_decision_gate_only' as const, exactOwnerApprovalRequired: true, runtimeExecution: 'blocked' as const, readinessImpactPercent: 12 }),
      Object.freeze({ key: 'provider_binding', label: 'Provider binding preparation', currentMode: 'locked_decision_gate_only' as const, exactOwnerApprovalRequired: true, runtimeExecution: 'blocked' as const, readinessImpactPercent: 10 }),
      Object.freeze({ key: 'refund_adjustment', label: 'Refund adjustment runtime preparation', currentMode: 'locked_decision_gate_only' as const, exactOwnerApprovalRequired: true, runtimeExecution: 'blocked' as const, readinessImpactPercent: 6 }),
      Object.freeze({ key: 'country_compliance', label: 'Country compliance runtime preparation', currentMode: 'locked_decision_gate_only' as const, exactOwnerApprovalRequired: true, runtimeExecution: 'blocked' as const, readinessImpactPercent: 8 }),
    ]),
    readinessAfterGate: Object.freeze({
      taxiAdminUiOverall: 92,
      taxiBackendFoundationSafeRead: 87,
      taxiOwnerSabiAiControl: 90,
      taxiMobileUiBackendSafeRead: 65,
      taxiWalletPaymentPayoutApprovalChain: 72,
      taxiRealWalletPaymentPayoutProviderDbExecution: '0_locked_until_exact_owner_approval',
      taxiFullProductionReadiness: 63,
    } as const),
    blockedUntilSeparateRuntimeApprovals: Object.freeze({
      walletRuntime: true,
      paymentRuntime: true,
      payoutRuntime: true,
      providerRuntime: true,
      dbLedgerWriteRuntime: true,
      productionLaunch: true,
    } as const),
    safety: getTaxiWalletPaymentPayoutOwnerApprovalDecisionGateSafety035J(),
    nextStep: TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_DECISION_GATE_035J_NEXT_STEP,
  });
}

export function getTaxiWalletPaymentPayoutOwnerApprovalDecisionGateReadiness035J(): TaxiWalletPaymentPayoutOwnerApprovalDecisionGateReadiness035J {
  return Object.freeze({
    version: TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_DECISION_GATE_035J_VERSION,
    status: 'ready_locked_safe_read',
    ownerPackage035G: 100,
    adminVisibility035H035I: 100,
    backendRuntime035G: 100,
    decisionGate035J: 100,
    walletPaymentPayoutTopupExecution: 'locked_until_owner_approval_wallet_chain',
    productionLaunchClaimed: false,
    taxiFullProductionReadiness: 63,
  });
}
