-- AlterTable
ALTER TABLE "Qr" ADD COLUMN     "provider" TEXT,
ADD COLUMN     "usageLimit" INTEGER;

-- CreateIndex
CREATE INDEX "Message_replyToMessageId_idx" ON "Message"("replyToMessageId");
