import { GetUser } from "@/lib/GetUser";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PiCityDuotone } from "react-icons/pi";
// ===================================================
async function TopProfile() {
  const user = await GetUser();
  if (!user) redirect("/login");
  return (
    <div className="overflow-hidden bg-white rounded-[10px] border border-[#DFDEDA] sm:block hidden">
      <Link
        href={"/linkedin/profile"}
        className="flex flex-col sm:gap-10 gap-13 pb-6"
      >
        {/* Images */}
        <div className="relative">
          <Image
            src={user.imageProfile ? user.imageProfile : "/card-bg.svg"}
            alt="Your Profile image"
            width={400}
            height={400}
            className="w-full xl:h-15 lg:h-20 sm:h-20 h-40 object-cover"
          />
          <div className="absolute -bottom-9 left-3 object-cover">
            <Image
              src={user.image ? user.image : "/user.svg"}
              alt="Your Photo"
              width={100}
              height={100}
              className="xl:w-18 xl:h-18 lg:w-20 lg:h-20 sm:w-16 sm:h-16 w-22 h-22 shrink-0 rounded-full border-2 object-cover border-white"
            />
          </div>
        </div>
        {/* text */}
        <div className="px-3">
          <h2 className="xl:text-xl lg:text-2xl sm:text-xl text-2xl capitalize font-extrabold line-clamp-1">
            {user.name}
          </h2>
          <h3 className="xl:text-[12px] lg:text-[14px] sm:text-[13px] text-[12px] font-normal line-clamp-2">
            {user.headline}
          </h3>
          <h3 className="xl:text-[13px] lg:text-[14px] sm:text-[13px] text-[12px]  text-blackLight line-clamp-1 capitalize">
            {user.city}
          </h3>
          {user.school && (
            <h3 className="xl:text-[11px] lg:text-[12px] flex items-center gap-1 sm:text-[12px] text-[12px] line-clamp-1 font-semibold">
              <i className="text-[17px] pb-0.5 text-hoverColor">
                <PiCityDuotone />
              </i>
              {user.school}
            </h3>
          )}
        </div>
      </Link>
    </div>
  );
}

export default TopProfile;
