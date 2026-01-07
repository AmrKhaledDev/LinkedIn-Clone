"use client";

import { useEffect, useState } from "react";
import ButtonChangeImage from "./ButtonChangeImage";
import ButtonSave from "./ButtonSave";
import ButtonDelete from "./ButtonDelete";
import { FaCamera } from "react-icons/fa";
import { User } from "@prisma/client";
// ================================================================
function BoxEditSmallImage({ user }: { user: User }) {
  const [showBoxEditImage, setShowBoxEditImage] = useState(false);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest(".button, .box")) setShowBoxEditImage(false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      removeEventListener("click", handleClick);
    };
  });
  return (
    <div>
      <div className="absolute sm:bottom-5 bottom-2 sm:right-0 -right-2  z-10">
        <button
          onClick={() => {
            setShowBoxEditImage(!showBoxEditImage);
          }}
          className="cursor-pointer button sm:text-[17px] bg-gray-50 rounded-full text-primary  p-2"
        >
          <FaCamera />
        </button>
      </div>
      <div
        className={`absolute sm:-bottom-47 -bottom-38 -right-25 shadow bg-white rounded-2xl flex-col gap-2 z-15 p-2 w-55 transition-css box
           ${showBoxEditImage ? "flex" : "hidden"}`}
      >
        <ButtonChangeImage />
        <ButtonSave user={user} setShowBoxEditImage={setShowBoxEditImage} />
        <ButtonDelete user={user}/>
      </div>
    </div>
  );
}

export default BoxEditSmallImage;
