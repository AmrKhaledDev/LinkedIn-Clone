"use client";

import { CreateDisLikeAction } from "@/lib/actions/CreateActions/CreateDisLikeAction";
import { PostType } from "@/lib/types/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiSolidDislike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
// ============================================================
function DisLikeButton({ post, user }: { post: PostType; user: User }) {
  const isDisLike = post.disLikes.find((dislike) => dislike.userId === user.id);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDisLike = async () => {
    setLoading(true);
    const result = await CreateDisLikeAction(user.id, post.id);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
  };
  return (
    <div
      onClick={handleDisLike}
      className={`
         flex items-center gap-2 cursor-pointer  ${
           loading ? "pointer-events-none" : "cursor-pointer  hover:bg-gray-100"
         } sm:py-2 sm:px-4 py-1 px-2 rounded transition-css
         hover:bg-gray-100
         ${isDisLike ? "text-red-500" : "text-slate-700"}
       `}
    >
      {loading ? (
        <div className="flex space-x-1 items-center justify-center">
          <div className="size-1.5 bg-red-500 rounded-full animate-[bounce_1s_infinite_0ms]"></div>
          <div className="size-1.5 bg-red-500 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
          <div className="size-1.5 bg-red-500 rounded-full animate-[bounce_1s_infinite_400ms]"></div>
        </div>
      ) : (
        <>
          <i className="text-[20px] dislike">
            {isDisLike ? <BiSolidDislike /> : <BiDislike />}
          </i>
          <h2 className="text-[14px] font-bold dislikeText">DisLike</h2>
        </>
      )}
    </div>
  );
}

export default DisLikeButton;
