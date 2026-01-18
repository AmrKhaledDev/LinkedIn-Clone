"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import BoxEditSmallImage from "./_components/BoxEditSmallImage";
import { useContext, useEffect, useState } from "react";
import { ContextStates } from "@/context/Context";
import { IoMdClose } from "react-icons/io";
// ===================================================
function SmallImage({ user, currentUser }: { user: User; currentUser: User }) {
  const context = useContext(ContextStates);
  if (!context) return null;
  const { smallImage } = context;
  const date = new Date(user.createdAt);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  } as const;
  const formatted = date.toLocaleDateString("en-GB", options);
  const [showSmallImage, setShowSmallImage] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest(".box, .button")) setShowSmallImage(false);
    };
    document.addEventListener("click", handle);
    return () => {
      removeEventListener("click", handle);
    };
  });
  return (
    <div className="absolute sm:-bottom-10 -bottom-7 sm:left-7 left-4 flex items-center sm:gap-2">
      <div className="flex items-center gap-1 relative">
        <Image
          onClick={() => setShowSmallImage(true)}
          src={smallImage || user.image || "/user.svg"}
          alt="Your Image"
          width={200}
          height={200}
          className="rounded-full button cursor-pointer md:w-30 sm:w-25 md:h-30 sm:h-25 w-23 h-23 object-cover sm:border-3 border-2 border-white "
        />
        {user.id === currentUser.id && <BoxEditSmallImage user={user} />}
      </div>
      <span className="sm:px-4 px-3 sm:py-1.5 py-1 sm:hidden block bg-blue-50 text-blue-600 sm:text-xs text-[9px] font-black rounded-full uppercase tracking-wider">
        Joined In {formatted}
      </span>
      <div
        className={`fixed z-20 inset-0 bg-black/45 w-full min-h-screen flex lg:pt-10 justify-center ${
          showSmallImage ? "flex" : "hidden"
        }`}
      >
        <div className="lg:bg-black box bg-black/45 relative lg:w-200 md:w-full w-full lg:h-150 rounded flex items-center justify-center">
          <Image
            src={user.image || "/user.svg"}
            alt="User Image"
            width={500}
            height={500}
            className="rounded-full md:w-120 md:h-120 sm:w-100 sm:h-100 w-76 h-76 object-cover"
          />
          <button
            onClick={() => setShowSmallImage(false)}
            className="text-white absolute button top-5 right-5 text-2xl cursor-pointer"
          >
            <IoMdClose />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SmallImage;
