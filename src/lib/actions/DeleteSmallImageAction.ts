"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// =================================================================
export const DeleteSmallImageAction = async (id: string) => {
  if (!id) return;
  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!checkUser) return { error: "Login to delete your image" };
    if (!checkUser.image || checkUser.image.trim().length < 1)
      return { error: "No image found to delete" };
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        image: null,
      },
    });
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return { error: "Failed delete your image" };
  }
};
