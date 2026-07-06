/*
  Warnings:

  - You are about to drop the column `qrCodeId` on the `QRPayment` table. All the data in the column will be lost.
  - You are about to drop the column `qrCodeId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `QRCode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `qrId` to the `QRPayment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QRCode" DROP CONSTRAINT "QRCode_walletId_fkey";

-- DropForeignKey
ALTER TABLE "QRPayment" DROP CONSTRAINT "QRPayment_qrCodeId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_qrCodeId_fkey";

-- DropIndex
DROP INDEX "QRPayment_qrCodeId_idx";

-- DropIndex
DROP INDEX "Transaction_qrCodeId_idx";

-- AlterTable
ALTER TABLE "QRPayment" DROP COLUMN "qrCodeId",
ADD COLUMN     "qrId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "qrCodeId",
ADD COLUMN     "qrId" TEXT;

-- DropTable
DROP TABLE "QRCode";

-- CreateTable
CREATE TABLE "QR" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" "QRType" NOT NULL,
    "payload" TEXT NOT NULL,
    "amount" DECIMAL(65,30),
    "currency" TEXT,
    "provider" TEXT,
    "signature" TEXT,
    "nonce" TEXT,
    "usageLimit" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QR_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QR_walletId_idx" ON "QR"("walletId");

-- CreateIndex
CREATE INDEX "QRPayment_qrId_idx" ON "QRPayment"("qrId");

-- CreateIndex
CREATE INDEX "Transaction_qrId_idx" ON "Transaction"("qrId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "QR"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QR" ADD CONSTRAINT "QR_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRPayment" ADD CONSTRAINT "QRPayment_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "QR"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
