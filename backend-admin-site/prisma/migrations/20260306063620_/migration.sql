/*
  Warnings:

  - You are about to drop the column `aggregateId` on the `Outbox` table. All the data in the column will be lost.
  - You are about to drop the column `aggregateType` on the `Outbox` table. All the data in the column will be lost.
  - You are about to drop the column `attempts` on the `Outbox` table. All the data in the column will be lost.
  - You are about to drop the column `error` on the `Outbox` table. All the data in the column will be lost.
  - You are about to drop the column `nextAttemptAt` on the `Outbox` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Outbox` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `PaymentAudit` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `PaymentAudit` table. All the data in the column will be lost.
  - You are about to drop the column `newState` on the `PaymentAudit` table. All the data in the column will be lost.
  - You are about to drop the column `previousHash` on the `PaymentAudit` table. All the data in the column will be lost.
  - You are about to drop the column `previousState` on the `PaymentAudit` table. All the data in the column will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeadLetter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProcessedWebhook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `topic` to the `Outbox` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `payload` to the `PaymentAudit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('CREATED', 'AUTHORIZED', 'CAPTURED', 'REFUNDED', 'FAILED');

-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentAudit" DROP CONSTRAINT "PaymentAudit_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_walletId_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- DropIndex
DROP INDEX "Outbox_processed_nextAttemptAt_idx";

-- DropIndex
DROP INDEX "PaymentAudit_paymentId_idx";

-- AlterTable
ALTER TABLE "Outbox" DROP COLUMN "aggregateId",
DROP COLUMN "aggregateType",
DROP COLUMN "attempts",
DROP COLUMN "error",
DROP COLUMN "nextAttemptAt",
DROP COLUMN "type",
ADD COLUMN     "topic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatus" NOT NULL,
ALTER COLUMN "version" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "PaymentAudit" DROP COLUMN "hash",
DROP COLUMN "metadata",
DROP COLUMN "newState",
DROP COLUMN "previousHash",
DROP COLUMN "previousState",
ADD COLUMN     "payload" JSONB NOT NULL;

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "DeadLetter";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "ProcessedWebhook";

-- DropTable
DROP TABLE "RefreshToken";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Wallet";

-- DropEnum
DROP TYPE "Role";

-- AddForeignKey
ALTER TABLE "PaymentAudit" ADD CONSTRAINT "PaymentAudit_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
