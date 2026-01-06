"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// =============================================================================
export const CreateLikeAction = async (userId: string, postId: string) => {
  if (!userId) return { error: "Login to can send a like" };
  if (!postId) return { error: "This post does not exist" };
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) return;
    const isLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    const isDisLike = await prisma.disLike.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    if (isDisLike) {
      await prisma.disLike.delete({
        where: {
          id: isDisLike.id,
        },
      });
    }
    if (isLike) {
      await prisma.like.delete({
        where: {
          id: isLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
    }
    revalidatePath("/linkedin");
  } catch (error) {
    return;
  }
};
