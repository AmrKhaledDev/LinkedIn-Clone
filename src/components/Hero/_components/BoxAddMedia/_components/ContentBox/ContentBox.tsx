"use client";
import { ChangeEvent } from "react";
import ShowMedia from "./_components/ShowMedia";
import Image from "next/image";
// =======================================================================
function ContentBox({
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
  return (
    <div className="lg:h-[83%] h-[80%] bg-[#F8FAFD] w-full flex flex-col items-center justify-center gap-2">
      {media ? (
        <ShowMedia
        mediaFile={mediaFile}
          media={media}
          handleDeleteMedia={handleDeleteMedia}
          handleAddMedia={handleAddMedia}
          type={type}
        />
      ) : (
        <>
          <Image
            src={"/not-found-items-saved.svg"}
            alt="Photo"
            width={200}
            height={200}
            className="sm:w-40 w-35"
          />
          <h2 className="sm:text-2xl text-xl font-bold">
            Select files to begin
          </h2>
          <p className="sm:text-sm text-[12px] font-normal text-center text-gray-600">
            Share {type === "image" ? "images" : "a single video"} in your post
          </p>
          <label
            htmlFor="image"
            className="text-white bg-primary py-1.5 px-4 rounded-full cursor-pointer hover:bg-hoverColor font-semibold sm:text-sm text-[12px]"
          >
            Upload from computer
          </label>
          <input
            onChange={handleAddMedia}
            type="file"
            id="image"
            hidden
            className="hidden"
            accept={type === "image" ? "image/*" : "video/*,.mkv"}
          />
        </>
      )}
    </div>
  );
}

export default ContentBox;
