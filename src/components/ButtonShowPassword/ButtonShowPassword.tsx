"use client";
import React from "react";
// ========================================================================
function ButtonShowPassword({
  showPassword,
  setShowPassword,
}: {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      aria-label={showPassword ? "Hide password" : "Show password"}
      onClick={() => setShowPassword(!showPassword)}
      type="button"
      className="absolute right-2 top-1/2 py-1 px-2 border-2 border-transparent active:border-primary  rounded-full bg-white text-primary text-[14px] hover:bg-blue-100 transition-css cursor-pointer -translate-y-1/2"
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  );
}

export default ButtonShowPassword;
