import Profile from "@/components/Profile/Profile";
import { GetUser } from "@/lib/GetUser";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
// ==========================================================================
export const metadata: Metadata = {
  title: "User Profile | Connect & Grow Professionally",
  description:
    "Discover professional experience, skills, and achievements. Build meaningful connections and grow your career.",
  icons: {
    icon: "/linkedin.png",
  },
};
async function page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  if (!userId) redirect("/login");
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
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
      receivedNotifications: {
        include: {
          actor: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!user) return;
  const currentUser = await GetUser();
  if (!currentUser) return;
  return (
    <main className="space-section min-h-screen bg-[#F4F2EE]">
      <div className="container-css p-3">
        <Profile user={user} currentUser={currentUser} />
      </div>
    </main>
  );
}

export default page;
