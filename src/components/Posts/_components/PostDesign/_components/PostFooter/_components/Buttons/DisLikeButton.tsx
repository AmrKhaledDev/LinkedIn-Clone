"use client";

import { CreateDisLikeAction } from "@/lib/actions/CreateDisLikeAction";
import { PostType } from "@/lib/types/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiSolidDislike } from "react-icons/bi";
// ============================================================
function DisLikeButton({ post, user }: { post: PostType; user: User }) {
  const isDisLike = post.disLikes.find((dislike) => dislike.userId === user.id);
  const router = useRouter();
  const handleDisLike = async () => {
    const result = await CreateDisLikeAction(user.id, post.id);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
  };
  return (
    <div
      onClick={handleDisLike}
      className={`
         flex items-center gap-2 cursor-pointer sm:py-2 sm:px-4 py-1 px-2 rounded transition-css
         hover:bg-gray-100
         ${isDisLike ? "text-red-500 bg-gray-50" : "text-slate-700"}
       `}
    >
      <i className="sm:text-[20px] text-[25px]">
         <BiSolidDislike />
      </i>
      <h2 className="sm:text-[14px] sm:block hidden text-[12px] font-bold">DisLike</h2>
    </div>
  );
}

export default DisLikeButton;
