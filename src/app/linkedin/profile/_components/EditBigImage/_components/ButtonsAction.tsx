"use client";

import { DeleteBigImageAction } from "@/lib/actions/DeleteActions/DeleteBigImageAction";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ChangeImageButton from "./ChangeImageButton";
import ApplyButton from "./ApplyButton";
// =====================================================================================
function ButtonsAction({
  user,
  setShowBoxEdit,
}: {
  user: User;
  setShowBoxEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const handleDeleteImage = async () => {
    if (!user.imageProfile || user.imageProfile.trim().length < 1) {
      setShowBoxEdit(false);
      toast.error("No image found to delete", {
        className: "toast-font",
      });
      return;
    }
    setShowBoxEdit(false);
    const result = await DeleteBigImageAction(user.id, user.imageProfile);
    if (result?.error) return toast.error(result.error);
    toast.success("Deleted image success", {
      className: "toast-font",
    });
    router.refresh();
  };

  return (
    <div className="flex justify-between items-center p-2">
      <button
        onClick={handleDeleteImage}
        className="text-slate-600 font-bold cursor-pointer sm:text-[15px] text-[13px] py-1.5 sm:px-4 px-3 rounded hover:bg-gray-100 transition-css hover:text-black"
      >
        Delete photo
      </button>
      <div className="flex items-center gap-5">
        <ChangeImageButton />
        <ApplyButton user={user} setShowBoxEdit={setShowBoxEdit}/>
      </div>
    </div>
  );
}

export default ButtonsAction;
