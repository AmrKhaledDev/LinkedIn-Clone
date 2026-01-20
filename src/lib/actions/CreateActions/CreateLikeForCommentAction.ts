"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// =================================================================================
export const CreateLikeForComment = async (
  commentId: string,
  postId: string,
  userId: string
) => {
  if (!commentId) return { error: "This Comment does not exist" };
  if (!userId) return { error: "Login to can send a like" };
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return;
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) return;
    const isLikeForCommentExist = await prisma.likeForComment.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });
    if (isLikeForCommentExist) {
      await prisma.likeForComment.delete({
        where: {
          id: isLikeForCommentExist.id,
        },
      });
      if (user.id !== comment.userId) {
        await prisma.notification.deleteMany({
          where: {
            type:"LIKE",
            actorId: userId,
            commentId: comment.id,
          },
        });
      }
    } else {
      await prisma.likeForComment.create({
        data: {
          userId,
          commentId,
        },
      });
      if (user.id !== comment.userId) {
        await prisma.notification.create({
          data: {
            type: "LIKE",
            postId: postId,
            title: `${user.name.split(" ")[0]} Liked Your Comment`,
            actorId: user.id,
            recipientId: comment.userId,
          route: `/linkedin/post/${postId}`,
            commentContent: comment.content,
            commentId: comment.id,
          },
        });
      }
    }
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return;
  }
};
