import { FaBookmark } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { RiNewsLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";
// ==============================================================
function BottomLinks() {
  const links = [
    {
      id: crypto.randomUUID(),
      linkName: "Saved items",
      icon: <FaBookmark />,
      url: "/",
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
          className="flex items-center sm:gap-2 gap-4 sm:text-[14px] text-[16px] hover:underline"
          href={link.url}
          key={link.id}
        >
          <i className="sm:text-[17px] text-xl">{link.icon}</i>
          {link.linkName}
        </Link>
      ))}
    </div>
  );
}

export default BottomLinks;
