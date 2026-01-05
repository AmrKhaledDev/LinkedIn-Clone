"use client";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import React, { Dispatch, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { DeleteCommentAction } from "@/lib/actions/DeleteCommentAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CommentDBWithRelations, ReplayWithRelations } from "@/lib/types/types";
// ====================================================
function EditReplayBox({
  user,
  replay,
}: //   setEditCommentText,
{
  user: User;
  //   setEditCommentText: Dispatch<React.SetStateAction<boolean>>;
  replay: ReplayWithRelations;
}) {
  const [loading, setLoading] = useState(false);
  const [showBoxEditReplay, setShowBoxEditReplay] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".button, .box")) setShowBoxEditReplay(false);
      }
    };
    document.addEventListener("click", handle);
    return () => {
      removeEventListener("click", handle);
    };
  });
  //   const handleEditComment = () => {
  //     setShowBoxEditComment(false);
  //     setEditCommentText(true);
  //   };
  //   const handleDeleteComment = async () => {
  //     setLoading(true);
  //     const result = await DeleteCommentAction(user.id, comment.id);
  //     setLoading(false);
  //     if (result?.error)
  //       return toast.error(result.error, { className: "toast-font" });
  //     router.refresh();
  //     setShowBoxEditComment(false);
  //   };
  return (
    <div className="relative">
      <Image
        onClick={() => setShowBoxEditReplay(!showBoxEditReplay)}
        src={"/ellipsis.svg"}
        alt="Menu"
        width={50}
        height={50}
        className={`w-5 h-5 button rounded-full cursor-pointer p-1 hover:bg-white ${showBoxEditReplay && "bg-white"}`}
      />
      <div
        className={`p-3 rounded-xl box shadow z-50 bg-white flex-col absolute right-0 min-w-50 gap-2 mt-1 ${
          showBoxEditReplay ? "flex" : "hidden"
        }`}
      >
        {replay.userId !== user.id && (
          <button
            className="text-start text-[13px] flex gap-2 items-center text-slate-600 hover:bg-primary hover:text-white transition-css
           cursor-pointer font-semibold bg-gray-50 rounded shadow py-2 px-3"
          >
            <i className="text-[17px]">
              <FaPlus />
            </i>
            <span className="line-clamp-1 capitalize">
              {`Follow ${replay.user.name}`}
            </span>
          </button>
        )}
        {replay.userId === user.id && (
          <>
            <button
            //   onClick={handleEditComment}
              className="flex items-center text-[13px] gap-2 text-slate-600 cursor-pointer font-semibold hover:bg-gray-50 rounded hover:shadow py-2 px-3"
            >
              <i className="text-[17px]">
                <MdModeEdit />
              </i>
              Edit
            </button>
            <button
            //   onClick={handleDeleteComment}
              disabled={loading}
              className="flex disabled:cursor-wait text-[13px] disabled:shadow disabled:bg-gray-200 disabled:text-gray-500 items-center gap-2 text-slate-600 cursor-pointer font-semibold hover:bg-gray-50 rounded hover:shadow py-2 px-3"
            >
              <i className="text-[17px]">
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

export default EditReplayBox;
