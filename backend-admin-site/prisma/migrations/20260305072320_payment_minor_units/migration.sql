/*
  Warnings:

  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `amountMinor` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Payment_providerPaymentId_idx";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amount",
ADD COLUMN     "amountMinor" BIGINT NOT NULL,
ALTER COLUMN "capturedAmount" SET DEFAULT 0,
ALTER COLUMN "capturedAmount" SET DATA TYPE BIGINT,
ALTER COLUMN "refundedAmount" SET DEFAULT 0,
ALTER COLUMN "refundedAmount" SET DATA TYPE BIGINT;
