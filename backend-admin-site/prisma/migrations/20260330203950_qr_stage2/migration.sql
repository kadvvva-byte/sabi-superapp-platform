-- AlterEnum
ALTER TYPE "WalletType" ADD VALUE 'COIN';

-- AlterTable
ALTER TABLE "QRPayment" ADD COLUMN     "actorUserId" TEXT,
ADD COLUMN     "failureReason" TEXT,
ADD COLUMN     "idempotencyKey" TEXT,
ADD COLUMN     "route" TEXT;

-- AlterTable
ALTER TABLE "Qr" ADD COLUMN     "domain" TEXT NOT NULL DEFAULT 'payment',
ADD COLUMN     "issuer" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "payloadType" TEXT NOT NULL DEFAULT 'merchant_payment',
ADD COLUMN     "rail" TEXT NOT NULL DEFAULT 'sabi_wallet',
ADD COLUMN     "reference" TEXT,
ADD COLUMN     "signature" TEXT;

-- CreateTable
CREATE TABLE "QrOperation" (
    "id" TEXT NOT NULL,
    "qrId" TEXT,
    "paymentId" TEXT,
    "rail" TEXT NOT NULL,
    "domain" TEXT,
    "payloadType" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "actorUserId" TEXT,
    "payerWalletId" TEXT,
    "receiverWalletId" TEXT,
    "amount" DECIMAL(20,6),
    "currency" TEXT,
    "status" TEXT NOT NULL,
    "failureReason" TEXT,
    "idempotencyKey" TEXT,
    "reference" TEXT,
    "transactionId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QrOperation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QrOperation_rail_route_idx" ON "QrOperation"("rail", "route");

-- CreateIndex
CREATE INDEX "QrOperation_reference_idx" ON "QrOperation"("reference");

-- AddForeignKey
ALTER TABLE "QrOperation" ADD CONSTRAINT "QrOperation_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "Qr"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrOperation" ADD CONSTRAINT "QrOperation_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "QRPayment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
