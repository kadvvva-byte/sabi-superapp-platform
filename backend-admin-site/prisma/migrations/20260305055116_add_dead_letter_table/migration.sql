-- DropIndex
DROP INDEX "Outbox_processed_idx";

-- AlterTable
ALTER TABLE "Outbox" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "error" TEXT,
ADD COLUMN     "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "DeadLetter" (
    "id" TEXT NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "aggregateType" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL,
    "failedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeadLetter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DeadLetter_aggregateId_idx" ON "DeadLetter"("aggregateId");

-- CreateIndex
CREATE INDEX "Outbox_processed_nextAttemptAt_idx" ON "Outbox"("processed", "nextAttemptAt");
