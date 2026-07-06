/*
  Warnings:

  - You are about to alter the column `amount` on the `P2PTransfer` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,6)`.
  - You are about to alter the column `capturedAmount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(20,6)`.
  - You are about to alter the column `refundedAmount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(20,6)`.
  - You are about to alter the column `amount` on the `QRPayment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,6)`.
  - You are about to drop the `QRCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `qr` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `responseBody` on table `IdempotencyKey` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "QRPayment" DROP CONSTRAINT "QRPayment_qrId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_qrId_fkey";

-- DropForeignKey
ALTER TABLE "qr" DROP CONSTRAINT "qr_walletId_fkey";

-- AlterTable
ALTER TABLE "IdempotencyKey" ALTER COLUMN "responseBody" SET NOT NULL,
ALTER COLUMN "responseBody" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "P2PTransfer" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(20,6);

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "capturedAmount" SET DEFAULT 0,
ALTER COLUMN "capturedAmount" SET DATA TYPE DECIMAL(20,6),
ALTER COLUMN "refundedAmount" SET DEFAULT 0,
ALTER COLUMN "refundedAmount" SET DATA TYPE DECIMAL(20,6);

-- AlterTable
ALTER TABLE "QRPayment" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(20,6);

-- AlterTable
ALTER TABLE "WalletBalance" ALTER COLUMN "balance" SET DEFAULT 0;

-- DropTable
DROP TABLE "QRCode";

-- DropTable
DROP TABLE "qr";

-- CreateTable
CREATE TABLE "Qr" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" "QRType" NOT NULL,
    "payload" TEXT NOT NULL,
    "amount" DECIMAL(20,6),
    "currency" TEXT,
    "provider" TEXT,
    "signature" TEXT,
    "nonce" TEXT,
    "status" "QRStatus" NOT NULL DEFAULT 'ACTIVE',
    "usageLimit" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Qr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityFeed" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityFeed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Qr_walletId_idx" ON "Qr"("walletId");

-- CreateIndex
CREATE INDEX "Transaction_fromWalletId_idx" ON "Transaction"("fromWalletId");

-- CreateIndex
CREATE INDEX "Transaction_toWalletId_idx" ON "Transaction"("toWalletId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "Qr"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qr" ADD CONSTRAINT "Qr_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRPayment" ADD CONSTRAINT "QRPayment_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "Qr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
