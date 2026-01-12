/*
  Warnings:

  - You are about to drop the column `commentTitle` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "commentTitle",
ADD COLUMN     "commentContent" TEXT;
