import {
  TAXI_DB_RUNTIME_DRY_RUN_APPROVAL_SAFETY_002S,
  TAXI_DB_RUNTIME_DRY_RUN_APPROVAL_VERSION_002S,
  TAXI_DB_RUNTIME_DRY_RUN_COUNTS_002S,
  TAXI_DB_RUNTIME_DRY_RUN_GATES_002S,
} from './constants';
import type {
  TaxiDbRuntimeDryRunApproval002S,
  TaxiDbRuntimeDryRunApprovalEvaluation002S,
} from './types';

export const buildTaxiDbRuntimeDryRunApproval002S = (): TaxiDbRuntimeDryRunApproval002S => ({
  version: TAXI_DB_RUNTIME_DRY_RUN_APPROVAL_VERSION_002S,
  status: 'dry_run_approval_required',
  ...TAXI_DB_RUNTIME_DRY_RUN_COUNTS_002S,
  dryRunGateCount: TAXI_DB_RUNTIME_DRY_RUN_GATES_002S.length,
  requiresSeparateExactOwnerApproval: true,
  dbRuntimeReadDryRunApprovedNow: false,
  dbRuntimeWriteApprovedNow: false,
  walletRuntimeApprovedNow: false,
  providerRuntimeApprovedNow: false,
  paymentRuntimeApprovedNow: false,
  gates: TAXI_DB_RUNTIME_DRY_RUN_GATES_002S,
  safety: TAXI_DB_RUNTIME_DRY_RUN_APPROVAL_SAFETY_002S,
  nextStep: '002T controlled read-only DB runtime dry-run route patch',
});

export const evaluateTaxiDbRuntimeDryRunApproval002S = (): TaxiDbRuntimeDryRunApprovalEvaluation002S => {
  const approval = buildTaxiDbRuntimeDryRunApproval002S();
  const blockingGateKeys = approval.gates
    .filter((gate) => gate.requiredBeforeNextStep && !gate.passedNow)
    .map((gate) => gate.key);

  return {
    version: approval.version,
    approvalPackReady: true,
    safeToPrepareReadOnlyRuntimePatch: true,
    dbRuntimeStillDisabled: true,
    walletProviderPaymentStillDisabled: true,
    gateCount: approval.gates.length,
    blockingGateKeys,
    nextStep: approval.nextStep,
  };
};
