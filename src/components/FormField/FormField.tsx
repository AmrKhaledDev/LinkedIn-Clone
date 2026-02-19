import { FormFieldType } from "@/lib/types/types";
import AlertMessage from "../AlertMessage/AlertMessage";
import ButtonShowPassword from "../ButtonShowPassword/ButtonShowPassword";
// =====================================================================================
function FormField({
  id,
  label,
  disabled,
  value,
  setState,
  error,
  placeholder,
  type,
  showPassword,
  setShowPassword,
}: FormFieldType) {
  return (
    <div className="flex flex-col gap-1">
      <label className="w-fit" htmlFor={id}>{label}</label>
      <div className="flex flex-col relative">
        <input
          disabled={disabled}
          value={value}
          type={type}
          id={id}
          onChange={(e) => setState(e.target.value)}
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

export default FormField;
