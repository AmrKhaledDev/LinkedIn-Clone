"use server";
import { createHash, randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
// ======================================================================================
export const generateVerificationToken = async (email: string) => {
  try {
    const token = randomUUID();
    const hashedToken = createHash("sha256").update(token).digest("hex");
    await prisma.$transaction([
      prisma.verificationToken.deleteMany({
        where: {
          identifier: email,
        },
      }),
      prisma.verificationToken.create({
        data: {
          identifier: email,
          token: hashedToken,
          expires: new Date(new Date().getTime() + 15 * 60 * 1000),
        },
      }),
    ]);
    return { token };
  } catch (error) {
    console.log(error);
    return { error: "Failed to create verification token" };
  }
};
