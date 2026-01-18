"use client";
import { Dispatch, SetStateAction } from "react";
import { IoCloseOutline } from "react-icons/io5";
// =============================================================================
function TopBox({
  type,
  setShowAddMediaBox,
}: {
  type: "image" | "video";
  setShowAddMediaBox: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center justify-between py-3 px-5 border-b border-b-gray-200">
      <h2 className="font-bold sm:text-xl text-[18px]">
        {type == "image" ? "Image" : "Video"}
      </h2>
      <button
        onClick={() => setShowAddMediaBox(false)}
        className="sm:text-3xl text-2xl cursor-pointer bg-gray-100 p-1 rounded-full"
      >
        <IoCloseOutline />
      </button>
    </div>
  );
}

export default TopBox;
