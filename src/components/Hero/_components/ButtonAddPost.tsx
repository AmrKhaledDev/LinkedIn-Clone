"use client";
import { useState } from "react";
import BoxPost from "./BoxPost/BoxPost";
import { User } from "@prisma/client";
// =================================================================
function ButtonAddPost({user}:{user:User}) {
  const [showBoxPost, setShowBoxPost] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowBoxPost(true)}
        className="border button border-gray-300 sm:text-[15px] text-[13px] rounded-full md:py-3 py-2 md:px-4 sm:px-3  px-2 w-full cursor-pointer text-start text-slate-600 font-semibold hover:bg-gray-100 transition-css"
      >
        Start a post
      </button>
      <BoxPost showBoxPost={showBoxPost} setShowBoxPost={setShowBoxPost} user={user}/>
    </>
  );
}

export default ButtonAddPost;
