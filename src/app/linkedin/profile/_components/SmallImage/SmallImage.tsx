"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import BoxEditSmallImage from "./_components/BoxEditSmallImage";
import { useContext } from "react";
import { ContextStates } from "@/context/Context";
// ===================================================
function SmallImage({ user }: { user: User }) {
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
  return (
    <div className="absolute sm:-bottom-10 -bottom-7 sm:left-7 left-4 flex items-center gap-2">
      <div className="flex items-center gap-1 relative">
        <Image
          src={smallImage || user.image || "/user.svg"}
          alt="Your Image"
          width={200}
          height={200}
          className="rounded-full md:w-37 sm:w-30 md:h-37 sm:h-30 w-25 h-25 object-cover sm:border-5 border-3 border-white "
        />
        <BoxEditSmallImage user={user} />
      </div>
      <span className="px-4 py-1.5 sm:hidden block bg-blue-50 text-blue-600 sm:text-xs text-[10px] font-bold rounded-full uppercase tracking-wider">
        Joined In {formatted}
      </span>
    </div>
  );
}

export default SmallImage;
