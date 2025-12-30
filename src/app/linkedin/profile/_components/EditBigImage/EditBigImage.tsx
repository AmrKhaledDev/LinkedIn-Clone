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
        className="absolute button top-5 right-5 text-xl text-primary p-2 rounded-full bg-white cursor-pointer hover:scale-105"
      >
        <RiPencilFill />
      </button>
      <div
        className={`w-full fixed min-h-screen bg-black/45 backdrop-blur inset-0 z-40 items-center justify-center ${
          showBoxEdit ? "flex" : "hidden"
        }`}
      >
        <div className="w-[40%] div h-fit overflow-y-auto shadow rounded bg-white space-y-3">
          <div className="flex items-center justify-between border-b border-b-gray-200 px-5 py-2">
            <h2 className="text-xl font-semibold">Cover image</h2>
            <button
              onClick={() => setShowBoxEdit(false)}
              className="text-3xl cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-css"
            >
              <IoCloseOutline />
            </button>
          </div>
          <div className="bg-black h-100 flex items-center justify-center">
            <Image
              src={bigImage || user.imageProfile || "/card-bg.svg"}
              alt="Image Profile"
              width={800}
              height={800}
              className="w-full max-h-70 object-cover border border-white"
            />
          </div>
          <ButtonsAction user={user} setShowBoxEdit={setShowBoxEdit} />
        </div>
      </div>
    </div>
  );
}

export default EditBigImage;
