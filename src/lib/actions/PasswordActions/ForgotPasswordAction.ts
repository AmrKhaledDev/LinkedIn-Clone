"use server";
import { sendResetPasswordEmail } from "@/lib/email/sendResetPasswordEmail";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import { prisma } from "@/lib/prisma";
// =========================================================
export const ForgotPasswordAction = async (
  email: string,
): Promise<{ success: boolean; message: string }> => {
  if (!email)
    return {
      success: false,
      message: "Email address is required to send the verification link",
    };
  try {
    const isExistingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: { id: true },
    });
    if (!isExistingUser)
      return {
        success: false,
        message: "An error occurred while sending the link to your email",
      };
    const verificationToken = await generateVerificationToken(email);
    if (verificationToken.error || !verificationToken.token)
      return { success: false, message: verificationToken.error };
    const result = await sendResetPasswordEmail(email, verificationToken.token);
    if (!result.success) return { success: false, message: result.message };
    return {
      success: true,
      message: "A verification link has been sent to your email",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Verification link failed to send. Please try again.",
    };
  }
};
