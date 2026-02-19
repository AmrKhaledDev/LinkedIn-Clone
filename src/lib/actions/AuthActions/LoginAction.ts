"use server";
import bcrypt from "bcryptjs";
import { LoginActionDataType } from "../../types/types";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { LoginSchema } from "../../schemas/LoginSchema";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import { sendVerificationToken } from "@/lib/email/sendVerificationToken";
// ==============================================================================
export const LoginAction = async (
  data: LoginActionDataType,
): Promise<{ success: boolean; message: string }> => {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success)
    return { success: false, message: validation.error.issues[0].message };
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: validation.data.email,
      },
    });
    if (!user) {
      return { success: false, message: "No user found with this email." };
    }
    if (!user.password) {
      return {
        success: false,
        message:
          "This is an external account. Please login with Google/GitHub.",
      };
    }
    const passwordHashed = await bcrypt.compare(
      validation.data.password,
      user.password,
    );
    if (!passwordHashed)
      return { success: false, message: "Incorrect password" };
    if (!user.emailVerified) {
      const verificationToken: { error: string } | { token: string } =
        await generateVerificationToken(user.email);
      if ("error" in verificationToken)
        return { success: false, message: verificationToken.error };
      const result = await sendVerificationToken(
        user.email,
        verificationToken.token,
      );
      if (!result.success) return { success: false, message: result.message };
      return { success: true, message: result.message };
    }

    await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.password,
      redirect: false,
    });
    return { success: true, message: "You are logged in" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed signin try again later" };
  }
};
