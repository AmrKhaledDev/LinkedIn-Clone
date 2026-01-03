"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// =====================================================
export const CreateCommentAction = async (
  userId: string,
  postId: string,
  content: string
) => {
  if (!userId) return { error: "Login to send comment" };
  if (!postId) return { error: "This post does not exist" };
  if (content.trim().length < 1)
    return { error: "No comment found. Please write a comment" };
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
    await prisma.comment.create({
      data: {
        userId: user.id,
        postId: post.id,
        content: content,
        isAuthor: post.userId === user.id ? true : false,
      },
    });
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return { error: "Failed to send/create comment" };
  }
};
