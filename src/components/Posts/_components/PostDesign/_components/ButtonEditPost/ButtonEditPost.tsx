"use client";
import { PostType } from "@/lib/types/types";
import { User } from "@prisma/client";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import BoxEditPost from "./_components/BoxEditPost";
// ========================================================
function ButtonEditPost({ post, user }: { post: PostType; user: User }) {
  const [editPost, setEditPost] = useState(false);

  return (
    <>
      <button
        onClick={() => setEditPost(true)}
        className="flex button items-center gap-3 cursor-pointer py-2 px-4 rounded hover:bg-gray-100 sm:text-[14px] text-[13px] font-semibold w-full"
      >
        <i className="sm:text-[18px]">
          <BiEditAlt />
        </i>
        Edit
      </button>
      <BoxEditPost
        user={user}
        post={post}
        setEditPost={setEditPost}
        editPost={editPost}
      />
    </>
  );
}

export default ButtonEditPost;
