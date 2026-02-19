"use server";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../../schemas/RegisterSchema";
import { RegisterActionDataType } from "../../types/types";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import { sendVerificationToken } from "@/lib/email/sendVerificationToken";
// ==============================================================================
export const RegisterAction = async (
  data: RegisterActionDataType,
): Promise<{ success: boolean; message: string }> => {
  const validation = RegisterSchema.safeParse(data);
  if (!validation.success)
    return { success: false, message: validation.error.issues[0].message };
  try {
    const isExisting = await prisma.user.findUnique({
      where: {
        email: validation.data.email,
      },
    });
    if (isExisting) return { success: false, message: "This user already exists" };
    const passwordHashed = await bcrypt.hash(validation.data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        password: passwordHashed,
      },
    });
    if (!newUser)
      return {
        success: false,
        message: "Failed create your account, try later",
      };
    const verificationToken: { error: string } | { token: string } =
      await generateVerificationToken(data.email);
    if ("error" in verificationToken)
      return { success: false, message: verificationToken.error };
    const result = await sendVerificationToken(
      data.email,
      verificationToken.token,
    );
    if (!result.success) return { success: false, message: result.message };
    return { success: true, message: result.message };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed join try again later" };
  }
};
