"use server";
import { prisma } from "@/lib/prisma";
// =============================================================
export const DeleteBigImageAction = async (
  id: string,
  image: string | null
) => {
  if (!id) return;
  if (!image || image.trim().length < 1)
    return { error: "No image found to delete" };
  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!checkUser) return { error: "Login to delete image" };
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        imageProfile: null,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete image" };
  }
};
