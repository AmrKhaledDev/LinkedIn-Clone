import { GetUser } from "@/lib/GetUser";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LeftSide from "@/components/LeftSide/LeftSide";
import Image from "next/image";
import Link from "next/link";
// =======================================================
async function page() {
  const userSession = await GetUser();
  if (!userSession) return redirect("/login");
  const usersInNetWork = await prisma.user.findMany({
    where: {
      country: {
        equals: userSession.country,
        mode: "insensitive",
      },
    },
    take: 9,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="space-section min-h-screen bg-[#F4F2EE]">
      <div className="container-css p-3 flex gap-5 lg:flex-row flex-col">
        <div className="lg:block hidden">
          <LeftSide />
        </div>
        <div className="px-3 py-5 flex-1 shadow bg-white rounded">
          <p className="font-semibold md:text-[15px] sm:text-sm text-[13px] text-gray-900 mb-5">
            There are also people in {userSession.country} you can follow
          </p>
          <div className="grid md:grid-cols-3 grid-cols-2 lg:gap-4 sm:gap-2 gap-0.5">
            {usersInNetWork.map(
              (user) =>
                user.id !== userSession.id && (
                  <div
                    key={user.id}
                    className="rounded overflow-hidden border border-gray-200 hover:shadow-2xl transition-css"
                  >
                    <div>
                      <Image
                        src={user.imageProfile || "/card-bg.svg"}
                        alt="User Profile"
                        width={400}
                        height={400}
                        className="w-full sm:h-17.5 h-15 object-cover"
                      />
                      <Image
                        src={user.image || "/user.svg"}
                        alt="User Profile"
                        width={400}
                        height={400}
                        className="sm:w-17 sm:h-17 w-14 h-14 sm:-mt-14 -mt-9 rounded-full object-cover shrink-0 sm:ml-4 ml-2"
                      />
                    </div>
                    <div className="sm:px-3 px-1.5 pb-2 mt-2 flex flex-col gap-1">
                      <Link
                        href={`/linkedin/u/${user.id}`}
                        className="font-semibold hover:underline capitalize sm:text-[17px] line-clamp-1 break-all w-fit"
                      >
                        {user.name}
                      </Link>
                      <Link
                        href={`/linkedin/u/${user.id}`}
                        className="font-normal sm:text-sm text-[12px] text-gray-600 line-clamp-2 break-all w-fit"
                      >
                        {user.headline}
                      </Link>
                      <span className="sm:text-[12px] text-[11px] font-normal text-gray-600">
                        35,146 followers
                      </span>
                      <button className="text-primary border sm:text-[15px] text-sm hover:bg-blue-50 mt-1 border-primary rounded-full sm:py-1 font-bold py-0.5 px-3 cursor-pointer">
                        Follow
                      </button>
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
