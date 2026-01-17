"use client";
import { ContextStates } from "@/context/Context";
import { CreateSaveItemAction } from "@/lib/actions/CreateActions/CreateSaveItemAction";
import { SaveItemType } from "@/lib/types/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { MdBookmarkRemove } from "react-icons/md";
// ===================================================================
function EditSaveItemBox({ item, user }: { item: SaveItemType; user: User }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleUnsaveItem = async () => {
    setLoading(true);
    const result = await CreateSaveItemAction(item.post.id, user.id);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-error" });
    router.refresh();
    setDropDownMenu(null);
  };
  const context = useContext(ContextStates);
  if (!context) return null;
  const { dropDownMenu, setDropDownMenu } = context;
  return (
    <div className="relative">
      <button
        onClick={() => setDropDownMenu(item.id)}
        className={`cursor-pointer button p-1 rounded-full hover:bg-gray-200 transition-css ${
          dropDownMenu === item.id && "bg-gray-100"
        }`}
      >
        <IoEllipsisHorizontalSharp />
      </button>
      <div
        className={`shadow box bg-white w-57.5 rounded-xl absolute right-0 border border-gray-200 ${
          dropDownMenu === item.id ? "block" : "hidden"
        }`}
      >
        <button
          onClick={handleUnsaveItem}
          disabled={loading}
          className="cursor-pointer sm:text-[15px] text-[13px] disabled:text-gray-500 disabled:hover:bg-transparent disabled:cursor-wait flex items-center gap-2 hover:bg-gray-50 w-full p-2"
        >
          <i className="sm:text-2xl text-xl">
            <MdBookmarkRemove />
          </i>
          <div className="flex flex-col items-start font-semibold">
            {loading ? "Unsaving..." : "Unsave"}
            <p className="sm:text-[12px] text-[10px] font-normal text-gray-500">
              {loading
                ? " Unsaving from your list"
                : " Unsave from your saved list"}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default EditSaveItemBox;
