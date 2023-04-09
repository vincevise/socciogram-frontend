import React from 'react'

const CustomToolTip = ({title, pos, children}) => {
    let postion = 'left-[55px] lg:hidden'
    if(pos === 'top'){
        postion = 'bottom-[45px]'
    }
  return (
    <div className='relative group flex items-center'>
        {children}
        <span className={`absolute ${postion}   opacity-0 group-hover:opacity-100 transition duration-500 bg-white px-2 py-1 drop-shadow-lg	 rounded-md font-medium text-sm`}>{title}</span>
    </div>
  )
}

export default CustomToolTip