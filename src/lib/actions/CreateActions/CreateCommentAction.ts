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
    const comment = await prisma.comment.create({
      data: {
        userId: user.id,
        postId: post.id,
        content: content,
        isAuthor: post.userId === user.id ? true : false,
      },
    });
    if (post.userId !== user.id) {
      await prisma.notification.create({
        data: {
          type: "COMMENT",
          actorId: user.id,
          recipientId: post.userId,
          route: `/linkedin/post/${post.id}`,
          postTitle: post.contentText,
          title: `${user.name.split(" ")[0]} commented on your post`,
          body: content,
          postId: post.id,
          commentId: comment.id,
        },
      });
    }
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return { error: "Failed to send/create comment" };
  }
};
