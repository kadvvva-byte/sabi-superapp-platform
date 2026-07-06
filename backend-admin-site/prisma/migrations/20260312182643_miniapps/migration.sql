/*
  Warnings:

  - You are about to drop the column `mediaType` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `StoryView` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storyId,viewerId]` on the table `StoryView` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `viewerId` to the `StoryView` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Story" DROP COLUMN "mediaType",
ADD COLUMN     "text" TEXT,
ALTER COLUMN "mediaUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StoryView" DROP COLUMN "userId",
ADD COLUMN     "viewerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MiniApp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "iconUrl" TEXT,
    "launchUrl" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MiniApp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoryView_storyId_viewerId_key" ON "StoryView"("storyId", "viewerId");
