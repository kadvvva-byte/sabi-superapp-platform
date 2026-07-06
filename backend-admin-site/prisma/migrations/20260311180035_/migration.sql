/*
  Warnings:

  - You are about to drop the column `action` on the `ActivityFeed` table. All the data in the column will be lost.
  - You are about to drop the column `response` on the `IdempotencyKey` table. All the data in the column will be lost.
  - Added the required column `type` to the `ActivityFeed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromWalletId` to the `P2PTransfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toWalletId` to the `P2PTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityFeed" DROP COLUMN "action",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "IdempotencyKey" DROP COLUMN "response",
ADD COLUMN     "requestHash" TEXT,
ADD COLUMN     "responseBody" JSONB;

-- AlterTable
ALTER TABLE "P2PTransfer" ADD COLUMN     "fromWalletId" TEXT NOT NULL,
ADD COLUMN     "toWalletId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "capturedAmount" DECIMAL(20,6) NOT NULL DEFAULT 0,
ADD COLUMN     "refundedAmount" DECIMAL(20,6) NOT NULL DEFAULT 0,
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "PaymentAudit" ADD COLUMN     "previousState" JSONB;
