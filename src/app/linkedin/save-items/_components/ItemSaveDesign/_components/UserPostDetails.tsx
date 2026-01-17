import { SaveItemType } from "@/lib/types/types";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import EditSaveItemBox from "./EditSaveItemBox";
// ====================================================
function UserPostDetails({ item, user }: { item: SaveItemType; user: User }) {
  const date = new Date(item.post.createdAt);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  } as const;
  const formatted = date.toLocaleDateString("en-GB", options);
  return (
    <div className="flex gap-2">
      <Image
        src={item.post.user.image || "/user.svg"}
        alt="User Image"
        width={50}
        height={50}
        className="w-12.5 h-12.5 rounded-full object-cover shrink-0"
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Link
            href={
              user.id === item.post.userId
                ? `/linkedin/profile`
                : `/linkedin/u/${item.post.userId}`
            }
            className="capitalize font-bold hover:underline text-[17px] break-all line-clamp-1"
          >
            {item.post.user.name}
          </Link>
          <EditSaveItemBox item={item} user={user}/>
        </div>
        <h3 className="font-medium text-[13px]  break-all line-clamp-1">
          {item.post.user.headline}
        </h3>
        <h4 className="font-normal text-[12px] ">{formatted}</h4>
      </div>
    </div>
  );
}

export default UserPostDetails;
