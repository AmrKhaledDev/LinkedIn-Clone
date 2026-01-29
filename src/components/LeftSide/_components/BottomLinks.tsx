import { FaBookmark } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { RiNewsLine } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";
// ==============================================================
function BottomLinks() {
  const links = [
    {
      id: crypto.randomUUID(),
      linkName: "Profile",
      icon: <ImProfile />,
      url: "/linkedin/profile",
    },
    {
      id: crypto.randomUUID(),
      linkName: "Saved items",
      icon: <FaBookmark />,
      url: "/linkedin/save-items",
    },
    {
      id: crypto.randomUUID(),
      linkName: "Groups",
      icon: <HiUserGroup />,
      url: "/",
    },
    {
      id: crypto.randomUUID(),
      linkName: "Newsletters",
      icon: <RiNewsLine />,
      url: "/",
    },
    {
      id: crypto.randomUUID(),
      linkName: "Events",
      icon: <FaRegCalendarAlt />,
      url: "/",
    },
  ];
  return (
    <div className="p-5 shadow rounded flex flex-col gap-4 bg-white">
      {links.map((link) => (
        <Link
          className={`flex items-center sm:gap-2 gap-4 xl:text-[14px] lg:text-[16px] sm:text-[14px] text-[16px] hover:underline ${link.linkName.toLowerCase().trim() === "profile" && "sm:hidden block"}`}
          href={link.url}
          key={link.id}
        >
          <i className="xl:text-[17px] lg:text-[20px] sm:text-[17px] text-xl">
            {link.icon}
          </i>
          {link.linkName}
        </Link>
      ))}
    </div>
  );
}

export default BottomLinks;
