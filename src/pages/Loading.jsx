import React from 'react'
import { Oval } from 'react-loader-spinner'
import image from '../assets/socciogram.png'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center relative'>
        <img src={image} alt="" className='w-[75px] h-[75px] absolute rounded-full' />
        <Oval
          height={80}
          width={80}
          color="black"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="white"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
    </div>
  )
}

export default Loading