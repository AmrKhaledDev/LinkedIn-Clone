/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `SaveItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `SaveItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isSaved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SaveItem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SaveItem_userId_postId_key" ON "SaveItem"("userId", "postId");

-- AddForeignKey
ALTER TABLE "SaveItem" ADD CONSTRAINT "SaveItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
