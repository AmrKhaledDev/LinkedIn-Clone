"use client";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import { FaEllipsis } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import React, { Dispatch, useContext, useState } from "react";
import { User } from "@prisma/client";
import { DeleteCommentAction } from "@/lib/actions/DeleteActions/DeleteCommentAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CommentDBWithRelations } from "@/lib/types/types";
import { ContextStates } from "@/context/Context";
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
  const context = useContext(ContextStates);
  if (!context) return null;
  const { dropDownMenu, setDropDownMenu } = context;
  const router = useRouter();
  const handleEditComment = () => {
    setDropDownMenu(null);
    setEditCommentText(true);
  };
  const handleDeleteComment = async () => {
    setLoading(true);
    const result = await DeleteCommentAction(user.id, comment.id);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
    setDropDownMenu(null);
  };

  return (
    <div className="relative">
      {comment.userId === user.id && (
        <i
          onClick={() => setDropDownMenu(comment.id)}
          className={`button rounded-full cursor-pointer p-2 block hover:bg-gray-100 ${
            dropDownMenu === comment.id && "bg-gray-100"
          }`}
        >
          <FaEllipsis />
        </i>
      )}
      <div
        className={`sm:p-3 p-1 rounded-xl box shadow z-10 bg-white flex-col absolute right-0 ${
          comment.userId !== user.id ? "min-w-70" : "min-w-fit"
        } gap-2 mt-1 ${dropDownMenu === comment.id ? "flex" : "hidden"}`}
      >
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
