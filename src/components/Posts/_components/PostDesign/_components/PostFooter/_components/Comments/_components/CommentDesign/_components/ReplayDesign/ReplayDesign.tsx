import { CreateLikeForReplayAction } from "@/lib/actions/CreateActions/CreateLikeForReplayAction";
import { ReplayWithRelations } from "@/lib/types/types";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EditReplayBox from "./_components/EditReplayBox";
import { useState } from "react";
import EditReplayContent from "./_components/EditReplayContent";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
// =====================================================================
function ReplayDesign({
  user,
  postId,
  replay,
}: {
  user: User;
  postId: string;
  replay: ReplayWithRelations;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLikeForReplay = async () => {
    setLoading(true);
    const result = await CreateLikeForReplayAction(replay.id, postId, user.id);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
  };
  const isLikeForReplay = replay.likeForReplays.find(
    (like) => like.userId === user.id,
  );
  const [editReplayText, setEditReplayText] = useState(false);
  return (
    <div className="flex gap-2 w-full bg-gray-100 sm:p-3 p-2 rounded-xl">
      <Image
        src={replay.user.image || "/user.svg"}
        alt="User Image"
        width={50}
        height={50}
        className="sm:w-9 w-7 sm:h-9 h-7 rounded-full border shrink-0 border-gray-100 object-cover"
      />
      <div className="flex flex-col gap-1 w-full">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center sm:gap-2 gap-1">
              <div className="flex items-center gap-1">
                <Link
                  href={
                    user.id == replay.userId
                      ? "/linkedin/profile"
                      : `/linkedin/u/${replay.userId}`
                  }
                  className="line-clamp-1 font-semibold capitalize sm:text-[15px] text-[14px] hover:underline hover:text-primary"
                >
                  {replay.user.name}
                </Link>
                {replay.user.role === "SUPER_ADMIN" && (
                  <i
                    className="text-primary pb-0.5 sm:text-[15px] text-[14px]"
                    title="Linkedin Developer"
                  >
                    <FaLinkedin />
                  </i>
                )}
              </div>
              {replay.isAuthor && (
                <p className=" capitalize font-semibold px-2 sm:text-[10px] text-[9px] rounded  bg-gray-600 text-white">
                  author
                </p>
              )}
              {replay.isEdited && (
                <p className="inline-block rounded-md bg-white px-2 py-0.5 sm:text-[10px] text-[9px] font-semibold tracking-wide text-gray-600">
                  Edited
                </p>
              )}
            </div>
            <EditReplayBox
              setEditReplayText={setEditReplayText}
              user={user}
              replay={replay}
            />
          </div>
          <h3 className="line-clamp-1 sm:text-[11px] text-[10px] text-blackLight font-normal">
            {replay.user.headline}
          </h3>
        </div>
        {editReplayText ? (
          <EditReplayContent
            setEditReplayText={setEditReplayText}
            editReplayText
            replay={replay}
            user={user}
          />
        ) : (
          <p className="sm:text-[14px] text-[13px] break-all">
            {replay.content}
          </p>
        )}
        <div className="flex items-center gap-1">
          <button
            disabled={loading}
            onClick={handleLikeForReplay}
            className={`hover:bg-gray-100  disabled:hover:bg-transparent disabled:cursor-default rounded cursor-pointer py-1 text-[12px] px-1 transition-css font-bold  ${
              isLikeForReplay ? "text-primary" : "text-slate-600"
            }`}
          >
            {loading ? (
              <div className="flex space-x-0.5 items-center justify-center">
                <div className="size-0.75 bg-primary rounded-full animate-[bounce_1s_infinite_0ms]"></div>
                <div className="size-0.75 bg-primary rounded-full animate-[bounce_1s_infinite_200ms]"></div>
                <div className="size-0.75 bg-primary rounded-full animate-[bounce_1s_infinite_400ms]"></div>
              </div>
            ) : (
              "Like"
            )}
          </button>

          {replay.likeForReplays.length > 0 && (
            <>
              <span className="size-0.5 rounded-full bg-gray-500" />
              <div className="flex items-center gap-1">
                <Image src={"/like.svg"} alt="Like" width={16} height={16} />
                <h4 className="text-[12px] text-gray-500 font-normal">
                  {isLikeForReplay ? (
                    replay.likeForReplays.length > 1 ? (
                      <span>
                        you, <span>{replay.likeForReplays.length - 1}</span>
                      </span>
                    ) : (
                      <span>you</span>
                    )
                  ) : (
                    <>{replay.likeForReplays.length}</>
                  )}
                </h4>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReplayDesign;
