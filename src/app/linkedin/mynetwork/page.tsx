export const dynamic = "force-dynamic";

import { GetUser } from "@/lib/GetUser";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LeftSide from "@/components/LeftSide/LeftSide";
import UsersDesign from "./_components/UsersDesign";
import Image from "next/image";
// =======================================================
async function page() {
  const userSession = await GetUser();
  if (!userSession) return redirect("/login");
  const usersInNetWork = await prisma.user.findMany({
    where: {
      country: {
        equals: userSession.country,
        mode: "insensitive",
        not: null,
      },
      id: { not: userSession.id },
    },
    include: {
      followers: true,
    },
    take: 9,
    orderBy: {
      createdAt: "desc",
    },
  });
  const usersFromAroundTheWorld = await prisma.user.findMany({
    where: {
      id: { not: userSession.id },
    },
    include: {
      followers: true,
    },
    take: 9,
  });
  return (
    <main className="space-section min-h-screen bg-[#F4F2EE]">
      <div className="container-css p-3 flex gap-5 lg:flex-row flex-col">
        <div className="lg:block hidden">
          <LeftSide />
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <div className="px-3 py-5 flex-1 shadow bg-white rounded">
            {userSession.country !== null && (
              <p className="font-semibold md:text-[15px] sm:text-sm text-[13px] text-gray-900 mb-5">
                There are also people in {userSession.country} you can follow
              </p>
            )}
            {usersInNetWork.length < 1 ? (
              <div className={`w-full flex flex-col gap-2 items-center justify-center ${usersFromAroundTheWorld.length < 1 && "h-full"}`}>
                <Image
                  src={"/photo-no-users.svg"}
                  alt="Photo"
                  width={500}
                  height={500}
                  className="sm:w-60 w-45"
                />
                <h2 className="font-semibold text-gray-700">No users found</h2>
                <p className="font-normal text-gray-600 text-sm text-center">
                  {userSession.country
                    ? " Unfortunately, no one from your country was found"
                    : " Please enter your country to help you find people"}
                </p>
              </div>
            ) : (
              <UsersDesign users={usersInNetWork} userSession={userSession} />
            )}
          </div>
          {usersFromAroundTheWorld.length > 0 && (
            <div className="px-3 py-5 flex-1 shadow bg-white rounded">
              <p className="font-semibold md:text-[15px] sm:text-sm text-[13px] text-gray-900 mb-5">
                These users are from around the world
              </p>
              <UsersDesign
                users={usersFromAroundTheWorld}
                userSession={userSession}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default page;
