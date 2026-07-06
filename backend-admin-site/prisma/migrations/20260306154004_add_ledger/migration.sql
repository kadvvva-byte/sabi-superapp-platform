/*
  Warnings:

  - Added the required column `currency` to the `Wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('MAIN', 'SAVINGS', 'BONUS', 'MERCHANT', 'CRYPTO');

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "type" "WalletType" NOT NULL;
