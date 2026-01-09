"use client";

import { CreateLikeAction } from "@/lib/actions/CreateActions/CreateLikeAction";
import { PostType } from "@/lib/types/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
// ============================================================
function LikeButton({ post, user }: { post: PostType; user: User }) {
  const isLike = post.likes.find((like) => like.userId === user.id);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLike = async () => {
    setLoading(true);
    const result = await CreateLikeAction(user.id, post.id);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
  };
  return (
    <div
      onClick={handleLike}
      className={`
         flex items-center gap-2 ${
           loading ? "pointer-events-none" : "cursor-pointer  hover:bg-gray-100"
         }  sm:py-2 sm:px-4 py-1 px-2 rounded transition-css
        
         ${isLike ? "text-blue-500 " : "text-slate-700"}
       `}
    >
      {loading ? (
        <div className="flex space-x-1 items-center justify-center">
          <div className="size-1.5 bg-primary rounded-full animate-[bounce_1s_infinite_0ms]"></div>
          <div className="size-1.5 bg-primary rounded-full animate-[bounce_1s_infinite_200ms]"></div>
          <div className="size-1.5 bg-primary rounded-full animate-[bounce_1s_infinite_400ms]"></div>
        </div>
      ) : (
        <>
          <i className="text-[20px] like">
            {isLike ? <BiSolidLike /> : <BiLike />}
          </i>
          <h2 className="text-[14px] font-bold likeText">Like</h2>
        </>
      )}
    </div>
  );
}

export default LikeButton;
