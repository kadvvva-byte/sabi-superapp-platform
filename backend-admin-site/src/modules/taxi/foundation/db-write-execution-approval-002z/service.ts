import { taxiDbWriteExecutionApprovalGates002Z, taxiDbWriteExecutionApprovalSnapshot002Z, taxiDbWriteExecutionOperationKeys002Z } from './constants';
import type { TaxiDbWriteExecutionApprovalSnapshot002Z } from './types';

export function getTaxiDbWriteExecutionApprovalSnapshot002Z(): TaxiDbWriteExecutionApprovalSnapshot002Z {
  return taxiDbWriteExecutionApprovalSnapshot002Z;
}

export function evaluateTaxiDbWriteExecutionApprovalReadiness002Z(): Readonly<{
  version: string;
  canRequest003AExactWriteSmokeApproval: boolean;
  dbRuntimeWriteExecutionApprovedNow: false;
  walletRuntimeApprovedNow: false;
  providerRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  blockedGateKeys: readonly string[];
  writeOperationCount: number;
}> {
  const blockedGateKeys = taxiDbWriteExecutionApprovalGates002Z.filter((gate) => !gate.approvedNow).map((gate) => gate.key);
  return {
    version: taxiDbWriteExecutionApprovalSnapshot002Z.version,
    canRequest003AExactWriteSmokeApproval:
      taxiDbWriteExecutionApprovalSnapshot002Z.writeGateSmokePassed002Y === true &&
      taxiDbWriteExecutionApprovalSnapshot002Z.writeOperationCount === 44 &&
      taxiDbWriteExecutionApprovalSnapshot002Z.fakeSuccessBlocked === true,
    dbRuntimeWriteExecutionApprovedNow: false,
    walletRuntimeApprovedNow: false,
    providerRuntimeApprovedNow: false,
    paymentRuntimeApprovedNow: false,
    blockedGateKeys,
    writeOperationCount: taxiDbWriteExecutionOperationKeys002Z.length,
  } as const;
}
