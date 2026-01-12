"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// ===================================================================================
export const DeleteCommentAction = async (
  userId: string,
  commentId: string
) => {
  if (!userId) return;
  if (!commentId) return;
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
    await prisma.comment.delete({
      where: {
        id: comment.id,
      },
    });
    await prisma.notification.deleteMany({
      where: {
        actorId: userId,
        commentId: comment.id,
      },
    });
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return;
  }
};
