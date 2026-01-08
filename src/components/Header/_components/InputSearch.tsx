import { RiSearch2Line } from "react-icons/ri";
// ==========================================================
function InputSearch() {
  return (
    <div className="border border-gray-300 rounded-full overflow-hidden flex items-center gap-1 h-10 lg:w-75 lg:relative absolute lg:bottom-0 bottom-2 w-[96%] lg:left-0 lg:translate-x-0 left-1/2 -translate-x-1/2">
      <button className="w-13 h-full flex items-center justify-center text-xl cursor-pointer text-slate-800">
        <RiSearch2Line />
      </button>
      <input
        type="text"
        className="outline-none h-full w-full"
        placeholder="Search "
      />
    </div>
  );
}

export default InputSearch;
