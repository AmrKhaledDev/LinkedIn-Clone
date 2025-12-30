"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
// =========================================================
function AddComment({ user,addComment }: { user: User,addComment:boolean }) {
  return (
    <div className={`p-3 items-center gap-2 ${addComment ? "flex" :"hidden"}`}>
      <Image
        src={user.image ? user.image : "user.svg"}
        width={40}
        height={40}
        alt="Your Photo"
        className="rounded-full w-10 h-10 shrink-0 button object-cover border-2 border-gray-100"
      />
      <div className="w-full relative">
        <input
          type="text"
          className="py-3 px-4 input rounded-full border border-gray-400 text-[13px] outline-none w-full"
          placeholder="Add a comment..."
        />
        <button className="absolute button bg-primary text-white cursor-pointer top-2 right-2 text-[13px] p-2 rounded-full">
          <IoSend />
        </button>
      </div>
    </div>
  );
}

export default AddComment;
