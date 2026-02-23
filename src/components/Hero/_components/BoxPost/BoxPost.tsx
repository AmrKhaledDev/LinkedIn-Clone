"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Icons from "./_components/Icons";
import ButtonPost from "./_components/ButtonPost";
import TopBoxPost from "./_components/TopBoxPost";
import { CreatePostAction } from "@/lib/actions/CreateActions/CreatePostAction";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
// ======================================================
function BoxPost({
  showBoxPost,
  setShowBoxPost,
  user,
}: {
  showBoxPost: boolean;
  setShowBoxPost: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest(".div, .button, .box"))
        return setShowBoxPost(false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      removeEventListener("click", handleClick);
    };
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [contentTxt, setContentTxt] = useState("");
  const [loading, setLoading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const handleClick = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (mediaFile) formData.append("file", mediaFile);
      formData.append("pathname", "posts-media");
      const res = await fetch(`/api/upload-media`, {
        method: "POST",
        body: formData,
      });
      const media = (await res.json()) as
        | { error: string }
        | {
            url: string;
            type: "video" | "image";
          };
      if ("error" in media && !contentTxt)
        return toast.error(media.error, { className: "toast-font" });
      if ("error" in media && contentTxt && mediaFile)
        toast.error("Failed upload image, check your internet");
      const result = await CreatePostAction({
        contentTxt,
        mediaUrl: "error" in media ? "" : media.url,
        mediaType: "error" in media ? "" : media.type,
        userId: user.id,
      });
      if (result?.error)
        return toast.error(result.error, {
          className: "toast-font",
        });
      setContentTxt("");
      setMediaFile(null);
      setMediaUrl("");
      setShowBoxPost(false);
    } catch (error) {
      console.log(error);
      return { error: "Failed fetch" };
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    textareaRef.current!.focus();
  }, [showBoxPost]);
  const isVideo = mediaFile?.type.startsWith("video");
  return (
    <div
      className={`w-full min-h-screen bg-black/45 backdrop-blur inset-0 flex items-center justify-center z-50 ${
        showBoxPost ? "fixed" : "hidden"
      }`}
    >
      <div className="shadow bg-white rounded w-190 div">
        <TopBoxPost setShowBoxPost={setShowBoxPost} />
        <div className="md:p-5 sm:p-3 p-2 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Image
              src={user.image ? user.image : "/user.svg"}
              alt="your photo"
              width={100}
              height={100}
              className="rounded-full md:w-15 md:h-15 w-12 h-12 shrink-0 object-cover border-2 border-gray-200"
            />
            <div className="flex flex-col ">
              <h2 className="md:text-xl sm:text-[17px] font-semibold capitalize">
                {user.name}
              </h2>
              <h3 className="text-gray-400 sm:text-[14px] text-[13px] font-semibold">
                {user.email}
              </h3>
            </div>
          </div>
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
          <div className="flex items-center justify-between border-t pt-2 border-t-gray-200">
            <Icons setMediaUrl={setMediaUrl} setMediaFile={setMediaFile} />
            <ButtonPost
              loading={loading}
              handleClick={handleClick}
              contentTxt={contentTxt}
              mediaUrl={mediaUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxPost;
