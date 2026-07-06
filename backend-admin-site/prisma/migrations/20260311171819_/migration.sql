/*
  Warnings:

  - The values [SUBSCRIPTION] on the enum `LedgerOperationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `capturedAmount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `refundedAmount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `nonce` on the `Qr` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `Qr` table. All the data in the column will be lost.
  - You are about to drop the column `signature` on the `Qr` table. All the data in the column will be lost.
  - You are about to drop the column `usageLimit` on the `Qr` table. All the data in the column will be lost.
  - You are about to drop the `ActivityFeed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatFolder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeadLetter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FileUpload` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FraudCheck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IdempotencyKey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MediaFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MessageSearch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MessageView` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MiniApp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Outbox` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OutboxEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `P2PTransfer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentAudit` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CREATED', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AIRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- AlterEnum
BEGIN;
CREATE TYPE "LedgerOperationType_new" AS ENUM ('TRANSFER', 'QR_PAYMENT', 'DEPOSIT', 'WITHDRAW', 'MARKETPLACE', 'ESCROW_LOCK', 'ESCROW_RELEASE', 'ESCROW_REFUND');
ALTER TABLE "LedgerEntry" ALTER COLUMN "operationType" TYPE "LedgerOperationType_new" USING ("operationType"::text::"LedgerOperationType_new");
ALTER TYPE "LedgerOperationType" RENAME TO "LedgerOperationType_old";
ALTER TYPE "LedgerOperationType_new" RENAME TO "LedgerOperationType";
DROP TYPE "LedgerOperationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ActivityFeed" DROP CONSTRAINT "ActivityFeed_userId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentAudit" DROP CONSTRAINT "PaymentAudit_paymentId_fkey";

-- DropIndex
DROP INDEX "LedgerEntry_transactionId_idx";

-- DropIndex
DROP INDEX "LedgerEntry_walletId_idx";

-- DropIndex
DROP INDEX "Message_userId_idx";

-- DropIndex
DROP INDEX "QRPayment_qrId_idx";

-- DropIndex
DROP INDEX "Qr_walletId_idx";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "capturedAmount",
DROP COLUMN "refundedAmount",
DROP COLUMN "transactionId",
DROP COLUMN "version";

-- AlterTable
ALTER TABLE "Qr" DROP COLUMN "nonce",
DROP COLUMN "provider",
DROP COLUMN "signature",
DROP COLUMN "usageLimit";

-- DropTable
DROP TABLE "ActivityFeed";

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "Bot";

-- DropTable
DROP TABLE "ChatFolder";

-- DropTable
DROP TABLE "ChatList";

-- DropTable
DROP TABLE "ChatSettings";

-- DropTable
DROP TABLE "DeadLetter";

-- DropTable
DROP TABLE "FileUpload";

-- DropTable
DROP TABLE "FraudCheck";

-- DropTable
DROP TABLE "IdempotencyKey";

-- DropTable
DROP TABLE "MediaFile";

-- DropTable
DROP TABLE "MessageSearch";

-- DropTable
DROP TABLE "MessageView";

-- DropTable
DROP TABLE "MiniApp";

-- DropTable
DROP TABLE "Outbox";

-- DropTable
DROP TABLE "OutboxEvent";

-- DropTable
DROP TABLE "P2PTransfer";

-- DropTable
DROP TABLE "PaymentAudit";

-- DropEnum
DROP TYPE "P2PStatus";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(20,6) NOT NULL,
    "currency" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "total" DECIMAL(20,6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(20,6) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIConversation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIMessage" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" "AIRole" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIConversation" ADD CONSTRAINT "AIConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIMessage" ADD CONSTRAINT "AIMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "AIConversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
