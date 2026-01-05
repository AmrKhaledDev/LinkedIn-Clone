"use client";
function ButtonPost({
  handleClick,
  contentTxt,
  loading,
  mediaUrl,
}: {
  handleClick: () => void;
  contentTxt: string;
  loading: boolean;
  mediaUrl: string;
}) {
  return (
    <button
      disabled={loading}
      onClick={handleClick}
      className={`sm:py-2 sm:px-6 py-1.5 px-4 sm:text-[15px] text-[13px] rounded-full select-none disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-wait ${
        contentTxt.trim().length < 1 && !mediaUrl
          ? "cursor-default pointer-events-none bg-gray-200 text-gray-400"
          : "cursor-pointer text-white bg-primary hover:bg-hoverColor"
      }`}
    >
      {loading ? "Posting.." : "Post"}
    </button>
  );
}

export default ButtonPost;
