"use server";
import { prisma } from "@/lib/prisma";
// =========================================================
export const DeleteNotificationAction = async (
  notificationId: string,
  userId: string
) => {
  if (!notificationId || !userId) {
    return { error: "Missing data" };
  }
  try {
    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        recipientId: userId,
      },
    });

    if (!notification) {
      return { error: "Notification not found or unauthorized" };
    }

    await prisma.notification.delete({
      where: { id: notificationId },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};
