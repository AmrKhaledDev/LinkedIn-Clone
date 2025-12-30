"use client";

import Loader from "@/components/Loader/Loader";
import { ContextStates } from "@/context/Context";
import { ApplyChangeBigImageAction } from "@/lib/actions/ApplyChangeBigImageAction";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
// =================================================
function ApplyButton({
  user,
  setShowBoxEdit,
}: {
  user: User;
  setShowBoxEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const context = useContext(ContextStates);
  const router = useRouter();
  if (!context) return null;
  const { bigImageFile, setBigImageFile, setBigImage } = context;
  const handleApply = async () => {
    setLoading(true);
    const result = await ApplyChangeBigImageAction(user.id, bigImageFile);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, {
        className: "toast-font",
      });
    setShowBoxEdit(false);
    toast.success("Edited image success");
    setBigImage(null);
    setBigImageFile(null);
    router.refresh();
  };
  return (
    <button
      disabled={loading}
      onClick={handleApply}
      className="text-white disabled:bg-blue-100 disabled:text-gray-300 font-bold bg-primary rounded-full cursor-pointer py-1.5 px-4 hover:bg-blue-800 transition-css
              "
    >
      {loading ? <Loader /> : "Apply"}
    </button>
  );
}

export default ApplyButton;
