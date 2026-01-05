"use client";
import Image from "next/image";
import { FaRegBookmark } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

// ============================================================
interface EditPostProps {
  postId: string; 
}

function EditPost({ postId }: EditPostProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  
  const toggle = () => {
    setOpenId((prev) => (prev === postId ? null : postId));
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest(`#edit-post-${postId}`) && openId === postId) {
        setOpenId(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openId, postId]);

  const isOpen = openId === postId;

  return (
    <div id={`edit-post-${postId}`} className="py-2 mx-3 flex items-center justify-end relative">
      <div className="w-fit relative">
        <div>
          <Image
            onClick={toggle}
            src={"/ellipsis.svg"}
            alt="Icon"
            width={30}
            height={30}
            className="cursor-pointer button hover:bg-gray-100 rounded-full p-1 transition-css"
          />
        </div>
        {isOpen && (
          <div className="shadow div z-20 bg-white border border-gray-200 rounded-xl absolute right-0 w-60 p-3 flex flex-col gap-3">
            <button className="flex items-center gap-3 cursor-pointer py-2 px-4 rounded hover:bg-gray-100 text-[14px] font-semibold">
              <i className="text-[18px]">
                <FaRegBookmark />
              </i>
              Save
            </button>
            <button className="flex items-center gap-3 cursor-pointer py-2 px-4 rounded hover:bg-gray-100 text-[14px] font-semibold">
              <i className="text-[18px]">
                <RiDeleteBin4Line />
              </i>
              Delete
            </button>
            <button className="flex items-center gap-3 cursor-pointer py-2 px-4 rounded hover:bg-gray-100 text-[14px] font-semibold">
              <i className="text-[20px]">
                <BiEditAlt />
              </i>
              Edit
            </button>
            <button className="flex items-center gap-3 cursor-pointer py-2 px-4 rounded hover:bg-gray-100 text-[14px] font-semibold">
              <i className="text-[21px]">
                <IoCloseCircleOutline />
              </i>
              Unfollow Amr Khaled
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditPost;
