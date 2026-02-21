import Image from 'next/image'
import Link from 'next/link'
// ====================================================================
function HeaderPassword() {
  return (
    <header className='flex items-center justify-between py-4'>
      <Image src={"/login-logo.svg"} alt='linkedIn logo' width={100} height={100} className='w-[110px]'/>
      <div className='space-x-4'>
        <Link href={"/credential-login"} className='font-extrabold text-gray-500 transition-css hover:bg-gray-100 p-2 rounded-full'>Sign in</Link>
        <Link href={"/register"} className='py-1.5 border transition-css border-primary px-4 rounded-full text-primary font-extrabold hover:bg-gray-50 hover:outline hover:outline-black'>Join now</Link>
      </div>
    </header>
  )
}

export default HeaderPassword
