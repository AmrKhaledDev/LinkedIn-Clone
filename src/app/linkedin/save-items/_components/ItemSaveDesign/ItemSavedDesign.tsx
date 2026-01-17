"use client";

import { SaveItemType } from "@/lib/types/types";
import { User } from "@prisma/client";
import Image from "next/image";
import UserPostDetails from "./_components/UserPostDetails";
import { useRouter } from "next/navigation";
// ===================================================
function ItemSavedDesign({ item, user }: { item: SaveItemType; user: User }) {
  const router = useRouter();
  return (
    <div
      className="border-b  border-b-gray-200 last:border-b-transparent sm:p-5 p-3 flex flex-col gap-3"
      key={item.id}
    >
      <UserPostDetails user={user} item={item} />
      <div
        onClick={() => router.push(`/linkedin/post/${item.post.id}`)}
        className="flex sm:gap-4 gap-2 cursor-pointer hover:bg-gray-100 transition-css"
      >
        {item.post.image && (
          <Image
            src={item.post.image}
            alt="Post Image"
            width={200}
            height={200}
            className="w-20 h-20 object-cover"
          />
        )}
        {item.post.video && (
          <video
            src={item.post.video}
            width={200}
            height={200}
            controls
            className="w-20 h-20 object-cover"
          />
        )}
        <div>
          <p className="font-normal text-slate-700 sm:text-[14px] text-[13px]">
            {item.post.contentText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemSavedDesign;
