"use client";
import Image from "next/image";
import { FaRegBookmark } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { PostType } from "@/lib/types/types";
import ButtonDeletePost from "./ButtonDeletePost";
import ButtonEditPost from "./ButtonEditPost/ButtonEditPost";
import { User } from "@prisma/client";
import { ContextStates } from "@/context/Context";
import { FaBookmark } from "react-icons/fa";
import { CreateSaveItemAction } from "@/lib/actions/CreateActions/CreateSaveItemAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// ============================================================
interface EditPostProps {
  user: User;
  post: PostType;
}
function EditPost({ post, user }: EditPostProps) {
  const isSaved = post.saveItems?.find((item) => item.postId === post.id);
  const context = useContext(ContextStates);
  if (!context) return null;
  const { dropDownMenu, setDropDownMenu } = context;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSavePost = async () => {
    setLoading(true);
    const result = await CreateSaveItemAction(post.id, user.id);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
  };
  return (
    <div
      id={`edit-post-${post.id}`}
      className="pt-2 mx-3 flex items-center justify-end relative"
    >
      <div className="w-fit relative">
        <div>
          <Image
            onClick={() => setDropDownMenu(post.id)}
            src={"/ellipsis.svg"}
            alt="Icon"
            width={25}
            height={25}
            className="cursor-pointer button hover:bg-gray-100 rounded-full p-1 transition-css"
          />
        </div>
        {dropDownMenu === post.id && (
          <div
            className={`shadow box z-10 bg-white border border-gray-200 rounded-xl absolute right-0 p-1 flex flex-col gap-3 ${
              isSaved ? "sm:w-65 w-58" : "w-fit"
            }`}
          >
            <button
              disabled={loading}
              onClick={handleSavePost}
              className="flex items-center disabled:text-gray-500 disabled:cursor-wait disabled:hover:bg-transparent gap-2 cursor-pointer py-2 px-4 rounded hover:bg-gray-100 sm:text-[14px] text-[13px] font-semibold"
            >
              <i className="sm:text-[18px] text-[17px]">
                {isSaved ? <FaBookmark /> : <FaRegBookmark />}
              </i>
              {isSaved ? (
                <div className="flex flex-col items-start">
                  Unsave
                  <p className="text-[12px] font-normal text-gray-500">
                    Unsave from your saved list
                  </p>
                </div>
              ) : loading ? (
                "Saving..."
              ) : (
                "Save"
              )}
            </button>
            {post.userId === user.id && (
              <>
                <ButtonDeletePost userId={user.id} post={post} />
                <ButtonEditPost post={post} user={user} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditPost;
