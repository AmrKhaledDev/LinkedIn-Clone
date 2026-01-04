/*
  Warnings:

  - Added the required column `postId` to the `Replay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Replay" ADD COLUMN     "postId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Replay" ADD CONSTRAINT "Replay_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
