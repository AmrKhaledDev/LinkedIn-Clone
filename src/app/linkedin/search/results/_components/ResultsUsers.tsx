import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import RerultsButtonFollow from "./RerultsButtonFollow";
import { UserWithFollower } from "@/lib/types/types";
// ==================================================================
function ResultsUsers({
  users,
  userSession,
}: {
  users: UserWithFollower[];
  userSession: User;
}) {
  return (
    <div
      id="users"
      className="bg-white border border-[#DFDEDA] p-4 rounded-[10px] space-y-5"
    >
      <h2 className="font-extrabold text-xl">Users</h2>
      <div className="space-y-5">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex gap-3 border-b border-b-gray-200 pb-2 last:border-none"
          >
            <Image
              src={u.image ?? "/user.svg"}
              alt="user image"
              width={60}
              height={60}
              className="rounded-full object-cover w-12 h-12 shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1">
                  <Link
                    href={
                      userSession.id === u.id
                        ? `/linkedin/profile`
                        : `/linkedin/u/${u.id}`
                    }
                    className="font-extrabold text-[18px] capitalize hover:underline"
                  >
                    {u.name}
                  </Link>
                  {userSession.id === u.id && (
                    <div className="flex items-center gap-1">
                      <span className="size-1 rounded-full bg-gray-500 block" />
                      <span className="text-gray-500 text-sm">You</span>
                    </div>
                  )}
                </div>
                {u.id !== userSession.id && (
                  <RerultsButtonFollow user={u} userSession={userSession} />
                )}
              </div>
              <p className="text-sm">{u.headline}</p>
              {u.country && u.city && (
                <div className="text-gray-500 flex items-center gap-1 text-sm">
                  <span>{u.country},</span>
                  <span>{u.city}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsUsers;
