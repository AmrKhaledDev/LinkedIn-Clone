"use client";
import { PostType } from "@/lib/types/types";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { CreateFollowAction } from "@/lib/actions/CreateActions/CreateFollowAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
// ==============================================================
function OwnerPostDetails({ post, user }: { post: PostType; user: User }) {
  const date = new Date(post.createdAt);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  } as const;
  const formatted = date.toLocaleDateString("en-GB", options);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  if (!post) return;
  const handleFollow = async () => {
    setLoading(true);
    const result = await CreateFollowAction(user.id, post.user.id);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
  };
  const isFollow = post.user.followers.find(
    (follower) => follower.followerId == user.id,
  );
  return (
    <div className="flex gap-2 px-3 pb-3">
      <Image
        src={post.user.image ? post.user.image : "/user.svg"}
        alt="Your Image"
        width={70}
        height={70}
        className="sm:w-12 sm:h-12 w-10 h-10 shrink-0 rounded-full object-cover"
      />
      <div className="w-full flex justify-between">
        <div>
          <div className="flex items-center gap-1">
            <Link
              href={
                post.user.id == user.id
                  ? "/linkedin/profile"
                  : `/linkedin/u/${post.user.id}`
              }
              className="font-semibold capitalize sm:text-[19px] text-[17px] hover:text-primary hover:underline line-clamp-1 w-fit"
            >
              {post.user.name}
            </Link>
            {post.user.role === "SUPER_ADMIN" && (
              <i
                className="text-primary pb-0.5 sm:text-[17px]"
                title="Linkedin Developer"
              >
                <FaLinkedin />
              </i>
            )}
          </div>
          <h2 className="sm:text-[13px] text-[12px] text-slate-700 line-clamp-2 ">
            {post.user.headline}
          </h2>
          <p className="text-[11px] text-slate-700 line-clamp-1">{formatted}</p>
        </div>
        {user.id !== post.user.id && (
          <button
            onClick={handleFollow}
            disabled={loading}
            className={`sm:text-[16px] shrink-0 disabled:text-gray-500 disabled:cursor-default disabled:hover:bg-transparent text-[13px] cursor-pointer flex items-center gap-1  font-bold  rounded px-2 py-1 pr-4 transition-css h-fit ${isFollow ? "bg-gray-100 text-slate-800" : "text-primary hover:text-blue-900 hover:bg-blue-50"}`}
          >
            {isFollow ? (
              <>
                <i>
                  <FaCheck />
                </i>
                Following
              </>
            ) : (
              <>
                <i className="text-[19px] -translate-y-[0.6px]">
                  <MdAdd />
                </i>
                Follow
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default OwnerPostDetails;
