import { FaBookmark } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { RiNewsLine } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import Link from "next/link";
// ==============================================================
function BottomLinks() {
  const links = [
    {
      id: crypto.randomUUID(),
      linkName: "Saved items",
      icon: <FaBookmark />,
      url: "/linkedin/save-items",
    },
    {
      id: crypto.randomUUID(),
      linkName: "Profile",
      icon: <ImProfile />,
      url: "/linkedin/profile",
    },
    {
      id: crypto.randomUUID(),
      linkName: "Newsletters",
      icon: <RiNewsLine />,
      url: "/",
    },
  ];
  return (
    <div className="p-5 rounded-[10px] border border-[#DFDEDA] flex flex-col gap-4 bg-white">
      {links.map((link) => (
        <Link
          className={`flex items-center sm:gap-2 font-extrabold gap-4 xl:text-[12px] lg:text-[16px] sm:text-[14px] text-[16px] hover:underline `}
          href={link.url}
          key={link.id}
        >
          <i className="sm:text-[15px] text-xl">
            {link.icon}
          </i>
          {link.linkName}
        </Link>
      ))}
    </div>
  );
}

export default BottomLinks;
