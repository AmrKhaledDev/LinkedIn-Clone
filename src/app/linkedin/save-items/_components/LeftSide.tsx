import { UserWithRelationType } from "@/lib/types/types";
import { FaBookmark } from "react-icons/fa";
// ============================================================
function LeftSide({user}:{user:UserWithRelationType}) {
  return (
    <div className="shadow rounded-xl w-60 bg-white flex flex-col overflow-hidden h-fit">
      <h2 className="flex sm:text-[15px] text-[14px] p-3 items-center gap-2 text-slate-600 font-semibold">
        <FaBookmark /> My Items
      </h2>
      <span className="w-full bg-slate-400 opacity-50 h-px"></span>
      <h2 className="p-3 sm:text-[15px] text-[14px] text-primary flex items-center sm:border-l-4 border-l-3 font-semibold border-l-primary justify-between">
        Saved posts <span>{user.saveItems.length}</span>
      </h2>
    </div>
  );
}

export default LeftSide;
