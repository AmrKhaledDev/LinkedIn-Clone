"use client";

import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { ForgotPasswordAction } from "@/lib/actions/PasswordActions/ForgotPasswordAction";
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
    <form className="p-6 rounded-[7px] shadow bg-white sm:space-y-8 space-y-6 sm:w-110 w-[95%]">
      <h2 className="sm:text-[32px] text-2xl font-extrabold">Forgot password</h2>
      <div className="space-y-2">
        <input
          ref={inputRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border focus:bg-white  transition-css cursor-pointer hover:bg-gray-50  w-full sm:py-3 py-2 px-3 rounded sm:text-[18px] 
            ${serverError ? "border-red-500 outline-none border-2" : "border-gray-500 focus:outline focus:outline-primary"}`}
          type="email"
          placeholder="Email"
        />
        {serverError && (
          <p className="font-extrabold sm:text-sm text-xs text-red-500">{serverError}</p>
        )}
        {serverSuccess && (
          <AlertMessage type="SUCCESS" message={serverSuccess} />
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
          className="sm:py-4 py-3 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 sm:text-[17px] w-full transition-css hover:bg-hoverColor bg-primary text-white font-bold rounded-full"
        >
          {loading ? "Sending . . ." : " Send"}
        </button>
        <Link
          href={"/credential-login"}
          className="px-2 py-1 hover:underline hover:bg-gray-200 transition-css text-center block sm:text-[17px] w-fit text-gray-600 font-bold rounded-full"
        >
          Back
        </Link>
      </div>
    </form>
  );
}

export default FormForgotPassword;
