"use client";

import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MdOutlineComment } from "react-icons/md";
import { MdModeComment } from "react-icons/md";
// ==========================================================================================
function CommentButton({
  postId,
  addComment,
  setAddComment,
}: {
  postId: string;
  addComment: boolean;
  setAddComment: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClick = () => setAddComment(!addComment);
  const pathname = usePathname();
  useEffect(() => {
    if (!addComment && pathname.includes(`/post/${postId}`)) {
      setAddComment(true);
    }
  }, [pathname, postId, addComment, setAddComment]);
console.log(pathname)
  return (
    <div
      onClick={handleClick}
      className={`
      flex items-center gap-2 cursor-pointer sm:py-2 sm:px-4 py-1 px-2 rounded transition-css
       text-slate-700 
    `}
    >
      <i className="text-[20px] comment">
        {addComment ? <MdModeComment /> : <MdOutlineComment />}
      </i>
      <h2 className="text-[14px] font-bold commentText">Comment</h2>
    </div>
  );
}

export default CommentButton;
