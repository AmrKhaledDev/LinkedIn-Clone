"use client";
import { useState } from "react";
import JoinWithAuthO from "./JoinWithAuthO";
import { RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { RegisterAction } from "@/lib/actions/AuthActions/RegisterAction";
import { useRouter } from "next/navigation";
import ButtonSubmit from "@/components/ButtonSubmit/ButtonSubmit";
import Or from "@/components/Or/Or";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthFormField from "@/components/AuthFormField/AuthFormField";
// ============================================================
function FormRegister() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setServerError("");
      setServerSuccess("");
      setLoading(true);
      const result = await RegisterAction(data);
      if (!result.success) return setServerError(result.message);
      setServerSuccess(result.message);
      reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      return setServerError("Failed join try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="bg-white px-6 py-10 rounded-xl flex flex-col gap-3 sm:w-112.5 w-full shadow"
    >
      {serverError && !serverSuccess && (
        <AlertMessage type="ERROR" message={serverError} />
      )}
      {serverSuccess && !serverError && (
        <AlertMessage type="SUCCESS" message={serverSuccess} />
      )}
      {/* Name */}
      <AuthFormField
        id="name"
        label="Name"
        type="text"
        placeholder="Enter your name"
        error={errors.name?.message}
        disabled={loading}
        register={register}
      />
      {/* Email */}
      <AuthFormField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        disabled={loading}
        register={register}
      />
      {/* Password */}
      <AuthFormField
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        error={errors.password?.message}
        disabled={loading}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        register={register}
      />
      <ButtonSubmit loading={loading} contentTxt="Join" />
      {!loading && (
        <>
          <Or />
          <JoinWithAuthO />
        </>
      )}
    </form>
  );
}

export default FormRegister;
