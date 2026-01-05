"use client";
import { AiOutlineClose } from "react-icons/ai";
// ===========================================
function TopBoxPost({
  setShowBoxPost,
}: {
  setShowBoxPost: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex md:p-5 sm:p-3 p-2  items-center justify-between w-full border-b border-b-gray-100">
      <h2 className="md:text-xl sm:text-[16px] cursor-default text-blackLight">Create a post</h2>
      <i
        onClick={() => setShowBoxPost(false)}
        className="sm:text-xl cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-css"
      >
        <AiOutlineClose />
      </i>
    </div>
  );
}

export default TopBoxPost;
