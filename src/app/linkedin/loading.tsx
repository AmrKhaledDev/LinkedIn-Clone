import Loader from '@/components/Loader/Loader'
import Image from 'next/image'
// ====================================================================
function loading() {
  return (
    <div className='h-screen flex items-center justify-center flex-col gap-4'>
      <Image src={"/login-logo.svg"} alt='Logo' width={200} height={200} className='lg:w-[150px] w-[110px] h-fit '/>
      <Loader/>
    </div>
  )
}

export default loading
