/*
  Warnings:

  - You are about to drop the column `currency` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Wallet` table. All the data in the column will be lost.
  - You are about to alter the column `balance` on the `Wallet` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,6)` to `Integer`.

*/
-- DropIndex
DROP INDEX "Wallet_userId_key";

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "currency",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ALTER COLUMN "balance" DROP DEFAULT,
ALTER COLUMN "balance" SET DATA TYPE INTEGER;

-- DropEnum
DROP TYPE "WalletStatus";
