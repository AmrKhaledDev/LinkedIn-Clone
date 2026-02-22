import Link from "next/link";
// ========================================================
function page() {
  return (
    <main className="space-section">
      <div className="container-css">
        <div className="w-75 border border-[#DFDEDA] bg-white p-3 rounded ">
          <h2>On this page</h2>
          <Link href={"/"}>Posts</Link>
          <Link href={"/"}>People</Link>
          <Link href={"/"}>Newsletters</Link>
        </div>
      </div>
    </main>
  );
}

export default page;
