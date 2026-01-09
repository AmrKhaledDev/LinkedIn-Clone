"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// ========================================================================
export const DeletePostImageAction = async (postId: string, userId: string) => {
  if (!userId) return;
  if (!postId) return;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return { error: "Login to delete post image" };
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) return { error: "Post image not found" };
    if (user.id !== post.userId) return { error: "You do not own this post" };
    if (!post.contentText && post.image) {
      await prisma.post.delete({
        where: {
          id: post.id,
        },
      });
    } else {
      await prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          image: null,
          video: null,
        },
      });
    }
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return { error: "Failed delete post image" };
  }
};
