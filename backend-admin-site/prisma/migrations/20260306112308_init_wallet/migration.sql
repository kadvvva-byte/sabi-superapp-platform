/*
  Warnings:

  - You are about to drop the column `processed` on the `Outbox` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `Outbox` table. All the data in the column will be lost.
  - You are about to drop the column `payload` on the `PaymentAudit` table. All the data in the column will be lost.
  - Added the required column `aggregateId` to the `Outbox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Outbox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `PaymentAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newState` to the `PaymentAudit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Outbox" DROP COLUMN "processed",
DROP COLUMN "topic",
ADD COLUMN     "aggregateId" TEXT NOT NULL,
ADD COLUMN     "processedAt" TIMESTAMP(3),
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentAudit" DROP COLUMN "payload",
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "newState" JSONB NOT NULL,
ADD COLUMN     "previousState" JSONB;

-- CreateTable
CREATE TABLE "DeadLetter" (
    "id" TEXT NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "error" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeadLetter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Wallet_userId_idx" ON "Wallet"("userId");

-- CreateIndex
CREATE INDEX "Transaction_walletId_idx" ON "Transaction"("walletId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
