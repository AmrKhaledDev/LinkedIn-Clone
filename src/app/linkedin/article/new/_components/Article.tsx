"use client";

import { ContextStates } from "@/context/Context";
import { useContext } from "react";
// ===========================================================
function Article() {
  const context = useContext(ContextStates);
  if (!context) return null;
  const { setTitleArticle, titleArticle, setContentArticle, contentArticle } =
    context;

  return (
    <div>
      <textarea
        value={titleArticle ?? ""}
        onChange={(e) => setTitleArticle(e.target.value)}
        placeholder="Title"
        className="border text-slate-800 p-3 rounded resize-none font-bold w-full border-gray-100 outline-none md:text-3xl text-2xl"
      ></textarea>
      <textarea
        value={contentArticle ?? ""}
        onChange={(e) => setContentArticle(e.target.value)}
        rows={8}
        placeholder="Write your article here..."
        className="border text-slate-800 text-[16px] p-3 rounded resize-none w-full border-gray-100 outline-none "
      ></textarea>
    </div>
  );
}

export default Article;
