"use client";
import Image from "next/image";
import { ChangeEvent } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
// ===============================================================
function ShowMedia({
  mediaFile,
  media,
  handleAddMedia,
  handleDeleteMedia,
  type,
}: {
  mediaFile: File | null;
  media: string;
  handleAddMedia: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDeleteMedia: () => void;
  type: "image" | "video";
}) {
  const mediaIsVideo = mediaFile?.type.startsWith("video");
  return (
    <>
      {mediaIsVideo ? (
        <video
          src={media}
          controls
          className="rounded object-cover lg:max-w-197.5 md:max-w-172.5 max-w-full lg:max-h-120 max-h-100"
        />
      ) : (
        <Image
          src={media}
          width={700}
          height={700}
          alt="Media"
          className="rounded object-cover lg:max-w-197.5 md:max-w-172.5 max-w-full lg:max-h-120 max-h-100"
        />
      )}
      <div className="flex items-center gap-5 mt-5">
        <button
          onClick={handleDeleteMedia}
          className="cursor-pointer text-2xl text-gray-600 hover:bg-gray-200 rounded-full p-2 transition-css"
        >
          <MdDelete />
        </button>
        <label
          htmlFor="change-image"
          className="cursor-pointer text-2xl text-gray-600 hover:bg-gray-200 rounded-full p-2 transition-css"
        >
          <MdEdit />
        </label>
        <input
          onChange={handleAddMedia}
          type="file"
          id="change-image"
          hidden
          className="hidden"
          accept={type === "image" ? "image/*" : "video/*,.mkv"}
        />
      </div>
    </>
  );
}

export default ShowMedia;
