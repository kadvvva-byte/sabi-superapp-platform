-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'FILE', 'VOICE');

-- DropIndex
DROP INDEX "Message_chatId_idx";

-- DropIndex
DROP INDEX "Message_userId_idx";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "mediaType" "MediaType",
ADD COLUMN     "mediaUrl" TEXT,
ALTER COLUMN "content" DROP NOT NULL;
