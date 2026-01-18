"use client";
import Image from "next/image";
import BoxAddMedia from "../BoxAddMedia/BoxAddMedia";
import { useState } from "react";
import { User } from "@prisma/client";
// ========================================================
function Video({ user }: { user: User }) {
  const [showAddVideoBox, setShowAddVideoBox] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShowAddVideoBox(!showAddVideoBox)}
        className="flex items-center text-[14px] gap-2 text-blackLight hover:bg-gray-100 rounded cursor-pointer py-2 px-4 transition-css"
      >
        <Image
          src={"/video-icon.svg"}
          alt={"Video Icon"}
          width={50}
          height={50}
          className="sm:w-6 w-7"
        />
        <span className="sm:block hidden">Video</span>
      </button>
      <BoxAddMedia
        user={user}
        setShowAddMediaBox={setShowAddVideoBox}
        showAddMediaBox={showAddVideoBox}
        type="video"
      />
    </div>
  );
}

export default Video;
