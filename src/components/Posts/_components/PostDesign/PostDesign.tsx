import { PostType } from "@/lib/types/types";
import Image from "next/image";
import PostDetails from "./_components/PostDetails";
import OwnerPostDetails from "./_components/OwnerPostDetails";
import { GetUser } from "@/lib/GetUser";
import ActionsInPost from "./_components/PostFooter";
import EditPost from "./_components/EditPost";
import Comments from "./_components/Comments/Comments";
import PostFooter from "./_components/PostFooter";
// =====================================================================
async function PostDesign({ post }: { post: PostType }) {
  const user = await GetUser();
  if (!user) return;
  return (
    <li className="rounded shadow bg-white  overflow-hidden">
      <EditPost postId={post.id} />
      <div className="flex flex-col gap-2">
        <OwnerPostDetails post={post} user={user} />
        <PostDetails post={post} />
        <div className="flex justify-between px-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Image src={"/like.svg"} alt="Like" width={20} height={20} />
              <span className="text-blackLight text-[13px]">17</span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src={"/dislike.png"}
                alt="Like"
                width={17.5}
                height={17.5}
              />
              <span className="text-blackLight text-[13px]">10</span>
            </div>
          </div>
          <h2 className="text-blackLight text-[13px] pt-1 ">
            <span className="text-[12px] mr-1 pt-1.5">
              {post.comments.length}
            </span>
            comment
          </h2>
        </div>
          <PostFooter user={user} post={post} />
      </div>
    </li>
  );
}

export default PostDesign;
