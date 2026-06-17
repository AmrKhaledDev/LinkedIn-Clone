"use client";
import Link from "next/link";
import { useState } from "react";
import FormFieldResetPassword from "./FormFieldResetPassword";
import { ResetPasswordSchema } from "@/lib/schemas/Password/ResetPasswordSchema";
import { ResetPasswordAction } from "@/lib/actions/PasswordActions/ResetPasswordAction";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// =================================================================
function FormResetPassword({
  verificationToken,
}: {
  verificationToken: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handleResetPassword = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);
      setServerError("");
      setServerSuccess("");
      const result = await ResetPasswordAction(data, verificationToken);
      if (!result.success) return setServerError(result.message);
      setServerSuccess(result.message);
      reset();
    } catch (error) {
      console.error("Reset password error:", error);
      setServerError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleResetPassword)}
      className="p-6 rounded-[7px] shadow bg-white sm:space-y-8 space-y-6 sm:w-110 w-[95%]"
    >
      <h2 className="sm:text-[32px] text-2xl font-extrabold">Reset password</h2>
      {serverError && <AlertMessage type="ERROR" message={serverError} />}
      {serverSuccess && <AlertMessage type="SUCCESS" message={serverSuccess} />}
      <div className="space-y-3">
        <FormFieldResetPassword
          type="password"
          placeholder="Enter new password"
          error={errors.newPassword?.message}
          id="newPassword"
          register={register}
        />
        <FormFieldResetPassword
          type="password"
          placeholder="Confirm password"
          error={errors.confirmPassword?.message}
          register={register}
          id="confirmPassword"
        />
      </div>
      <p className="text-sm pr-3">
        Verification successful. You can now set a new password for your
        account. Please choose a strong password to keep your account secure.
      </p>
      <div className="flex flex-col items-center gap-3">
        <button
          type="submit"
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
