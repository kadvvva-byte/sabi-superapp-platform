/*
  Warnings:

  - You are about to drop the column `payerWallet` on the `QRPayment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reference]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transactionId` to the `LedgerEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payerWalletId` to the `QRPayment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QRStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'DISABLED');

-- DropIndex
DROP INDEX "QRPayment_payerWallet_idx";

-- AlterTable
ALTER TABLE "LedgerEntry" ADD COLUMN     "transactionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "transactionId" TEXT;

-- AlterTable
ALTER TABLE "QRPayment" DROP COLUMN "payerWallet",
ADD COLUMN     "payerWalletId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "reference" TEXT;

-- AlterTable
ALTER TABLE "qr" ADD COLUMN     "status" "QRStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX "LedgerEntry_walletId_idx" ON "LedgerEntry"("walletId");

-- CreateIndex
CREATE INDEX "LedgerEntry_transactionId_idx" ON "LedgerEntry"("transactionId");

-- CreateIndex
CREATE INDEX "QRPayment_payerWalletId_idx" ON "QRPayment"("payerWalletId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_reference_key" ON "Transaction"("reference");

-- AddForeignKey
ALTER TABLE "LedgerEntry" ADD CONSTRAINT "LedgerEntry_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
