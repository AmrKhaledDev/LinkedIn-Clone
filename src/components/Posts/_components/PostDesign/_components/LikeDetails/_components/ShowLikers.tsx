"use client";
import { PostType } from "@/lib/types/types";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { IoCloseSharp } from "react-icons/io5";

// =====================================================================
function ShowLikers({
  user,
  post,
  showLikers,
  setShowLikers,
}: {
  user: User;
  post: PostType;
  showLikers: boolean;
  setShowLikers: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`fixed inset-0 backdrop-blur z-20 items-center justify-center bg-black/45 min-h-screen w-full ${
        showLikers ? "flex" : "hidden"
      }`}
    >
      <div className="rounded-xl shadow md:w-150 sm:w-120 w-[90%] bg-white h-fit flex flex-col">
        <div className="flex items-center justify-end border-b border-b-gray-100 p-2">
          <button
            onClick={() => setShowLikers(false)}
            className="text-xl text-slate-600 cursor-pointer p-1 hover:bg-gray-100 rounded-full"
          >
            <IoCloseSharp />
          </button>
        </div>
        <div className="flex flex-col gap-3 h-fit max-h-125 overflow-y-auto p-3 ">
          {post.likes.map((like) => (
            <div
              key={like.id}
              className="flex items-center gap-2 border-b border-b-gray-100 last:border-b-transparent"
            >
              <div className="shrink-0 relative h-fit rounded-full">
                <Image
                  src={like.user.image || "/user.svg"}
                  alt="User imgae"
                  width={100}
                  height={100}
                  className="md:w-15  md:h-15 border-2 border-gray-200  sm:w-13 sm:h-13 w-14 h-14 rounded-full object-cover shrink-0"
                />
                <Image
                  src={"/like.svg"}
                  alt="Like"
                  width={20}
                  height={20}
                  className="absolute sm:right-1 sm:bottom-1 right-0 bottom-0.5 sm:w-4 sm:h-4 w-4 h-4"
                />
              </div>
              <div>
                <Link
                  href={
                    user.id === like.user.id
                      ? "/linkedin/profile"
                      : `/linkedin/u/${like.user.id}`
                  }
                  className="capitalize hover:text-primary hover:underline font-semibold sm:text-[17px] break-all"
                >
                  {like.user.name}
                </Link>
                <h3 className="font-normal sm:line-clamp-none line-clamp-3 text-gray-600 sm:text-[14px] text-[12px] wrap-break-word">
                  {like.user.headline && like.user.headline}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowLikers;
