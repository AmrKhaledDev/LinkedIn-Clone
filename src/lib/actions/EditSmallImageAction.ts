"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// =======================================================================
export const EditSmallImageAction = async (
  id: string,
  imageFile: File | null
) => {
  if (!id) return;
  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!checkUser) return { error: "Login to change image" };
    if (!imageFile) return { error: "No image provided" };
    type UploadResult = { url: string } | { error: string };
    const image: UploadResult = await uploadImage(imageFile);
    if ("error" in image) return { error: image.error };
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        image: image.url,
      },
    });
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return { error: "Failed to change image, try again later" };
  }
};

async function uploadImage(image: File | null) {
  if (!image) return { error: "No image provided" };
  const formData = new FormData();
  formData.append("file", image);
  formData.append("pathname", "users-small-images");
  try {
    const res = await fetch(`${process.env.NEXT_URL}/api/upload-small-image`, {
      method: "POST",
      body: formData,
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    return { error: "Failed to upload image" };
  }
}
