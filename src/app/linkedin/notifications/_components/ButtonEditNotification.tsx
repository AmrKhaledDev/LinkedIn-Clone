"use client";
import { ContextStates } from "@/context/Context";
import { DeleteNotificationAction } from "@/lib/actions/DeleteActions/DeleteNotificationAction";
import { EditNotificationToRead } from "@/lib/actions/EditActions/EditNotificationToRead";
import { Notification, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEllipsis } from "react-icons/fa6";
// =======================================================================
function ButtonEditNotification({
  notification,
  user,
}: {
  notification: Notification;
  user: User;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const context = useContext(ContextStates);
  if (!context) return null;
  const { dropDownMenu, setDropDownMenu } = context;
  const handleDeleteNotification = async () => {
    setLoading(true);
    const result = await DeleteNotificationAction(notification.id, user.id);
    setLoading(false);
    if (result?.error) return toast.error(result.error);
    router.refresh();
  };
  const handleEditNotificationToRead = async () => {
    if(notification.readAt) return
    setLoading(true);
    const result = await EditNotificationToRead(notification.id, user.id);
    setLoading(false);
    if (result?.error) return toast.error(result.error);
    router.refresh();
  };
  return (
    <div className="relative">
      <button
        onClick={() => setDropDownMenu(notification.id)}
        className="p-1 button z-6 text-[14px] rounded-full text-gray-500 hover:bg-gray-100 cursor-pointer transition-css"
      >
        <FaEllipsis />
      </button>
      <div
        className={` absolute right-0 z-15 box flex-col gap-2 rounded-2xl w-60 max-w-50 p-2 bg-white ${
          dropDownMenu === notification.id ? "flex" : "hidden"
        }`}
      >
        <button
          onClick={handleEditNotificationToRead}
          disabled={loading || !!notification.readAt}
          className="w-ful disabled:text-blue-300 disabled:border-blue-300 disabled:cursor-default disabled:hover:bg-transparent cursor-pointer flex items-center justify-center px-4 py-1.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 hover:border-blue-700 transition-all duration-200 text-[12px]"
        >
          Mark as read
        </button>

        <button
          onClick={handleDeleteNotification}
          disabled={loading}
          className="w-full disabled:text-gray-400 disabled:border-gray-400 disabled:cursor-default disabled:hover:bg-transparent cursor-pointer flex items-center justify-center px-4 py-1.5 border-2 border-gray-500 text-gray-500 font-semibold rounded-full hover:bg-gray-50 hover:border-gray-600 transition-all duration-200 text-[12px]"
        >
          Delete Notification
        </button>
      </div>
    </div>
  );
}

export default ButtonEditNotification;
