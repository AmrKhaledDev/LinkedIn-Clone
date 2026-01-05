import { GetUser } from "@/lib/GetUser";
import Image from "next/image";
import { redirect } from "next/navigation";
import ButtonAddPost from "./_components/ButtonAddPost";
import Posts from "../Posts/Posts";
import { GetAllPosts } from "@/server/db/GetAllPosts";
import Link from "next/link";
// ======================================================
async function Hero() {
  const actions = [
    { id: crypto.randomUUID(), nameAction: "Photo", icon: "/photo-icon.svg" },
    { id: crypto.randomUUID(), nameAction: "Video", icon: "/video-icon.svg" },
    { id: crypto.randomUUID(), nameAction: "Event", icon: "/event-icon.svg" },
  ];
  const user = await GetUser();
  if (!user) redirect("/login");
  const posts = await GetAllPosts();
  return (
    <main className="flex-1 flex flex-col gap-3 ">
      <div className="w-full md:p-5 sm:p:3 p-2 shadow rounded flex flex-col gap-3 bg-white">
        <div className="flex items-center gap-3 ">
          <Link href={"/linkedin/profile"} className="shrink-0">
            <Image
              src={user.image ? user.image : "/user.svg"}
              alt="Your Photo"
              width={100}
              height={100}
              className="md:w-12.5 md:h-12.5 w-10 h-10  shrink-0 object-cover rounded-full border-2 border-gray-200"
            />
          </Link>
          <ButtonAddPost user={user} />
        </div>
        <ul className="flex items-center justify-between w-full">
          {actions.map((action) => (
            <button
              key={action.id}
              className="flex items-center text-[14px] gap-2 text-blackLight hover:bg-gray-100 rounded cursor-pointer py-2 px-4 transition-css"
            >
              <Image
                src={action.icon}
                alt={action.nameAction}
                width={50}
                height={50}
                className="sm:w-6 w-7"
              />
              <span className="sm:block hidden">{action.nameAction}</span>
            </button>
          ))}
          <Link
            href={"/linkedin/article/new"}
            className="flex items-center text-[14px] gap-2 text-blackLight hover:bg-gray-100 rounded cursor-pointer py-2 px-4 transition-css"
          >
            <Image
              src={"/article-icon.svg"}
              alt={"Article icons"}
              width={50}
              height={50}
                className="sm:w-6 w-7"
            />
           <span className="sm:block hidden"> Write article</span>
          </Link>
        </ul>
      </div>
      <Posts posts={posts} />
    </main>
  );
}

export default Hero;
