import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <Oval
          height={80}
          width={80}
          color="gray"
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