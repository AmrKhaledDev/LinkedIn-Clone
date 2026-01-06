"use server"
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../../schemas/RegisterSchema";
import { RegisterActionDataType } from "../../types/types";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
// ==============================================================================
export const RegisterAction = async (data: RegisterActionDataType) => {
  const validation = RegisterSchema.safeParse(data);
  if (!validation.success) return { error: validation.error.issues[0].message };
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: validation.data.email,
      },
    });
    if (user) return { error: "This user already exists" };
    const passwordHashed = await bcrypt.hash(validation.data.password, 10);
    await prisma.user.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        password: passwordHashed,
      },
    });
    await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.password,
      redirect: false,
    });
  } catch (error) {
    console.log(error);
    return { error: "Failed join try again later" };
  }
};
