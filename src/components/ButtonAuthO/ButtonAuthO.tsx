"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
// ====================================================================
function ButtonAuthO() {
  const signinWithAuthO = (typeSignin: "google") => {
    signIn(typeSignin, {
      callbackUrl: "/linkedin",
    });
  };
  return (
    <button
      type="button"
      onClick={() => signinWithAuthO("google")}
      className="flex sm:text-[15px] w-full text-[14px] items-center justify-center gap-3 border border-blackLight py-1.5 rounded-full cursor-pointer bg-gray-50 hover:bg-gray-100 text-slate-700"
    >
      <Image
        src={"/google.svg"}
        alt="Google Logo"
        width={100}
        height={100}
        className="sm:w-7.5 w-6.5"
      />
      Sign in with Google
    </button>
  );
}

export default ButtonAuthO;
