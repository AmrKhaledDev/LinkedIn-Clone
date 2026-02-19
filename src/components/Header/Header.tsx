import Image from "next/image";
import Link from "next/link";
import InputSearch from "./_components/InputSearch";
import Navlinks from "./_components/Navlinks";
import Me from "./_components/Me";
import { GetUserWithRelation } from "@/lib/GetUserWithRelation";
import { prisma } from "@/lib/prisma";
// ======================================================================
async function Header() {
  const user = await GetUserWithRelation();
  if (!user) return;
  const notificationNotRead = await prisma.notification.findMany({
    where: {
      recipientId: user.id,
      readAt: null,
    },
  });
  return (
    <header className="border-b border-b-slate-200 w-full fixed top-0 lg:pb-0 pb-15 bg-white z-15">
      <div className="container-css px-3 flex items-center justify-between h-12.5">
        <div className="flex items-center gap-3">
          <Link href={"/linkedin"}>
            <Image
              src={"/linkedin.png"}
              alt="Linkedin logo"
              width={150}
              height={150}
              className="md:w-9 w-8"
            />
          </Link>
          <InputSearch userSession={user} />
        </div>
        <div className="h-full flex items-center md:gap-10 gap-5 sm:flex-row flex-row-reverse">
          <Navlinks notificationNotRead={notificationNotRead} />
          <Me user={user} />
        </div>
      </div>
    </header>
  );
}

export default Header;
