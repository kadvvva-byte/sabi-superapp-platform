-- CreateEnum
CREATE TYPE "EscrowStatus" AS ENUM ('LOCKED', 'RELEASED', 'REFUNDED');

-- CreateTable
CREATE TABLE "Escrow" (
    "id" TEXT NOT NULL,
    "buyerWalletId" TEXT NOT NULL,
    "sellerWalletId" TEXT NOT NULL,
    "amount" DECIMAL(20,6) NOT NULL,
    "status" "EscrowStatus" NOT NULL,
    "transactionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Escrow_pkey" PRIMARY KEY ("id")
);
