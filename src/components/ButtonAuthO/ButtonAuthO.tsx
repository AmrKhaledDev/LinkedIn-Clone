"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
// ====================================================================
function ButtonAuthO() {
  const [loading, setLoading] = useState(false);
  const signinWithAuthO = async (typeSignin: "google") => {
    setLoading(true);
    await signIn(typeSignin, {
      callbackUrl: "/linkedin",
    });
    setLoading(false);
  };
  return (
    <button
      disabled={loading}
      type="button"
      onClick={() => signinWithAuthO("google")}
      className="flex disabled:bg-gray-200 disabled:py-2.5 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-default sm:text-[15px] w-full text-[14px] items-center justify-center gap-3 border border-blackLight py-1.5 rounded-full cursor-pointer bg-gray-50 hover:bg-gray-100 text-slate-700"
    >
      {!loading && (
        <Image
          src={"/google.svg"}
          alt="Google Logo"
          width={100}
          height={100}
          className="sm:w-7.5 w-6.5"
        />
      )}
      {loading ? "Signing in with Google . . ." : "Sign in with Google"}
    </button>
  );
}

export default ButtonAuthO;
