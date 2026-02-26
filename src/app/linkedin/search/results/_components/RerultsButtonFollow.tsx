"use client";
import { CreateFollowAction } from "@/lib/actions/CreateActions/CreateFollowAction";
import { UserWithFollower } from "@/lib/types/types";
import { User } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

// =============================================================================
function RerultsButtonFollow({
  user,
  userSession,
}: {
  user: UserWithFollower;
  userSession: User;
}) {
  const [loading, setLoading] = useState(false);
  const isFollowing = user.followers.find(
    (u) => u.followerId === userSession.id,
  );
  const handleFollow = async () => {
    setLoading(true);
    const result = await CreateFollowAction(userSession.id, user.id);
    if (result?.error)
      return toast.error(result.error, { className: "toast-design" });
    setLoading(false);
  };
  return (
    <button
      disabled={loading}
      onClick={handleFollow}
      className={`flex items-center disabled:text-gray-500 disabled:border-gray-500 disabled:cursor-wait gap-1 transition-css border rounded-full py-1 px-3 text-sm  cursor-pointer 
        ${isFollowing ? "border-gray-500 text-gray-500 hover:text-gray-700 hover:border-gray-700" : " hover:bg-gray-50 border-black hover:outline-black hover:outline"}`}
    >
    <i>{isFollowing ? <FaCheck /> : <FaPlus />}</i>
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}

export default RerultsButtonFollow;
