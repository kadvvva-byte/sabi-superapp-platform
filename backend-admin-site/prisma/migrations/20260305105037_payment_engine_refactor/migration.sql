/*
  Warnings:

  - The `metadata` column on the `PaymentAudit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `OutboxEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentAuditLog` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[providerPaymentId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `payload` on the `DeadLetter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `payload` on the `Outbox` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `providerPaymentId` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_walletId_fkey";

-- AlterTable
ALTER TABLE "DeadLetter" DROP COLUMN "payload",
ADD COLUMN     "payload" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Outbox" DROP COLUMN "payload",
ADD COLUMN     "payload" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "providerPaymentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "PaymentAudit" DROP COLUMN "metadata",
ADD COLUMN     "metadata" JSONB;

-- DropTable
DROP TABLE "OutboxEvent";

-- DropTable
DROP TABLE "PaymentAuditLog";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_providerPaymentId_key" ON "Payment"("providerPaymentId");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentAudit" ADD CONSTRAINT "PaymentAudit_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
