import Image from "next/image";
// ========================================================
function Event() {
  return (
    <button className="flex items-center text-[14px] gap-2 text-blackLight hover:bg-gray-100 rounded cursor-pointer py-2 px-4 transition-css">
      <Image
        src={"/event-icon.svg"}
        alt={"Event Icon"}
        width={50}
        height={50}
        className="sm:w-6 w-7"
      />
      <span className="sm:block hidden">Event</span>
    </button>
  );
}

export default Event;
