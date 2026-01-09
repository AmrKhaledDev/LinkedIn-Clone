"use client";
function FooterEditPost({
  handleEditPost,
  loading,
}: {
  handleEditPost: () => Promise<string | undefined>;
  loading: boolean;
}) {
  return (
    <div className="w-full flex items-center justify-end p-5 border-t border-t-gray-100">
      <button
        onClick={handleEditPost}
        disabled={loading}
        className="py-1.5 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-wait rounded-full sm:text-[15px] text-[13px] px-4 bg-primary text-white cursor-pointer font-semibold hover:bg-hoverColor transition-css"
      >
        {loading ? " Finishing..." : " Finished"}
      </button>
    </div>
  );
}

export default FooterEditPost;
