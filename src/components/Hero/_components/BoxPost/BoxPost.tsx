"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Icons from "./_components/Icons";
import ButtonPost from "./_components/ButtonPost";
import TopBoxPost from "./_components/TopBoxPost";
import { CreatePostAction } from "@/lib/actions/CreateActions/CreatePostAction";
import toast from "react-hot-toast";
import { uploadMedia } from "@/lib/uploadMedia";
import PostContentInput from "./_components/PostContentInput";
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
  const handleCreatePost = async () => {
    try {
      setLoading(true);
      let media:
        | { error: string }
        | { url: string; type: "image" | "video" }
        | null = null;
      if (mediaFile) {
        media = await uploadMedia(mediaFile, "posts-media");
      }
      if (media && "error" in media && !contentTxt)
        return toast.error(media.error, { className: "toast-font" });
      if (media && "error" in media && contentTxt && mediaFile)
        toast.error("Failed upload image, check your internet");
      const result = await CreatePostAction({
        contentTxt,
        mediaUrl: media ? ("error" in media ? "" : media.url) : "",
        mediaType: media ? ("error" in media ? "" : media.type) : "",
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
          <PostContentInput
            mediaUrl={mediaUrl}
            setMediaUrl={setMediaUrl}
            contentTxt={contentTxt}
            textareaRef={textareaRef}
            setContentTxt={setContentTxt}
            isVideo={isVideo}
          />

          <div className="flex items-center justify-between border-t pt-2 border-t-gray-200">
            <Icons setMediaUrl={setMediaUrl} setMediaFile={setMediaFile} />
            <ButtonPost
              loading={loading}
              handleClick={handleCreatePost}
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
