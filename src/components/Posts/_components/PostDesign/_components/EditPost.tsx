"use client";
import Image from "next/image";
import { FaRegBookmark } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { PostType } from "@/lib/types/types";
import ButtonDeletePost from "./ButtonDeletePost";
import ButtonEditPost from "./ButtonEditPost/ButtonEditPost";
import { User } from "@prisma/client";

// ============================================================
interface EditPostProps {
  user: User;
  post: PostType;
}

function EditPost({ post, user }: EditPostProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = () => {
    setOpenId((prev) => (prev === post.id ? null : post.id));
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest(`#edit-post-${post.id}`) && openId === post.id) {
        setOpenId(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openId, post.id]);
  const isOpen = openId === post.id;
  return (
    <div
      id={`edit-post-${post.id}`}
      className="pt-2 mx-3 flex items-center justify-end relative"
    >
      <div className="w-fit relative">
        <div>
          <Image
            onClick={toggle}
            src={"/ellipsis.svg"}
            alt="Icon"
            width={30}
            height={30}
            className="cursor-pointer button hover:bg-gray-100 rounded-full p-1 transition-css"
          />
        </div>
        {isOpen && (
          <div className="shadow div z-10 bg-white border border-gray-200 rounded-xl absolute right-0 sm:w-65 w-58 sm:p-3 p-1 flex flex-col gap-3">
            {post.userId === user.id && (
              <>
                <button className="flex items-center gap-3 cursor-pointer py-2 px-4 rounded hover:bg-gray-100 sm:text-[14px] text-[13px] font-semibold">
                  <i className="sm:text-[18px]">
                    <FaRegBookmark />
                  </i>
                  Save
                </button>
                <ButtonDeletePost userId={user.id} post={post} />
                <ButtonEditPost post={post} user={user} />
              </>
            )}
            <button className="flex items-center gap-3 cursor-pointer py-2 px-4 rounded hover:bg-gray-100 sm:text-[14px] text-[13px] font-semibold">
              <i className="sm:text-[22px] text-[18px]">
                <IoCloseCircleOutline />
              </i>
              Unfollow Amr Khaled
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditPost;
