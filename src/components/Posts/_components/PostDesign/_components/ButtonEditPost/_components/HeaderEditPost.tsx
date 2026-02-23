"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";
// =========================================================================
function HeaderEditPost({
  user,
  setEditPost,
  editPost,
}: {
  user: User;
  setEditPost: Dispatch<SetStateAction<boolean>>;
  editPost: boolean;
}) {
  return (
    <div className="flex justify-between sm:p-5 p-2">
      <div className="flex items-center gap-2">
        <Image
          src={user.image || "/user.svg"}
          alt="Your image"
          width={80}
          height={80}
          className="sm:w-17 sm:h-17 w-13 h-13 rounded-full object-cover shrink-0"
        />
        <div>
          <h2 className="capitalize font-semibold sm:text-[20px] text-[16px]">
            {user.name}
          </h2>
          <h3 className="font-normal sm:text-[14px] text-[13px]">
            Posted to Anyone
          </h3>
        </div>
      </div>
      <button
        onClick={() => setEditPost(!editPost)}
        className="sm:text-2xl text-xl cursor-pointer h-fit"
      >
        <IoClose />
      </button>
    </div>
  );
}

export default HeaderEditPost;
