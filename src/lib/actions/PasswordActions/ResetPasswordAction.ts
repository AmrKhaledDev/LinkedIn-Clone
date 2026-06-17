"use server";
import { prisma } from "@/lib/prisma";
import { ResetPasswordSchema } from "@/lib/schemas/Password/ResetPasswordSchema";
import bcrypt from "bcryptjs";
import { createHash } from "node:crypto";
import z from "zod";
// =============================================================
export const ResetPasswordAction = async (
  data: z.infer<typeof ResetPasswordSchema>,
  verificationToken: string,
): Promise<{ success: boolean; message: string }> => {
  const validation = ResetPasswordSchema.safeParse(data);
  if (!validation.success)
    return { success: false, message: validation.error.issues[0].message };
  try {
    const token = createHash("sha256").update(verificationToken).digest("hex");
    const isExistingToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });
    if (!isExistingToken)
      return {
        success: false,
        message: "The verification code is not found or has expired",
      };
    const isExpired = new Date(isExistingToken.expires) < new Date();
    if (isExpired)
      return {
        success: false,
        message: "Verification code not found or expired",
      };
    const isExistingUser = await prisma.user.findUnique({
      where: {
        email: isExistingToken.identifier,
      },
    });
    if (!isExistingUser) return { success: false, message: "User not found" };
    const hashedPassword = await bcrypt.hash(validation.data.newPassword, 12);
    await prisma.$transaction([
      prisma.user.update({
        where: {
          email: isExistingToken.identifier,
        },
        data: {
          password: hashedPassword,
        },
      }),
      prisma.verificationToken.delete({
        where: {
          token,
        },
      }),
    ]);
    return {
      success: true,
      message: "Password successfully changed. Make sure to remember it",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to reset password, try again" };
  }
};
