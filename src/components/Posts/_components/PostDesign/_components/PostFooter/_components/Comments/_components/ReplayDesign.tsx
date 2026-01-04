import { CreateLikeForReplayAction } from "@/lib/actions/CreateLikeForReplayAction";
import { ReplayWithRelations } from "@/lib/types/types";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BsFillPatchCheckFill } from "react-icons/bs";
// =====================================================================
function ReplayDesign({
  user,
  replay,
}: {
  user: User;
  replay: ReplayWithRelations;
}) {
  const router = useRouter();
  const handleLikeForReplay = async () => {
    const result = await CreateLikeForReplayAction(replay.id, user.id);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
  };
  const isLikeForReplay = replay.likeForReplays.find(
    (like) => like.userId === user.id
  );
  return (
    <div className="flex gap-2 w-full bg-white p-3 rounded-xl">
      <Image
        src={replay.user.image || "/user.svg"}
        alt="User Image"
        width={50}
        height={50}
        className="w-9 h-9 rounded-full border shrink-0 border-gray-100 object-cover"
      />
      <div className="flex flex-col gap-1 w-full">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <h2 className="line-clamp-1 font-semibold capitalize">
                {replay.user.name}
              </h2>
              {replay.user.role === "SUPER_ADMIN" && (
                <i
                  className="text-blue-500 text text-[12px]"
                  title="Super Admin"
                >
                  <BsFillPatchCheckFill />
                </i>
              )}
            </div>
            {replay.isAuthor && (
              <p className=" capitalize font-semibold px-2 text-[10px] rounded  bg-gray-600 text-white">
                author
              </p>
            )}
          </div>
          <h3 className="line-clamp-1 text-[11px] text-blackLight font-normal">
            {replay.user.headline}
          </h3>
        </div>
        <p className="text-[14px]">{replay.content}</p>
        <div className="flex items-center gap-1">
          <button
            onClick={handleLikeForReplay}
            className={`hover:bg-gray-100 rounded cursor-pointer py-1 text-[12px] px-1 transition-css font-bold  ${
              isLikeForReplay ? "text-primary" : "text-slate-600"
            }`}
          >
            Like
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
                        you , <span>{replay.likeForReplays.length -1}</span>
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
