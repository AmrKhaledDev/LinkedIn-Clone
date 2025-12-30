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
      <div className="absolute bottom-5 right-0  z-20">
        <button
          onClick={() => {
            setShowBoxEditImage(!showBoxEditImage);
          }}
          className="cursor-pointer button text-[17px] bg-gray-50 rounded-full text-primary  p-2"
        >
          <FaCamera />
        </button>
      </div>
      <div
        className={`absolute -bottom-44 -right-25 shadow bg-white rounded-2xl flex flex-col gap-2 z-30 p-2 w-55 transition-css box
           ${showBoxEditImage ? "opacity-100" : "opacity-0 -translate-y-70"}`}
      >
        <ButtonChangeImage />
        <ButtonSave user={user} setShowBoxEditImage={setShowBoxEditImage} />
        <ButtonDelete user={user}/>
      </div>
    </div>
  );
}

export default BoxEditSmallImage;
