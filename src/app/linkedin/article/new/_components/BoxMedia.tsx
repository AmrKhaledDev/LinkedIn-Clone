"use client";
import Image from "next/image";
import UploadMedia from "./UploadMedia";
import { ChangeEvent, useContext } from "react";
import { ContextStates } from "@/context/Context";
import { MdCameraswitch } from "react-icons/md";
import { MdDelete } from "react-icons/md";
// =================================================================
function BoxMedia() {
  const context = useContext(ContextStates);
  if (!context) return null;
  const {
    mediaArticle,
    mediaArticleFile,
    setMediaArticle,
    setMediaArticleFile,
  } = context;
  const isVideo = mediaArticleFile?.type.startsWith("video");
  const handleChangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaArticle(url);
      setMediaArticleFile(file);
    }
  };
  const handleDeleteMedia = () => {
    setMediaArticle(null);
    setMediaArticleFile(null);
  };
  return (
    <div className="rounded overflow-hidden w-full">
      {mediaArticle ? (
        <div className="relative">
          {isVideo ? (
            <video src={mediaArticle} controls />
          ) : (
            <Image
              src={mediaArticle}
              alt="Photo"
              width={800}
              height={800}
              className="w-full h-150 object-cover shrink-0"
            />
          )}
          <div className="absolute top-5 right-5 flex items-center gap-3">
            <label
              htmlFor="change-media"
              className="p-2 rounded-full bg-white shadow cursor-pointer text-2xl text-green-500 hover:scale-105 transition-css"
            >
              <MdCameraswitch />
            </label>
            <input
              onChange={handleChangeMedia}
              type="file"
              id="change-media"
              hidden
              className="hidden"
            />
            <button onClick={handleDeleteMedia} className="p-2 rounded-full bg-white shadow cursor-pointer text-2xl text-red-500 hover:scale-105 transition-css">
              <MdDelete />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#F4F2EE] flex items-center justify-center py-25  flex-col w-full gap-5 border border-gray-300">
          <Image
            src={"/image.svg"}
            alt="Image Icon"
            width={100}
            height={100}
            className="md:w-20 w-15"
          />
          <p className="md:text-[14px] text-[13px] text-slate-500 text-center">
            Add a cover image or video to your article
          </p>
          <UploadMedia />
        </div>
      )}
    </div>
  );
}

export default BoxMedia;
