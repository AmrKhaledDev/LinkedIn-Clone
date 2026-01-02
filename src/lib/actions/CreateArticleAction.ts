"use server";
import { CreateArticleSchema } from "../schemas/CreateArticleSchema";
import { CreateArticleActionDataType } from "../types/types";
import { prisma } from "@/lib/prisma";
// ==============================================================
export const CreateArticleAction = async (
  data: CreateArticleActionDataType
) => {
  const validation = CreateArticleSchema.safeParse(data);
  if (!validation.success) return { error: validation.error.issues[0].message };
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: validation.data.userId,
      },
    });
    if (!user) return { error: "User not found" };
    let slug = slugify(validation.data.title);
    let uniqueSlug = slug;
    let counter = 1;
    while (await prisma.article.findUnique({ where: { slug: uniqueSlug } })) {
      counter++;
      uniqueSlug = `${slug}-${counter}`;
    }
    slug = uniqueSlug;
    await prisma.article.create({
      data: {
        userId: validation.data.userId,
        title: validation.data.title,
        content: validation.data.content,
        image: validation.data.image || null,
        video: validation.data.video || null,
        slug,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Failed to create article try later" };
  }
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\u0600-\u06FF\s-]/g, "") // remove symbols
    .replace(/\s+/g, "-"); // كل المسافات تبقى -
}
