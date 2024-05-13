import SignupForm from '@/components/SignupForm'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center bg-primary sm:bg-slate-200'>
        <SignupForm/>
    </div>
  )
}

export default page