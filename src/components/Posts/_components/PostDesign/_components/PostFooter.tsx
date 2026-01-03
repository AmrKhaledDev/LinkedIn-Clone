"use client";
import { BiSolidLike } from "react-icons/bi";
import { MdComment } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { BiSolidDislike } from "react-icons/bi";
import { User } from "@prisma/client";
import { useState } from "react";
import AddComment from "./AddComment";
import Comments from "./Comments/Comments";
import { PostType } from "@/lib/types/types";
// ======================================================================
function PostFooter({ user, post }: { user: User; post: PostType }) {
  const [addComment, setAddComment] = useState(false);
  const actions = [
    {
      id: crypto.randomUUID(),
      name: "Like",
      icon: <BiSolidLike />,
      handle: () => {},
    },
    {
      id: crypto.randomUUID(),
      name: "Dislike",
      icon: <BiSolidDislike />,
      handle: () => {},
    },
    {
      id: crypto.randomUUID(),
      name: "Comment",
      icon: <MdComment />,
      handle: () => setAddComment(true),
    },
    {
      id: crypto.randomUUID(),
      name: "Send",
      icon: <IoIosSend />,
      handle: () => {},
    },
  ];
  return (
    <div>
      <div className="flex items-center gap-12 py-3 justify-between border-t px-5 border-t-gray-200">
        {actions.map((action) => (
          <div
            onClick={action.handle}
            key={action.id}
            className="flex items-center button select-none gap-2 cursor-pointer py-2 px-4 rounded hover:bg-gray-100 transition-css"
          >
            <i className="text-[20px] text-slate-700">{action.icon}</i>
            <h2 className="text-[14px] font-bold text-slate-700">
              {action.name}
            </h2>
          </div>
        ))}
      </div>
      <AddComment user={user} postId={post.id} addComment={addComment} />
      <Comments postComments={post.comments} addComment={addComment}/>
    </div>
  );
}

export default PostFooter;
