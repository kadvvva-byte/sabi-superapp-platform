export type TaxiDbReadRuntimeFinalizationGate002V = Readonly<{
  key: string;
  area: 'read_runtime' | 'write_gate' | 'admin_gate' | 'idempotency' | 'wallet_provider_boundary';
  approvedNow: boolean;
  requiredForNextStage: boolean;
}>;

export type TaxiDbReadRuntimeFinalizationSnapshot002V = Readonly<{
  version: string;
  status: 'db_read_runtime_finalized_write_gate_pending';
  readOnlyRuntimeVerified002U: boolean;
  delegateCountReadPassedCount: number;
  routeCatalogCount: number;
  hardeningHeaderCount: number;
  dbReadRuntimeFinalizedNow: boolean;
  dbWriteRuntimeApprovedNow: boolean;
  walletRuntimeApprovedNow: boolean;
  providerRuntimeApprovedNow: boolean;
  fakeSuccessBlocked: boolean;
  gates: readonly TaxiDbReadRuntimeFinalizationGate002V[];
}>;
