"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import ButtonsAction from "./_components/ButtonsAction";
import { User } from "@prisma/client";
import { ContextStates } from "@/context/Context";
// =====================================================================================
function EditBigImage({ user }: { user: User }) {
  const [showBoxEdit, setShowBoxEdit] = useState(false);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest(".div, .button, .box"))
        return setShowBoxEdit(false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      removeEventListener("click", handleClick);
    };
  });
  const context = useContext(ContextStates);
  if (!context) return null;
  const { bigImage } = context;
  return (
    <div>
      <button
        onClick={() => setShowBoxEdit(true)}
        className="absolute button md:top-5 md:right-5 sm:top-3 sm:right-3 top-1 right-1 md:text-xl sm:text-[15px] text-sm text-primary md:p-2 p-1.5 rounded-full bg-white cursor-pointer hover:scale-105"
      >
        <RiPencilFill />
      </button>
      <div
        className={`w-full fixed min-h-screen bg-black/45 backdrop-blur inset-0 z-40 items-center justify-center ${
          showBoxEdit ? "flex" : "hidden"
        }`}
      >
        <div className="md:w-175 sm:w-137.5 w-full div h-fit overflow-y-auto shadow rounded bg-white space-y-3">
          <div className="flex items-center justify-between border-b border-b-gray-200 px-5 py-2">
            <h2 className="sm:text-xl font-semibold">Cover image</h2>
            <button
              onClick={() => setShowBoxEdit(false)}
              className="sm:text-3xl text-2xl cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-css"
            >
              <IoCloseOutline />
            </button>
          </div>
          <div className="bg-black sm:h-100 h-70 flex items-center justify-center">
            <Image
              src={bigImage || user.imageProfile || "/card-bg.svg"}
              alt="Image Profile"
              width={800}
              height={800}
              className="w-full sm:max-h-70 max-h-50 object-cover border border-white"
            />
          </div>
          <ButtonsAction user={user} setShowBoxEdit={setShowBoxEdit} />
        </div>
      </div>
    </div>
  );
}

export default EditBigImage;
