import React from 'react'
import HeaderPassword from './_components/HeaderPassword'
// =================================================================================
function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='container-css'>
        <HeaderPassword/>
      {children}
    </div>
  )
}

export default layout
