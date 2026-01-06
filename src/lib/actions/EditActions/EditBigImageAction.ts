"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// ================================================================
export const ApplyChangeBigImageAction = async (
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
    type UploadResult = { url: string } | { error: string };
    if (!checkUser) return { error: "User not found, register" };
    if (!imageFile) return { error: "No image provided" };
    const image: UploadResult = await uploadBigImage(imageFile);
    if ("error" in image) {
      return { error: image.error };
    }
    await prisma.user.update({
      where: { id },
      data: {
        imageProfile: image.url,
      },
    });
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return { error: "Failed to change image" };
  }
};

async function uploadBigImage(image: File | null) {
  if (!image) {
    return { error: "No image provided" };
  }
  const formData = new FormData();
  if (image) {
    formData.append("file", image);
  }
  formData.append("pathname", "users-big-images");
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/upload-media`, {
      method: "POST",
      body: formData,
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    return { error: "Failed to upload image, try again later" };
  }
}
