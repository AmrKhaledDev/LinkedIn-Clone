"use client";
import Image from "next/image";
import { useState } from "react";
import BoxAddMedia from "../BoxAddMedia/BoxAddMedia";
import { User } from "@prisma/client";

// ========================================================
function Photo({ user }: { user: User }) {
  const [showAddPhotoBox, setShowAddPhotoBox] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShowAddPhotoBox(true)}
        className="flex items-center text-[14px] gap-2 text-blackLight hover:bg-gray-100 rounded cursor-pointer py-2 px-4 transition-css"
      >
        <Image
          src={"/photo-icon.svg"}
          alt={"Photo Icon"}
          width={50}
          height={50}
          className="sm:w-6 w-7"
        />
        <span className="sm:block hidden">Photo</span>
      </button>
      <BoxAddMedia
        user={user}
        setShowAddMediaBox={setShowAddPhotoBox}
        showAddMediaBox={showAddPhotoBox}
        type="image"
      />
    </div>
  );
}

export default Photo;
