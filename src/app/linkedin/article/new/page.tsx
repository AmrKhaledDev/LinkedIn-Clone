export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Article from "./_components/Article";
import BoxMedia from "./_components/BoxMedia";
// =========================================================
export const metadata: Metadata = {
  title: "Publish new article | Linkedin",
  description:
    "Easily publish your professional articles on LinkedIn, share your insights, showcase your expertise, and engage with a global network of professionals to grow your career.",
  icons: {
    icon: "/linkedin.png",
  },
};
function page() {
  return (
    <div className="flex justify-center mt-5">
      <div className="container-css flex flex-col gap-5 lg:w-200 md:w-175">
        <BoxMedia/>
        <Article />
      </div>
    </div>
  );
}

export default page;
