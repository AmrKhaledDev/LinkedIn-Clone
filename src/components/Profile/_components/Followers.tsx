"use client";
import { UserWithRelationType } from "@/lib/types/types";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// =============================================================================
function Followers({
  user,
  userSession,
}: {
  user: UserWithRelationType;
  userSession: User;
}) {
  const [showFollwers, setShowFollowers] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonShowFollowers, .BoxFollowers"))
          setShowFollowers(false);
      }
    };
    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle);
    };
  }, []);
  return (
    <div className="relative">
      <button
        onClick={() => setShowFollowers(!showFollwers)}
        className="buttonShowFollowers text-[13px] font-bold text-slate-500 flex items-center gap-1 hover:underline cursor-pointer"
      >
        {user.followers.length} <span className="font-medium"> followers</span>
      </button>
      {showFollwers && (
        <div className="BoxFollowers absolute bg-gray-50 shadow p-4 rounded-xl sm:min-w-87.5 w-60 mt-1 space-y-5 max-h-87 overflow-auto">
          {user.followers.map((follower) => (
            <div
              key={follower.follower.id}
              className="flex gap-2 items-center "
            >
              <Image
                src={follower.follower.image || "/user.svg"}
                alt="user image"
                width={60}
                height={60}
                className="sm:w-12 sm:h-12 w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div>
                <Link
                  href={
                    follower.follower.id === userSession.id
                      ? "/linkedin/profile"
                      : `/linkedin/u/${follower.follower.id}`
                  }
                  className="font-bold sm:text-[17px] text-sm capitalize hover:underline"
                >
                  {follower.follower.name}
                </Link>
                <p className="font-normal text-gray-500 sm:text-xs text-[12px] line-clamp-1">
                  {follower.follower.headline}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Followers;
