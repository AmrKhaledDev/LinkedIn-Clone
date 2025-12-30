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
  return (
    <div className="absolute -bottom-10 left-7 flex items-center gap-3">
      <Image
        src={smallImage || user.image || "/user.svg"}
        alt="Your Image"
        width={200}
        height={200}
        className="rounded-full w-37 h-37 object-cover border-5 border-white "
      />
      <BoxEditSmallImage user={user}/>
    </div>
  );
}

export default SmallImage;
