"use client";
import { HiPencil } from "react-icons/hi2";
import Form from "./_components/Form";
import TopBox from "./_components/TopBox";
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
        className="absolute button right-6 top-6 text-xl text-blackLight p-2 rounded-full hover:bg-gray-100 hover:text-black cursor-pointer transition-css"
      >
        <HiPencil />
      </button>
      <div
        className={`w-full fixed min-h-screen bg-black/45 backdrop-blur inset-0 z-40 items-center justify-center ${
          showBoxEdit ? "flex" : "hidden"
        }`}
      >
        <div className="w-[40%] h-fit div overflow-y-auto shadow rounded bg-white space-y-6">
          <TopBox setShowBoxEdit={setShowBoxEdit} />
          <Form user={user} />
        </div>
      </div>
    </div>
  );
}

export default EditProfileBox;
