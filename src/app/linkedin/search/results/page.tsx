import RightSide from "@/components/RightSide/RightSide";
import Link from "next/link";
import axios from "axios";
import { PostType, UserWithRelationType } from "@/lib/types/types";
import { redirect } from "next/navigation";
import PostDesign from "@/components/Posts/_components/PostDesign/PostDesign";
import { GetUser } from "@/lib/GetUser";
// ========================================================
async function page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const res = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/search-results?q=${q}`,
  );
  const data:
    | { error: string }
    | { posts: PostType[]; users: UserWithRelationType[] } = res.data;
  if ("error" in data) return redirect("/linkedin");
  const user = await GetUser()
  if(!user) return redirect("/login")
  return (
    <main className="space-section bg-[#F4F2EE] min-h-screen">
      <div className="container-css flex justify-between sm:gap-7 px-3">
        <div className="w-60 border sticky top-15 sm:block hidden border-[#DFDEDA] bg-white p-3 rounded-[10px] space-y-3 h-fit">
          <h2 className="text-xl font-extrabold">On this page</h2>
          <div className="flex flex-col gap-1">
            <Link href={`/linkedin/search/results?q=${q}#posts`} className="hover:bg-gray-200 py-1 px-2 rounded">
              Posts
            </Link>
            <Link href={`/linkedin/search/results?q=${q}#users`} className="hover:bg-gray-200 py-1 px-2 rounded">
              People
            </Link>
          </div>
        </div>
        <div className="flex-1 space-y-5">
          <div className="bg-white border border-[#DFDEDA] p-3 rounded-[10px] space-y-3">
            <h2 className="font-extrabold text-xl">Posts</h2>
            <div id="posts" className="space-y-2">
              {data.posts.map((post) => (
                <PostDesign key={post.id} post={post} user={user} />
              ))}
            </div>
          </div>
            <div className="bg-white border border-[#DFDEDA] p-3 rounded-[10px] space-y-3">
            <h2 className="font-extrabold text-xl">Users</h2>
            <div id="users" className="space-y-2">
              {data.posts.map((post) => (
                <PostDesign key={post.id} post={post} user={user} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <RightSide />
        </div>
      </div>
    </main>
  );
}

export default page;
