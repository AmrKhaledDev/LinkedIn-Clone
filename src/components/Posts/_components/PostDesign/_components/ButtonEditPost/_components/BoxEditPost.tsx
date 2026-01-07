"use client";

import { EditPostAction } from "@/lib/actions/EditActions/EditPostAction";
import { PostType } from "@/lib/types/types";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaRegImage } from "react-icons/fa";
import { IoCameraReverse, IoClose, IoLogoYoutube } from "react-icons/io5";
import { RiDeleteBin7Fill } from "react-icons/ri";
// =========================================================================
function BoxEditPost({
  user,
  post,
  editPost,
  setEditPost,
}: {
  user: User;
  post: PostType;
  editPost: boolean;
  setEditPost: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(post.contentText ?? "");
  const [media, setMedia] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const showImage =
    (mediaFile && mediaFile.type.startsWith("image")) ||
    (!mediaFile && !!post.image);
  const showVideo =
    (mediaFile && mediaFile.type.startsWith("video")) ||
    (!mediaFile && !!post.video);
  const router = useRouter();
  const handleChangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMedia(url);
      setMediaFile(file);
    }
  };
  const handleEditPost = async () => {
    if (content.trim().length < 1 && !media)
      return toast.error("You cannot leave the post blank", {
        className: "toast-font",
      });
    try {
      const formData = new FormData();
      let image: { url: string; type: "video" | "image" } | null = null;
      setLoading(true);
      if (mediaFile) {
        formData.append("file", mediaFile);
        formData.append("pathname", "posts-images");
        setLoading(true);
        const url = await fetch("/api/upload-media", {
          method: "POST",
          body: formData,
        });
        image = await url.json();
      }
      const result = await EditPostAction(
        {
          contentTxt: content,
          userId: user.id,
          mediaUrl: image?.url,
          mediaType: image?.type,
        },
        post.id
      );
      setLoading(false);
      if (result?.error)
        return toast.error(result.error, { className: "toast-font" });
      setEditPost(false);
      setMedia("");
      setMediaFile(null);
      router.refresh();
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error("Failed edit your post", { className: "toast-font" });
    }
  };
  return (
    <div
      className={`w-full h-screen bg-black/45 backdrop-blur inset-0 flex lg:pt-5 justify-center z-999 ${
        editPost ? "fixed" : "hidden"
      }`}
    >
      <div className="bg-white rounded-xl lg:w-190 w-full lg:max-h-fit max-h-fit z-50 overflow-hidden">
        <div className=" bg-linear-to-l to-primary from-blue-600 sm:p-5 p-3 text-white flex items-center justify-between">
          <h2 className="lg:text-3xl text-2xl font-semibold">Edit Post</h2>
          <i className="lg:text-[50px] text-[40px] opacity-20">
            <FaEdit />
          </i>
        </div>
        <div className="flex justify-between sm:p-5 p-2">
          <div className="flex items-center gap-2">
            <Image
              src={user.image || "/user.svg"}
              alt="Your image"
              width={80}
              height={80}
              className="sm:w-17 sm:h-17 w-13 h-13 rounded-full object-cover shrink-0 border-2 border-gray-200"
            />
            <div>
              <h2 className="capitalize font-semibold sm:text-[20px] text-[16px]">
                {user.name}
              </h2>
              <h3 className="font-normal sm:text-[14px] text-[13px]">
                Posted to Anyone
              </h3>
            </div>
          </div>
          <button
            onClick={() => setEditPost(!editPost)}
            className="sm:text-3xl text-xl cursor-pointer"
          >
            <IoClose />
          </button>
        </div>
        <div className="p-3">
          <textarea
            ref={textareaRef}
            defaultValue={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="what do you want to talk about?"
            className="rounded p-2 md:min-h-45 sm:min-h-35 max-h-50 w-full outline-none resize-none md:text-xl sm:text-[17px]"
          />
          {(showImage || showVideo) && (
            <div className="relative">
              {showImage && (
                <Image
                  src={media || post.image || ""}
                  alt="Post Image"
                  width={900}
                  height={900}
                  className="w-full max-h-100 object-cover rounded"
                />
              )}
              {showVideo && (
                <video
                  src={media || post.video || ""}
                  controls
                  className="w-full max-h-100 object-cover rounded"
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
        <div
          className={`w-full flex items-center ${
            !post.image && !post.video ? "justify-between" : "justify-end"
          } p-5 border-t border-t-gray-100`}
        >
          {!post.image && !post.video && (
            <div className="flex items-center gap-3">
              <label
                className="md:text-[28px] sm:text-[23px] text-[20px] text-gray-500 cursor-pointer hover:text-primary transition-css"
                htmlFor="image-post"
              >
                <FaRegImage className="hover:scale-105" />
              </label>
              <input accept="image/*" type="file" id="image-post" hidden />
              <label
                className="md:text-[28px] sm:text-[23px] text-[20px] text-gray-500 cursor-pointer hover:text-primary transition-css"
                htmlFor="video-post"
              >
                <IoLogoYoutube className="hover:scale-105" />
              </label>
              <input type="file" accept="video/*,.mkv" id="video-post" hidden />
            </div>
          )}
          <button
            onClick={handleEditPost}
            disabled={loading}
            className="py-1.5 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-wait rounded-full px-4 bg-primary text-white cursor-pointer font-semibold hover:bg-hoverColor transition-css"
          >
            {loading ? " Finishing..." : " Finished"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoxEditPost;
