"use client";
import Image from "next/image";
import { FaRegBookmark } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { PostType } from "@/lib/types/types";
import ButtonDeletePost from "./ButtonDeletePost";
import ButtonEditPost from "./ButtonEditPost/ButtonEditPost";
import { User } from "@prisma/client";
import { ContextStates } from "@/context/Context";

// ============================================================
interface EditPostProps {
  user: User;
  post: PostType;
}
function EditPost({ post, user }: EditPostProps) {
  const context = useContext(ContextStates);
  if (!context) return null;
  const { dropDownMenu, setDropDownMenu } = context;
  return (
    <div
      id={`edit-post-${post.id}`}
      className="pt-2 mx-3 flex items-center justify-end relative"
    >
      <div className="w-fit relative">
        <div>
          <Image
            onClick={() => setDropDownMenu(post.id)}
            src={"/ellipsis.svg"}
            alt="Icon"
            width={25}
            height={25}
            className="cursor-pointer button hover:bg-gray-100 rounded-full p-1 transition-css"
          />
        </div>
        {dropDownMenu === post.id && (
          <div className="shadow box z-10 bg-white border border-gray-200 rounded-xl absolute right-0 sm:w-65 w-58 sm:p-3 p-1 flex flex-col gap-3">
            {post.userId === user.id && (
              <>
                <button className="flex items-center gap-3 cursor-pointer py-2 px-4 rounded hover:bg-gray-100 sm:text-[14px] text-[13px] font-semibold">
                  <i className="sm:text-[18px] text-[17px]">
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
