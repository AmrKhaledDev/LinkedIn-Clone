"use client";
import Loader from "@/components/Loader/Loader";
import { DeleteSmallImageAction } from "@/lib/actions/DeleteSmallImageAction";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
// =============================================================
function ButtonDelete({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    if (!user.image || user.image.trim().length < 1)
      return toast.error("No image found to delete", {
        className: "toast-font",
      });
    setLoading(true);
    const result = await DeleteSmallImageAction(user.id);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    toast.success("Deleted image success", { className: "toast-font" });
    router.refresh();
  };
  return (
    <button
      onClick={handleClick}
      disabled={loading || !user.image}
      className={`flex disabled:cursor-default disabled:text-gray-400 disabled:hover:bg-transparent items-center gap-2 button group cursor-pointer py-2 px-3 rounded-xl text-red-500 hover:bg-gray-100 shadow transition-css font-semibold ${
        loading && "justify-center"
      }`}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <i className="p-2 group-disabled:bg-gray-100 group-disabled:text-gray-400 rounded bg-red-100 text-red-500 text-[20px] group-hover:bg-red-500 group-hover:text-white transition-css">
            <RiDeleteBinLine />
          </i>
          Delete photo
        </>
      )}
    </button>
  );
}

export default ButtonDelete;
