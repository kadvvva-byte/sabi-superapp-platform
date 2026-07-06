/*
  Warnings:

  - You are about to alter the column `amount` on the `LedgerEntry` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,6)`.

*/
-- AlterTable
ALTER TABLE "LedgerEntry" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(20,6);

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "fromWalletId" TEXT,
ADD COLUMN     "toWalletId" TEXT;

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "locked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nonce" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(20,6);
