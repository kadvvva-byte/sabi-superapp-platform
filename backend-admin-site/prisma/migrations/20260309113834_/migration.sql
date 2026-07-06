/*
  Warnings:

  - You are about to drop the column `balance` on the `Wallet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniqueOperationId]` on the table `LedgerEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `operationType` to the `LedgerEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueOperationId` to the `LedgerEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LedgerEntry" ADD COLUMN     "operationType" TEXT NOT NULL,
ADD COLUMN     "uniqueOperationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "balance";

-- CreateTable
CREATE TABLE "WalletBalance" (
    "walletId" TEXT NOT NULL,
    "balance" DECIMAL(20,6) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WalletBalance_pkey" PRIMARY KEY ("walletId")
);

-- CreateIndex
CREATE UNIQUE INDEX "LedgerEntry_uniqueOperationId_key" ON "LedgerEntry"("uniqueOperationId");

-- AddForeignKey
ALTER TABLE "WalletBalance" ADD CONSTRAINT "WalletBalance_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
