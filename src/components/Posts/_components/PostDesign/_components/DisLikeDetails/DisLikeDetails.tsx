"use client";

import { PostType } from "@/lib/types/types";
import { User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import ShowDisLikers from "./_components/ShowDisLikers";
// =================================================================
function DisLikeDetails({ post, user }: { post: PostType; user: User }) {
  const isDisLike = post.disLikes.find((like) => like.userId === user.id);
  const [showDisLikers, setDisShowLikers] = useState(false);
  return (
    <>
      {post.disLikes.length > 0 && (
        <div className="flex items-center gap-1">
          <Image src={"/dislike.png"} alt="Like" width={17.5} height={17.5} />
          <span
            onClick={() => setDisShowLikers(true)}
            className="text-blackLight text-[13px] hover:underline hover:text-primary cursor-pointer"
          >
            {isDisLike ? (
              post.disLikes.length > 1 ? (
                <span className="flex items-center gap-1">
                  you,<span>{post.disLikes.length - 1}</span>
                </span>
              ) : (
                <span>you</span>
              )
            ) : (
              <>{post.disLikes.length}</>
            )}
          </span>
          <ShowDisLikers
            post={post}
            setShowDisLikers={setDisShowLikers}
            showDisLikers={showDisLikers}
          />
        </div>
      )}
    </>
  );
}

export default DisLikeDetails;
