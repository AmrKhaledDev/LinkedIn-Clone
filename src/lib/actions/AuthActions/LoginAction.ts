"use server"
import bcrypt from "bcryptjs";
import { LoginActionDataType } from "../../types/types";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { LoginSchema } from "../../schemas/LoginSchema";
// ==============================================================================
export const LoginAction = async (data: LoginActionDataType) => {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) return { error: validation.error.issues[0].message };
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: validation.data.email,
      },
    });
    if (!user || !user?.password) return { error: "This user not exists" };
    const passwordHashed = await bcrypt.compare(validation.data.password,user.password)
    if(!passwordHashed) return {error:"Incorrect password"}
    await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.password,
      redirect: false,
    });
  } catch (error) {
    console.log(error);
    return { error: "Failed signin try again later" };
  }
};
