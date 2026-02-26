import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// =================================================================
export async function GET(req: NextRequest) {
  const searchText = req.nextUrl.searchParams.get("q")?.trim();
  const postInclude = {
    user: {
      include: {
        followers: true,
      },
    },
    comments: {
      include: {
        user: true,
        post: {
          include: {
            user: true,
          },
        },
        likeForComments: {
          include: {
            user: true,
            comment: true,
          },
        },
        replays: {
          include: {
            user: true,
            comment: true,
            post: true,
            likeForReplays: {
              include: {
                user: true,
              },
            },
          },
          orderBy: [{ isAuthor: "desc" }, { createdAt: "desc" }],
        },
      },
      orderBy: [{ isAuthor: "desc" }, { createdAt: "desc" }],
    },
    likes: {
      include: {
        user: true,
        post: true,
      },
    },
    disLikes: {
      include: {
        user: true,
        post: true,
      },
    },
    saveItems: true,
  };

  try {
    const posts = searchText
      ? await prisma.post.findMany({
          where: { contentText: { contains: searchText, mode: "insensitive" } },
          take: 4,
          include: postInclude as object,
        })
      : await prisma.post.findMany({ take: 4, include: postInclude as object });

    const users = searchText
      ? await prisma.user.findMany({
          where: {
            name: { contains: searchText, mode: "insensitive" },
          },
          include: {
            followers: true,
          },
          take: 4,
        })
      : await prisma.user.findMany({
          take: 4,
          include: {
            followers: true,
          },
        });

    return NextResponse.json({ posts, users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed search, try again" },
      { status: 500 },
    );
  }
}
