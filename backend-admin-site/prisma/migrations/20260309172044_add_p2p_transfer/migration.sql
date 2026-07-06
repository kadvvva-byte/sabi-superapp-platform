-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LedgerOperationType" ADD VALUE 'ESCROW_LOCK';
ALTER TYPE "LedgerOperationType" ADD VALUE 'ESCROW_RELEASE';
ALTER TYPE "LedgerOperationType" ADD VALUE 'ESCROW_REFUND';

-- CreateTable
CREATE TABLE "P2PTransfer" (
    "id" TEXT NOT NULL,
    "fromWalletId" TEXT NOT NULL,
    "toWalletId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "P2PTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "P2PTransfer_fromWalletId_idx" ON "P2PTransfer"("fromWalletId");

-- CreateIndex
CREATE INDEX "P2PTransfer_toWalletId_idx" ON "P2PTransfer"("toWalletId");
