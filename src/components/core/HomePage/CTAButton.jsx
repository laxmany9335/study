import React from 'react'
import { Link } from 'react-router-dom'

function CTAButton({children, active, linkto}) {
  return (
   <Link to = {linkto}>
          <div className={`text-center text-[15px] px-6 py-3 rounded-md font-bold 
            ${ active ? "bg-yellow-50 text-black" : "bg-richblack-800"}
            hover:scale-95 transition-all duration-200  w-fit shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset]
           `}>
            {children}
          </div>
   </Link>
  )
}

export default CTAButton