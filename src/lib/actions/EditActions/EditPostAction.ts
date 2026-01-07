"use server";
import { prisma } from "@/lib/prisma";
import { CreatePostSchema } from "@/lib/schemas/CreatePostSchema";
import { CreatePostActionDataType } from "@/lib/types/types";
import { revalidatePath } from "next/cache";
// ===================================================
export const EditPostAction = async (
  data: CreatePostActionDataType,
  postId: string
) => {
  try {
    if (!postId) return;
    const validation = CreatePostSchema.safeParse(data);
    if (!validation.success)
      return { error: validation.error.issues[0].message };
    const dataValidation = validation.data;
    if (dataValidation.contentTxt.trim().length < 1 && !dataValidation.mediaUrl)
      return { error: "You cannot leave the post blank" };
    const user = await prisma.user.findUnique({
      where: {
        id: dataValidation.userId,
      },
    });
    if (!user) return { error: "Login to edit this post" };
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) return { error: "This post not exsit" };
    if (post.userId !== user.id)
      return { error: "You do not own this post, failed edit" };
    const isImage = dataValidation.mediaType === "image";
    const isVideo = dataValidation.mediaType === "video";

    await prisma.post.update({
      where: { id: post.id },
      data: {
        contentText:
          dataValidation.contentTxt.trim().length < 1
            ? null
            : dataValidation.contentTxt,

        image: isImage ? dataValidation.mediaUrl : isVideo ? null : post.image,
        video: isVideo ? dataValidation.mediaUrl : isImage ? null : post.video,
      },
    });

    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return;
  }
};
