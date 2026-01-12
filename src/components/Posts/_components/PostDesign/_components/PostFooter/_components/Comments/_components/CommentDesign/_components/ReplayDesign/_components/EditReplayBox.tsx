"use client";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import React, { Dispatch, useContext, useEffect, useState } from "react";
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
  const { openEditReplay, setOpenEditReplay } = context;
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest(".box, .button")) setOpenEditReplay(null);
    };
    document.addEventListener("click", handle);
    return () => {
      removeEventListener("click", handle);
    };
  });
  const router = useRouter();
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".button, .box")) setOpenEditReplay(null);
      }
    };
    document.addEventListener("click", handle);
    return () => {
      removeEventListener("click", handle);
    };
  });
  const handleEditReplay = () => {
    setOpenEditReplay(null);
    setEditReplayText(true);
  };
  const handleDeleteReplay = async () => {
    setLoading(true);
    const result = await DeleteReplayAction(user.id, replay.id);
    setLoading(false);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
    setOpenEditReplay(null);
  };
  return (
    <div className="relative">
      <Image
        onClick={() => setOpenEditReplay(replay.id)}
        src={"/ellipsis.svg"}
        alt="Menu"
        width={50}
        height={50}
        className={`w-5 h-5 button rounded-full cursor-pointer p-1 hover:bg-white ${
          openEditReplay === replay.id && "bg-white"
        }`}
      />
      <div
        className={`sm:p-3 p-1 rounded-xl box shadow z-10 bg-white flex-col absolute right-0 ${
          replay.userId !== user.id ? "min-w-50" : "min-w-fit"
        } sm:gap-2 mt-1 ${openEditReplay === replay.id ? "flex" : "hidden"}`}
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
