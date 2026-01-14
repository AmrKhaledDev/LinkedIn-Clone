"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import ButtonSIgnOut from "./ButtonSIgnOut";
import { User } from "@prisma/client";
// =========================================================
function Me({ user }: { user: User | null }) {
  const [openProfile, setOpenProfile] = useState(false);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest(".button, .div, .link"))
        return setOpenProfile(false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      removeEventListener("click", handleClick);
    };
  });
  return (
    <div className="flex items-center justify-center flex-col relative pt-1.5">
      <div
        onClick={() => setOpenProfile(!openProfile)}
        className={`cursor-pointer button ${
          openProfile ? "text-black" : "text-blackLight"
        }`}
      >
        <Image
          src={user && user.image ? user.image : "/user.svg"}
          alt="User Image"
          width={100}
          height={100}
          className="w-8 h-8 shrink-0 rounded-full border-2 object-cover border-gray-200"
        />
        <div className="flex items-center ">
          <span className="group-hover:text-blackLight text-[12px]">Me</span>
          <i className="text-[15px]">
            <IoMdArrowDropdown />
          </i>
        </div>
      </div>
      <MeProfile openProfile={openProfile} user={user} />
    </div>
  );
}

export default Me;

function MeProfile({
  openProfile,
  user,
}: {
  openProfile: boolean;
  user: User | null;
}) {
  return (
    <div
      className={`absolute sm:-left-50 -left-40 -bottom-50.5 shadow rounded-xl bg-white w-62.5  ${
        openProfile ? "block" : "hidden"
      } transition-css div overflow-hidden`}
    >
      <div className="flex flex-col gap-3 border-b border-b-gray-200  p-4">
        <div className="flex items-center gap-3">
          <Image
            src={user && user.image ? user.image : "/user.svg"}
            alt="User Image"
            width={100}
            height={100}
            className="w-12.5 h-12.5 shrink-0 object-cover rounded-full border-2 border-gray-200"
          />
          <div className="flex flex-col">
            <span className="font-semibold capitalize">{user?.name}</span>
            <span className="text-[13px] font-normal line-clamp-1 text-blackLight">{user?.headline ? user.headline :""}</span>
          </div>
        </div>
        <Link
          className="border-2 link border-primary rounded-full py-2 px-4 text-[14px] flex items-center justify-center w-full text-primary hover:bg-blue-50"
          href={"/linkedin/profile"}
        >
          View Profile
        </Link>
      </div>
      <ButtonSIgnOut />
    </div>
  );
}
