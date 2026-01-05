import { GetUser } from "@/lib/GetUser";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
// ===================================================
async function TopProfile() {
  const user = await GetUser();
  if (!user) redirect("/login");
  return (
    <div className=" rounded overflow-hidden bg-white shadow">
      <Link href={"/linkedin/profile"} className="flex flex-col sm:gap-10 gap-13 pb-6">
        {/* Images */}
        <div className="relative">
          <Image
            src={user.imageProfile ? user.imageProfile : "/card-bg.svg"}
            alt="Your Profile image"
            width={200}
            height={200}
            className="w-full sm:h-20 h-30 object-cover"
          />
          <div className="absolute -bottom-9 left-3 object-cover">
            <Image
              src={user.image ? user.image : "/user.svg"}
              alt="Your Photo"
              width={100}
              height={100}
              className="sm:w-16 sm:h-16 w-22 h-22 shrink-0 rounded-full border-2 object-cover border-gray-200"
            />
          </div>
        </div>
        {/* text */}
        <div className="px-3">
          <h2 className="sm:text-xl text-2xl capitalize font-semibold line-clamp-1">
            {user.name}
          </h2>
          <h3 className="sm:text-[13px]  line-clamp-1">{user.headline}</h3>
          <h3 className="sm:text-[13px]  text-blackLight line-clamp-1 capitalize">
            {user.city}
          </h3>
          <h3 className="sm:text-[12px] line-clamp-1">{user.school}</h3>
        </div>
      </Link>
    </div>
  );
}

export default TopProfile;
