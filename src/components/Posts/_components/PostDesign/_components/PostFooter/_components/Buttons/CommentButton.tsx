"use client";

import { Dispatch, SetStateAction } from "react";
import { MdComment } from "react-icons/md";
// ==========================================================================================
function CommentButton({
  setAddComment,
}: {
  setAddComment: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClick = () => setAddComment(true);

  return (
    <div
      onClick={handleClick}
      className={`
      flex items-center gap-2 cursor-pointer py-2 px-4 rounded transition-css
      hover:bg-gray-100
    `}
    >
      <i className="text-[20px]">
        <MdComment />
      </i>
      <h2 className="text-[14px] font-bold">Comment</h2>
    </div>
  );
}

export default CommentButton;
