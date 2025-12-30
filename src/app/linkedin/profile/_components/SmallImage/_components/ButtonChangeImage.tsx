"use client";
import { ContextStates } from "@/context/Context";
import { ChangeEvent, useContext } from "react";
import { MdOutlineFlipCameraIos } from "react-icons/md";
// =====================================================
function ButtonChangeImage() {
  const context = useContext(ContextStates);
  if (!context) return null;
  const { setSmallImage, setSmallImageFile } = context;
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSmallImage(url);
      setSmallImageFile(file);
    }
  };
  return (
    <div>
      <label
        htmlFor="image"
        className="flex items-center gap-2 button group cursor-pointer py-2 px-3 rounded-xl hover:bg-gray-100 shadow hover:text-primary transition-css font-semibold"
      >
        <i className="p-2 rounded bg-blue-100 text-primary text-[20px] group-hover:bg-blue-500 group-hover:text-white transition-css">
          <MdOutlineFlipCameraIos />
        </i>
        Change photo
      </label>
      <input onChange={handleChangeImage} type="file" id="image" hidden  accept="image/*"/>
    </div>
  );
}

export default ButtonChangeImage;
