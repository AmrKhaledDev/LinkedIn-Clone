import { DeletePostAction } from "@/lib/actions/DeleteActions/DeletePost";
import { PostType } from "@/lib/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin4Line } from "react-icons/ri";
// =====================================================================
function ButtonDeletePost({
  userId,
  post,
}: {
  userId: string;
  post: PostType;
}) {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const router = useRouter();

  const handleDeletePost = async () => {
    setLoadingDelete(true);
    const result = await DeletePostAction(userId, post.id);
    setLoadingDelete(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
  };
  return (
    <button
      disabled={loadingDelete}
      onClick={handleDeletePost}
      className="flex items-center disabled:cursor-wait disabled:text-gray-600 disabled:bg-gray-200 gap-3 cursor-pointer py-2 px-4 rounded hover:bg-gray-100 text-[14px] font-semibold"
    >
      <i className="text-[18px]">
        <RiDeleteBin4Line />
      </i>
      {loadingDelete ? " Deleting" : " Delete"}
    </button>
  );
}

export default ButtonDeletePost;
