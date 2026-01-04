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
      <div className="flex items-center gap-12 py-3 justify-between border-t px-5 border-t-gray-200">
        <LikeButton post={post} user={user} />
        <DisLikeButton post={post} user={user} />
        <CommentButton setAddComment={setAddComment} />
        <SendButton />
      </div>
      <AddComment user={user} postId={post.id} addComment={addComment} />
      <Comments postComments={post.comments} addComment={addComment} />
    </div>
  );
}

export default PostFooter;
