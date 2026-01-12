"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// =============================================================================
export const CreateDisLikeAction = async (userId: string, postId: string) => {
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
    const isDisLike = await prisma.disLike.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    const isLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    if (isLike) {
      await prisma.like.delete({
        where: {
          id: isLike.id,
        },
      });
      await prisma.notification.deleteMany({
        where: {
          actorId: userId,
          postId: postId,
        },
      });
    }
    if (isDisLike) {
      await prisma.disLike.delete({
        where: {
          id: isDisLike.id,
        },
      });
      await prisma.notification.deleteMany({
        where: {
          actorId: userId,
          postId: postId,
        },
      });
    } else {
      await prisma.disLike.create({
        data: {
          userId,
          postId,
        },
      });
      if (post.userId !== user.id) {
        await prisma.notification.create({
          data: {
            type: "DISLIKE",
            actorId: user.id,
            recipientId: post.userId,
          route: `/linkedin/post/${post.id}`,
            title: `${user.name.split(" ")[0]} didn’t like your post`,
            postTitle: post.contentText,
            postId: post.id,
          },
        });
      }
    }
    revalidatePath("/linkedin");
  } catch (error) {
    return;
  }
};
