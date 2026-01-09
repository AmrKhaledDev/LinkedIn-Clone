import Image from "next/image";
// ====================================================================
function loading() {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-4">
      <Image
        src={"/login-logo.svg"}
        alt="Logo"
        width={200}
        height={200}
        className="lg:w-37.5 w-27.5 h-fit "
      />
      <div className="flex space-x-1 items-center justify-center">
        <div className="size-1.5 bg-primary rounded-full animate-[bounce_1s_infinite_0ms]"></div>
        <div className="size-1.5 bg-primary rounded-full animate-[bounce_1s_infinite_200ms]"></div>
        <div className="size-1.5 bg-primary rounded-full animate-[bounce_1s_infinite_400ms]"></div>
      </div>
    </div>
  );
}

export default loading;
