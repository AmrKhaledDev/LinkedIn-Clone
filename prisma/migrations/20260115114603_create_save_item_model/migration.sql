-- CreateTable
CREATE TABLE "SaveItem" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "SaveItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaveItem" ADD CONSTRAINT "SaveItem_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
