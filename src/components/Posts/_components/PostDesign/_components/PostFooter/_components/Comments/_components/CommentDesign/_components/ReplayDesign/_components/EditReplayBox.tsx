"use client";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import { FaEllipsis, FaPlus } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import React, { Dispatch, useContext, useState } from "react";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ReplayWithRelations } from "@/lib/types/types";
import { DeleteReplayAction } from "@/lib/actions/DeleteActions/DeleteReplayAction";
import { ContextStates } from "@/context/Context";
// ====================================================
function EditReplayBox({
  user,
  replay,
  setEditReplayText,
}: {
  user: User;
  setEditReplayText: Dispatch<React.SetStateAction<boolean>>;
  replay: ReplayWithRelations;
}) {
  const [loading, setLoading] = useState(false);
  const context = useContext(ContextStates);
  if (!context) return null;
  const { dropDownMenu, setDropDownMenu } = context;
  const router = useRouter();
  const handleEditReplay = () => {
    setDropDownMenu(null);
    setEditReplayText(true);
  };
  const handleDeleteReplay = async () => {
    setLoading(true);
    const result = await DeleteReplayAction(user.id, replay.id);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
    setDropDownMenu(null);
  };
  return (
    <div className="relative">
      <i
        onClick={() => setDropDownMenu(replay.id)}
        className={`button sm:text-sm text-[13px] rounded-full cursor-pointer block p-1 hover:bg-white ${
          dropDownMenu === replay.id && "bg-white"
        }`}
      >
        <FaEllipsis />
      </i>
      <div
        className={`sm:p-3 p-1 rounded-xl box shadow z-10 bg-white flex-col absolute right-0 ${
          replay.userId !== user.id ? "min-w-50" : "min-w-fit"
        } sm:gap-2 mt-1 ${dropDownMenu === replay.id ? "flex" : "hidden"}`}
      >
        {replay.userId !== user.id && (
          <button
            className="text-start text-[13px] flex gap-2 items-center text-slate-600 hover:bg-primary hover:text-white transition-css
           cursor-pointer font-semibold bg-gray-50 rounded shadow py-2 px-3"
          >
            <i>
              <FaPlus />
            </i>
            <span className="line-clamp-1 capitalize">
              {`Follow ${replay.user.name}`}
            </span>
          </button>
        )}
        {replay.userId === user.id && (
          <>
            <button
              onClick={handleEditReplay}
              className="flex items-center sm:text-[13px] text-[11px] sm:gap-2 gap-1 text-slate-600 cursor-pointer font-semibold hover:bg-gray-50 rounded hover:shadow py-2 px-3"
            >
              <i className="sm:text-[17px] text-[16px]">
                <MdModeEdit />
              </i>
              Edit
            </button>
            <button
              onClick={handleDeleteReplay}
              disabled={loading}
              className="flex disabled:cursor-wait sm:text-[13px] text-[11px] disabled:shadow disabled:bg-gray-200 disabled:text-gray-500 items-center sm:gap-2 gap-1 text-slate-600 cursor-pointer font-semibold hover:bg-gray-50 rounded hover:shadow py-2 px-3"
            >
              <i className="sm:text-[17px] text-[16px]">
                <MdDeleteSweep />
              </i>
              {loading ? "Deleting" : " Delete"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EditReplayBox;
