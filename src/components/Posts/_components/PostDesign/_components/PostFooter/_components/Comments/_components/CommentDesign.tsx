"use client";
import { CommentDBWithRelations } from "@/lib/types/types";
import Image from "next/image";
import { BsFillPatchCheckFill } from "react-icons/bs";
// ===============================================================================
function CommentDesign({ comment }: { comment: CommentDBWithRelations }) {
  return (
    <li>
      <div className="flex gap-2">
        <Image
          src={comment.user.image || "/user.svg"}
          alt="User Image"
          width={50}
          height={50}
          className="w-11.25 h-11.25 rounded-full border shrink-0 border-gray-100 object-cover"
        />
        <div className="flex flex-col gap-2">
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
              {comment.post.user.id === comment.user.id && (
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
          <div className="flex items-center gap-1 font-bold text-slate-600">
            <div className="flex items-center gap-1">
              <button className="hover:bg-gray-100 rounded cursor-pointer py-1 text-[14px] px-1 transition-css">
                Like
              </button>
              <span className="size-0.5 rounded-full bg-gray-500" />
              <div className="flex items-center gap-1">
                <Image src={"/like.svg"} alt="Like" width={18} height={18} />
                <h4 className="text-[13px] font-normal text-gray-500">2</h4>
              </div>
            </div>
            <span className="w-px h-4.25 bg-gray-400"></span>
            <div className="flex items-center gap-1 ">
              <button className="hover:bg-gray-100 rounded cursor-pointer py-1 text-[14px] px-1 transition-css">
                Replay
              </button>
              <span className="size-0.5 rounded-full bg-gray-500" />
              <div className="text-[13px] text-gray-500 font-normal">
                <h4>1 replay</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CommentDesign;
