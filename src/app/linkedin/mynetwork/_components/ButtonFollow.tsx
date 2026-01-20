"use client";

import { CreateFollowAction } from "@/lib/actions/CreateActions/CreateFollowAction";
import { UserWithFollower } from "@/lib/types/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
// ==============================================================================
function ButtonFollow({
  user,
  userSession,
}: {
  user: UserWithFollower;
  userSession: User;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleFollow = async () => {
    setLoading(true);
    const result = await CreateFollowAction(userSession.id, user.id);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
  };
  const isFollower = user.followers.find(
    (follower) => follower.followerId === userSession.id,
  );
  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={` disabled:cursor-default disabled:text-gray-500 disabled:border-gray-300 disabled:hover:bg-transparent border sm:text-[15px] text-sm mt-1 rounded-full sm:py-1 font-bold py-0.5 px-3 cursor-pointer 
        ${
          isFollower
            ? "text-slate-800 bg-gray-200"
            : "text-primary border-primary hover:bg-blue-50"
        }`}
    >
      {isFollower ? "Following" : " Follow"}
    </button>
  );
}

export default ButtonFollow;
