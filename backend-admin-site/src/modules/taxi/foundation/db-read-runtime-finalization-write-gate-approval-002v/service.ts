import { taxiDbReadRuntimeFinalizationGates002V, taxiDbReadRuntimeFinalizationSnapshot002V } from './constants';
import type { TaxiDbReadRuntimeFinalizationSnapshot002V } from './types';

export function getTaxiDbReadRuntimeFinalizationSnapshot002V(): TaxiDbReadRuntimeFinalizationSnapshot002V {
  return taxiDbReadRuntimeFinalizationSnapshot002V;
}

export function evaluateTaxiDbWriteGateReadiness002V(): Readonly<{
  version: string;
  canProceedTo002WApproval: boolean;
  dbWriteRuntimeApprovedNow: false;
  walletRuntimeApprovedNow: false;
  providerRuntimeApprovedNow: false;
  blockedGateKeys: readonly string[];
}> {
  const blockedGateKeys = taxiDbReadRuntimeFinalizationGates002V.filter((gate) => !gate.approvedNow).map((gate) => gate.key);
  return {
    version: taxiDbReadRuntimeFinalizationSnapshot002V.version,
    canProceedTo002WApproval: taxiDbReadRuntimeFinalizationSnapshot002V.readOnlyRuntimeVerified002U === true && taxiDbReadRuntimeFinalizationSnapshot002V.delegateCountReadPassedCount === 20,
    dbWriteRuntimeApprovedNow: false,
    walletRuntimeApprovedNow: false,
    providerRuntimeApprovedNow: false,
    blockedGateKeys,
  } as const;
}
