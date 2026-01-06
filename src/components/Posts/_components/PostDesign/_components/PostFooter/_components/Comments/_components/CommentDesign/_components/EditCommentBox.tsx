"use client";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import React, { Dispatch, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { DeleteCommentAction } from "@/lib/actions/DeleteActions/DeleteCommentAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CommentDBWithRelations } from "@/lib/types/types";
// ====================================================
function EditCommentBox({
  user,
  setEditCommentText,
  comment,
}: {
  user: User;
  setEditCommentText: Dispatch<React.SetStateAction<boolean>>;
  comment: CommentDBWithRelations;
}) {
  const [loading, setLoading] = useState(false);
  const [showBoxEditComment, setShowBoxEditComment] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".button, .box")) setShowBoxEditComment(false);
      }
    };
    document.addEventListener("click", handle);
    return () => {
      removeEventListener("click", handle);
    };
  });
  const handleEditComment = () => {
    setShowBoxEditComment(false);
    setEditCommentText(true);
  };
  const handleDeleteComment = async () => {
    setLoading(true);
    const result = await DeleteCommentAction(user.id, comment.id);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
    setShowBoxEditComment(false);
  };
  return (
    <div className="relative">
      <Image
        onClick={() => setShowBoxEditComment(!showBoxEditComment)}
        src={"/ellipsis.svg"}
        alt="Menu"
        width={50}
        height={50}
        className={`sm:w-8.25 w-7 sm:h-8.25 h-7 button rounded-full cursor-pointer p-2 hover:bg-gray-100 ${
          showBoxEditComment && "bg-gray-100"
        }`}
      />
      <div
        className={`sm:p-3 p-1 rounded-xl box shadow z-50 bg-white flex-col absolute right-0 ${
          comment.userId !== user.id ? "min-w-70" : "min-w-fit"
        } gap-2 mt-1 ${showBoxEditComment ? "flex" : "hidden"}`}
      >
        {comment.userId !== user.id && (
          <button
            className="text-start flex gap-2 items-center text-slate-600 hover:bg-primary hover:text-white transition-css
           cursor-pointer font-semibold bg-gray-50 rounded shadow py-2 px-3"
          >
            <i className="text-xl">
              <FaPlus />
            </i>
            <span className="line-clamp-1 capitalize">
              {`Follow ${comment.user.name}`}
            </span>
          </button>
        )}
        {comment.userId === user.id && (
          <>
            <button
              onClick={handleEditComment}
              className="flex items-center gap-2 sm:text-[15px] text-[13px] text-slate-600 cursor-pointer font-semibold hover:bg-gray-50 rounded hover:shadow py-2 px-3"
            >
              <i className="sm:text-xl text-[18px]">
                <MdModeEdit />
              </i>
              Edit
            </button>
            <button
              onClick={handleDeleteComment}
              disabled={loading}
              className="flex disabled:cursor-wait sm:text-[15px] text-[13px] disabled:shadow disabled:bg-gray-200 disabled:text-gray-500 items-center gap-2 text-slate-600 cursor-pointer font-semibold hover:bg-gray-50 rounded hover:shadow py-2 px-3"
            >
              <i className="sm:text-xl text-[18px]">
                <MdDeleteSweep />
              </i>
              {loading ? "Deleting" : " Delete"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EditCommentBox;
