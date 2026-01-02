"use client";
import { ContextStates } from "@/context/Context";
import { CreateArticleAction } from "@/lib/actions/CreateArticleAction";
import { CreateArticleSchema } from "@/lib/schemas/CreateArticleSchema";
import { redirect, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { RiUploadCloud2Fill } from "react-icons/ri";
// =======================================================
function ButtonPublish({ userId }: { userId: string }) {
  const context = useContext(ContextStates);
  if (!context) return null;
  const {
    titleArticle,
    contentArticle,
    mediaArticleFile,
    setTitleArticle,
    setContentArticle,
    setMediaArticle,
    setMediaArticleFile
  } = context;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handlePublishArticle = async () => {
    const formData = new FormData();
    if (mediaArticleFile) formData.append("file", mediaArticleFile);
    formData.append("pathname", "articles-media");
    try {
      const validation = CreateArticleSchema.safeParse({
        userId,
        title: titleArticle ?? "",
        content: contentArticle ?? "",
      });
      if (!validation.success)
        return toast.error(validation.error.issues[0].message, {
          className: "toast-font",
        });
      setLoading(true);
      const res = await fetch("/api/upload-media", {
        method: "POST",
        body: formData,
      });
      const mediaUrl = (await res.json()) as { url: string; type: string };
      const result = await CreateArticleAction({
        userId,
        title: titleArticle as string,
        content: contentArticle as string,
        image: mediaUrl.type == "image" ? mediaUrl.url : null,
        video: mediaUrl.type == "video" ? mediaUrl.url : null,
      });
      setLoading(false);
      if (result?.error)
        return toast.error(result.error, { className: "toast-font" });
      setTitleArticle(null);
      setContentArticle(null);
      setMediaArticle(null);
      setMediaArticleFile(null)
      router.refresh();
      router.push("/linkedin/articles")
    } catch (error) {
      console.log(error);
      return toast.error("Failed to create article", {
        className: "toast-font",
      });
    }
  };
  return (
    <button
      onClick={handlePublishArticle}
      disabled={loading}
      className="flex items-center gap-2 disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-default disabled:hover:scale-100 cursor-pointer font-semibold hover:scale-105 transition-css text-white sm:text-[18px] text-[16px] py-1.5 px-4 bg-primary rounded-full"
    >
      {loading ? (
        "Publishing..."
      ) : (
        <>
          Publish
          <i className="text-xl">
            <RiUploadCloud2Fill />
          </i>
        </>
      )}
    </button>
  );
}

export default ButtonPublish;
