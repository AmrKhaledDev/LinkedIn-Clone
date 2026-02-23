import Image from "next/image";
import Link from "next/link";
import BottomLinks from "./_components/BottomLinks";
import TopProfile from "./_components/TopProfile";
// ===========================================================
function LeftSide() {
  return (
    <aside className="xl:w-65 lg:w-90 sm:w-65 flex flex-col gap-2 w-full lg:sticky lg:top-18 lg:self-start">
      <TopProfile />
      <div className="p-5 rounded-[10px] border border-[#DFDEDA] bg-white">
        <Link
          href={"/linkedin/mynetwork"}
          className="group hover:underline flex items-center justify-between"
        >
          <div>
            <h3 className="xl:text-[13px] lg:text-[15px] sm:text-[13px]">
              Connections
            </h3>
            <h2 className="text-blackLight xl:text-[14px] lg:text-[16px] sm:text-[14px]">
              Grow your network
            </h2>
          </div>
          <Image
            src={"/add-friend-icon.svg"}
            alt="Add Friend Icon"
            width={50}
            height={50}
            className="xl:w-5 lg:w-6 sm:w-5 w-6 border-b group-hover:border-b-black border-transparent"
          />
        </Link>
      </div>
      <BottomLinks />
    </aside>
  );
}

export default LeftSide;
