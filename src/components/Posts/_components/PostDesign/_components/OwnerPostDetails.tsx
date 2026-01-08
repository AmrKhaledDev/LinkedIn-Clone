"use client";
import { PostType } from "@/lib/types/types";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
// ==============================================================
function OwnerPostDetails({ post, user }: { post: PostType; user: User }) {
  const date = new Date(user.createdAt);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  } as const;
  const formatted = date.toLocaleDateString("en-GB", options);
  if (!post) return;
  return (
    <div className="flex gap-2 p-3">
      <Image
        src={post.user.image ? post.user.image : "/user.svg"}
        alt="Your Image"
        width={70}
        height={70}
        className="sm:w-15 sm:h-15 w-12 h-12 shrink-0 rounded-full object-cover border-2 border-gray-200"
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
                className="text-blue-500 text pb-0.5 sm:text-[14px] text-[13px]"
                title="Super Admin"
              >
                <BsFillPatchCheckFill />
              </i>
            )}
          </div>
          <h2 className="sm:text-[13px] text-[12px] text-slate-700 line-clamp-1 break-all">
            {post.user.headline}
          </h2>
          <p className="text-[11px] text-slate-700 line-clamp-1">{formatted}</p>
        </div>
        {user.id !== post.user.id && (
          <button className="sm:text-[17px] text-[14px] cursor-pointer gap-1 flex items-center text-primary font-bold hover:bg-blue-50 rounded px-2 py-2 transition-css hover:text-blue-800 h-fit">
            <i className="sm:text-[20px] -translate-y-[0.6px]">
              <FaPlus />
            </i>
            Follow
          </button>
        )}
      </div>
    </div>
  );
}

export default OwnerPostDetails;
