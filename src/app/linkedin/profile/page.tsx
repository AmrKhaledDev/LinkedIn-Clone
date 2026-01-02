import { redirect } from "next/navigation";
import BigImage from "./_components/BigImage";
import SmallImage from "./_components/SmallImage/SmallImage";
import UserInfo from "./_components/UserInfo";
import UserDetails from "./_components/UserDetails";
import { Metadata } from "next";
import EditProfileBox from "./_components/EditProfileBox/EditProfileBox";
import { GetUserWithRelation } from "@/lib/GetUserWithRelation";
import { UserWithRelationType } from "@/lib/types/types";
import Posts from "@/components/Posts/Posts";
// ===============================================
export const metadata: Metadata = {
  title: "Profile | Connect & Grow Professionally",
  description:
    "Discover professional experience, skills, and achievements. Build meaningful connections and grow your career.",
  icons: {
    icon: "/linkedin.png",
  },
};
async function page() {
  const user: UserWithRelationType | null = await GetUserWithRelation();
  if (!user) return redirect("/login");
  return (
    <main className="space-section min-h-screen bg-[#F4F2EE]">
      <div className="container-css p-3">
        <div className="lg:w-187.5 md:w-176 flex flex-col gap-5">
          <div className="rounded flex flex-col bg-white shadow">
            <div className="relative">
              <BigImage user={user} />
              <SmallImage user={user} />
            </div>
            <div className="overflow-hidden px-7 flex sm:pt-15 pt-10 flex-col gap-3 relative">
              <UserDetails user={user} />
              <UserInfo user={user} />
              <EditProfileBox user={user} />
            </div>
          </div>
          {user.posts.length > 0 ? (
            <Posts posts={user.posts} />
          ) : (
            <p className="text-center font-bold tracking-widest p-3 shadow bg-white text-red-400 uppercase sm:text-[15px] text-[13px]">
              Your posts will be displayed here
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default page;
