import { NotificationWithRelations } from "@/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";
import ButtonEditNotification from "./ButtonEditNotification";
import { User } from "@prisma/client";
import { RiUserFollowFill } from "react-icons/ri";
// ==========================================================================
function NotificationDesign({
  notification,
  user,
}: {
  notification: NotificationWithRelations;
  user: User;
}) {
  const date = new Date(notification.createdAt);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  } as const;
  const formatted = date.toLocaleDateString("en-GB", options);
  return (
    <li
      className={`rounded transition-css relative flex justify-between ${
        !notification.readAt ? "bg-[#d7e9fb] hover:bg-[#C3DDF8]" : "bg-white "
      }`}
    >
      <Link href={notification.route} className="p-2 flex-1">
        <div className="flex items-center gap-3">
          <div className="relative h-fit shrink-0">
            <Image
              src={notification.actor.image || "/user.svg"}
              alt="User Image"
              width={48}
              height={48}
              className="rounded-full object-cover border-2 border-white sm:w-12 sm:h-12 w-10 h-10"
            />
            {!notification.readAt && (
              <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-blue-500 ring-2 ring-white" />
            )}
            {notification.type === "LIKE" && (
              <i className="absolute bottom-0 right-0 p-0.5 text-[13px] text-primary rounded-full shadow bg-gray-100 border border-white">
                <BiSolidLike />
              </i>
            )}
            {notification.type === "DISLIKE" && (
              <i className="absolute bottom-0 right-0 p-0.5 text-[13px] text-red-500 rounded-full shadow bg-gray-100 border border-white">
                <BiSolidDislike />
              </i>
            )}
            {notification.type === "COMMENT" && (
              <i className="absolute bottom-0 right-0 p-0.5 text-[13px] text-green-600 rounded-full shadow bg-gray-100 border border-white">
                <FaCommentDots />
              </i>
            )}
            {notification.type === "FOLLOW" && (
              <i className="absolute bottom-0 right-0 p-0.5 text-[13px] text-primary rounded-full shadow bg-gray-100 border border-white">
                <RiUserFollowFill />
              </i>
            )}
          </div>
          <div className="flex-1 space-y-1 ">
            <div className="flex items-center justify-between sm:flex-nowrap flex-wrap gap-x-5">
              <h2 className="capitalize lg:text-[15px] sm:text-[14px] text-[13px] font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                {notification.title}
              </h2>
            </div>
            {notification.postTitle && (
              <p className="mt-2 lg:text-[13px] sm:text-[12px] text-[10px] text-gray-700 bg-gray-50/80 border border-gray-100 py-1 px-4 rounded-2xl w-fit line-clamp-1 shadow-sm">
                <span className="font-semibold mr-1">Post</span>:{" "}
                {notification.postTitle}
              </p>
            )}
            {notification.commentContent && (
              <p className="mt-2 lg:text-[13px] sm:text-[12px] text-[10px] text-gray-700 bg-gray-50/80 border border-gray-100 py-1 px-4 rounded-2xl w-fit line-clamp-1 shadow-sm">
                <span className="font-semibold mr-1">Comment</span>:{" "}
                {notification.commentContent}
              </p>
            )}
            {notification.replayContent && (
              <p className="mt-2 lg:text-[13px] sm:text-[12px] text-[10px] text-gray-700 bg-gray-50/80 border border-gray-100 py-1 px-4 rounded-2xl w-fit line-clamp-1 shadow-sm">
                <span className="font-semibold mr-1">Replay</span>:{" "}
                {notification.replayContent}
              </p>
            )}
            {notification.body && (
              <p className="mt-2 lg:text-[13px] sm:text-[12px] border-l-2 border-l-primary text-[10px] text-gray-700 leading-relaxed bg-gray-50/80 border border-gray-100 py-1 px-4 rounded-2xl w-fit  line-clamp-1 shadow-sm">
                <span className="font-semibold mr-1 capitalize">
                  {notification.actor.name.split(" ")[0]}
                </span>
                : {notification.body}
              </p>
            )}
          </div>
        </div>
      </Link>
      <div className="flex gap-3 h-fit items-center p-2">
        <span className="lg:text-xs sm:text-[11px] text-[9px] text-gray-500">
          {formatted}
        </span>
        <ButtonEditNotification notification={notification} user={user} />
      </div>
    </li>
  );
}

export default NotificationDesign;
