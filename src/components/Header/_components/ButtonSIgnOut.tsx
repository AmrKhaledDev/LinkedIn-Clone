"use client";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
// ===========================================================
function ButtonSIgnOut() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    setLoading(true);
    await signOut();
    router.refresh();
    redirect("/login");
    setLoading(false);
  };
  return (
    <button
    disabled={loading}
      onClick={handleClick}
      className="p-4 disabled:text-gray-400 not-disabled:hover:underline disabled:cursor-default text-blackLight button cursor-pointer flex items-center gap-3 w-fit text-[14px] mx-auto hover:text-primary transition-css"
    >
      Sign Out
      <i>
        <FaSignOutAlt />
      </i>
    </button>
  );
}

export default ButtonSIgnOut;
