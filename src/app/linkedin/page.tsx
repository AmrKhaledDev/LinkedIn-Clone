import Hero from "@/components/Hero/Hero";
import LeftSide from "@/components/LeftSide/LeftSide";
import RightSide from "@/components/RightSide/RightSide";
// ==================================================================
async function page() {

  return (
    <main className="space-section min-h-screen bg-[#F4F2EE]">
      <div className="container-css  p-3 flex justify-between gap-4 lg:flex-row flex-col">
        <LeftSide />
        <Hero />
        <RightSide />
      </div>
    </main>
  );
}

export default page;
