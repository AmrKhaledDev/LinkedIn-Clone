"use client";
import { PostType } from "@/lib/types/types";
import { FaRegImage } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
// =======================================================
function FooterEditPost({
  post,
  handleEditPost,
  loading,
}: {
  post: PostType;
  handleEditPost: () => Promise<string | undefined>;
  loading: boolean;
}) {
  return (
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
  );
}

export default FooterEditPost;
