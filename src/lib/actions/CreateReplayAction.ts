"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// =========================================================================
export const CreateReplayAction = async (
  content: string,
  commentId: string,
  userId: string,
  postId: string
) => {
  try {
    if (!commentId) return { error: "This Comment does not exist" };
    if (!userId) return { error: "Login to can send a replay" };
    if (!postId) return { error: "This Replay does not exist" };
    if (content.trim().length < 1)
      return { error: "Please add your reply before submitting" };
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
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) return;
    await prisma.replay.create({
      data: {
        userId,
        commentId,
        content,
        postId,
        isAuthor: post.userId === userId,
      },
    });
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return;
  }
};
