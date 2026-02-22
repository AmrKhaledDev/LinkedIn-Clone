"use client";
import { CreateCommentAction } from "@/lib/actions/CreateActions/CreateCommentAction";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import toast from "react-hot-toast";
// =========================================================
function AddComment({
  user,
  postId,
  addComment,
}: {
  user: User;
  postId: string;
  addComment: boolean;
}) {
  const [commentText, setCommentText] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleAddComment = async () => {
    setLoading(true);
    const result = await CreateCommentAction(user.id, postId, commentText);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
    setCommentText("");
  };
  return (
    <div className={`p-3 gap-2 ${addComment ? "flex" : "hidden"}`}>
      <Image
        src={user.image ? user.image : "/user.svg"}
        width={40}
        height={40}
        alt="Your Photo"
        className="rounded-full md:w-10 md:h-10 w-8 h-8 shrink-0 button object-cover border-2 border-gray-100"
      />
      <div
        className={`w-full overflow-hidden relative border-2 border-gray-400
        ${commentText.trim().length > 0 ? "h-25 flex flex-col items-end justify-end rounded-2xl " : "sm:h-10 h-9 rounded-full "}`}
      >
        <textarea
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              e.preventDefault();
              if (commentText.trim() === "") return;
              handleAddComment();
            }
          }}
          onChange={(e) => {
            const value = e.target.value;
            setCommentText(value);
          }}
          dir="auto"
          value={commentText}
          className="sm:text-[14px] text-[13px] outline-none w-full resize-none overflow-hidden sm:py-2 py-1.5 px-2.5
         
         "
          placeholder="Add a comment . . ."
        />
        <button
          disabled={commentText.trim().length < 1 || loading}
          onClick={handleAddComment}
          title="Send Comment"
          className={`text-white bg-primary disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-400 py-1 px-3 rounded-full cursor-pointer font-semibold sm:text-sm text-xs shadow sm:mx-3 mx-2 sm:my-3 my-2
            ${commentText.trim().length > 0 ? "block" : "hidden"}`}
        >
          {loading ? "Sending..." : "Comment"}{" "}
        </button>
        {/* <button
          disabled={commentText.trim().length < 1 || loading}
          onClick={handleAddComment}
          title="Send Comment"
          className={`absolute ${
            loading ? "bg-blue-50 cursor-wait" : "sm:p-2 p-1.5"
          } sm:text-[17px] transition-css  font-semibold rounded-full sm:top-2 top-1 sm:right-2 right-1
            ${
              commentText.trim().length < 1
                ? "bg-gray-200 text-gray-500 cursor-default"
                : "hover:bg-hoverColor  bg-primary text-white cursor-pointer "
            }`}
        >
          {loading ? (
            <div className="size-8 border-2 border-transparent border-t-primary animate-spin transition-css rounded-full" />
          ) : (
            <BsFillSendFill />
          )}
        </button> */}
      </div>
    </div>
  );
}

export default AddComment;
