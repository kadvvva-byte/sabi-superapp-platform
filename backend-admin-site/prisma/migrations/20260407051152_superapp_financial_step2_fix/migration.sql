/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `Escrow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionId]` on the table `P2PTransfer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idempotencyKey]` on the table `P2PTransfer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reference]` on the table `P2PTransfer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reference]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionId]` on the table `QRPayment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idempotencyKey]` on the table `QRPayment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idempotencyKey]` on the table `QrOperation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reference]` on the table `QrOperation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionId]` on the table `WalletOperation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reference]` on the table `WalletOperation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `P2PTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MessageType" ADD VALUE 'MONEY';
ALTER TYPE "MessageType" ADD VALUE 'QR';
ALTER TYPE "MessageType" ADD VALUE 'PAYMENT_REQUEST';
ALTER TYPE "MessageType" ADD VALUE 'SYSTEM';

-- DropForeignKey
ALTER TABLE "Qr" DROP CONSTRAINT "Qr_walletId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "p2pTransferId" TEXT,
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "qrOperationId" TEXT,
ADD COLUMN     "transactionId" TEXT,
ADD COLUMN     "walletOperationId" TEXT;

-- AlterTable
ALTER TABLE "P2PTransfer" ADD COLUMN     "idempotencyKey" TEXT,
ADD COLUMN     "reference" TEXT,
ADD COLUMN     "transactionId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "reference" TEXT,
ADD COLUMN     "transactionId" TEXT,
ADD COLUMN     "walletId" TEXT;

-- AlterTable
ALTER TABLE "QRPayment" ADD COLUMN     "receiverWalletId" TEXT;

-- AlterTable
ALTER TABLE "Qr" ADD COLUMN     "ownerUserId" TEXT,
ADD COLUMN     "route" TEXT,
ALTER COLUMN "walletId" DROP NOT NULL,
ALTER COLUMN "rail" SET DEFAULT 'sabi_core';

-- AlterTable
ALTER TABLE "WalletOperation" ADD COLUMN     "reference" TEXT,
ADD COLUMN     "transactionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Escrow_transactionId_key" ON "Escrow"("transactionId");

-- CreateIndex
CREATE INDEX "Escrow_buyerWalletId_idx" ON "Escrow"("buyerWalletId");

-- CreateIndex
CREATE INDEX "Escrow_sellerWalletId_idx" ON "Escrow"("sellerWalletId");

-- CreateIndex
CREATE INDEX "LedgerEntry_walletId_idx" ON "LedgerEntry"("walletId");

-- CreateIndex
CREATE INDEX "LedgerEntry_transactionId_idx" ON "LedgerEntry"("transactionId");

-- CreateIndex
CREATE INDEX "Message_transactionId_idx" ON "Message"("transactionId");

-- CreateIndex
CREATE INDEX "Message_paymentId_idx" ON "Message"("paymentId");

-- CreateIndex
CREATE INDEX "Message_p2pTransferId_idx" ON "Message"("p2pTransferId");

-- CreateIndex
CREATE INDEX "Message_qrOperationId_idx" ON "Message"("qrOperationId");

-- CreateIndex
CREATE INDEX "Message_walletOperationId_idx" ON "Message"("walletOperationId");

-- CreateIndex
CREATE UNIQUE INDEX "P2PTransfer_transactionId_key" ON "P2PTransfer"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "P2PTransfer_idempotencyKey_key" ON "P2PTransfer"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "P2PTransfer_reference_key" ON "P2PTransfer"("reference");

-- CreateIndex
CREATE INDEX "P2PTransfer_fromUserId_idx" ON "P2PTransfer"("fromUserId");

-- CreateIndex
CREATE INDEX "P2PTransfer_toUserId_idx" ON "P2PTransfer"("toUserId");

-- CreateIndex
CREATE INDEX "P2PTransfer_fromWalletId_idx" ON "P2PTransfer"("fromWalletId");

-- CreateIndex
CREATE INDEX "P2PTransfer_toWalletId_idx" ON "P2PTransfer"("toWalletId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "Payment"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_reference_key" ON "Payment"("reference");

-- CreateIndex
CREATE INDEX "Payment_userId_idx" ON "Payment"("userId");

-- CreateIndex
CREATE INDEX "Payment_walletId_idx" ON "Payment"("walletId");

-- CreateIndex
CREATE INDEX "Payment_transactionId_idx" ON "Payment"("transactionId");

-- CreateIndex
CREATE INDEX "PaymentAudit_paymentId_idx" ON "PaymentAudit"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "QRPayment_transactionId_key" ON "QRPayment"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "QRPayment_idempotencyKey_key" ON "QRPayment"("idempotencyKey");

-- CreateIndex
CREATE INDEX "QRPayment_payerWalletId_idx" ON "QRPayment"("payerWalletId");

-- CreateIndex
CREATE INDEX "QRPayment_receiverWalletId_idx" ON "QRPayment"("receiverWalletId");

-- CreateIndex
CREATE INDEX "QRPayment_transactionId_idx" ON "QRPayment"("transactionId");

-- CreateIndex
CREATE INDEX "Qr_ownerUserId_idx" ON "Qr"("ownerUserId");

-- CreateIndex
CREATE INDEX "Qr_walletId_idx" ON "Qr"("walletId");

-- CreateIndex
CREATE INDEX "Qr_rail_domain_payloadType_idx" ON "Qr"("rail", "domain", "payloadType");

-- CreateIndex
CREATE INDEX "Qr_reference_idx" ON "Qr"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "QrOperation_idempotencyKey_key" ON "QrOperation"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "QrOperation_reference_key" ON "QrOperation"("reference");

-- CreateIndex
CREATE INDEX "QrOperation_transactionId_idx" ON "QrOperation"("transactionId");

-- CreateIndex
CREATE INDEX "Transaction_fromWalletId_idx" ON "Transaction"("fromWalletId");

-- CreateIndex
CREATE INDEX "Transaction_toWalletId_idx" ON "Transaction"("toWalletId");

-- CreateIndex
CREATE INDEX "Transaction_reference_idx" ON "Transaction"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "WalletOperation_transactionId_key" ON "WalletOperation"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "WalletOperation_reference_key" ON "WalletOperation"("reference");

-- CreateIndex
CREATE INDEX "WalletOperation_transactionId_idx" ON "WalletOperation"("transactionId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_p2pTransferId_fkey" FOREIGN KEY ("p2pTransferId") REFERENCES "P2PTransfer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_qrOperationId_fkey" FOREIGN KEY ("qrOperationId") REFERENCES "QrOperation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_walletOperationId_fkey" FOREIGN KEY ("walletOperationId") REFERENCES "WalletOperation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessWallet" ADD CONSTRAINT "BusinessWallet_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantWallet" ADD CONSTRAINT "MerchantWallet_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletOperation" ADD CONSTRAINT "WalletOperation_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletOperation" ADD CONSTRAINT "WalletOperation_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletOperation" ADD CONSTRAINT "WalletOperation_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinDeposit" ADD CONSTRAINT "CoinDeposit_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinDeposit" ADD CONSTRAINT "CoinDeposit_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinCreditRequest" ADD CONSTRAINT "CoinCreditRequest_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinCreditRequest" ADD CONSTRAINT "CoinCreditRequest_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_fromWalletId_fkey" FOREIGN KEY ("fromWalletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_toWalletId_fkey" FOREIGN KEY ("toWalletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qr" ADD CONSTRAINT "Qr_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qr" ADD CONSTRAINT "Qr_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRPayment" ADD CONSTRAINT "QRPayment_receiverWalletId_fkey" FOREIGN KEY ("receiverWalletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRPayment" ADD CONSTRAINT "QRPayment_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrOperation" ADD CONSTRAINT "QrOperation_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentAudit" ADD CONSTRAINT "PaymentAudit_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escrow" ADD CONSTRAINT "Escrow_buyerWalletId_fkey" FOREIGN KEY ("buyerWalletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escrow" ADD CONSTRAINT "Escrow_sellerWalletId_fkey" FOREIGN KEY ("sellerWalletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escrow" ADD CONSTRAINT "Escrow_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransfer" ADD CONSTRAINT "P2PTransfer_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransfer" ADD CONSTRAINT "P2PTransfer_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransfer" ADD CONSTRAINT "P2PTransfer_fromWalletId_fkey" FOREIGN KEY ("fromWalletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransfer" ADD CONSTRAINT "P2PTransfer_toWalletId_fkey" FOREIGN KEY ("toWalletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransfer" ADD CONSTRAINT "P2PTransfer_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
