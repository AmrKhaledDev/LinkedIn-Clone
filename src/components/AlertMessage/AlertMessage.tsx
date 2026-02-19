"use client";

import { IoWarning } from "react-icons/io5";
import { MdOutlineError } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
// ===================================================================
function AlertMessage({
  message,
  type,
}: {
  message: string;
  type: "SUCCESS" | "WARN" | "ERROR";
}) {
  if (!type) return;
  return (
    <p
      className={`py-1 px-2 rounded flex items-center gap-1 font-semibold sm:text-[13px] text-[12px] mt-1 text-white
      ${type == "ERROR" && "bg-red-500"}
      ${type == "SUCCESS" && "bg-green-500"}

    `}
    >
      <i className=" sm:block hidden text-[16px]">
        {type == "ERROR" && <MdOutlineError />}
        {type == "SUCCESS" && <IoCheckmarkDoneCircle />}
        {type == "WARN" && <IoWarning />}
      </i>
      {message}
    </p>
  );
}

export default AlertMessage;
