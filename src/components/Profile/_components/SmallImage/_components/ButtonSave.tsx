"use client";
import Loader from "@/components/Loader/Loader";
import { ContextStates } from "@/context/Context";
import { EditSmallImageAction } from "@/lib/actions/EditActions/EditSmallImageAction";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineSave } from "react-icons/md";
// ==================================================================
function ButtonSave({
  user,
  setShowBoxEditImage,
}: {
  user: User;
  setShowBoxEditImage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const context = useContext(ContextStates);
  const router = useRouter();
  if (!context) return null;
  const { smallImage, smallImageFile, setSmallImageFile, setSmallImage } =
    context;
  const handleClick = async () => {
    setLoading(true);
    const result = await EditSmallImageAction(user.id, smallImageFile);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, {
        className: "toast-font",
      });
    setShowBoxEditImage(false);
    setSmallImage(null);
    setSmallImageFile(null);
    toast.success("Edited image success", {
      className: "toast-font",
    });
    router.refresh();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!smallImage || loading}
      className={`flex items-center gap-2 sm:text-[15px] text-[13px] button  disabled:cursor-default disabled:text-gray-400 group cursor-pointer py-2 px-3 rounded-xl hover:bg-gray-100 shadow hover:text-green-500 transition-css font-semibold disabled:hover:bg-white ${loading && "justify-center"}`}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <i className="sm:p-2 p-1 rounded bg-green-100 text-green-500 sm:text-[20px] text-[16px] group-hover:bg-green-500 group-hover:text-white transition-css group-disabled:text-gray-400 group-disabled:bg-gray-200">
            <MdOutlineSave />
          </i>
          Save
        </>
      )}
    </button>
  );
}

export default ButtonSave;
