import Image from 'next/image'
import Link from 'next/link'
// ====================================================================
function HeaderPassword() {
  return (
    <header className='flex items-center justify-between py-4 px-2'>
      <Image src={"/login-logo.svg"} alt='linkedIn logo' width={100} height={100} className='md:w-[110px] sm:w-[100px] w-[90px]'/>
      <div className='space-x-4'>
        <Link href={"/credential-login"} className='font-extrabold sm:text-[15px] text-sm text-gray-500 transition-css hover:bg-gray-100 p-2 rounded-full'>Sign in</Link>
        <Link href={"/register"} className='py-1.5 border sm:text-[15px] text-sm transition-css border-primary px-4 rounded-full text-primary font-extrabold hover:bg-gray-50 hover:outline hover:outline-black'>Join now</Link>
      </div>
    </header>
  )
}

export default HeaderPassword
