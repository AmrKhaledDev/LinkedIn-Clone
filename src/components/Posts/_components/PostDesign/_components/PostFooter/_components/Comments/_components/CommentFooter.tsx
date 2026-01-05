"use client";
import { CreateLikeForComment } from "@/lib/actions/CreateLikeForCommentAction";
import { CreateReplayAction } from "@/lib/actions/CreateReplayAction";
import { CommentDBWithRelations } from "@/lib/types/types";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
// ==============================================================================
function CommentFooter({
  comment,
  user,
  postId,
}: {
  comment: CommentDBWithRelations;
  user: User;
  postId: string;
}) {
  const router = useRouter();
  const handleClickLikeForComment = async () => {
    const result = await CreateLikeForComment(comment.id, user.id);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
  };
  const isLikeForComment = comment.likeForComments.find(
    (like) => like.user.id === user.id
  );
  const [replayContent, setReplayContent] = useState(
    comment.user.name.charAt(0).toUpperCase() +
      comment.user.name.slice(1).toLowerCase()
  );
  const [showBoxReplay, setShowBoxReplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCreateReplay = async () => {
    setLoading(true);
    const result = await CreateReplayAction(
      replayContent,
      comment.id,
      user.id,
      postId
    );
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
    setShowBoxReplay(false);
    setReplayContent("");
  };
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (showBoxReplay && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
    }
  }, [showBoxReplay]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-1 font-bold text-slate-600">
        <div className="flex items-center gap-1">
          <button
            onClick={handleClickLikeForComment}
            className={`hover:bg-gray-100 rounded cursor-pointer py-1 text-[14px] px-1 transition-css ${
              isLikeForComment ? "text-primary" : ""
            }`}
          >
            Like
          </button>
          {comment.likeForComments.length > 0 && (
            <>
              <span className="size-0.5 rounded-full bg-gray-500" />
              <div className="flex items-center gap-1">
                <Image src={"/like.svg"} alt="Like" width={18} height={18} />
                <h4 className="text-[13px] font-normal text-gray-500">
                  {isLikeForComment ? (
                    comment.likeForComments.length > 1 ? (
                      <span className="flex items-center gap-1">
                        you, 
                        <span>{comment.likeForComments.length - 1}</span>
                      </span>
                    ) : (
                      <span>you</span>
                    )
                  ) : (
                    <>{comment.likeForComments.length}</>
                  )}
                </h4>
              </div>
            </>
          )}
        </div>
        <span className="w-px h-4.25 bg-gray-400"></span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowBoxReplay(!showBoxReplay)}
            className="hover:bg-gray-100 rounded cursor-pointer py-1 text-[14px] px-1 transition-css"
          >
            Replay
          </button>
          {comment.replays.length > 0 && (
            <>
              <span className="size-0.5 rounded-full bg-gray-500" />
              <div className="text-[13px] text-gray-500 font-normal">
                <h4>
                  <span>{comment.replays.length}</span>{" "}
                  {comment.replays.length > 1 ? "replays" : "replay"}
                </h4>
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className={`mt-2 w-full bg-white border border-gray-100 rounded-2xl overflow-hidden  items-end flex-col ${
          showBoxReplay ? "flex" : "hidden"
        }`}
      >
        <textarea
          ref={textareaRef}
          onChange={(e) => {
            const value = e.target.value;
            setReplayContent(value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          defaultValue={
            comment.user.name.charAt(0).toUpperCase() +
            comment.user.name.slice(1).toLowerCase()
          }
          className="w-full py-3 px-4  
             outline-none transition-all duration-300 ease-in-out
             placeholder:text-gray-300
             hover:border-gray-300 resize-none
             overflow-hidden"
        />

        <button
          disabled={loading}
          onClick={handleCreateReplay}
          className={`text-[14px] w-fit m-3 disabled:cursor-default disabled:text-gray-500 disabled:bg-gray-100 select-none rounded-full py-1.5 font-bold px-4  ${
            replayContent.trim().length > 0
              ? "text-white bg-primary cursor-pointer "
              : " cursor-default text-gray-500 bg-gray-100 pointer-events-none"
          }`}
        >
          {loading ? "Replaying..." : " Replay"}
        </button>
      </div>
    </div>
  );
}

export default CommentFooter;
