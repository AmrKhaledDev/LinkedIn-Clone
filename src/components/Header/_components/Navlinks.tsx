"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { MdOutlineWork } from "react-icons/md";
import { BiSolidMessageDots } from "react-icons/bi";
import { IoNotificationsSharp } from "react-icons/io5";

// ======================================================================
function Navlinks() {
  const links = [
    {
      id: crypto.randomUUID(),
      linkName: "Home",
      icon: <AiFillHome />,
      url: "/linkedin",
    },
    {
      id: crypto.randomUUID(),
      linkName: "My Network",
      icon: <HiUsers />,
      url: "/network",
    },
    {
      id: crypto.randomUUID(),
      linkName: "Jobs",
      icon: <MdOutlineWork />,
      url: "/jobs",
    },
    {
      id: crypto.randomUUID(),
      linkName: "Messaging",
      icon: <BiSolidMessageDots />,
      url: "/messaging",
    },
    {
      id: crypto.randomUUID(),
      linkName: "Notifications",
      icon: <IoNotificationsSharp />,
      url: "/notifications",
    },
  ];
  const pathname = usePathname();
  const [openNav, setOpenNave] = useState(false);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest(".button, .div, .link")) return setOpenNave(false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      removeEventListener("click", handleClick);
    };
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Image
        onClick={() => setOpenNave(!openNav)}
        src={"/ellipsis.svg"}
        alt="Menu"
        width={100}
        height={100}
        className={`w-6 sm:hidden block button rounded-full p-1 ${
          openNav && "bg-gray-100"
        }`}
      />
      <nav
        className={`sm:flex div items-center sm:h-full sm:relative sm:left-0 sm:translate-x-0 sm:top-0 fixed left-1/2 -translate-x-1/2 top-18 sm:border-b-0 border-b-2 border-b-gray-200 bg-white sm:px-0 px-3 sm:w-fit w-full sm:py-0 py-2 sm:justify-start justify-center sm:gap-0 gap-4 sm:flex-row flex-col ${
          openNav ? "flex" : "hidden"
        } border-r border-r-gray-100`}
      >
        {links.map((link) => (
          <Link
            href={link.url}
            key={link.id}
            className={`flex items-center sm:justify-center flex-col md:px-5 sm:px-3 px-5 pt-1 h-full ${
              pathname == link.url &&
              "border-black sm:border-b-2"
            } group link`}
          >
            <i
              className={`md:text-2xl sm:text-xl text-2xl ${
                pathname == link.url ? " text-black" : "text-[#666666]"
              } group-hover:text-black`}
            >
              {link.icon}
            </i>
            <span
              className={`md:text-[12px]  sm:text-[11px] text-[14px] group-hover:text-black  ${
                pathname == link.url ? "text-black" : "text-blackLight"
              }`}
            >
              {link.linkName}
            </span>
          </Link>
        ))}
      </nav>
    </>
  );
}

export default Navlinks;
