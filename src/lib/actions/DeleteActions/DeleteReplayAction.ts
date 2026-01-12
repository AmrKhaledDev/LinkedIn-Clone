"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// ===================================================================================
export const DeleteReplayAction = async (userId: string, replayId: string) => {
  if (!userId) return;
  if (!replayId) return;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return { error: "Login to edit your replay" };
    const replay = await prisma.replay.findUnique({
      where: {
        id: replayId,
      },
    });
    if (!replay) return { error: "This replay not exist" };
    if (replay.userId !== user.id)
      return { error: "You do not own this replay" };
    await prisma.replay.delete({
      where: {
        id: replay.id,
      },
    });
    await prisma.notification.deleteMany({
      where: {
        actorId: user.id,
        replayId: replayId,
      },
    });
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return;
  }
};
