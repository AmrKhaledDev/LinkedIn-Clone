"use client"
import { PostType } from "@/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { IoCloseSharp } from "react-icons/io5";

// =====================================================================
function ShowDisLikers({
  post,
  showDisLikers,
  setShowDisLikers,
}: {
  post: PostType;
  showDisLikers: boolean;
  setShowDisLikers: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`fixed inset-0 backdrop-blur z-20 items-center justify-center bg-black/45 min-h-screen w-full ${
        showDisLikers ? "flex" : "hidden"
      }`}
    >
      <div className="rounded-xl shadow md:w-150 sm:w-120 w-[90%] bg-white h-fit flex flex-col">
        <div className="flex items-center justify-between border-b border-b-gray-100 p-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight border-l-6 border-red-500 pl-3 transition-all duration-500">
              Dis<span className="text-red-500">Like</span>
            </h2>
          </div>
          <button
            onClick={() => setShowDisLikers(false)}
            className="md:text-2xl text-xl text-slate-600 cursor-pointer p-2 hover:bg-gray-100 rounded-full"
          >
            <IoCloseSharp />
          </button>
        </div>
        <div className="flex flex-col gap-3 h-fit max-h-125 overflow-y-auto p-5 ">
          {post.disLikes.map((dislike) => (
            <div
              key={dislike.id}
              className="flex gap-3 border-b border-b-gray-100 pb-4 last:border-b-transparent"
            >
              <div className="shrink-0 relative h-fit rounded-full">
                <Image
                  src={dislike.user.image || "/user.svg"}
                  alt="User imgae"
                  width={100}
                  height={100}
                  className="md:w-19 border-2 border-gray-200 md:h-19 sm:w-17 sm:h-17 w-14 h-14 rounded-full object-cover shrink-0"
                />
                <Image
                  src={"/dislike.svg"}
                  alt="Like"
                  width={20}
                  height={20}
                  className="absolute right-1 bottom-1"
                />
              </div>

              <div>
                <Link
                  href={`/linkedin/u/${dislike.user.id}`}
                  className="capitalize hover:text-primary hover:underline font-semibold sm:text-[17px] break-all"
                >
                  {dislike.user.name}
                </Link>
                <h3 className="font-normal sm:line-clamp-none line-clamp-3 text-gray-600 sm:text-[14px] text-[12px] wrap-break-word">
                  {dislike.user.headline ? dislike.user.headline :<span className="sm:text-3xl text-2xl">~</span>}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowDisLikers;
