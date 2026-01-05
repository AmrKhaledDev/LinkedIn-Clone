"use client";
import { useState } from "react";
import JoinWithAuthO from "./JoinWithAuthO";
import { RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { RegisterAction } from "@/lib/actions/RegisterAction";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import ButtonShowPassword from "@/components/ButtonShowPassword/ButtonShowPassword";
import ButtonSubmit from "@/components/ButtonSubmit/ButtonSubmit";
import { StatesRegister } from "@/lib/interfaces/interfaces";
import Or from "@/components/Or/Or";
import ServerErrorMessage from "@/components/ServerErrorMessage/ServerErrorMessage";
// ============================================================
function FormRegister() {
  const [states, setStates] = useState<StatesRegister>({
    name: "",
    email: "",
    password: "",
    errors: {},
    loading: false,
  });
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password } = states;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = RegisterSchema.safeParse({
      name,
      email,
      password,
    });
    if (!validation.success) {
      const newError: {
        name?: string;
        email?: string;
        password?: string;
      } = {};
      validation.error.issues.forEach((error) => {
        if (error.path[0] === "name") newError.name = error.message;
        if (error.path[0] === "email") newError.email = error.message;
        if (error.path[0] === "password") newError.password = error.message;
      });
      setStates((prev) => ({ ...prev, errors: newError }));
      return;
    }
    setStates((prev) => ({ ...prev, loading: true }));
    const result = await RegisterAction({
      name,
      password,
      email,
    });
    setStates((prev) => ({ ...prev, loading: false }));
    if (result?.error) {
      setServerError(result.error);
      setStates((prev) => ({
        ...prev,
        errors: {
          name: "",
          email: "",
          password: "",
        },
      }));
      return;
    }
    toast("Good jop", {
      icon: "👏",
    });
    router.refresh();
    setStates((prev) => ({
      ...prev,
      errors: {
        name: "",
        email: "",
        password: "",
      },
      name: "",
      email: "",
      password: "",
    }));
    setServerError("");
    redirect("/linkedin");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-6 py-10 rounded-xl flex flex-col gap-3 sm:w-112.5 w-full shadow"
    >
      <div className="flex flex-col gap-1">
        {/* Name */}
        <label htmlFor="name">Name</label>
        <input
          disabled={states.loading}
          value={states.name}
          type="text"
          id="name"
          onChange={(e) =>
            setStates((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Enter your name"
          className={`border border-black py-4 px-3 rounded disabled:border-gray-200 ${
            states.errors.name && "border-red-500 border-2" 
          }`}
        />
        {states.errors.name && (
          <ServerErrorMessage message={states.errors.name} />
        )}
      </div>
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
              states.errors.password && "border-re border-2d-500"
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
      <ButtonSubmit loading={states.loading} contentTxt="Join" />
      {!states.loading && (
        <>
          <Or />
          <JoinWithAuthO />
        </>
      )}
    </form>
  );
}

export default FormRegister;
