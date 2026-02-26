export const dynamic = "force-dynamic";

import { GetUserWithRelation } from "@/lib/GetUserWithRelation";
import { redirect } from "next/navigation";
import LeftSide from "./_components/LeftSide";
import ItemSavedDesign from "./_components/ItemSaveDesign/ItemSavedDesign";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
// =======================================================
export const metadata: Metadata = {
  title: "Saved Items | LinkedIn",
  description:
   "Access and manage your saved posts, Keep track of important content and revisit it anytime on LinkedIn."
};
async function page() {
  const user = await GetUserWithRelation();
  if (!user) redirect("/login");
  return (
    <main className="space-section min-h-screen bg-[#F4F2EE]">
      <div className="container-css p-3 flex md:flex-row flex-col lg:gap-5 gap-3">
        <LeftSide user={user} />
        <div className="shadow rounded-xl bg-white md:w-150">
          <div className="pt-5 pb-2 px-5 border-b border-b-slate-300 flex flex-col gap-2">
            <h1 className="sm:text-2xl text-xl  text-slate-800 font-normal">
              Saved Posts
            </h1>
            <button className="text-white bg-green-800 rounded-full py-1 px-3 cursor-pointer w-fit font-semibold hover:bg-green-950">
              All
            </button>
          </div>
          {user.saveItems.length > 0 ? (
            <div className="overflow-hidden">
              {user.saveItems.map((item) => (
                <ItemSavedDesign item={item} user={user} key={item.id} />
              ))}
            </div>
          ) : (
            <div className="p-3 flex items-center flex-col justify-center sm:gap-3 gap-2">
              <Image
                src={"/not-found-items-saved.svg"}
                alt="Image"
                width={500}
                height={500}
                className="sm:w-62.5 w-55 object-cover"
              />
              <h2 className="sm:text-2xl text-xl font-normal">Start saving posts</h2>
              <p className="text-gray-500 sm:text-[15px] text-[13px] font-normal">
                Saved posts will show up here
              </p>
              <Link
                className="text-primary border sm:text-[15px] text-[13px] border-primary rounded-full py-1 px-4 font-bold hover:bg-blue-50"
                href={"/linkedin"}
              >
                Go To Linkedin Feed
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default page;
