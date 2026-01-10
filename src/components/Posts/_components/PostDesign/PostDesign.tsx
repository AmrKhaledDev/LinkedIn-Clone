import { PostType } from "@/lib/types/types";
import PostDetails from "./_components/PostDetails";
import OwnerPostDetails from "./_components/OwnerPostDetails";
import EditPost from "./_components/EditPost";
import PostFooter from "./_components/PostFooter/PostFooter";
import { User } from "@prisma/client";
import LikeDetails from "./_components/LikeDetails/LikeDetails";
import DisLikeDetails from "./_components/DisLikeDetails/DisLikeDetails";
// =====================================================================
function PostDesign({ post, user }: { post: PostType; user: User }) {
  if (!user) return;
  return (
    <li id={post.id} className="rounded shadow bg-white">
      <div className="flex flex-col">
        <EditPost post={post} user={user} />
        <OwnerPostDetails post={post} user={user} />
        <PostDetails post={post} />
        <div
          className={`flex justify-between px-3 ${
            (post.likes.length > 0 ||
              post.disLikes.length > 0 ||
              post.comments.length > 0) &&
            "mt-1"
          }`}
        >
          <div className="flex items-center gap-2">
            <LikeDetails user={user} post={post} />
            <DisLikeDetails post={post} user={user} />
          </div>
          {post.comments.length > 0 && (
            <h2 className="text-blackLight text-[13px] pt-1 ">
              <span className="text-[12px] mr-1 pt-1.5">
                {post.comments.length}
              </span>
              comment
            </h2>
          )}
        </div>
        <PostFooter user={user} post={post} />
      </div>
    </li>
  );
}

export default PostDesign;
