"use client";
import { PostType } from "@/lib/types/types";
import Image from "next/image";
import { useState } from "react";

// =====================================================
function PostDetails({ post }: { post: PostType }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const CHARACTER_LIMIT = 250; 

  const text = post.contentText || "";
  
  const isLongText = text.length > CHARACTER_LIMIT;

  const displayText = isExpanded || !isLongText 
    ? text 
    : text.substring(0, CHARACTER_LIMIT) + "...";
  
  return (
    <div className="w-full flex flex-col gap-1 px-3">
      <div className="pb-1">
        <p dir="auto" className="text-slate-800 sm:text-[15px] text-[14px] whitespace-pre-line">
          {displayText}
        </p>
        
        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:underline font-medium mr-1 sm:text-[14px] text-[13px] cursor-pointer"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      {post.image && (
        <Image
          src={post.image}
          alt="Post Image"
          width={900}
          height={600}
          className="object-cover max-h-150 w-full rounded"
        />
      )}
      {post.video && <video src={post.video} controls className="w-full" />}
    </div>
  );
}

export default PostDetails;