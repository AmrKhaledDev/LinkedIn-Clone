"use client";
import { PostType } from "@/lib/types/types";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { IoCameraReverse } from "react-icons/io5";
import { RiDeleteBin7Fill } from "react-icons/ri";

// =======================================================================
function Content({
  content,
  mediaFile,
  post,
  media,
  setMedia,
  setMediaFile,
  setContent,
}: {
  content: string;
  mediaFile: File | null;
  post: PostType;
  media: string;
  setMedia: Dispatch<SetStateAction<string>>;
  setMediaFile: Dispatch<SetStateAction<File | null>>;
  setContent: Dispatch<SetStateAction<string>>;
}) {
  const handleChangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMedia(url);
      setMediaFile(file);
    }
  };
  const showImage =
    (mediaFile && mediaFile.type.startsWith("image")) ||
    (!mediaFile && !!post.image);
  const showVideo =
    (mediaFile && mediaFile.type.startsWith("video")) ||
    (!mediaFile && !!post.video);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className={`p-3 overflow-y-auto ${
        showImage || showVideo ? "sm:h-90 h-100 " : "h-fit"
      }`}
    >
      <textarea
        ref={textareaRef}
        defaultValue={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="what do you want to talk about?"
        className="rounded p-2 md:min-h-50 sm:min-h-40 max-h-50 w-full outline-none resize-none md:text-xl sm:text-[17px]"
      />
      {(showImage || showVideo) && (
        <div className="relative">
          {showImage && (
            <Image
              src={media || post.image || ""}
              alt="Post Image"
              width={900}
              height={900}
              className="w-full max-h-full object-cover rounded"
            />
          )}
          {showVideo && (
            <video
              src={media || post.video || ""}
              controls
              className="w-full max-h-full object-cover rounded"
            />
          )}
          <div className="absolute top-3 right-3 flex items-center gap-3">
            <label
              htmlFor="media"
              className="bg-white shadow rounded-full p-2 text-primary cursor-pointer text-xl hover:scale-105"
            >
              <IoCameraReverse />
            </label>
            <input
              onChange={handleChangeMedia}
              type="file"
              id="media"
              hidden
              className="hidden"
              accept="image/*,video/*,.mkv"
            />
            <button className="bg-white shadow rounded-full p-2 text-red-500  cursor-pointer text-xl hover:scale-105">
              <RiDeleteBin7Fill />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
