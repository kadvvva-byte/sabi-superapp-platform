-- CreateEnum
CREATE TYPE "CallPresentationStatus" AS ENUM ('IDLE', 'ACTIVE');

-- AlterTable
ALTER TABLE "CallSession" ADD COLUMN     "presentationEndedAt" TIMESTAMP(3),
ADD COLUMN     "presentationStartedAt" TIMESTAMP(3),
ADD COLUMN     "presentationStatus" "CallPresentationStatus" NOT NULL DEFAULT 'IDLE',
ADD COLUMN     "presenterUserId" TEXT;

-- CreateIndex
CREATE INDEX "CallSession_presentationStatus_idx" ON "CallSession"("presentationStatus");

-- CreateIndex
CREATE INDEX "CallSession_presenterUserId_idx" ON "CallSession"("presenterUserId");
