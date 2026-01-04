"use client";

import { CreateLikeAction } from "@/lib/actions/CreateLikeAction";
import { PostType } from "@/lib/types/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiSolidLike } from "react-icons/bi";
// ============================================================
function LikeButton({ post, user }: { post: PostType; user: User }) {
  const isLike = post.likes.find((like) => like.userId === user.id);
  const router = useRouter();

  const handleLike = async () => {
    const result = await CreateLikeAction(user.id, post.id);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
  };
  return (
    <div
      onClick={handleLike}
      className={`
         flex items-center gap-2 cursor-pointer py-2 px-4 rounded transition-css
         hover:bg-gray-100
         ${isLike ? "text-blue-500" : "text-slate-700"}
       `}
    >
      <i className="text-[20px]">
        <BiSolidLike />
      </i>
      <h2 className="text-[14px] font-bold">Like</h2>
    </div>
  );
}

export default LikeButton;
