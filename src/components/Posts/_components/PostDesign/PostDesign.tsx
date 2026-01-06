import { PostType } from "@/lib/types/types";
import Image from "next/image";
import PostDetails from "./_components/PostDetails";
import OwnerPostDetails from "./_components/OwnerPostDetails";
import { GetUser } from "@/lib/GetUser";
import EditPost from "./_components/EditPost";
import PostFooter from "./_components/PostFooter/PostFooter";
// =====================================================================
async function PostDesign({ post }: { post: PostType }) {
  const user = await GetUser();
  if (!user) return;
  const isLike = post.likes.find((like) => like.userId === user.id);
  const isDisLike = post.disLikes.find((like) => like.userId === user.id);
  return (
    <li className="rounded shadow bg-white">
      <EditPost postId={post.id} />
      <div className="flex flex-col">
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
            {post.likes.length > 0 && (
              <div className="flex items-center gap-1">
                <Image src={"/like.svg"} alt="Like" width={20} height={20} />
                <span className="text-blackLight text-[13px]">
                  {isLike ? (
                    post.likes.length > 1 ? (
                      <span className="flex items-center gap-1">
                        you,<span>{post.likes.length - 1}</span>
                      </span>
                    ) : (
                      <span>you</span>
                    )
                  ) : (
                    <>{post.likes.length}</>
                  )}
                </span>
              </div>
            )}
            {post.disLikes.length > 0 && (
              <div className="flex items-center gap-1">
                <Image
                  src={"/dislike.png"}
                  alt="Like"
                  width={17.5}
                  height={17.5}
                />
                <span className="text-blackLight text-[13px]">
                  {isDisLike ? (
                    post.disLikes.length > 1 ? (
                      <span className="flex items-center gap-1">
                        you,<span>{post.disLikes.length - 1}</span>
                      </span>
                    ) : (
                      <span>you</span>
                    )
                  ) : (
                    <>{post.disLikes.length}</>
                  )}{" "}
                </span>
              </div>
            )}
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
