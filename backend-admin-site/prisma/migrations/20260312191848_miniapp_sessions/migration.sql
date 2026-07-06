-- CreateTable
CREATE TABLE "MiniAppSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "miniAppId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MiniAppSession_pkey" PRIMARY KEY ("id")
);
