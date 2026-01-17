"use client";

import { PostType } from "@/lib/types/types";
import Image from "next/image";
import ShowLikers from "./_components/ShowLikers";
import { User } from "@prisma/client";
import { useState } from "react";
// =============================================================
function LikeDetails({ post, user }: { post: PostType; user: User }) {
  const isLike = post.likes.find((like) => like.userId === user.id);
  const [showLikers, setShowLikers] = useState(false);

  return (
    <>
      {post.likes.length > 0 && (
        <div className="flex items-center gap-1">
          <Image src={"/like.svg"} alt="Like" width={20} height={20} />
          <span
            onClick={() => setShowLikers(true)}
            className="text-blackLight text-[13px] hover:underline hover:text-primary cursor-pointer"
          >
            {isLike ? (
              post.likes.length > 1 ? (
                <span className="flex items-center gap-1">
                  you,<span>{post.likes.length - 1}</span>
                </span>
              ) : (
                <span>you</span>
              )
            ) : (
              <>{post.likes.length}</>
            )}
          </span>
          <ShowLikers
            user={user}
            post={post}
            setShowLikers={setShowLikers}
            showLikers={showLikers}
          />
        </div>
      )}
    </>
  );
}

export default LikeDetails;
