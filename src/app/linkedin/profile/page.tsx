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
        <div className="w-187.5 flex flex-col gap-5">
          <div className="rounded overflow-hidden flex flex-col bg-white shadow">
            <div className="relative">
              <BigImage user={user} />
              <SmallImage user={user} />
            </div>
            <div className="overflow-hidden px-7 flex pt-15 flex-col gap-3 relative">
              <UserDetails user={user} />
              <UserInfo user={user} />
              <EditProfileBox user={user} />
            </div>
          </div>
          <Posts posts={user.posts} />
        </div>
      </div>
    </main>
  );
}

export default page;
