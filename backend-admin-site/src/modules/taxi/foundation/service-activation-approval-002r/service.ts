import {
  TAXI_SERVICE_ACTIVATION_APPROVAL_SAFETY_002R,
  TAXI_SERVICE_ACTIVATION_APPROVAL_VERSION_002R,
  TAXI_SERVICE_ACTIVATION_COUNTS_002R,
  TAXI_SERVICE_ACTIVATION_GATES_002R,
} from './constants';
import type { TaxiServiceActivationApproval002R, TaxiServiceActivationApprovalEvaluation002R } from './types';

export const buildTaxiServiceActivationApproval002R = (): TaxiServiceActivationApproval002R => ({
  version: TAXI_SERVICE_ACTIVATION_APPROVAL_VERSION_002R,
  status: 'approval_required',
  ...TAXI_SERVICE_ACTIVATION_COUNTS_002R,
  serviceActivationGateCount: TAXI_SERVICE_ACTIVATION_GATES_002R.length,
  requiresSeparateExactOwnerApproval: true,
  dbRuntimeReadApprovedNow: false,
  dbRuntimeWriteApprovedNow: false,
  walletRuntimeApprovedNow: false,
  providerRuntimeApprovedNow: false,
  paymentRuntimeApprovedNow: false,
  gates: TAXI_SERVICE_ACTIVATION_GATES_002R,
  safety: TAXI_SERVICE_ACTIVATION_APPROVAL_SAFETY_002R,
  nextStep: '002S controlled DB runtime activation dry-run approval',
});

export const evaluateTaxiServiceActivationApproval002R = (): TaxiServiceActivationApprovalEvaluation002R => {
  const approval = buildTaxiServiceActivationApproval002R();
  const blockingGateKeys = approval.gates
    .filter((gate) => gate.requiredBeforeActivation && !gate.passedNow)
    .map((gate) => gate.key);

  return {
    version: approval.version,
    readyForNextApprovalPack: true,
    allPriorRuntimeEvidenceRequired: true,
    allRuntimeGatesStillSafeDisabled: true,
    gateCount: approval.gates.length,
    blockingGateKeys,
    nextStep: approval.nextStep,
  };
};
