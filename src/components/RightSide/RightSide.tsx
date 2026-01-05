import Image from "next/image";
import UsersRecommendations from "./_components/UsersRecommendations";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
// =====================================================
function RightSide() {
  return (
    <aside className="w-80 flex-col gap-2 xl:flex hidden">
      <div className="shadow rounded overflow-hidden p-3 flex flex-col gap-5 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-blackLight">Add to your feed</h2>
          <Image
            src={"/feed-icon.svg"}
            alt="Feed icon"
            width={50}
            height={50}
            className="w-5"
          />
        </div>
        <div className="flex flex-col gap-4">
          <UsersRecommendations />
          <UsersRecommendations />
          <UsersRecommendations />
          <Link
            href={"/"}
            className="flex items-center gap-3 text-[14px] text-blackLight px-2 hover:bg-gray-100 rounded w-fit font-semibold hover:text-black transition-css"
          >
            View all recommendations
            <i>
              <FaArrowRightLong />
            </i>
          </Link>
        </div>
      </div>
      <div className="shadow rounded overflow-hidden p-3 bg-white">
        <Image
          src={"/banner-image.jpg"}
          alt="Banner"
          width={400}
          height={400}
          className="rounded w-100 h-62.5 object-cover"
        />
      </div>
    </aside>
  );
}

export default RightSide;
