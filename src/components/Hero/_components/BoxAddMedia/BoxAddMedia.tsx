"use client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import TopBox from "./_components/TopBox";
import ContentBox from "./_components/ContentBox/ContentBox";
import toast from "react-hot-toast";
import { CreatePostAction } from "@/lib/actions/CreateActions/CreatePostAction";
import { User } from "@prisma/client";
// ==========================================================================
function BoxAddMedia({
  user,
  type,
  showAddMediaBox,
  setShowAddMediaBox,
}: {
  user: User;
  type: "image" | "video";
  showAddMediaBox: boolean;
  setShowAddMediaBox: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const handleAddMedia = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMedia(url);
      setMediaFile(file);
    }
  };
  const handleDeleteMedia = () => {
    setMedia("");
    setMediaFile(null);
  };
  const hanaldePublishMedia = async () => {
    try {
      const formData = new FormData();
      if (!mediaFile)
        return toast.error("Add Media first to publish", {
          className: "toast-font",
        });
      if (!user?.id)
        return toast.error("Login to publish", {
          className: "toast-font",
        });
      formData.append("file", mediaFile);
      formData.append("pathname", "posts-media");
      setLoading(true);
      const res = await fetch("/api/upload-media", {
        method: "POST",
        body: formData,
      });
      const image = (await res.json()) as { url: string; type: string };
      const result = await CreatePostAction({
        mediaUrl: image.url,
        mediaType: image.type,
        userId: user.id,
      });
      setLoading(false);
      if (result?.error)
        return toast.error(result.error, { className: "toast-font" });
      setMedia("");
      setMediaFile(null);
      setShowAddMediaBox(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      return toast.error("Failed to add Media, try again later", {
        className: "toast-font",
      });
    }
  };
  return (
    <>
      {showAddMediaBox && (
        <div className="fixed w-full flex justify-center z-15 pt-7 min-h-screen bg-black/45 inset-0">
          <div className="bg-white lg:w-[80%] mg:w-[90%] w-[99%] lg:max-h-170 max-h-150 rounded overflow-hidden">
            <TopBox type={type} setShowAddMediaBox={setShowAddMediaBox} />
            <ContentBox
              mediaFile={mediaFile}
              handleAddMedia={handleAddMedia}
              handleDeleteMedia={handleDeleteMedia}
              type={type}
              media={media}
            />
            <div className="w-full flex items-center justify-end p-3">
              <button
                onClick={hanaldePublishMedia}
                disabled={media.length < 1 || loading}
                className="disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default bg-primary text-white cursor-pointer rounded-full py-1 px-3 font-semibold sm:text-[15px] text-sm"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BoxAddMedia;
