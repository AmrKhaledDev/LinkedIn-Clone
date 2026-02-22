"use client";
import Link from "next/link";
import { useState } from "react";
import FormFieldResetPassword from "./FormFieldResetPassword";
import { ResetPasswordErrors } from "@/lib/types/types";
import { ResetPasswordSchema } from "@/lib/schemas/Password/ResetPasswordSchema";
import { ResetPasswordAction } from "@/lib/actions/PasswordActions/ResetPasswordAction";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
// =================================================================
function FormResetPassword({
  verificationToken,
}: {
  verificationToken: string;
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const handle = async () => {
    try {
      setLoading(true);
      setServerError("");
      setServerSuccess("");
      setErrors({});
      const validation = ResetPasswordSchema.safeParse({
        verificationToken,
        newPassword,
        confirmPassword,
      });
      if (!validation.success) {
        const newError: ResetPasswordErrors = {};
        validation.error.issues.forEach((error) => {
          switch (error.path[0]) {
            case "newPassword":
              newError.newPassword = error.message;
              break;
            case "confirmPassword":
              newError.confirmPassword = error.message;
          }
        });
        setErrors(newError);
        return;
      }
      const result = await ResetPasswordAction({
        verificationToken,
        newPassword,
        confirmPassword,
      });
      if (!result.success) return setServerError(result.message);
      setNewPassword("");
      setConfirmPassword("");
      setServerError("");
      setServerSuccess(result.message);
      setErrors({});
    } catch (error) {
      console.error("Reset password error:", error);
      setServerError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="p-6 rounded-[7px] shadow bg-white sm:space-y-8 space-y-6 sm:w-110 w-[95%]">
      <h2 className="sm:text-[32px] text-2xl font-extrabold">Reset password</h2>
      {serverError && <AlertMessage type="ERROR" message={serverError} />}
      {serverSuccess && <AlertMessage type="SUCCESS" message={serverSuccess} />}
      <div className="space-y-3">
        <FormFieldResetPassword
          type="password"
          placeholder="Enter new password"
          setState={setNewPassword}
          value={newPassword}
          error={errors.newPassword}
        />
        <FormFieldResetPassword
          type="password"
          placeholder="Confirm password"
          setState={setConfirmPassword}
          value={confirmPassword}
          error={errors.confirmPassword}
        />
      </div>
      <p className="text-sm pr-3">
        Verification successful. You can now set a new password for your
        account. Please choose a strong password to keep your account secure.
      </p>
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={handle}
          type="button"
          disabled={loading}
          className="sm:py-4 py-3 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 sm:text-[17px] w-full transition-css hover:bg-hoverColor bg-primary text-white font-bold rounded-full"
        >
          {loading ? "Changing . . ." : "Change"}
        </button>
        <span className="w-full h-px bg-gray-200 opacity-50 block mt-3" />
        <div className="flex flex-col gap-2 items-center">
          <Link
            href={"/credential-login"}
            className="font-bold text-gray-500 hover:bg-gray-200 rounded-full py-1 px-3"
          >
            Sign in
          </Link>
          <Link href={"/register"} className="font-bold text-primary underline">
            Create account
          </Link>
        </div>
      </div>
    </form>
  );
}

export default FormResetPassword;
