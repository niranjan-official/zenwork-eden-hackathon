import React from 'react'

const Loading = () => {
    return (
        <div className='w-full flex flex-1 justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3a9 9 0 1 0 9 9" />
            </svg>
        </div>
    )
}

export default Loading