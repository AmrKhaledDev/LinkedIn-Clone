"use client";
import { UserWithRelationType } from "@/lib/types/types";
import { User } from "@prisma/client";
import { FaCheck } from "react-icons/fa6";
import { CreateFollowAction } from "@/lib/actions/CreateActions/CreateFollowAction";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdAdd } from "react-icons/md";
// ========================================================
function ButtonFollow({
  user,
  currentUser,
}: {
  user: UserWithRelationType;
  currentUser: User;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isFollower = user.followers.find(
    (follower) => follower.followerId === currentUser.id,
  );
  const handleFollow = async () => {
    setLoading(true);
    const result = await CreateFollowAction(currentUser.id, user.id);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
  };
  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={` border-2 disabled:cursor-default disabled:text-gray-500 disabled:bg-gray-100 border-transparent  py-1 px-3 rounded-full cursor-pointer  font-semibold flex items-center gap-1 text-[14px] ${isFollower ? "bg-gray-100 text-slate-800" : "text-white bg-primary hover:bg-hoverColor "}`}
    >
      {isFollower ? (
        <>
          <i>
            <FaCheck />
          </i>
          Following
        </>
      ) : (
        <>
          <MdAdd className="size-4.5" /> Follow
        </>
      )}
    </button>
  );
}

export default ButtonFollow;
