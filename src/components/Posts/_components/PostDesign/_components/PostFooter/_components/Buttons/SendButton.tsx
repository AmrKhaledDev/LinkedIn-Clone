import { IoIosSend } from "react-icons/io";
// ==========================================================================
function SendButton() {
  return (
    <div
      className={`
      flex items-center gap-2 cursor-pointer py-2 px-4 rounded transition-css
      hover:bg-gray-100 text-slate-700
    `}
    >
      <i className="text-[20px]">
        <IoIosSend />
      </i>
      <h2 className="text-[14px] font-bold">Send</h2>
    </div>
  );
}

export default SendButton;
