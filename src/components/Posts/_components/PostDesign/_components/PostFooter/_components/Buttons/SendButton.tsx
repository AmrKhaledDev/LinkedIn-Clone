import { IoIosSend } from "react-icons/io";
// ==========================================================================
function SendButton() {
  return (
    <div
      className={`
      flex items-center gap-2 cursor-pointer sm:py-2 sm:px-4 py-1 px-2 rounded transition-css
      hover:bg-gray-100 text-slate-700
    `}
    >
      <i className="sm:text-[20px] text-[25px]">
        <IoIosSend />
      </i>
      <h2 className="sm:text-[14px] sm:block hidden text-[12px] font-bold">Send</h2>
    </div>
  );
}

export default SendButton;
