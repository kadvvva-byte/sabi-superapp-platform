-- CreateTable
CREATE TABLE "StreamPurchaseIntent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "purchasePurpose" TEXT NOT NULL,
    "targetKind" TEXT NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StreamPurchaseIntent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamPurchaseClassification" (
    "id" TEXT NOT NULL,
    "purchaseIntentId" TEXT NOT NULL,
    "classifierVersion" TEXT NOT NULL,
    "decisionStatus" TEXT NOT NULL,
    "requiredRail" TEXT NOT NULL,
    "ledgerBucket" TEXT NOT NULL,
    "hardBlockReasons" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreamPurchaseClassification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamGooglePurchaseVerification" (
    "id" TEXT NOT NULL,
    "purchaseIntentId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "purchaseTokenHash" TEXT NOT NULL,
    "verificationStatus" TEXT NOT NULL,
    "acknowledgementStatus" TEXT NOT NULL,
    "providerResponseMetadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreamGooglePurchaseVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamAppendOnlyLedgerEntry" (
    "id" TEXT NOT NULL,
    "purchaseIntentId" TEXT NOT NULL,
    "entryKind" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "sourceBucket" TEXT NOT NULL,
    "targetBucket" TEXT NOT NULL,
    "requiredRail" TEXT NOT NULL,
    "partyKind" TEXT NOT NULL,
    "amountMinor" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreamAppendOnlyLedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamLedgerHold" (
    "id" TEXT NOT NULL,
    "ledgerEntryId" TEXT NOT NULL,
    "holdKind" TEXT NOT NULL,
    "holdStatus" TEXT NOT NULL,
    "amountMinor" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreamLedgerHold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamCreatorEarningState" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "purchaseIntentId" TEXT NOT NULL,
    "stateKind" TEXT NOT NULL,
    "amountMinor" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "blockedReasons" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreamCreatorEarningState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamMerchantSettlementState" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "purchaseIntentId" TEXT NOT NULL,
    "stateKind" TEXT NOT NULL,
    "amountMinor" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "kybAmlState" TEXT NOT NULL,
    "blockedReasons" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreamMerchantSettlementState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamRefundVoidAdjustment" (
    "id" TEXT NOT NULL,
    "purchaseIntentId" TEXT NOT NULL,
    "adjustmentKind" TEXT NOT NULL,
    "sourceReferenceHash" TEXT NOT NULL,
    "amountMinor" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreamRefundVoidAdjustment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamIdempotencyKey" (
    "id" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StreamIdempotencyKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamProviderGateSnapshot" (
    "id" TEXT NOT NULL,
    "gateId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "configuredNow" BOOLEAN NOT NULL,
    "callsAllowedNow" BOOLEAN NOT NULL,
    "rawSecretValuesReturned" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreamProviderGateSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StreamPurchaseIntent_idempotencyKey_key" ON "StreamPurchaseIntent"("idempotencyKey");

-- CreateIndex
CREATE INDEX "StreamPurchaseIntent_userId_status_idx" ON "StreamPurchaseIntent"("userId", "status");

-- CreateIndex
CREATE INDEX "StreamPurchaseIntent_sku_idx" ON "StreamPurchaseIntent"("sku");

-- CreateIndex
CREATE INDEX "StreamPurchaseClassification_purchaseIntentId_idx" ON "StreamPurchaseClassification"("purchaseIntentId");

-- CreateIndex
CREATE INDEX "StreamGooglePurchaseVerification_purchaseIntentId_idx" ON "StreamGooglePurchaseVerification"("purchaseIntentId");

-- CreateIndex
CREATE INDEX "StreamGooglePurchaseVerification_sku_idx" ON "StreamGooglePurchaseVerification"("sku");

-- CreateIndex
CREATE INDEX "StreamGooglePurchaseVerification_purchaseTokenHash_idx" ON "StreamGooglePurchaseVerification"("purchaseTokenHash");

-- CreateIndex
CREATE UNIQUE INDEX "StreamAppendOnlyLedgerEntry_idempotencyKey_key" ON "StreamAppendOnlyLedgerEntry"("idempotencyKey");

-- CreateIndex
CREATE INDEX "StreamAppendOnlyLedgerEntry_purchaseIntentId_idx" ON "StreamAppendOnlyLedgerEntry"("purchaseIntentId");

-- CreateIndex
CREATE INDEX "StreamAppendOnlyLedgerEntry_entryKind_idx" ON "StreamAppendOnlyLedgerEntry"("entryKind");

-- CreateIndex
CREATE INDEX "StreamAppendOnlyLedgerEntry_sourceBucket_targetBucket_idx" ON "StreamAppendOnlyLedgerEntry"("sourceBucket", "targetBucket");

-- CreateIndex
CREATE INDEX "StreamLedgerHold_ledgerEntryId_idx" ON "StreamLedgerHold"("ledgerEntryId");

-- CreateIndex
CREATE INDEX "StreamLedgerHold_holdStatus_idx" ON "StreamLedgerHold"("holdStatus");

-- CreateIndex
CREATE INDEX "StreamCreatorEarningState_creatorId_stateKind_idx" ON "StreamCreatorEarningState"("creatorId", "stateKind");

-- CreateIndex
CREATE INDEX "StreamCreatorEarningState_purchaseIntentId_idx" ON "StreamCreatorEarningState"("purchaseIntentId");

-- CreateIndex
CREATE INDEX "StreamMerchantSettlementState_merchantId_stateKind_idx" ON "StreamMerchantSettlementState"("merchantId", "stateKind");

-- CreateIndex
CREATE INDEX "StreamMerchantSettlementState_purchaseIntentId_idx" ON "StreamMerchantSettlementState"("purchaseIntentId");

-- CreateIndex
CREATE INDEX "StreamRefundVoidAdjustment_purchaseIntentId_idx" ON "StreamRefundVoidAdjustment"("purchaseIntentId");

-- CreateIndex
CREATE INDEX "StreamRefundVoidAdjustment_sourceReferenceHash_idx" ON "StreamRefundVoidAdjustment"("sourceReferenceHash");

-- CreateIndex
CREATE UNIQUE INDEX "StreamIdempotencyKey_keyHash_key" ON "StreamIdempotencyKey"("keyHash");

-- CreateIndex
CREATE INDEX "StreamIdempotencyKey_scope_status_idx" ON "StreamIdempotencyKey"("scope", "status");

-- CreateIndex
CREATE INDEX "StreamIdempotencyKey_expiresAt_idx" ON "StreamIdempotencyKey"("expiresAt");

-- CreateIndex
CREATE INDEX "StreamProviderGateSnapshot_gateId_createdAt_idx" ON "StreamProviderGateSnapshot"("gateId", "createdAt");

