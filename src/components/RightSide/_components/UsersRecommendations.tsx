import { UserWithFollower } from "@/lib/types/types";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import ButtonFollow from "./ButtonFollow";
// =====================================================================
function UsersRecommendations({
  user,
  userSession,
}: {
  user: UserWithFollower;
  userSession: User;
}) {
  return (
    <div className="flex gap-3">
      <Image
        src={user.image ? user.image : "/user.svg"}
        alt="User Photo"
        width={100}
        height={100}
        className="rounded-full object-cover w-13 h-13 shrink-0"
      />
      <div>
        <Link
          href={`/linkedin/u/${user.id}`}
          className="hover:underline font-bold line-clamp-1 capitalize w-fit"
        >
          {user.name}
        </Link>
        <h3 className="text-[13px] text-blackLight line-clamp-1">
          {user.headline}
        </h3>
        <ButtonFollow user={user} userSession={userSession} />
      </div>
    </div>
  );
}

export default UsersRecommendations;
