import React from 'react'

const pages = () => {
  return (
    <div className='w-full flex flex-col justify-between'>
      <div className='flex flex-col'>
        <h3 className='text-3xl font-semibold'>Group Chat</h3>
        <hr className='border border-black my-4' />
      </div>
      <div className='flex border-2 border-gray-500 rounded-3xl items-center'>
        <input type="text" placeholder='Send messages' className='w-full p-3' />
        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-send-2 mr-4">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
          <path d="M6.5 12h14.5" />
        </svg>
      </div>

    </div>
  )
}

export default pages