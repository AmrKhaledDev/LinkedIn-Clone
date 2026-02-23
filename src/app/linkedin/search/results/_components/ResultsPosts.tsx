import PostDesign from "@/components/Posts/_components/PostDesign/PostDesign";
import { PostType } from "@/lib/types/types";
import { User } from "@prisma/client";
// ==========================================================
function ResultsPosts({ posts, user }: { posts: PostType[]; user: User }) {
  return (
    <div
      id="posts"
      className="bg-white border border-[#DFDEDA] p-4 rounded-[10px] space-y-5"
    >
      <h2 className="font-extrabold text-xl">Posts</h2>
      <div className="space-y-3">
        {posts.map((post) => (
          <PostDesign key={post.id} post={post} user={user} />
        ))}
      </div>
    </div>
  );
}

export default ResultsPosts;
