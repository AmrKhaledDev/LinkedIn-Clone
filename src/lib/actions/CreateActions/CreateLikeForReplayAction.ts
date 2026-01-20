"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// ==============================================================
export const CreateLikeForReplayAction = async (
  replayId: string,
  postId: string,
  userId: string
) => {
  if (!replayId) return { error: "This Replay does not exist" };
  if (!userId) return { error: "Login to can send a like" };
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return;
    const replay = await prisma.replay.findUnique({
      where: {
        id: replayId,
      },
    });
    if (!replay) return;
    const isLikeForReplayExist = await prisma.likeForReplay.findUnique({
      where: {
        userId_replayId: {
          userId,
          replayId,
        },
      },
    });

    if (isLikeForReplayExist) {
      await prisma.likeForReplay.delete({
        where: {
          id: isLikeForReplayExist.id,
        },
      });
      if (user.id !== replay.userId) {
        await prisma.notification.deleteMany({
          where: {
            type:"LIKE",
            actorId: userId,
            replayId: replay.id,
          },
        });
      }
    } else {
      await prisma.likeForReplay.create({
        data: {
          userId,
          replayId,
        },
      });
      await prisma.notification.create({
        data: {
          actorId: userId,
          type: "LIKE",
          replayContent: replay.content,
          recipientId: replay.userId,
          title: `${user.name.split(" ")[0]} Liked Your Replay`,
          route: `/linkedin/post/${postId}`,
          replayId: replay.id,
        },
      });
    }
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return;
  }
};
