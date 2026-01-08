"use client";

import { EditPostAction } from "@/lib/actions/EditActions/EditPostAction";
import { PostType } from "@/lib/types/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import {  Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import Content from "./Content";
import HeaderEditPost from "./HeaderEditPost";
import FooterEditPost from "./FooterEditPost";
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
  const router = useRouter();
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
      className={`w-full h-screen flex items-center justify-center bg-black/45  backdrop-blur inset-0 lg:pt-15 z-999 ${
        editPost ? "fixed" : "hidden"
      }`}
    >
      <div className="bg-white rounded-xl lg:w-190 w-full lg:max-h-fit max-h-fit  overflow-hidden">
        <HeaderEditPost
          setEditPost={setEditPost}
          editPost={editPost}
          user={user}
        />
        <Content
          post={post}
          media={media}
          setMedia={setMedia}
          setMediaFile={setMediaFile}
          content={content}
          setContent={setContent}
          mediaFile={mediaFile}
        />
        <FooterEditPost
          post={post}
          handleEditPost={handleEditPost}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default BoxEditPost;
