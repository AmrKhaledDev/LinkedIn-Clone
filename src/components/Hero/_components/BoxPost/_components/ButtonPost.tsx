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
      className={`py-2 px-6 rounded-full select-none disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-wait ${
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
