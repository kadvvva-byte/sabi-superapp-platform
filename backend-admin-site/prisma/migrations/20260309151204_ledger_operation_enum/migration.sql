/*
  Warnings:

  - Changed the type of `operationType` on the `LedgerEntry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LedgerOperationType" AS ENUM ('TRANSFER', 'QR_PAYMENT', 'DEPOSIT', 'WITHDRAW', 'MARKETPLACE', 'SUBSCRIPTION');

-- AlterTable
ALTER TABLE "LedgerEntry" DROP COLUMN "operationType",
ADD COLUMN     "operationType" "LedgerOperationType" NOT NULL;
