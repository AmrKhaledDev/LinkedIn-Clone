"use client";
import { BiSolidLike } from "react-icons/bi";
import { MdComment } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { BiSolidDislike } from "react-icons/bi";
import AddComment from "./AddComment";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
// ======================================================================
function ActionsInPost({ user }: { user: User }) {
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
      handle: () => setAddComment(!addComment),
    },
    {
      id: crypto.randomUUID(),
      name: "Send",
      icon: <IoIosSend />,
      handle: () => {},
    },
  ];
  useEffect(() => {
    const handleCLick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest(".button, .input")) setAddComment(false);
    };
    document.addEventListener("click", handleCLick);
    return () => {
      removeEventListener("click", handleCLick);
    };
});
  return (
    <div>
      <div className="flex items-center gap-12 py-3 justify-center border-t border-t-gray-200">
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
      <AddComment user={user} addComment={addComment} />
    </div>
  );
}

export default ActionsInPost;
