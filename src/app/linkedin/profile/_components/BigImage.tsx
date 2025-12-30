"use client"
import { User } from "@prisma/client";
import Image from "next/image";
import EditBigImage from "./EditBigImage/EditBigImage";
// =========================================================
function BigImage({user}:{user:User}) {
  return (
    <div className="relative">
      <Image
        src={user.imageProfile ? user.imageProfile : "/card-bg.svg"}
        alt="Profile Image"
        width={900}
        height={900}
        className="w-full object-cover h-70"
      />
     <EditBigImage user={user}/>
    </div>
  );
}

export default BigImage;
