"use client";

import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { EditReplayContentAction } from "@/lib/actions/EditActions/EditReplayContentAction";
import {  ReplayWithRelations } from "@/lib/types/types";
import {  User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
// =================================================================
function EditReplayContent({
  replay,
  user,
  editReplayText,
  setEditReplayText,
}: {
  replay: ReplayWithRelations;
  user: User;
  editReplayText: boolean;
  setEditReplayText: Dispatch<SetStateAction<boolean>>;
}) {
  const [valueEditReplay, setValueEditReplay] = useState(replay.content);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const handleEditReplayContent = async () => {
    setLoading(true);
    const result = await EditReplayContentAction(
      user.id,
      replay.id,
      valueEditReplay
    );
    setLoading(false);
    if (result?.error) return setServerError(result.error);
    setServerError("");
    setEditReplayText(false);
    router.refresh();
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [editReplayText]);
  return (
    <div>
      <div
        className={`border-2 border-gray-200 rounded overflow-hidden ${
          serverError && "border-red-500"
        }`}
      >
        <input
          ref={inputRef}
          disabled={loading}
          onChange={(e) => setValueEditReplay(e.target.value)}
          defaultValue={valueEditReplay}
          className="py-2 px-2 w-full outline-none text-[13px]"
        />
        <div className="w-full flex items-center justify-end gap-2 p-2">
          <button
            onClick={handleEditReplayContent}
            disabled={
              loading || replay.content.trim() === valueEditReplay.trim()
            }
            className={` disabled:cursor-default disabled:text-gray-500 disabled:bg-gray-300 shadow rounded-full font-semibold py-1 px-3 text-[11px] ${
              valueEditReplay.trim().length > 0
                ? "text-white bg-primary cursor-pointer "
                : "text-gray-500 bg-gray-300 cursor-default pointer-events-none"
            }`}
          >
            {loading ? "Saving" : "Save"}
          </button>
          <button
            onClick={() => {
              setEditReplayText(false);
              setValueEditReplay(replay.content);
              setServerError("");
            }}
            className="cursor-pointer text-black hover:bg-white shadow rounded-full font-semibold py-1 px-3 text-[11px]"
          >
            Cancel
          </button>
        </div>
      </div>
      {serverError && <AlertMessage type="ERROR" message={serverError} />}
    </div>
  );
}

export default EditReplayContent;
