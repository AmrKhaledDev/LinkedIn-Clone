"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { MdDelete } from "react-icons/md";
// ======================================================================
function PostContentInput({
  textareaRef,
  contentTxt,
  setContentTxt,
  mediaUrl,
  isVideo,
  setMediaUrl,
}: {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  contentTxt: string;
  setContentTxt: Dispatch<SetStateAction<string>>;
  mediaUrl: string;
  isVideo: boolean | undefined;
  setMediaUrl: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="h-105 overflow-y-auto">
      <textarea
        dir="auto"
        ref={textareaRef}
        value={contentTxt}
        onChange={(e) => setContentTxt(e.target.value)}
        placeholder="what do you want to talk about?"
        className="rounded p-2 md:min-h-40 sm:min-h-52 min-h-22 outline-none resize-none md:text-xl sm:text-[17px] w-full"
      />
      {mediaUrl && (
        <div className="relative div">
          {isVideo ? (
            <video controls src={mediaUrl} />
          ) : (
            <Image
              src={mediaUrl}
              alt="Post Image"
              width={500}
              height={500}
              className="w-full rounded object-cover max-h-full"
            />
          )}
          <button
            type="button"
            onClick={() => setMediaUrl("")}
            className="absolute top-3 right-3 cursor-pointer text-red-500 text-xl p-2 rounded-full bg-white shadow hover:scale-105 transition-css "
          >
            <MdDelete />
          </button>
        </div>
      )}
    </div>
  );
}

export default PostContentInput;
