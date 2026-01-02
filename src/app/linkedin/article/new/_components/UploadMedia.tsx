"use client";
import { ContextStates } from "@/context/Context";
import { ChangeEvent, useContext } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
// ==============================================================
function UploadMedia() {
  const context = useContext(ContextStates);
  if (!context) return null;
  const { setMediaArticle, setMediaArticleFile } = context;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaArticle(url);
      setMediaArticleFile(file);
    }
  };
  return (
    <div>
      <label
        htmlFor="media"
        className="flex items-center md:text-[15px] text-[14px] gap-1 border border-black rounded-full cursor-pointer font-semibold py-1.5 px-4"
      >
        <i className="text-xl">
          <MdOutlineFileUpload />
        </i>
        Upload from computer
      </label>
      <input
        onChange={handleChange}
        type="file"
        hidden
        id="media"
        accept="image/*,video/*,.mkv"
      />
    </div>
  );
}

export default UploadMedia;
