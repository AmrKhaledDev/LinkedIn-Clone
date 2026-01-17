import Image from "next/image";
import Link from "next/link";
// =========================================================
function Article() {
  return (
    <Link
      href={"/linkedin/article/new"}
      className="flex items-center text-[14px] gap-2 text-blackLight hover:bg-gray-100 rounded cursor-pointer py-2 px-4 transition-css"
    >
      <Image
        src={"/article-icon.svg"}
        alt={"Article icons"}
        width={50}
        height={50}
        className="sm:w-6 w-7"
      />
      <span className="sm:block hidden"> Write article</span>
    </Link>
  );
}

export default Article;
