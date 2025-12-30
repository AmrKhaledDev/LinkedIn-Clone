import { RiDeleteBinLine } from "react-icons/ri";
// =============================================================
function ButtonDelete() {
  return (
    <button className="flex items-center gap-2 button group cursor-pointer py-2 px-3 rounded-xl text-red-500 hover:bg-gray-100 shadow transition-css font-semibold">
      <i className="p-2 rounded bg-red-100 text-red-500 text-[20px] group-hover:bg-red-500 group-hover:text-white transition-css">
        <RiDeleteBinLine />
      </i>
      Delete photo
    </button>
  );
}

export default ButtonDelete;
