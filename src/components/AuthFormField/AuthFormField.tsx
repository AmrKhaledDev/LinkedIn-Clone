import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import AlertMessage from "../AlertMessage/AlertMessage";
import ButtonShowPassword from "../ButtonShowPassword/ButtonShowPassword";
import { Dispatch, SetStateAction } from "react";
// =====================================================================================
function AuthFormField<T extends FieldValues>({
  id,
  label,
  disabled,
  error,
  placeholder,
  type,
  showPassword,
  setShowPassword,
  register,
}: {
  id: Path<T>;
  label: string;
  disabled: boolean;
  error?: string;
  placeholder: string;
  type: string;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<T>;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="w-fit" htmlFor={id}>
        {label}
      </label>
      <div className="flex flex-col relative">
        <input
          disabled={disabled}
          type={type}
          id={id}
          {...register(id)}
          className={`border border-gray-500 focus:outline-primary py-4 px-3 rounded disabled:border-gray-200 cursor-pointer transition-css ${
            error && "border-red-500 border-2"
          }`}
          placeholder={placeholder}
        />
        {setShowPassword && (
          <ButtonShowPassword
            showPassword={showPassword || false}
            setShowPassword={setShowPassword}
          />
        )}
      </div>
      {error && <AlertMessage message={error} type="ERROR" />}
    </div>
  );
}

export default AuthFormField;
