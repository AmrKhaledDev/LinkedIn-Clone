"use client";
import { User } from "@prisma/client";
import CommentDesign from "./_components/CommentDesign";
import { PostType } from "@/lib/types/types";
// ===================================================================================
 function Comments({
  post,
  addComment,
  user
}: {
  post: PostType;
  addComment: boolean;
  user:User
}) {
  return (
    <>
      {addComment && post.comments.length > 0 && (
        <ul className="p-3 flex mt-4 flex-col gap-7 ">
          {post.comments.map((comment) => (
            <CommentDesign key={comment.id} comment={comment} postId={post.id} user={user} />
          ))}
        </ul>
      )}
    </>
  );
}

export default Comments;
