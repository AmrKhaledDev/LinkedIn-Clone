"use client";

import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { Dispatch, SetStateAction } from "react";
// =====================================================================================
function FormFieldResetPassword({
  type,
  placeholder,
  error,
  setState,
  value,
}: {
  type: "password" | "email";
  placeholder: string;
  error?: string;
  setState: Dispatch<SetStateAction<string>>;
  value: string;
}) {
  return (
    <div>
      <input
        onChange={(e) => setState(e.target.value)}
        value={value}
        className={`border focus:bg-white transition-css cursor-pointer hover:bg-gray-50  w-full sm:py-3 py-2 px-3 rounded sm:text-[18px] 
            ${error ? "border-red-500 outline-none border-2" : "border-gray-500 focus:outline focus:outline-primary"}`}
        type={type}
        placeholder={placeholder}
      />
      {error && <AlertMessage type="ERROR" message={error} />}
    </div>
  );
}

export default FormFieldResetPassword;
