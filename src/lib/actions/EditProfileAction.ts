"use server";
import { revalidatePath } from "next/cache";
import { EditProfileSchema } from "../schemas/EditProfileSchema";
import { EditProfileActionDataType } from "../types/types";
import { prisma } from "@/lib/prisma";
// ===============================================================================
export const EditProfileAction = async (data: EditProfileActionDataType) => {
  const validation = EditProfileSchema.safeParse(data);
  if (!validation.success) return { error: validation.error.issues[0].message };
  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        id: validation.data.userId,
      },
    });
    if (!checkUser) return { error: "User not found, register" };
    const { name, school, city, country, headline } = validation.data;
    await prisma.user.update({
      where: {
        id: validation.data.userId,
      },
      data: {
        name,
        school,
        city,
        headline,
        country,
      },
    });
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return { error: "Failed to edit your profile" };
  }
};
