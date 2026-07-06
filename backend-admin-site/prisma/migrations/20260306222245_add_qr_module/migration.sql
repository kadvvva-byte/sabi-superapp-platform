-- CreateEnum
CREATE TYPE "QRType" AS ENUM ('STATIC', 'DYNAMIC');

-- CreateTable
CREATE TABLE "QRCode" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" "QRType" NOT NULL,
    "payload" TEXT NOT NULL,
    "amount" DECIMAL(65,30),
    "currency" TEXT,
    "nonce" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QRCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QRPayment" (
    "id" TEXT NOT NULL,
    "qrCodeId" TEXT NOT NULL,
    "payerWallet" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QRPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QRCode_walletId_idx" ON "QRCode"("walletId");

-- CreateIndex
CREATE INDEX "QRPayment_qrCodeId_idx" ON "QRPayment"("qrCodeId");

-- AddForeignKey
ALTER TABLE "QRCode" ADD CONSTRAINT "QRCode_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRPayment" ADD CONSTRAINT "QRPayment_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "QRCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
