export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { Metadata } from "next";
import { GetUserWithRelation } from "@/lib/GetUserWithRelation";
import { UserWithRelationType } from "@/lib/types/types";
import Profile from "@/components/Profile/Profile";
// ===============================================
export const metadata: Metadata = {
  title: "My Profile | Connect & Grow Professionally",
  description:
    "Check your profile, posts, and achievements. Build your professional presence and grow your career.",
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
        <Profile user={user} currentUser={user} />
      </div>
    </main>
  );
}

export default page;
