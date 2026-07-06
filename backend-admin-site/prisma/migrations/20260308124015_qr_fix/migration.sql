/*
  Warnings:

  - You are about to drop the `QR` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QR" DROP CONSTRAINT "QR_walletId_fkey";

-- DropForeignKey
ALTER TABLE "QRPayment" DROP CONSTRAINT "QRPayment_qrId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_qrId_fkey";

-- DropTable
DROP TABLE "QR";

-- CreateTable
CREATE TABLE "qr" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" "QRType" NOT NULL,
    "payload" TEXT NOT NULL,
    "amount" DECIMAL(65,30),
    "currency" TEXT,
    "provider" TEXT,
    "signature" TEXT,
    "nonce" TEXT,
    "usageLimit" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "qr_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "qr_walletId_idx" ON "qr"("walletId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "qr"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr" ADD CONSTRAINT "qr_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRPayment" ADD CONSTRAINT "QRPayment_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "qr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
