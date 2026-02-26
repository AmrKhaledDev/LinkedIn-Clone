export const dynamic = "force-dynamic";

import LeftSide from "@/components/LeftSide/LeftSide";
import { GetUserWithRelation } from "@/lib/GetUserWithRelation";
import NotificationDesign from "./_components/NotificationDesign";
import { Metadata } from "next";
// ===========================================================================
export const metadata:Metadata ={
  title:"Notifications | LinkedIn",
  description:"Stay updated with your latest notifications. See connection requests, messages, profile views, and activity updates on LinkedIn."
} 
async function page() {
  const user = await GetUserWithRelation();
  if (!user) return;

  return (
    <main className="min-h-screen bg-[#F4F2EE] py-10 space-section">
      <div className="container-css mx-auto p-3 flex gap-5">
        <div className="md:block hidden">
          <LeftSide />
        </div>
        {user.receivedNotifications.length > 0 ? (
          <ul className="flex-1 flex flex-col gap-1">
            {user.receivedNotifications.map((notification) => (
              <NotificationDesign notification={notification} key={notification.id} user={user}/>
            ))}
          </ul>
        ) : (
          <div className="p-10 text-center text-gray-500">
            No Notifications now
          </div>
        )}
      </div>
    </main>
  );
}

export default page;
