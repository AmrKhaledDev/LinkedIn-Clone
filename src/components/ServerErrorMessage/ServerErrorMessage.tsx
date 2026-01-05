"use client";

import { IoWarning } from "react-icons/io5";
// ===================================================================
function ServerErrorMessage({ message }: { message: string }) {
  return (
    <p className="bg-red-500 py-1 px-2 rounded flex items-center gap-2 font-semibold sm:text-[13px] text-[12px] mt-1 text-white">
      <i className="text-xl sm:block hidden">
        <IoWarning />
      </i>
      {message}
    </p>
  );
}

export default ServerErrorMessage;
