'use client'
import { getData } from '@/Functions/function'
import { GoogleProvider, auth } from '@/firebase/config'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonLoad, setIsButtonLoad] = useState(false);
    const Router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsButtonLoad(true);
            signInWithEmailAndPassword(auth, email, password)
            const data = await getData("users", email);
            if (data.position === 'employer') {
                Router.push('/employer/dashboard')
            } else {
                Router.push('/dashboard')
            }
        } catch (error) {
            console.log(error.message);
            setIsButtonLoad(false);
        }
    };
    const handleGoogleSubmit = async () => {
        try {
            const userCredential = await signInWithPopup(auth, GoogleProvider);
            const user = userCredential.user;
            const data = await getData("users", user.email);
            if (data.position === 'employer') {
                Router.push('/employer/dashboard');
            } else {
                Router.push('/dashboard');
            }
        } catch (error) {
            alert("Login Failed, Try Again !!");
        }
    }


    return (
        <div className='p-8 flex flex-col items-center w-full sm:w-3/4 lg:w-1/3 bg-primary text-white rounded-[1rem] shadow-md'>
            <h1 className='text-4xl font-semibold flex items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-12 icon icon-tabler icons-tabler-outline icon-tabler-arrow-left-right">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 13l4 -4l-4 -4" />
                <path d="M7 13l-4 -4l4 -4" />
                <path d="M12 14a5 5 0 0 1 5 -5h4" />
                <path d="M12 19v-5a5 5 0 0 0 -5 -5h-4" />
            </svg>ZenWork</h1>
            <p className='text-zinc-500 mt-2 text-center'>Assigning work to right people at the right time</p>
            <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-5 mt-6 sm:mt-16'>
                <input onChange={(e) => setEmail(e.target.value)} className='w-full p-2' type="text" placeholder='Email' required />
                <input onChange={(e) => setPassword(e.target.value)} className='w-full p-2' type="password" placeholder='Password' required />
                <button disabled={isButtonLoad} type='submit' className='w-fit flex gap-2 items-center bg-blue-500 disabled:bg-blue-700 p-2 px-10 text-white rounded-[0.4rem] hover:bg-blue-700 mt-2'>Login {
                    isButtonLoad && (
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 3a9 9 0 1 0 9 9" />
                        </svg>
                    )
                }</button>
                <div className='w-full flex items-center gap-2'>
                    <hr className='w-full border border-gray-500' />
                    <span>or</span>
                    <hr className='w-full border border-gray-500' />
                </div>
                <button onClick={handleGoogleSubmit} type='button' className='flex gap-2 items-center bg-blue-500 hover:bg-blue-700 p-[0.2rem] text-white '>
                    <Image src={'/google.svg'} className=' bg-white p-2' height={45} width={45} />
                    <span className='font-semibold px-3'>
                        Sign up with Google
                    </span>
                </button>
            </form>
            <p className='mt-4'>Are you a new user? <Link href={'/signup'} className='font-semibold'>Signup</Link> </p>
        </div>
    )
}

export default LoginForm