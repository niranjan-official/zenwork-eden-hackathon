import TeamTable from '@/components/TeamTable'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex flex-col'>
            <h3 className='text-3xl font-semibold'>Team Members</h3>
            <hr className='my-4 border border-black' />
            <div className='w-full flex flex-1 justify-center'>
                <div className='w-full sm:w-1/2 mt-10'>
                <TeamTable />
                </div>
            </div>
        </div>
    )
}

export default page