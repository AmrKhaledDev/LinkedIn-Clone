import React, { SetStateAction } from "react";
import { IoCloseOutline } from "react-icons/io5";
// ==========================================================================
function TopBox({
  setShowBoxEdit,
}: {
  setShowBoxEdit: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center justify-between border-b border-b-gray-200 px-5 py-2">
      <h2 className="text-xl font-semibold">Edit intro</h2>
      <button
        onClick={() => setShowBoxEdit(false)}
        className="text-3xl cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-css"
      >
        <IoCloseOutline />
      </button>
    </div>
  );
}

export default TopBox;
