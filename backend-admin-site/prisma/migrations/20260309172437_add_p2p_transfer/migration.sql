/*
  Warnings:

  - Changed the type of `status` on the `P2PTransfer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "P2PStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- DropIndex
DROP INDEX "P2PTransfer_fromWalletId_idx";

-- DropIndex
DROP INDEX "P2PTransfer_toWalletId_idx";

-- AlterTable
ALTER TABLE "P2PTransfer" DROP COLUMN "status",
ADD COLUMN     "status" "P2PStatus" NOT NULL;
