import LoginForm from '@/components/LoginForm'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center bg-primary sm:bg-slate-200 px-4'>
            <LoginForm/>
        </div>
    )
}

export default page