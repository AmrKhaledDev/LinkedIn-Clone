"use client";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// ==========================================================
function InputSearch({ userSession }: { userSession: User }) {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  const pathname = usePathname();
  const [data, setData] = useState([]);
  useEffect(() => {
    const FETCHING_DATA = async () => {
      const res = await fetch(
        `/api/search-users?q=${encodeURIComponent(searchText.trim())}`,
      );
      if (!res.ok) return;
      const data = await res.json();
      setData(data);
    };
    FETCHING_DATA();
  }, [searchText]);
  useEffect(() => {
    if (searchText) setSearchText("");
    setData([]);
  }, [pathname]);
  const handleSubmit = () => {
    if (searchText.trim().length < 1) return;
    router.push(`/linkedin/search/results?q=${encodeURIComponent(searchText)}`);
  };
  return (
    <div className="lg:relative absolute lg:bottom-0 bottom-2 lg:left-0 lg:translate-x-0 left-1/2 -translate-x-1/2 w-[96%]">
      <div className="border border-gray-400 rounded-full overflow-hidden flex items-center h-8.5 lg:w-75 w-full focus-within:outline-black hover:outline-black hover:outline focus-within:outline transition-css">
        <button className="w-11 h-full flex text-sm items-center justify-center cursor-pointer text-slate-800">
          <FaSearch />
        </button>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          dir="auto"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          className="outline-none h-full w-full text-sm cursor-pointer text-black pr-2"
          placeholder="Search"
        />
      </div>
      {searchText.trim() && data && data.length > 0 && (
        <div className="absolute left-0 w-full min-h-fit max-h-100 mt-1 bg-white shadow-xl rounded-[7px] overflow-y-auto flex flex-col">
          {data.map((user: User) => (
            <Link
              href={
                userSession.id === user.id
                  ? "/linkedin/profile"
                  : `/linkedin/u/${user.id}`
              }
              key={user.id}
              className="hover:bg-gray-200 px-3 py-2"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <i className="sm:text-[15px] text-sm">
                    <FiSearch />
                  </i>
                  <div className="flex items-center gap-1">
                    <h2 className="break-all sm:text-sm text-[13px] min-w-fit max-w-42.5 line-clamp-1 font-semibold">
                      {user.name}
                    </h2>
                    {userSession.id === user.id && (
                      <>
                        <span className="size-0.75 rounded-full bg-gray-600 shrink-0" />
                        <h3 className="text-[11px]  text-gray-700 font-normal">
                          You
                        </h3>
                      </>
                    )}
                    {user.headline && (
                      <>
                        <span className="size-0.75 rounded-full bg-gray-600 shrink-0" />
                        <h3 className="text-[11px] max-w-350 font-normal text-gray-700 line-clamp-1 break-all">
                          {user.headline}
                        </h3>
                      </>
                    )}
                  </div>
                </div>
                  <Image
                    src={user.image || "/user.svg"}
                    alt="User Image"
                    width={70}
                    height={70}
                    className="rounded-full shrink-0 w-7.5 h-7.5 object-cover"
                  />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputSearch;
