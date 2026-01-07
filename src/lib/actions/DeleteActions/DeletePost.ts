"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// ==============================================================
export const DeletePostAction = async (userId: string, postId: string) => {
  if (!userId) return;
  if (!postId) return;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return { error: "Login to delete this post" };
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) return { error: "This post not exsit" };
    if (post.userId !== user.id) return { error: "You do not own this post" };
    await prisma.post.delete({
      where: {
        id: post.id,
      },
    });
    revalidatePath("/linkedin")
  } catch (error) {
    console.log(error);
    return;
  }
};
