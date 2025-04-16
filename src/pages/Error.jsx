import React from 'react'
import { PiSmileySadBold } from "react-icons/pi";


function Error() {
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center text-3xl text-white font-bold'>
      <img />
       <p className='bg-richblack-500 p-20 rounded-md flex gap-x-5'> <PiSmileySadBold className=''/> <span>Errror - 404 Not Found</span></p>
    </div>
  )
}

export default Error