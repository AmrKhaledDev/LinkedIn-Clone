import LeftSide from "@/components/LeftSide/LeftSide";
import PostDesign from "@/components/Posts/_components/PostDesign/PostDesign";
import RightSide from "@/components/RightSide/RightSide";
import { GetUser } from "@/lib/GetUser";
import { prisma } from "@/lib/prisma";
// ================================================
async function page({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  if (!postId) return;
  const user = await GetUser();
  if (!user) return;
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: {
        include:{
          followers:true
        }
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
      saveItems:true
    },
  });
  if (!post) return;
  return (
    <main className="space-section min-h-screen bg-[#F4F2EE]">
      <div className="container-css flex gap-4 p-3">
        <div className="lg:block hidden">
          <LeftSide />
        </div>
        <div className="flex-1">
          <PostDesign post={post} user={user} />
        </div>
        <RightSide />
      </div>
    </main>
  );
}

export default page;
