"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// ======================================================
export const EditCommentContentACtion = async (
  userId: string,
  commentId: string,
  newContent: string
) => {
  if (!userId) return;
  if (!commentId) return;
  if (!newContent) return { error: "Please write a new comment" };
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return { error: "Login to edit your comment" };
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) return { error: "This comment not exist" };
    if (comment.userId !== user.id)
      return { error: "You do not own this comment" };
    if (newContent.trim().length < 1)
      return { error: "No comment found. Please write a comment" };
    await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: newContent,
        isEdited: true,
      },
    });
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return;
  }
};
