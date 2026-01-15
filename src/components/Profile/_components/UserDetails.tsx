import { UserWithRelationType } from "@/lib/types/types";
import { RiSendPlaneFill } from "react-icons/ri";
import { PiUserPlusBold } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";
import { User } from "@prisma/client";
// =====================================================================
function UserDetails({
  user,
  currentUser,
}: {
  user: UserWithRelationType;
  currentUser: User;
}) {
  const date = new Date(user.createdAt);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  } as const;
  const formatted = date.toLocaleDateString("en-GB", options);
  return (
    <div className="flex flex-col gap-3 justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-1">
            <h2 className="sm:text-3xl capitalize text-2xl font-bold text-slate-900 tracking-tight break-all line-clamp-1">
              {user.name}
            </h2>
            {user.role === "SUPER_ADMIN" && (
              <i
                className="text-primary sm:text-2xl text-xl"
                title="Linkedin Developer"
              >
                <FaLinkedin />
              </i>
            )}
          </div>
          <span className="px-4 py-1.5 text-center sm:block hidden bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
            Joined In {formatted}
          </span>
        </div>
        {user.headline && (
          <p className="sm:text-[16px] text-[14px] text-slate-600 leading-relaxed">
            {user.headline}
          </p>
        )}
        <div className="flex items-center gap-5">
          <h4 className="text-[13px] font-bold text-slate-500 flex items-center gap-1">
            500+ <span className="font-medium"> connections</span>
          </h4>
          <h4 className="text-[13px] font-bold text-slate-600 flex items-center gap-1">
            {user.posts.length}
            <span className="font-medium">
              {user.posts.length < 2 ? "post" : "posts"}
            </span>
          </h4>
        </div>
      </div>
      {user.id !== currentUser.id && (
        <div className="flex items-center gap-3">
          <button className="text-white border-2 border-transparent bg-primary py-1 px-3 rounded-full cursor-pointer hover:bg-hoverColor font-semibold flex items-center gap-2 text-[14px]">
            <PiUserPlusBold className="size-4.5" /> Connect
          </button>
          <button className=" border-2 border-primary text-primary py-1 px-2 rounded-full cursor-pointer hover:border-blue-900 hover:text-blue-900 font-semibold flex items-center gap-2 text-[14px]">
            <RiSendPlaneFill className="size-4.5" /> Message
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
