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
    const Router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            signInWithEmailAndPassword(auth, email, password)
            const data = await getData("users",email);
            if(data.position==='employer'){
                Router.push('/employer')
            }else{
                Router.push('/dashboard')
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleGoogleSubmit = () => {

        signInWithPopup(auth, GoogleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                Router.push("/dashboard");
            }).catch((error) => {
                
                alert("Login Failed, Try Again !!");
            });
    }

    return (
        <div className='p-8 flex flex-col items-center w-full sm:w-3/4 lg:w-1/3 bg-primary text-white rounded-[1rem] shadow-md'>
            <h1 className='text-4xl font-semibold'>ZenWork</h1>
            <p className='text-zinc-500 mt-2 text-center'>Assigning work to right people at the right time</p>
            <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-5 mt-6 sm:mt-16'>
                <input onChange={(e) => setEmail(e.target.value)} className='w-full p-2' type="text" placeholder='Email' required />
                <input onChange={(e) => setPassword(e.target.value)} className='w-full p-2' type="password" placeholder='Password' required />
                <button type='submit' className='w-fit bg-blue-500 p-2 px-10 text-white rounded-[0.4rem] hover:bg-blue-700 mt-2'>Login</button>
                <div className='w-full flex items-center gap-2'>
                    <hr className='w-full border border-gray-500' />
                    <span>or</span>
                    <hr className='w-full border border-gray-500' />
                </div>
                <button onClick={handleGoogleSubmit} type='button' className='flex gap-2 items-center bg-white py-3 px-2 text-black '>
                    <Image src={'/google.svg'} height={30} width={30} />
                    <span className=''>
                        Continue with Google
                    </span>
                </button>
            </form>
            <p className='mt-4'>Are you a new user? <Link href={'/signup'} className='font-semibold'>Signup</Link> </p>
        </div>
    )
}

export default LoginForm