import Profile from "@/components/Profile/Profile";
import { GetUser } from "@/lib/GetUser";
import { prisma } from "@/lib/prisma";
import { UserWithRelationType } from "@/lib/types/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
// ==========================================================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> {
  const { userId } = await params;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) return { title: "User not found" };
  return {
    title: user.name.toUpperCase(),
    description: user.headline,
  };
}

async function page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  if (!userId) redirect("/login");
  const user: UserWithRelationType | null = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
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
      },
      followers: {
        include: {
          follower: true,
        },
      },
      receivedNotifications: {
        include: {
          actor: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      saveItems: {
        include: {
          post: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });
  if (!user) return;
  const userSession = await GetUser();
  if (!userSession) return;
  return (
    <main className="space-section min-h-screen bg-[#F4F2EE]">
      <div className="container-css p-3">
        <Profile
          user={user as UserWithRelationType}
          userSession={userSession}
        />
      </div>
    </main>
  );
}

export default page;
