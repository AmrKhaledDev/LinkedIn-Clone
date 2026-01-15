"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import EditBigImage from "./EditBigImage/EditBigImage";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
// =========================================================
function BigImage({ user, currentUser }: { user: User; currentUser: User }) {
  const [showBigImage, setShowBigImage] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest(".box, .button")) setShowBigImage(false);
    };
    document.addEventListener("click", handle);
    return () => {
      removeEventListener("click", handle);
    };
  });
  return (
    <div className="relative">
      <Image
        onClick={() => setShowBigImage(true)}
        src={user.imageProfile ? user.imageProfile : "/card-bg.svg"}
        alt="Profile Image"
        width={900}
        height={900}
        className="w-full button sm:object-cover sm:h-60 h-50 cursor-pointer"
      />
      {user.id === currentUser.id && <EditBigImage user={user} />}
      <div
        className={`fixed z-20 inset-0 bg-black/45 w-full min-h-screen flex lg:pt-10 justify-center ${
          showBigImage ? "flex" : "hidden"
        }`}
      >
        <div className="lg:bg-black box bg-black/45 relative lg:w-260 w-full lg:h-fit h-full lg:p-11 p-2 rounded flex items-center justify-center">
          <Image
            src={user.imageProfile || "/card-bg.svg"}
            alt="User Image"
            width={500}
            height={500}
            className="w-full max-h-70 object-cover rounded"
          />
          <button
            onClick={() => setShowBigImage(false)}
            className="text-white absolute button top-5 right-5 text-2xl cursor-pointer"
          >
            <IoMdClose />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BigImage;
