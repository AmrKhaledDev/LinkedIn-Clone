"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// ============================================================
export const CreateFollowAction = async (
  followerId: string,
  followingId: string,
) => {
  if (!followerId || !followingId) return;
  try {
    const isFollowing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    const actor = await prisma.user.findUnique({
      where: {
        id: followerId,
      },
    });
    if (!actor) return;
    if (isFollowing) {
      await prisma.follow.delete({
        where: {
          id: isFollowing.id,
        },
      });
      await prisma.notification.deleteMany({
        where: {
          type: "FOLLOW",
          actorId: followerId,
          recipientId: followingId,
        },
      });
    } else {
      await prisma.follow.create({
        data: {
          followerId,
          followingId,
        },
      });
      await prisma.notification.create({
        data: {
          title: `${actor.name} is following you`,
          route: `/linkedin/u/${actor.id}`,
          actorId: actor.id,
          recipientId: followingId,
          type: "FOLLOW",
        },
      });
    }
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return { error: "Faield Follow, try again later" };
  }
};
