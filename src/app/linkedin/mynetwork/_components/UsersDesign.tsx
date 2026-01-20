import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ButtonFollow from "./ButtonFollow";
import { UserWithFollower } from "@/lib/types/types";
// =======================================================

function UsersDesign({
  userSession,
  users,
}: {
  userSession: User;
  users: UserWithFollower[];
}) {
  return (
    <div className="grid md:grid-cols-3 grid-cols-2 lg:gap-4 sm:gap-2 gap-0.5">
      {users.map((user) => (
        <div
          key={user.id}
          className="rounded overflow-hidden border border-gray-200 hover:shadow transition-css h-fit"
        >
          <div>
            <Image
              src={user.imageProfile || "/card-bg.svg"}
              alt="User Profile"
              width={400}
              height={400}
              className="w-full sm:h-17.5 h-15 object-cover"
            />
            <Image
              src={user.image || "/user.svg"}
              alt="User Profile"
              width={400}
              height={400}
              className="sm:w-17 sm:h-17 w-14 h-14 sm:-mt-14 -mt-9 rounded-full object-cover shrink-0 sm:ml-4 ml-2"
            />
          </div>
          <div className="sm:px-3 px-1.5 pb-2 mt-2 flex flex-col gap-1">
            <Link
              href={`/linkedin/u/${user.id}`}
              className="font-semibold hover:underline capitalize sm:text-[17px] line-clamp-1 break-all w-fit"
            >
              {user.name}
            </Link>
            <Link
              href={`/linkedin/u/${user.id}`}
              className="font-normal sm:text-sm text-[12px] text-gray-600 line-clamp-2 break-all w-fit"
            >
              {user.headline}
            </Link>
            <span className="sm:text-[12px] text-[11px] font-normal text-gray-600">
              {user.followers.length} followers
            </span>
            <ButtonFollow user={user} userSession={userSession} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersDesign;
