import Link from "next/link";
import { RiMailCheckFill } from "react-icons/ri";
import { RiMailCloseFill } from "react-icons/ri";
// ==========================================================================
function VerificationResult({
  typeResult,
  message,
}: {
  typeResult: "SUCCESS" | "FAILED";
  message: string;
}) {
  return (
    <div className="flex items-center flex-col gap-6 bg-white shadow-xl p-10 rounded-2xl">
      <i
        className={`text-[80px] ${typeResult === "SUCCESS" ? "text-green-400" : "text-red-400"}`}
      >
        {typeResult === "SUCCESS" ? <RiMailCheckFill /> : <RiMailCloseFill />}
      </i>
      <h2
        className={`text-4xl font-extrabold bg-linear-to-r  text-transparent bg-clip-text 
        ${typeResult === "SUCCESS" ? "from-green-400 to-green-500" : "from-red-400 to-red-500"}`}
      >
        {typeResult === "SUCCESS"
          ? "Verification successful"
          : "Verification failed"}
      </h2>
      <p className="text-gray-400 font-normal">{message}</p>
      <Link href={"/credential-login"}
        className={` w-full hover:scale-105 text-center transition-css shadow py-3 px-6 rounded-2xl text-white font-bold 
        ${typeResult === "SUCCESS" ? "bg-green-400 hover:bg-green-500" : "bg-red-400 hover:bg-red-500"}`}
      >
        Go To Login
      </Link>
    </div>
  );
}

export default VerificationResult;
