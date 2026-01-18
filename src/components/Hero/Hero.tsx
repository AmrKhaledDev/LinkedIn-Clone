import { GetUser } from "@/lib/GetUser";
import Image from "next/image";
import { redirect } from "next/navigation";
import ButtonAddPost from "./_components/ButtonAddPost";
import Posts from "../Posts/Posts";
import { GetAllPosts } from "@/server/db/GetAllPosts";
import Link from "next/link";
import Article from "./_components/Buttons/Article";
import Photo from "./_components/Buttons/Photo";
import Video from "./_components/Buttons/Video";
import Event from "./_components/Buttons/Event";
// ======================================================
async function Hero() {
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
          <Photo user={user}/>
          <Video user={user}/>
          <Event />
          <Article />
        </ul>
      </div>
      <Posts posts={posts} />
    </main>
  );
}

export default Hero;
