import { taxiDbWriteActivationGates002W, taxiDbWriteActivationSnapshot002W, taxiDbWriteOperationKeys002W } from './constants';
import type { TaxiDbWriteActivationSnapshot002W } from './types';

export function getTaxiDbWriteActivationSnapshot002W(): TaxiDbWriteActivationSnapshot002W {
  return taxiDbWriteActivationSnapshot002W;
}

export function evaluateTaxiDbWriteActivationReadiness002W(): Readonly<{
  version: string;
  canProceedTo002XRoutePatchApproval: boolean;
  dbRuntimeWriteApprovedNow: false;
  walletRuntimeApprovedNow: false;
  providerRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  blockedGateKeys: readonly string[];
  writeOperationCount: number;
}> {
  const blockedGateKeys = taxiDbWriteActivationGates002W.filter((gate) => !gate.approvedNow).map((gate) => gate.key);
  return {
    version: taxiDbWriteActivationSnapshot002W.version,
    canProceedTo002XRoutePatchApproval:
      taxiDbWriteActivationSnapshot002W.readOnlyDbRuntimeFinalized002V === true &&
      taxiDbWriteActivationSnapshot002W.writeOperationCount === 44 &&
      taxiDbWriteActivationSnapshot002W.fakeSuccessBlocked === true,
    dbRuntimeWriteApprovedNow: false,
    walletRuntimeApprovedNow: false,
    providerRuntimeApprovedNow: false,
    paymentRuntimeApprovedNow: false,
    blockedGateKeys,
    writeOperationCount: taxiDbWriteOperationKeys002W.length,
  } as const;
}
