"use server";
import { prisma } from "@/lib/prisma";
import { createHash } from "node:crypto";
// =================================================================
export const VerificationAction = async (
  verificationToken: string,
): Promise<{ success: boolean; message: string }> => {
  if (!verificationToken)
    return { success: false, message: "The code is invalid or has expired" };
  try {
    const token = createHash("sha256").update(verificationToken).digest("hex")
    const isExistingToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });
    if (!isExistingToken)
      return {
        success: false,
        message: "The code is invalid or has expired",
      };
    const isExpired = new Date(isExistingToken.expires) < new Date();
    if (isExpired)
      return {
        success: false,
        message: "Verification failed. Please check your code or request a new one",
      };
    await prisma.$transaction([
      prisma.user.update({
        where: {
          email: isExistingToken.identifier,
        },
        data: {
          emailVerified: new Date(),
        },
      }),
      prisma.verificationToken.delete({
        where: {
          token: isExistingToken.token,
        },
      }),
    ]);
    return {
      success: true,
      message: "Congratulations, your email has been verified",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while verifying your email. Try again",
    };
  }
};
