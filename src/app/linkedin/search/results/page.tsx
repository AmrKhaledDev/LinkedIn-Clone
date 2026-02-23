import RightSide from "@/components/RightSide/RightSide";
import axios from "axios";
import { PostType, UserWithRelationType } from "@/lib/types/types";
import { redirect } from "next/navigation";
import { GetUser } from "@/lib/GetUser";
import PageSidebar from "./_components/PageSidebar";
import ResultsPosts from "./_components/ResultsPosts";
import ResultsUsers from "./_components/ResultsUsers";
import Image from "next/image";
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
  const user = await GetUser();
  if (!user) return redirect("/login");
  return (
    <main className="space-section bg-[#F4F2EE] min-h-screen pb-3">
      <div className="container-css flex justify-between sm:gap-7 px-3">
        <PageSidebar q={q} />
        <div className="flex-1 space-y-5 shrink-0">
          <ResultsPosts posts={data.posts} user={user} />
          <ResultsUsers users={data.users} user={user} />
        </div>
        <div className="w-80 flex-col gap-2 xl:flex hidden">
          <div className="rounded-[10px] border border-[#DFDEDA] overflow-hidden p-3 bg-white">
            <Image
              src={"/banner-image.jpg"}
              alt="Banner"
              width={400}
              height={400}
              className="rounded w-100 h-62.5 object-cover"
            />
          </div>
          <div className="flex items-center gap-1 mx-auto mt-1">
            <Image
              src={"/login-logo.svg"}
              alt="linkedIn logo"
              width={55}
              height={55}
            />
            <span className="text-xs"> LinkedIn Corporation © 2026</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
