-- CreateTable
CREATE TABLE "AuthAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "username" TEXT,
    "passwordHash" TEXT NOT NULL,
    "passwordSalt" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'local',
    "providerAccountId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessWallet" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "displayName" TEXT,
    "defaultCurrency" TEXT NOT NULL DEFAULT 'USD',
    "availableCurrencies" TEXT[] DEFAULT ARRAY['USD']::TEXT[],
    "balance" DECIMAL(20,6) NOT NULL DEFAULT 0,
    "holdBalance" DECIMAL(20,6) NOT NULL DEFAULT 0,
    "serviceFeePercent" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "isMerchantEnabled" BOOLEAN NOT NULL DEFAULT false,
    "isBusinessEnabled" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantWallet" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "businessWalletId" TEXT NOT NULL,
    "merchantId" TEXT,
    "merchantName" TEXT NOT NULL,
    "displayName" TEXT,
    "defaultCurrency" TEXT NOT NULL DEFAULT 'USD',
    "availableCurrencies" TEXT[] DEFAULT ARRAY['USD']::TEXT[],
    "balance" DECIMAL(20,6) NOT NULL DEFAULT 0,
    "holdBalance" DECIMAL(20,6) NOT NULL DEFAULT 0,
    "serviceFeePercent" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "settlementFeePercent" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "isMerchantEnabled" BOOLEAN NOT NULL DEFAULT true,
    "isSettlementEnabled" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MerchantWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletOperation" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'completed',
    "ownerUserId" TEXT,
    "walletId" TEXT NOT NULL,
    "senderBusinessWalletId" TEXT,
    "recipientBusinessWalletId" TEXT,
    "merchantWalletId" TEXT,
    "amount" DECIMAL(20,6) NOT NULL,
    "feeAmount" DECIMAL(20,6) NOT NULL DEFAULT 0,
    "netAmount" DECIMAL(20,6),
    "currency" TEXT,
    "idempotencyKey" TEXT,
    "clientOperationId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WalletOperation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinDeposit" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "amount" DECIMAL(20,6) NOT NULL,
    "termMonths" INTEGER NOT NULL,
    "apr" DECIMAL(10,4) NOT NULL DEFAULT 16,
    "accruedInterest" DECIMAL(20,6) NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "maturesAt" TIMESTAMP(3) NOT NULL,
    "lastAccruedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoinDeposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinCreditRequest" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "amount" DECIMAL(20,6) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'requested',
    "reason" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoinCreditRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthAccount_email_key" ON "AuthAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AuthAccount_phone_key" ON "AuthAccount"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "AuthAccount_username_key" ON "AuthAccount"("username");

-- CreateIndex
CREATE INDEX "AuthAccount_userId_idx" ON "AuthAccount"("userId");

-- CreateIndex
CREATE INDEX "AuthAccount_provider_idx" ON "AuthAccount"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessWallet_businessId_key" ON "BusinessWallet"("businessId");

-- CreateIndex
CREATE INDEX "BusinessWallet_ownerUserId_idx" ON "BusinessWallet"("ownerUserId");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantWallet_merchantId_key" ON "MerchantWallet"("merchantId");

-- CreateIndex
CREATE INDEX "MerchantWallet_ownerUserId_idx" ON "MerchantWallet"("ownerUserId");

-- CreateIndex
CREATE INDEX "MerchantWallet_businessWalletId_idx" ON "MerchantWallet"("businessWalletId");

-- CreateIndex
CREATE UNIQUE INDEX "WalletOperation_idempotencyKey_key" ON "WalletOperation"("idempotencyKey");

-- CreateIndex
CREATE INDEX "WalletOperation_walletId_idx" ON "WalletOperation"("walletId");

-- CreateIndex
CREATE INDEX "WalletOperation_ownerUserId_idx" ON "WalletOperation"("ownerUserId");

-- CreateIndex
CREATE INDEX "WalletOperation_kind_createdAt_idx" ON "WalletOperation"("kind", "createdAt");

-- CreateIndex
CREATE INDEX "CoinDeposit_ownerUserId_idx" ON "CoinDeposit"("ownerUserId");

-- CreateIndex
CREATE INDEX "CoinDeposit_walletId_idx" ON "CoinDeposit"("walletId");

-- CreateIndex
CREATE INDEX "CoinCreditRequest_ownerUserId_idx" ON "CoinCreditRequest"("ownerUserId");

-- CreateIndex
CREATE INDEX "CoinCreditRequest_walletId_idx" ON "CoinCreditRequest"("walletId");

-- AddForeignKey
ALTER TABLE "AuthAccount" ADD CONSTRAINT "AuthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantWallet" ADD CONSTRAINT "MerchantWallet_businessWalletId_fkey" FOREIGN KEY ("businessWalletId") REFERENCES "BusinessWallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletOperation" ADD CONSTRAINT "WalletOperation_senderBusinessWalletId_fkey" FOREIGN KEY ("senderBusinessWalletId") REFERENCES "BusinessWallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletOperation" ADD CONSTRAINT "WalletOperation_recipientBusinessWalletId_fkey" FOREIGN KEY ("recipientBusinessWalletId") REFERENCES "BusinessWallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletOperation" ADD CONSTRAINT "WalletOperation_merchantWalletId_fkey" FOREIGN KEY ("merchantWalletId") REFERENCES "MerchantWallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
