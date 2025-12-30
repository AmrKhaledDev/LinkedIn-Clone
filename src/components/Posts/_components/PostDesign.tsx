import { PostType } from "@/lib/types/types";
import Image from "next/image";
import PostDetails from "./PostDetails";
import OwnerPostDetails from "./OwnerPostDetails";
import { GetUser } from "@/lib/GetUser";
import ActionsInPost from "./ActionsInPost";
// =====================================================================
async function PostDesign({ post }: { post: PostType }) {
  const user = await GetUser();
  if (!user) return;
  return (
    <li className="rounded shadow bg-white  overflow-hidden">
      <div className="flex items-center justify-end py-2 border-b border-b-gray-200 mx-3">
        <Image
          src={"/ellipsis.svg"}
          alt="Icon"
          width={30}
          height={30}
          className=" cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-css
        "
        />
      </div>
      <div className="flex flex-col gap-2">
        <OwnerPostDetails post={post} user={user}/>
        <PostDetails post={post} />
        <div className="flex justify-between px-3">
          <div className="flex items-center gap-2 ">
            <div className="flex items-center gap-1">
              <Image src={"/like.png"} alt="Like" width={20} height={20} />
              <span className="text-blackLight text-[14px]">0</span>
            </div>
            <div className="flex items-center gap-1">
              <Image src={"/dislike.png"} alt="Like" width={20} height={20} />
              <span className="text-blackLight text-[14px]">0</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <h2 className="text-blackLight text-[14px]">No comments</h2>
          </div>
        </div>
        <ActionsInPost user={user} />
      </div>
    </li>
  );
}

export default PostDesign;
