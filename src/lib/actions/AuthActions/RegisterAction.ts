"use server";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../../schemas/RegisterSchema";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import { sendVerificationToken } from "@/lib/email/sendVerificationToken";
import z from "zod";
// ==============================================================================
export const RegisterAction = async (
  data: z.infer<typeof RegisterSchema>,
): Promise<{ success: boolean; message: string }> => {
  try {
    const validation = RegisterSchema.safeParse(data);
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    const isExistingUser = await prisma.user.findUnique({
      where: {
        email: validation.data.email,
      },
      select: { id: true },
    });
    if (isExistingUser)
      return { success: false, message: "This user already exists" };
    const passwordHashed = await bcrypt.hash(validation.data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        password: passwordHashed,
      },
      select: { id: true },
    });
    if (!newUser)
      return {
        success: false,
        message: "Failed create your account, try later",
      };
    const verificationToken = await generateVerificationToken(data.email);
    if (verificationToken.error || !verificationToken.token) {
      return {
        success: false,
        message: verificationToken.error,
      };
    }
    const result = await sendVerificationToken(
      data.email,
      verificationToken.token,
    );
    if (!result.success) {
      await prisma.user.delete({
        where: {
          id: newUser.id,
        },
      });
      return { success: false, message: result.message };
    }
    return { success: true, message: result.message };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed join try again later" };
  }
};
