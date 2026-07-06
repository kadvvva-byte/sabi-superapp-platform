-- CreateTable
CREATE TABLE "ChatFolder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatFolderItem" (
    "id" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "ChatFolderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatFolderItem_folderId_chatId_key" ON "ChatFolderItem"("folderId", "chatId");

-- AddForeignKey
ALTER TABLE "ChatFolderItem" ADD CONSTRAINT "ChatFolderItem_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "ChatFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
