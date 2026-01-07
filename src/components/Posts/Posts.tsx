import { GetUser } from "@/lib/GetUser";
import PostDesign from "./_components/PostDesign/PostDesign";
import { PostType } from "@/lib/types/types";
// ==============================================================
async function Posts({ posts }: { posts: PostType[] }) {
  const user = await GetUser();
  if(!user) return
  return (
    <div>
      <ul className="flex flex-col gap-3">
        {posts.map((post: PostType) => (
          <PostDesign user={user} key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default Posts;
