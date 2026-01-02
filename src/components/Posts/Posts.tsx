import PostDesign from "./_components/PostDesign/PostDesign";
import { PostType } from "@/lib/types/types";
// ==============================================================
async function Posts({ posts }: { posts: PostType[] }) {
  return (
    <div>
      <ul className="flex flex-col gap-3">
        {posts.map((post: PostType) => (
          <PostDesign key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default Posts;
