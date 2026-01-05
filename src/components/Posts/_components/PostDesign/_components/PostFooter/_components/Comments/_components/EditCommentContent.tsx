"use client";

import ServerErrorMessage from "@/components/ServerErrorMessage/ServerErrorMessage";
import { EditCommentContentACtion } from "@/lib/actions/EditCommentContentAction";
import { CommentDBWithRelations } from "@/lib/types/types";
import {  User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
// =================================================================
function EditCommentContent({
  comment,
  user,
  editCommentText,
  setEditCommentText,
}: {
  comment: CommentDBWithRelations;
  user: User;
  editCommentText: boolean;
  setEditCommentText: Dispatch<SetStateAction<boolean>>;
}) {
  const [valueEditComment, setValueEditComment] = useState(comment.content);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const handleEditCommentContent = async () => {
    setLoading(true);
    const result = await EditCommentContentACtion(
      user.id,
      comment.id,
      valueEditComment
    );
    setLoading(false);
    if (result?.error) return setServerError(result.error);
    setServerError("");
    setEditCommentText(false);
    router.refresh();
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [editCommentText]);
  return (
    <div>
      <div
        className={`border-2 border-gray-200 rounded overflow-hidden ${
          serverError && "border-red-500"
        }`}
      >
        <input
          ref={inputRef}
          disabled={loading}
          onChange={(e) => setValueEditComment(e.target.value)}
          defaultValue={valueEditComment}
          className="py-2 px-2 w-full outline-none"
        />
        <div className="w-full flex items-center justify-end gap-2 p-2">
          <button
            onClick={handleEditCommentContent}
            disabled={
              loading || comment.content.trim() === valueEditComment.trim()
            }
            className={` disabled:cursor-default disabled:text-gray-500 disabled:bg-gray-300 shadow rounded-full font-semibold py-1 px-3 text-[11px] ${
              valueEditComment.trim().length > 0
                ? "text-white bg-primary cursor-pointer "
                : "text-gray-500 bg-gray-300 cursor-default pointer-events-none"
            }`}
          >
            {loading ? "Saving" : "Save"}
          </button>
          <button
            onClick={() => {
              setEditCommentText(false);
              setValueEditComment(comment.content);
              setServerError("");
            }}
            className="cursor-pointer text-black hover:bg-gray-100 shadow rounded-full font-semibold py-1 px-3 text-[11px]"
          >
            Cancel
          </button>
        </div>
      </div>
      {serverError && <ServerErrorMessage message={serverError} />}
    </div>
  );
}

export default EditCommentContent;
