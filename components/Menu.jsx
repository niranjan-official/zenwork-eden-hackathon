import Image from 'next/image'
import React from 'react'
import Sidebar from './Sidebar'
import NavButton from './NavButton'

const Menu = () => {
    return (
        <div className="w-full pr-10 md:w-max h-full flex sm:flex-col max-sm:items-center justify-between p-4 md:relative bg-primary z-50">
            <div className='flex flex-col'>
                <div className="flex items-center gap-2">
                    <h1 className="text-red-100 text-2xl">ZenWork</h1>
                </div>
                <div className='max-sm:hidden'>
                    <hr className="my-4" />
                    <Sidebar />
                </div>
            </div>
            <NavButton />
            <div className='max-sm:hidden w-full flex flex-col'>
                <button className=' p-2 bg-gray-100 text-primary rounded-[0.4rem] font-semibold mb-10'>Logout</button>
            </div>
        </div>
    )
}

export default Menu