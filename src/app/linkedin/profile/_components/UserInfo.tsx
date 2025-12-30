import { UserWithRelationType } from "@/lib/types/types";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
// ===========================================================
function UserInfo({ user }: { user: UserWithRelationType }) {
  const infoList = [
    {
      id: crypto.randomUUID(),
      nameinfo: "Email Address",
      info: user.email,
      icon: <MdOutlineAlternateEmail />,
    },
    {
      id: crypto.randomUUID(),
      nameinfo: "Location",
      info: user.city && user.country && user.city + ", " + user.country,
      icon: <IoLocationSharp />,
    },
  ];
  return (
    <div className="py-6 border-t border-gray-50 bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
      {infoList.map((info) => (
        <div className="flex items-center gap-3 group" key={info.id}>
          <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
            <i className="text-xl text-slate-500 group-hover:text-blue-600">
              {info.icon}
            </i>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] uppercase text-gray-400 font-bold tracking-widest">
              {info.nameinfo}
            </span>
            <span className="text-sm font-semibold text-slate-700">
              {info.info}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserInfo;
