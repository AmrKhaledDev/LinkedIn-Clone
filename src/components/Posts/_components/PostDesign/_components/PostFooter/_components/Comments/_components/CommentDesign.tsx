"use client";
import { CommentDBWithRelations } from "@/lib/types/types";
import Image from "next/image";
import { BsFillPatchCheckFill } from "react-icons/bs";
import CommentFooter from "./CommentFooter";
import { User } from "@prisma/client";
import ReplayDesign from "./ReplayDesign";
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
  return (
    <li className="bg-gray-100 p-3 rounded-2xl">
      <div className="flex gap-2 w-full">
        <Image
          src={comment.user.image || "/user.svg"}
          alt="User Image"
          width={50}
          height={50}
          className="w-11.25 h-11.25 rounded-full border shrink-0 border-gray-100 object-cover"
        />
        <div className="flex flex-col gap-2 w-full">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <h2 className="line-clamp-1 font-semibold text-[18px] capitalize">
                  {comment.user.name}
                </h2>
                {comment.user.role === "SUPER_ADMIN" && (
                  <i
                    className="text-blue-500 text text-[14px]"
                    title="Super Admin"
                  >
                    <BsFillPatchCheckFill />
                  </i>
                )}
              </div>
              {comment.isAuthor && (
                <p className=" capitalize font-semibold px-2 text-[12px] rounded  bg-gray-600 text-white">
                  author
                </p>
              )}
            </div>
            <h3 className="line-clamp-1 text-[13px] text-blackLight font-normal">
              {comment.user.headline}
            </h3>
          </div>
          <p>{comment.content}</p>
          <CommentFooter user={user} comment={comment} postId={postId} />
        </div>
      </div>
      <div className="ml-13.5 mt-2 flex flex-col gap-2">
        {comment.replays.length > 0 &&
          comment.replays.map((replay) => (
              <ReplayDesign replay={replay} key={replay.id} user={user}/>
          ))}
      </div>
    </li>
  );
}

export default CommentDesign;
