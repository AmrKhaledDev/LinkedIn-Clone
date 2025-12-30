import React from "react";
import { FaRegImage } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
// =======================================================================
function Icons({
  setMediaUrl,
  setMediaFile,
}: {
  setMediaUrl: React.Dispatch<React.SetStateAction<string>>;
  setMediaFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
      setMediaFile(file);
    }
  };
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-3  py-2 pr-3">
        <div>
          <label
            className="text-[28px] text-gray-500 cursor-pointer hover:text-primary transition-css"
            htmlFor="image-post"
          >
            <FaRegImage className=" hover:scale-105" />
          </label>
          <input
            accept="image/*"
            onChange={handle}
            type="file"
            id="image-post"
            hidden
          />
        </div>
        <div>
          <label
            className="text-[28px] text-gray-500 cursor-pointer hover:text-primary transition-css"
            htmlFor="video-post"
          >
            <IoLogoYoutube className=" hover:scale-105" />
          </label>
          <input
            type="file"
            accept="video/*,.mkv"
            id="video-post"
            hidden
            onChange={handle}
          />
        </div>
      </div>
    </div>
  );
}

export default Icons;
