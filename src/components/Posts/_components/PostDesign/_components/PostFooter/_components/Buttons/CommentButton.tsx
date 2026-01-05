"use client";

import { Dispatch, SetStateAction } from "react";
import { MdComment } from "react-icons/md";
// ==========================================================================================
function CommentButton({
  addComment,
  setAddComment,
}: {
  addComment:boolean,
  setAddComment: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClick = () => setAddComment(true);

  return (
    <div
      onClick={handleClick}
      className={`
      flex items-center gap-2 cursor-pointer sm:py-2 sm:px-4 py-1 px-2 rounded transition-css
       text-slate-700 ${addComment ? "bg-gray-50" : "hover:bg-gray-100"}
    `}
    >
      <i className="sm:text-[20px] text-[25px]">
        <MdComment />
      </i>
      <h2 className="sm:text-[14px] sm:block hidden text-[12px] font-bold">Comment</h2>
    </div>
  );
}

export default CommentButton;
