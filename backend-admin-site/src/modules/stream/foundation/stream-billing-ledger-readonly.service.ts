import {
  STREAM_BILLING_LEDGER_READONLY_SAFETY_BOUNDARY,
  STREAM_BILLING_LEDGER_READONLY_SERVICE_VERSION,
  STREAM_BILLING_LEDGER_READONLY_TABLE_BINDINGS,
  type StreamBillingLedgerDelegateName,
  type StreamBillingLedgerReadOnlyCount,
  type StreamBillingLedgerReadOnlySnapshot,
  type StreamBillingLedgerTableName,
} from "./stream-billing-ledger-readonly.service.contracts";

type ReadOnlyDelegate = Readonly<{
  count: (args?: unknown) => Promise<number>;
  findMany?: (args?: unknown) => Promise<unknown[]>;
  findFirst?: (args?: unknown) => Promise<unknown | null>;
  groupBy?: (args?: unknown) => Promise<unknown[]>;
  aggregate?: (args?: unknown) => Promise<unknown>;
}>;

export type StreamBillingLedgerReadOnlyPrismaLike = Readonly<
  Record<StreamBillingLedgerDelegateName, ReadOnlyDelegate>
>;

function getDelegate(
  prisma: StreamBillingLedgerReadOnlyPrismaLike,
  delegateName: StreamBillingLedgerDelegateName,
): ReadOnlyDelegate {
  const delegate = prisma[delegateName];
  if (!delegate || typeof delegate.count !== "function") {
    throw new Error("stream_readonly_delegate_missing:" + delegateName);
  }
  return delegate;
}

async function countTable(
  prisma: StreamBillingLedgerReadOnlyPrismaLike,
  tableName: StreamBillingLedgerTableName,
  delegateName: StreamBillingLedgerDelegateName,
): Promise<StreamBillingLedgerReadOnlyCount> {
  const delegate = getDelegate(prisma, delegateName);
  const count = await delegate.count();
  return { tableName, delegateName, count };
}

async function safeFindMany(
  prisma: StreamBillingLedgerReadOnlyPrismaLike,
  delegateName: StreamBillingLedgerDelegateName,
  args: unknown,
): Promise<Record<string, unknown>[]> {
  const delegate = getDelegate(prisma, delegateName);
  if (typeof delegate.findMany !== "function") {
    return [];
  }

  const rows = await delegate.findMany(args);
  return rows.map((row) => (row && typeof row === "object" ? (row as Record<string, unknown>) : { value: row }));
}

export function getStreamBillingLedgerReadOnlySafetyBoundary() {
  return STREAM_BILLING_LEDGER_READONLY_SAFETY_BOUNDARY;
}

export async function getStreamBillingLedgerReadOnlySnapshot(
  prisma: StreamBillingLedgerReadOnlyPrismaLike,
): Promise<StreamBillingLedgerReadOnlySnapshot> {
  const tableCounts = await Promise.all(
    STREAM_BILLING_LEDGER_READONLY_TABLE_BINDINGS.map((binding) =>
      countTable(prisma, binding.tableName, binding.delegateName),
    ),
  );

  const purchaseIntentStatusSummary = await safeFindMany(prisma, "streamPurchaseIntent", {
    take: 50,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      platform: true,
      purchasePurpose: true,
      targetKind: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const classificationDecisionSummary = await safeFindMany(prisma, "streamPurchaseClassification", {
    take: 50,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      classifierVersion: true,
      decisionStatus: true,
      requiredRail: true,
      ledgerBucket: true,
      createdAt: true,
    },
  });

  const googleVerificationStatusSummary = await safeFindMany(prisma, "streamGooglePurchaseVerification", {
    take: 50,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      sku: true,
      productType: true,
      packageName: true,
      verificationStatus: true,
      acknowledgementStatus: true,
      createdAt: true,
    },
  });

  const providerGateAuditSummary = await safeFindMany(prisma, "streamProviderGateSnapshot", {
    take: 50,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      gateId: true,
      status: true,
      configuredNow: true,
      callsAllowedNow: true,
      rawSecretValuesReturned: true,
      createdAt: true,
    },
  });

  const creatorEarningStateSummary = await safeFindMany(prisma, "streamCreatorEarningState", {
    take: 50,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      creatorId: true,
      stateKind: true,
      amountMinor: true,
      currency: true,
      createdAt: true,
    },
  });

  const merchantSettlementStateSummary = await safeFindMany(prisma, "streamMerchantSettlementState", {
    take: 50,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      merchantId: true,
      stateKind: true,
      amountMinor: true,
      currency: true,
      kybAmlState: true,
      createdAt: true,
    },
  });

  return {
    version: STREAM_BILLING_LEDGER_READONLY_SERVICE_VERSION,
    generatedAtUtc: new Date().toISOString(),
    safety: STREAM_BILLING_LEDGER_READONLY_SAFETY_BOUNDARY,
    tableCounts,
    purchaseIntentStatusSummary,
    classificationDecisionSummary,
    googleVerificationStatusSummary,
    providerGateAuditSummary,
    creatorEarningStateSummary,
    merchantSettlementStateSummary,
  };
}
