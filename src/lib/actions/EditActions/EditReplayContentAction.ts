"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// ======================================================
export const EditReplayContentAction = async (
  userId: string,
  replayId: string,
  newContent: string
) => {
  if (!userId) return;
  if (!replayId) return;
  if (!newContent) return { error: "Please write a new replay" };
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
    if (newContent.trim().length < 1)
      return { error: "No replay found. Please write a replay" };
    await prisma.replay.update({
      where: {
        id: replayId,
      },
      data: {
        content: newContent,
        isEdited:true
      },
    });
    revalidatePath("/linkedin");
  } catch (error) {
    console.log(error);
    return;
  }
};
