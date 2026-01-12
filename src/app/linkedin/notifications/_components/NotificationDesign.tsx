import { NotificationWithRelations } from "@/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import { FaCommentDots } from "react-icons/fa";
// ==========================================================================
function NotificationDesign({
  notification,
}: {
  notification: NotificationWithRelations;
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
      className={`rounded-xl transition-css ${
        !notification.readAt ? "bg-[#dfeaf6]" : "bg-white "
      }`}
    >
      <Link
        href={notification.route}
        className="flex items-start sm:p-4 p-2 gap-2"
      >
        <div className="relative shrink-0">
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
            <Image
              src="/like.svg"
              alt="Like"
              width={17}
              height={17}
              className="absolute bottom-0 right-0 sm:w-4.25 sm:h-4.25 w-3.75 h-3.75"
            />
          )}
          {notification.type === "DISLIKE" && (
            <Image
              src="/dislike.svg"
              alt="Like"
              width={15}
              height={15}
              className="absolute bottom-0 right-0 sm:w-3.75 sm:h-3.75 w-3.25 h-3.25"
            />
          )}
          {notification.type === "COMMENT" && (
            <i className="absolute bottom-0 right-0 text-green-700 sm:text-[14px] text-[13px]">
              <FaCommentDots />
            </i>
          )}
        </div>
        <div className="flex-1 space-y-1 ">
          <div className="flex items-center justify-between sm:flex-nowrap flex-wrap gap-x-5">
            <h2 className="capitalize lg:text-[15px] sm:text-[14px] text-[13px] font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
              {notification.title}
            </h2>
            <div className="flex items-center gap-3">
              <span className="lg:text-xs sm:text-[11px] text-[9px] text-gray-500">
                {formatted}
              </span>
              <Image
                src={"/ellipsis.svg"}
                alt="Icon"
                width={20}
                height={20}
                className="p-1 rounded-full hover:bg-gray-100 transition-css"
              />
            </div>
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
            <p className="mt-2 lg:text-[13px] sm:text-[12px] text-[10px] text-gray-700 leading-relaxed bg-gray-50/80 border border-gray-100 py-1 px-4 rounded-2xl w-fit  line-clamp-1 shadow-sm">
              <span className="font-semibold mr-1 capitalize">
                {notification.actor.name.split(" ")[0]}
              </span>
              : {notification.body}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}

export default NotificationDesign;
