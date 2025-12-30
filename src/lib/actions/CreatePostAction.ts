"use server";
import { revalidatePath } from "next/cache";
import { CreatePostSchema } from "../schemas/CreatePostSchema";
import { CreatePostActionDataType } from "../types/types";
import { prisma } from "@/lib/prisma";
// ===================================================================
export const CreatePostAction = async (data: CreatePostActionDataType) => {
  const validation = CreatePostSchema.safeParse(data);
  if (!validation.success) return { error: validation.error.issues[0].message };
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: validation.data.userId,
      },
    });
    if (!user) return { error: "Sign in to create post" };
    const mediaUrl = validation.data.mediaUrl;
    const mediaType = validation.data.mediaType;

    await prisma.post.create({
      data: {
        contentText: validation.data.contentTxt,
        userId: validation.data.userId,
        image: mediaType == "image" ? mediaUrl : null,
        video: mediaType == "video" ? mediaUrl : null,
      },
    });
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return { error: "Failed create post try again later" };
  }
};
