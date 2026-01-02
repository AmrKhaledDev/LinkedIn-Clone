"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { UserWithRelationType } from "./types/types";
// ======================================================================
export const GetUserWithRelation = async () => {
  try {
    const session = await auth();
    let user: UserWithRelationType | null = null;
    if (session && session.user) {
      const userDB = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        include: {
          posts: {
            orderBy:{
              createdAt:"desc"
            },
            include: {
              user: true,
            },
          },
        },
      });
      user = userDB;
    }
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
