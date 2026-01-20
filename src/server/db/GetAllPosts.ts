import { prisma } from "@/lib/prisma";
import { Cache } from "@/lib/Cache";
// ===================================================================
export const GetAllPosts = Cache(
  async () => {
    const posts = await prisma.post.findMany({
      include: {
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  },
  ["get-posts"],
  {
    revalidate: 3600,
  },
);
