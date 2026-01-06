"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import ButtonShowPassword from "@/components/ButtonShowPassword/ButtonShowPassword";
import ButtonSubmit from "@/components/ButtonSubmit/ButtonSubmit";
import { StatesLogin } from "@/lib/interfaces/interfaces";
import { LoginSchema } from "@/lib/schemas/LoginSchema";
import { LoginAction } from "@/lib/actions/AuthActions/LoginAction";
import ButtonAuthO from "@/components/ButtonAuthO/ButtonAuthO";
import Or from "@/components/Or/Or";
import ServerErrorMessage from "@/components/ServerErrorMessage/ServerErrorMessage";
// ============================================================
function FormLogin() {
  const [states, setStates] = useState<StatesLogin>({
    email: "",
    password: "",
    errors: {},
    loading: false,
  });
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = states;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = LoginSchema.safeParse({
      email,
      password,
    });
    if (!validation.success) {
      const newError: {
        email?: string;
        password?: string;
      } = {};
      validation.error.issues.forEach((error) => {
        if (error.path[0] === "email") newError.email = error.message;
        if (error.path[0] === "password") newError.password = error.message;
      });
      setStates((prev) => ({ ...prev, errors: newError }));
      return;
    }
    setStates((prev) => ({ ...prev, loading: true }));
    const result = await LoginAction({
      password,
      email,
    });
    setStates((prev) => ({ ...prev, loading: false }));
    if (result?.error) {
      setServerError(result.error);
      setStates((prev) => ({
        ...prev,
        errors: {
          email: "",
          password: "",
        },
      }));
      return;
    }
    toast("Welcome back", {
      icon: "👏",
      className: "toast-font",
    });
    router.refresh();
    setStates((prev) => ({
      loading: false,
      errors: {
        email: "",
        password: "",
      },
      email: "",
      password: "",
    }));
    setServerError("");
    redirect("/linkedin");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl px-6 py-10 rounded-xl flex flex-col gap-3 sm:w-100 w-full "
    >
      <h1 className="font-semibold text-3xl mb-3">Sign in</h1>
      {!states.loading && (
        <>
          <div>
            <ButtonAuthO />
          </div>
          <Or />
        </>
      )}
      {/* Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          disabled={states.loading}
          value={states.email}
          type="email"
          id="email"
          onChange={(e) =>
            setStates((prev) => ({ ...prev, email: e.target.value }))
          }
          className={`border border-black py-4 px-3 rounded disabled:border-gray-200 ${
            states.errors.email && "border-red-500 border-2"
          }`}
          placeholder="Enter your email"
        />
        {states.errors.email && (
          <ServerErrorMessage message={states.errors.email} />
        )}
      </div>
      {/* Password */}
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <div className="flex flex-col relative">
          <input
            disabled={states.loading}
            value={states.password}
            type={showPassword ? "text" : "password"}
            id="password"
            onChange={(e) =>
              setStates((prev) => ({ ...prev, password: e.target.value }))
            }
            className={`border border-black py-4 px-3 rounded disabled:border-gray-200 ${
              states.errors.password && "border-red-500 border-2"
            }`}
            placeholder="Enter your password"
          />
          <ButtonShowPassword
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>
        {states.errors.password && (
          <ServerErrorMessage message={states.errors.password} />
        )}
      </div>
      {serverError && <ServerErrorMessage message={serverError} />}
      <ButtonSubmit loading={states.loading} contentTxt="Sign in" />
    </form>
  );
}

export default FormLogin;
