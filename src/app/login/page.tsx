import Link from "next/link";
import LoginImage from "./_components/LoginImage";
import ButtonAuthO from "@/components/ButtonAuthO/ButtonAuthO";
// ==================================================================
function LoginPage() {
  return (
    <main className="min-h-[97dvh] flex items-center justify-center sm:pt-40 pt-37">
      <div className="container-css p-3">
        <div className="flex items-center lg:justify-between justify-center w-full lg:gap-5 gap-8 lg:flex-row flex-col">
          <div className="flex flex-col gap-10 lg:w-[50%] md:w-full lg:items-start items-center lg:text-start text-center">
            <div className="space-y-5">
              <h1 className="lg:text-5xl sm:text-4xl text-3xl text-primary flex flex-col gap-2 login-h1 font-semibold">
                Welcome to your <span>professional community</span>
              </h1>
              <p className="text-blackLight sm:text-[15px] text-[14px] lg:px-0 sm:px-15">
                Linkedin is a professional platform that lets you showcase your
                skills and experience, connect with professionals, and explore
                job opportunities and growth in your field easily.
              </p>
            </div>
            <div className="space-y-3">
              <ButtonAuthO />
              <Link
                href={"/credential-login"}
                className="flex sm:text-[15px] bg-hoverColor text-[14px] shadow text-white items-center justify-center gap-3  py-3 sm:w-87.5 w-75 rounded-full cursor-pointe hover:bg-primary"
              >
                Sign in with Email
              </Link>
            </div>
            <p className="text-blackLight lg:text-center lg:w-1/2 ">
              New to Linkedin?{" "}
              <Link
                className="font-semibold text-primary underline"
                href={"/register"}
              >
                Join now
              </Link>
            </p>
          </div>
          <LoginImage />
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
