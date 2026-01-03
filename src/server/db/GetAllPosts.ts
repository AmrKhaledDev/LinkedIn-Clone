import { prisma } from "@/lib/prisma";
import { Cache } from "@/lib/Cache";
// ===================================================================
export const GetAllPosts = Cache(
  async () => {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: {
          include: {
            user: true,
            post: {
              include: {
                user: true,
              },
            },
          },
          orderBy: [{ isAuthor: "desc" }, { createdAt: "desc" }],
        },
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
  }
);
