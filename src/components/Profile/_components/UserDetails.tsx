"use client";
import { UserWithRelationType } from "@/lib/types/types";
import { FaLinkedin } from "react-icons/fa";
import { User } from "@prisma/client";
import ButtonFollow from "./ButtonFollow";
import Followers from "./Followers";

// =====================================================================
function UserDetails({
  user,
  userSession,
}: {
  user: UserWithRelationType;
  userSession: User;
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
            <h2 className="sm:text-3xl capitalize text-2xl font-bold text-slate-900 tracking-tight line-clamp-1">
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
          <span className="px-4 shrink-0 py-1.5 text-center sm:block hidden bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
            Joined In {formatted}
          </span>
        </div>
        {user.headline && (
          <p className="sm:text-[16px] text-[14px] text-slate-600 leading-relaxed">
            {user.headline}
          </p>
        )}
        <div className="flex items-center gap-5">
         <Followers user={user} userSession={userSession}/>
          <h4 className="text-[13px] font-bold text-slate-600 flex items-center gap-1">
            {user.posts.length}
            <span className="font-medium">
              {user.posts.length < 2 ? "post" : "posts"}
            </span>
          </h4>
        </div>
      </div>
      {user.id !== userSession.id && (
        <div className="flex items-center gap-3">
          <ButtonFollow user={user} currentUser={userSession} />
        </div>
      )}
    </div>
  );
}

export default UserDetails;
