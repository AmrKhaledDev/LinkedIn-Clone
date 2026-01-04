-- CreateTable
CREATE TABLE "LikeForReplay" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "replayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LikeForReplay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LikeForReplay_userId_replayId_key" ON "LikeForReplay"("userId", "replayId");

-- AddForeignKey
ALTER TABLE "LikeForReplay" ADD CONSTRAINT "LikeForReplay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeForReplay" ADD CONSTRAINT "LikeForReplay_replayId_fkey" FOREIGN KEY ("replayId") REFERENCES "Replay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
