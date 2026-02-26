"use client";
import { CommentDBWithRelations } from "@/lib/types/types";
import Image from "next/image";
import CommentFooter from "./_components/CommentFooter";
import { User } from "@prisma/client";
import ReplayDesign from "./_components/ReplayDesign/ReplayDesign";
import { useState } from "react";
import EditCommentContent from "./_components/EditCommentContent";
import EditCommentBox from "./_components/EditCommentBox";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
// ===============================================================================
function CommentDesign({
  comment,
  user,
  postId,
}: {
  comment: CommentDBWithRelations;
  user: User;
  postId: string;
}) {
  const [editCommentText, setEditCommentText] = useState(false);
  return (
    <li className="bg-white sm:p-3 rounded-2xl">
      <div className="flex gap-2 w-full">
        <Image
          src={comment.user.image || "/user.svg"}
          alt="User Image"
          width={50}
          height={50}
          className="sm:w-11.25 sm:h-11.25 w-10 h-10 rounded-full border shrink-0 border-gray-100 object-cover"
        />
        <div className="flex flex-col gap-2 w-full">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Link
                    href={
                      user.id === comment.userId
                        ? `/linkedin/profile`
                        : `/linkedin/u/${comment.userId}`
                    }
                    className="line-clamp-1 hover:underline hover:text-primary font-semibold sm:text-[18px] capitalize"
                  >
                    {comment.user.name}
                  </Link>
                  {comment.user.role === "SUPER_ADMIN" && (
                    <i
                      className="text-primary pb-0.5 sm:text-[17px]"
                      title="Linkedin Developer"
                    >
                      <FaLinkedin />
                    </i>
                  )}
                </div>
                {comment.isAuthor && (
                  <p className=" capitalize font-semibold px-2 sm:text-[12px] text-[11px] rounded  bg-gray-600 text-white">
                    author
                  </p>
                )}
                {comment.isEdited && (
                  <p className="inline-block rounded-md bg-gray-100 px-2 py-0.5 sm:text-[11px] text-[10px] font-semibold tracking-wide text-gray-600">
                    Edited
                  </p>
                )}
              </div>
              <EditCommentBox
                user={user}
                setEditCommentText={setEditCommentText}
                comment={comment}
              />
            </div>
            <h3 className="line-clamp-1 sm:text-[13px] text-[12px] text-blackLight font-normal">
              {comment.user.headline}
            </h3>
          </div>
          {editCommentText ? (
            <EditCommentContent
              user={user}
              comment={comment}
              setEditCommentText={setEditCommentText}
              editCommentText={editCommentText}
            />
          ) : (
            <p className="sm:text-[15px] text-[14px] [word-break:break-word] ">
              {comment.content}
            </p>
          )}
          <CommentFooter user={user} comment={comment} postId={postId} />
        </div>
      </div>
      <div className="sm:ml-13.5 ml-10 mt-2 flex flex-col gap-2">
        {comment.replays.length > 0 &&
          comment.replays.map((replay) => (
            <ReplayDesign
              replay={replay}
              key={replay.id}
              user={user}
              postId={postId}
            />
          ))}
      </div>
    </li>
  );
}

export default CommentDesign;
