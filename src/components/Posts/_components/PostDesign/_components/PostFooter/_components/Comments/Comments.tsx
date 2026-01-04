"use client";
import CommentDesign from "./_components/CommentDesign";
import { CommentDBWithRelations } from "@/lib/types/types";
// ===================================================================================
function Comments({
  postComments,
  addComment,
}: {
  postComments: CommentDBWithRelations[];
  addComment: boolean;
}) {
  return (
    <>
      {addComment && postComments.length > 0 && (
        <ul className="p-3 flex mt-4 flex-col gap-7 ">
          {postComments.map((comment) => (
            <CommentDesign key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
    </>
  );
}

export default Comments;
