"use client";
import { useState } from "react";
import JoinWithAuthO from "./JoinWithAuthO";
import { RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { RegisterAction } from "@/lib/actions/AuthActions/RegisterAction";
import { useRouter } from "next/navigation";
import ButtonSubmit from "@/components/ButtonSubmit/ButtonSubmit";
import Or from "@/components/Or/Or";
import { RegisterPageErrors } from "@/lib/types/types";
import FormField from "@/components/FormField/FormField";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
// ============================================================
function FormRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterPageErrors>({});
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setServerError("");
      setServerSuccess("");
      setErrors({});
      setLoading(true);
      const validation = RegisterSchema.safeParse({
        name,
        email,
        password,
      });
      if (!validation.success) {
        const newError: RegisterPageErrors = {};
        validation.error.issues.forEach((error) => {
          if (error.path[0] === "name") newError.name = error.message;
          if (error.path[0] === "email") newError.email = error.message;
          if (error.path[0] === "password") newError.password = error.message;
        });
        setErrors(newError);
        return;
      }
      const result = await RegisterAction({
        name,
        password,
        email,
      });
      if (!result.success) {
        setServerError(result.message);
        return;
      }
      setServerSuccess(result.message);
      setServerError("");
      setErrors({});
      setName("");
      setEmail("");
      setPassword("");
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
      onSubmit={handleSubmit}
      className="bg-white px-6 py-10 rounded-xl flex flex-col gap-3 sm:w-112.5 w-full shadow"
    >
      {serverError && !serverSuccess && (
        <AlertMessage type="ERROR" message={serverError} />
      )}
      {serverSuccess && !serverError && (
        <AlertMessage type="SUCCESS" message={serverSuccess} />
      )}
      <FormField
        id="name"
        label="Name"
        setState={setName}
        type="text"
        placeholder="Enter your name"
        error={errors.name}
        disabled={loading}
        value={name}
      />
      <FormField
        id="email"
        label="Email"
        setState={setEmail}
        type="email"
        placeholder="Enter your email"
        error={errors.email}
        disabled={loading}
        value={email}
      />
      <FormField
        id="password"
        label="Password"
        setState={setPassword}
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        error={errors.password}
        disabled={loading}
        value={password}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
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
