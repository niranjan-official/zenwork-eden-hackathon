'use client'
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import React from 'react'

const LogoutButton = () => {

    const handleLogout = () =>{
        if(confirm("Do you want to logout?")){
            try {
                signOut(auth);
            } catch (error) {
                console.log(error.message);
            }
        }
    }
  return (
    <button onClick={handleLogout} className=' p-2 bg-gray-100 hover:bg-gray-300 text-primary rounded-[0.4rem] font-semibold mb-10'>Logout</button>
  )
}

export default LogoutButton