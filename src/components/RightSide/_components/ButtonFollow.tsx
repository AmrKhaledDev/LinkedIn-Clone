"use client";

import { CreateFollowAction } from "@/lib/actions/CreateActions/CreateFollowAction";
import { UserWithFollower } from "@/lib/types/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
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
      className={`flex disabled:text-gray-500 disabled:border-gray-300 disabled:hover:bg-transparent disabled:cursor-default items-center gap-1 border py-1 font-semibold cursor-pointer px-4 rounded-full mt-1 
        ${isFollower ?"text-slate-800 border-gray-200" :"border-primary text-primary hover:bg-blue-50"}`}
    >
      {isFollower ? (
        "Following"
      ) : (
        <>
          <i className="text-[18px]">
            <FiPlus />
          </i>
          Follow
        </>
      )}
    </button>
  );
}

export default ButtonFollow;
