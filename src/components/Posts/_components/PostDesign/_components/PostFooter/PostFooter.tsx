"use client";
import { User } from "@prisma/client";
import { useState } from "react";
import AddComment from "./_components/AddComment";
import Comments from "./_components/Comments/Comments";
import { PostType } from "@/lib/types/types";
import LikeButton from "./_components/Buttons/LikeButton";
import DisLikeButton from "./_components/Buttons/DisLikeButton";
import CommentButton from "./_components/Buttons/CommentButton";
import SendButton from "./_components/Buttons/SendButton";
// ======================================================================
function PostFooter({ user, post }: { user: User; post: PostType }) {
  const [addComment, setAddComment] = useState(false);
  return (
    <div>
      <div
        className={`flex items-center md:gap-12 sm:gap-5 gap-2 py-3 justify-between sm:px-5 px-7 container-actions  ${
          (post.likes.length > 0 ||
            post.disLikes.length > 0 ||
            post.comments.length > 0) &&
          "border-t  border-t-gray-100 mt-1"
        }`}
      >
        <LikeButton post={post} user={user} />
        <DisLikeButton post={post} user={user} />
        <CommentButton setAddComment={setAddComment} addComment={addComment}/>
        <SendButton />
      </div>
      <AddComment user={user} postId={post.id} addComment={addComment} />
      <Comments post={post} addComment={addComment} user={user}/>
    </div>
  );
}

export default PostFooter;
