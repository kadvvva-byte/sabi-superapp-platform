import type { TAXI_WALLET_PAYMENT_PAYOUT_OWNER_EXECUTION_LAYER_SPLIT_035N_VERSION } from './constants';

export type TaxiWalletPaymentPayoutOwnerExecutionLayerSplit035NVersion = typeof TAXI_WALLET_PAYMENT_PAYOUT_OWNER_EXECUTION_LAYER_SPLIT_035N_VERSION;

export type TaxiWalletPaymentPayoutExecutionApprovalLayer035N = Readonly<{
  key: string;
  label: string;
  approvalCommandKey: string;
  ownerApprovalRequired: true;
  adminCanPrepare: true;
  ownerSabiAiCanReport: true;
  runtimeExecution: 'blocked';
  currentMode: 'locked_safe_read_split_only';
  dependsOn: readonly string[];
  cannotExecuteSignals: readonly string[];
}>;

export type TaxiWalletPaymentPayoutOwnerExecutionLayerSplitSafety035N = Readonly<{
  envFileReadOrDumped: false;
  dbWritePerformed: false;
  walletMutationPerformed: false;
  paymentExecutionPerformed: false;
  payoutExecutionPerformed: false;
  topupExecutionPerformed: false;
  providerCallPerformed: false;
  moneyMovementPerformed: false;
  fakeSuccessIntroduced: false;
  rawPersonalDataExposed: false;
  productionLaunchClaimed: false;
}>;

export type TaxiWalletPaymentPayoutOwnerExecutionLayerSplit035N = Readonly<{
  version: TaxiWalletPaymentPayoutOwnerExecutionLayerSplit035NVersion;
  status: 'owner_execution_layer_split_locked_safe_read';
  splitDateUtc: string;
  splitMode: 'computed_read_only_no_persistence';
  requiredOwnerApprovalText: string;
  ownerSabiAiRole: 'report_only_no_mutation';
  scope: Readonly<{
    canSplitApprovalLayers: true;
    canExecuteWalletNow: false;
    canExecutePaymentNow: false;
    canExecutePayoutNow: false;
    canBindProviderNow: false;
    canWriteDbLedgerNow: false;
    canLaunchProductionNow: false;
  }>;
  upstreamContinuity: Readonly<{
    executionPreflight035L: string;
    decisionGate035J: string;
    ownerPackage035G: string;
    finalHandoff035D: string;
    requestGate034C: string;
    requestGate034D: string;
  }>;
  approvalLayers: readonly TaxiWalletPaymentPayoutExecutionApprovalLayer035N[];
  approvalsStillRequired: Readonly<{
    walletRuntimeApproval: true;
    riderPaymentCaptureApproval: true;
    driverTopupApproval: true;
    commissionSettlementApproval: true;
    driverPayoutApproval: true;
    providerBindingApproval: true;
    dbLedgerWriteApproval: true;
    refundAdjustmentApproval: true;
    productionLaunchApproval: true;
  }>;
  readinessAfterSplit: Readonly<{
    taxiAdminUiOverall: 94;
    taxiBackendFoundationSafeRead: 91;
    taxiOwnerSabiAiControl: 92;
    taxiMobileUiBackendSafeRead: 65;
    taxiWalletPaymentPayoutApprovalChain: 85;
    taxiRealWalletPaymentPayoutProviderDbExecution: '0_locked_until_exact_owner_approval';
    taxiFullProductionReadiness: 72;
  }>;
  safety: TaxiWalletPaymentPayoutOwnerExecutionLayerSplitSafety035N;
  nextStep: string;
}>;

export type TaxiWalletPaymentPayoutOwnerExecutionLayerSplitReadiness035N = Readonly<{
  version: TaxiWalletPaymentPayoutOwnerExecutionLayerSplit035NVersion;
  status: 'ready_locked_safe_read';
  decisionGate035J: 100;
  executionPreflight035L: 100;
  adminVisibility035M: 100;
  ownerExecutionLayerSplit035N: 100;
  walletPaymentPayoutTopupExecution: 'locked_until_exact_owner_approval';
  productionLaunchClaimed: false;
  taxiAdminUiOverall: 94;
  taxiBackendFoundationSafeRead: 91;
  taxiOwnerSabiAiControl: 92;
  taxiMobileUiBackendSafeRead: 65;
  taxiWalletPaymentPayoutApprovalChain: 85;
  taxiRealWalletPaymentPayoutProviderDbExecution: '0_locked_until_exact_owner_approval';
  taxiFullProductionReadiness: 72;
}>;
