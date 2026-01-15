"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// ============================================================================
export const CreateSaveItemAction = async (postId: string, userId: string) => {
  if (!postId || !userId) return {error:"Failed Save"};
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) return;
    const isSaved = await prisma.saveItem.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    if (isSaved) {
      await prisma.saveItem.delete({
        where: {
          id: isSaved.id,
        },
      });
    } else {
      await prisma.saveItem.create({
        data: {
          postId,
          userId,
        },
      });
    }
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return { error: "Failed add this post to saved items" };
  }
};
