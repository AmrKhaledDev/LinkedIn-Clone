"use client";

import { ForgotPasswordAction } from "@/lib/actions/ForgotPasswordAction/ForgotPasswordAction";
import Link from "next/link";
import { useRef, useState } from "react";
// =================================================================
function FormForgotPassword() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState("");
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handle = async () => {
    setServerSuccess("");
    setServerError("");
    try {
      if (email.trim().length < 1) {
        setServerError("Please enter your email ");
        if (inputRef.current) inputRef.current.focus();
        return;
      }
      setLoading(true);
      const result = await ForgotPasswordAction(email);
      if (!result.success) {
        setServerError(result.message);
        if (inputRef.current) inputRef.current.focus();
        return;
      }
      setServerError("");
      setEmail("");
      setServerSuccess(result.message);
    } catch (error) {
      console.log(error);
      return setServerError(
        "Verification link failed to send. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="p-6 rounded-[7px] shadow-gray-300 bg-white shadow-[0_2px_10px_gray] space-y-8 w-110">
      <h2 className="text-[32px] font-extrabold">Forgot password</h2>
      <div className="space-y-2">
        <input
          ref={inputRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border  transition-css cursor-pointer hover:bg-gray-50  w-full py-3 px-3 rounded text-[18px] 
            ${serverError ? "border-red-500 outline-none border-2" : "border-gray-500 focus:outline focus:outline-primary"}`}
          type="email"
          placeholder="Email"
        />
        {serverError && (
          <p className="font-extrabold text-sm text-red-500">{serverError}</p>
        )}
        {serverSuccess && (
          <p className="font-extrabold text-sm text-green-500">
            {serverSuccess}
          </p>
        )}
      </div>
      <p className="text-sm pr-3">
        We’ll send a verification code to this email if it matches an existing
        LinkedIn account.
      </p>
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handle}
          disabled={loading}
          className="py-4 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 text-[17px] w-full transition-css hover:bg-hoverColor bg-primary text-white font-bold rounded-full"
        >
          {loading ? "Sending . . ." : " Send"}
        </button>
        <Link
          href={"/credential-login"}
          className="px-2 py-1 hover:underline hover:bg-gray-200 transition-css text-center block text-[17px] w-fit text-gray-600 font-bold rounded-full"
        >
          Back
        </Link>
      </div>
    </form>
  );
}

export default FormForgotPassword;
