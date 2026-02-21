"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonSubmit from "@/components/ButtonSubmit/ButtonSubmit";
import { LoginSchema } from "@/lib/schemas/LoginSchema";
import { LoginAction } from "@/lib/actions/AuthActions/LoginAction";
import ButtonAuthO from "@/components/ButtonAuthO/ButtonAuthO";
import Or from "@/components/Or/Or";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import FormField from "@/components/FormField/FormField";
import { LoginPageErrors } from "@/lib/types/types";
import Link from "next/link";
// ============================================================
function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginPageErrors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      setServerError("");
      setServerSuccess("");
      setErrors({});
      const validation = LoginSchema.safeParse({
        email,
        password,
      });
      if (!validation.success) {
        const newError: LoginPageErrors = {};
        validation.error.issues.forEach((error) => {
          if (error.path[0] === "email") newError.email = error.message;
          if (error.path[0] === "password") newError.password = error.message;
        });
        setErrors(newError);
        return;
      }
      const result = await LoginAction({
        password,
        email,
      });
      if (!result.success) {
        setServerError(result.message);
        return;
      }
      setServerSuccess(result.message);
      router.refresh();
      setServerError("");
      setErrors({});
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      return setServerError("Failed signin try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
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
      <FormField
        id="email"
        type="email"
        error={errors.email}
        label="Email"
        placeholder="Enter your email"
        setState={setEmail}
        disabled={loading}
        value={email}
      />
      {/* Password */}
      <FormField
        id="password"
        type={showPassword ? "text" : "password"}
        error={errors.password}
        label="Password"
        placeholder="Enter your password"
        setState={setPassword}
        disabled={loading}
        value={password}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <Link href={"/password/forgot-password"} className="w-fit font-bold text-primary py-1 px-2 rounded-full hover:bg-[#D0E8FF] hover:underline transition-css">
        Forgot password?
      </Link>
      <ButtonSubmit loading={loading} contentTxt="Sign in" />
    </form>
  );
}

export default FormLogin;
