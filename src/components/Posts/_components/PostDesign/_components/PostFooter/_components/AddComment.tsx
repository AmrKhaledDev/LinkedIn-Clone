"use client";
import { ContextStates } from "@/context/Context";
import { CreateCommentAction } from "@/lib/actions/CreateCommentAction";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BsFillSendFill } from "react-icons/bs";
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
        src={user.image ? user.image : "user.svg"}
        width={40}
        height={40}
        alt="Your Photo"
        className="rounded-full w-10 h-10 shrink-0 button object-cover border-2 border-gray-100"
      />
      <div className="w-full relative">
        <input
          onKeyDown={(e) => {
            if (commentText.trim() === "") return;
            if (e.key == "Enter") {
              handleAddComment();
            }
          }}
          onChange={(e) => {
            const value = e.target.value;
            setCommentText(value);
          }}
          value={commentText}
          className="py-3 px-4 input border-2 border-gray-400 text-[14px] outline-none w-full resize-none font-semibold tracking-wider overflow-hidden 
          rounded-full
         "
          placeholder="Add a comment..."
          type="text"
        />

        <button
          disabled={commentText.trim().length < 1 || loading}
          onClick={handleAddComment}
          title="Send Comment"
          className={`absolute ${
            loading ? "bg-blue-50 cursor-wait" : "p-2"
          } text-[17px] transition-css  font-semibold rounded-full top-2 right-2
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
        </button>
      </div>
    </div>
  );
}

export default AddComment;
