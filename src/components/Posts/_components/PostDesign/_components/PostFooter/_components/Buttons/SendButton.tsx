import { LuSend } from "react-icons/lu";
// ==========================================================================
function SendButton() {
  return (
    <div
      className={`
      flex items-center gap-2 cursor-pointer sm:py-2 sm:px-4 py-1 px-2 rounded transition-css
      hover:bg-gray-100 text-slate-700
    `}
    >
      <i className="text-[20px] send">
        <LuSend />
      </i>
      <h2 className="text-[14px] font-bold sendText">Send</h2>
    </div>
  );
}

export default SendButton;
