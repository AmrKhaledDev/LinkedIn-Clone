"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonSubmit from "@/components/ButtonSubmit/ButtonSubmit";
import { LoginSchema } from "@/lib/schemas/LoginSchema";
import { LoginAction } from "@/lib/actions/AuthActions/LoginAction";
import ButtonAuthO from "@/components/ButtonAuthO/ButtonAuthO";
import Or from "@/components/Or/Or";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthFormField from "@/components/AuthFormField/AuthFormField";
// ============================================================
function FormLogin() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      setServerError("");
      setServerSuccess("");
      const result = await LoginAction(data);
      if (!result.success) return setServerError(result.message);
      setServerSuccess(result.message);
      reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      return setServerError("Failed signin try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="bg-white shadow-xl px-6 py-10 rounded-xl flex flex-col gap-3 sm:w-100 w-full "
    >
      <h1 className="font-semibold text-3xl mb-3">Sign in</h1>
      {!loading && (
        <>
          <div>
            <ButtonAuthO />
          </div>
          <Or />
        </>
      )}
      {serverSuccess && !serverError && (
        <AlertMessage type="SUCCESS" message={serverSuccess} />
      )}
      {serverError && !serverSuccess && (
        <AlertMessage message={serverError} type="ERROR" />
      )}
      {/* Email */}
      <AuthFormField
        id="email"
        type="email"
        error={errors.email?.message}
        label="Email"
        placeholder="Enter your email"
        disabled={loading}
        register={register}
      />
      {/* Password */}
      <AuthFormField
        id="password"
        type={showPassword ? "text" : "password"}
        error={errors.password?.message}
        label="Password"
        placeholder="Enter your password"
        disabled={loading}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        register={register}
      />
      <Link
        href={"/password/forgot-password"}
        className="w-fit font-bold text-primary py-1 px-2 rounded-full hover:bg-[#D0E8FF] hover:underline transition-css"
      >
        Forgot password?
      </Link>
      <ButtonSubmit loading={loading} contentTxt="Sign in" />
    </form>
  );
}

export default FormLogin;
