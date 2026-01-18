"use client";
import { HiPencil } from "react-icons/hi2";
import Form from "./_components/Form";
import { useEffect, useState } from "react";
import { UserWithRelationType } from "@/lib/types/types";
// =====================================================================================
function EditProfileBox({ user }: { user: UserWithRelationType }) {
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
  return (
    <div>
      <button
        onClick={() => setShowBoxEdit(true)}
        className="absolute button md:right-2 md:top-2 right-1 top-1 md:text-xl sm:text-[15px] text-sm  text-blackLight p-2 rounded-full hover:bg-gray-100 hover:text-black cursor-pointer transition-css"
      >
        <HiPencil />
      </button>
      <div
        className={`w-full fixed min-h-screen overflow-y-hidden bg-black/45 backdrop-blur inset-0 z-40 items-center justify-center ${
          showBoxEdit ? "flex" : "hidden"
        }`}
      >
        <div className="lg:w-[50%] md:w-[70%] sm:w-[85%] w-[98%] h-fit div overflow-y-auto shadow rounded space-y-6">
          <Form user={user} setShowBoxEdit={setShowBoxEdit}/>
        </div>
      </div>
    </div>
  );
}

export default EditProfileBox;
