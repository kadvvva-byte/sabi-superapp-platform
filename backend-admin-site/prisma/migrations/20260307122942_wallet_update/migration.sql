/*
  Warnings:

  - Changed the type of `type` on the `LedgerEntry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LedgerEntryType" AS ENUM ('DEBIT', 'CREDIT');

-- AlterTable
ALTER TABLE "LedgerEntry" DROP COLUMN "type",
ADD COLUMN     "type" "LedgerEntryType" NOT NULL;

-- CreateIndex
CREATE INDEX "QRPayment_payerWallet_idx" ON "QRPayment"("payerWallet");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
