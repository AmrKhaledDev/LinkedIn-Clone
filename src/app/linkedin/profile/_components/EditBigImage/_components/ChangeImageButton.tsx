"use client";
import { ContextStates } from "@/context/Context";
import { ChangeEvent, useContext } from "react";
// ==============================================================================
function ChangeImageButton() {
  const context = useContext(ContextStates);
  if (!context) return null;
  const { setBigImage, setBigImageFile } = context;
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBigImage(url);
      setBigImageFile(file);
    }
  };
  return (
    <div>
      <label
        className="border border-primary py-1.5 px-4 hover:bg-blue-50 text-primary rounded-full cursor-pointer font-semibold"
        htmlFor="photo"
      >
        Change photo
      </label>
      <input
        onChange={handleChangeImage}
        type="file"
        accept="image/*"
        id="photo"
        hidden
      />
    </div>
  );
}

export default ChangeImageButton;
