import Link from "next/link";
// ===================================================================
function PageSidebar({q}:{q:string}) {
  return (
    <div className="w-60 border sticky top-15 sm:block hidden border-[#DFDEDA] bg-white p-3 rounded-[10px] space-y-3 h-fit">
      <h2 className="text-xl font-extrabold">On this page</h2>
      <div className="flex flex-col gap-1">
        <Link
          href={`/linkedin/search/results?q=${q}#posts`}
          className="hover:bg-gray-200 py-1 px-2 rounded"
        >
          Posts
        </Link>
        <Link
          href={`/linkedin/search/results?q=${q}#users`}
          className="hover:bg-gray-200 py-1 px-2 rounded"
        >
          People
        </Link>
      </div>
    </div>
  );
}

export default PageSidebar;
