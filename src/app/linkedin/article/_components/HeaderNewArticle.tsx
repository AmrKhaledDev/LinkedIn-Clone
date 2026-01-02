import { GetUser } from "@/lib/GetUser";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ButtonPublish from "./ButtonPublish";
// =============================================================
async function HeaderNewArticle() {
  const user: User | null = await GetUser();
  if (!user) return redirect("/login");
  return (
    <nav className="py-2  ">
      <div className="container-css px-3 flex items-center justify-between">
        <Link href={"/linkedin/profile"} className="flex items-center gap-1">
          <Image
            src={user.image || "/user.svg"}
            alt="User Image"
            width={70}
            height={70}
            className="w-13 h-13 object-cover shrink-0 rounded-full border-2 border-gray-200"
          />
          <div>
            <h2 className="text-[17px] font-bold tracking-wider ">
              {user.name.charAt(0).toUpperCase() +
                user.name.slice(1).toLocaleLowerCase()}
            </h2>
            <h3 className="text-[11px] scale-y-120 font-semibold">
              Individual article
            </h3>
          </div>
        </Link>
        <ButtonPublish userId={user.id} />
      </div>
    </nav>
  );
}

export default HeaderNewArticle;
