'use client'
import { auth, db } from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignupForm = () => {

    const Router = useRouter();
    const [isButtonLoad, setIsButtonLoad] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        position: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsButtonLoad(true);
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            // The user is created successfully, now add additional data to Firestore
            await setDoc(doc(db, "users", userData.email), {
                name: userData.username,
                email: userData.email,
                position: userData.position,
                active: true,
                completionTime: 0
            });

            // After both operations succeed, navigate the user
            if (userData.position === "employer") {
                Router.push('/employer/dashboard');
            } else {
                Router.push('/dashboard');
            }
        } catch (error) {
            console.error(error.message);
            alert(error.message);
            setIsButtonLoad(false);
        }
    };

    return (
        <div className='p-8 flex flex-col items-center w-full sm:w-3/4 lg:w-1/3 bg-primary text-white rounded-[1rem] shadow-md'>
            <h1 className='text-4xl font-semibold'>ZenWork</h1>
            <p className='text-zinc-500 mt-2 text-center'>Assigning work to right people at the right time</p>
            <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-5 mt-6'>
                <input
                    className='w-full p-2'
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder='Username'
                    required
                />
                <input
                    className='w-full p-2'
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder='Email'
                    required
                />
                <input
                    className='w-full p-2'
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder='Create Password'
                    required
                />
                <div className='flex gap-4'>
                    <div className='items-center flex gap-2'>
                        <input
                            onChange={handleChange}
                            checked={userData.position === "employer"}
                            value="employer"
                            name='position'
                            className='p-2 size-5'
                            type="radio"
                            required
                        />
                        <label htmlFor="">Are you an Employer?</label>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input
                            onChange={handleChange}
                            checked={userData.position === "employee"}
                            value="employee"
                            name='position'
                            className='p-2 size-5'
                            type="radio"
                            required
                        />
                        <label htmlFor="">Are you an Employee?</label>
                    </div>
                </div>
                <button
                    type='submit'
                    disabled={isButtonLoad}
                    className='w-fit flex gap-2 items-center bg-blue-500 disabled:bg-blue-700 p-2 px-10 text-white rounded-[0.4rem] hover:bg-blue-700 mt-2'
                >
                    Signup
                    {
                        isButtonLoad && (
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 3a9 9 0 1 0 9 9" />
                            </svg>
                        )
                    }
                </button>
                <div className='w-full flex items-center gap-2'>
                    <hr className='w-full border border-gray-500' />
                    <span>or</span>
                    <hr className='w-full border border-gray-500' />
                </div>
                <button type='button' className='flex gap-2 items-center bg-white py-3 px-2 text-black '>
                    <Image src={'/google.svg'} height={30} width={30} />
                    <span className=''>
                        Continue with Google
                    </span>
                </button>
            </form>
            <p className='mt-4'>Already have an account? <Link href={'/login'} className='font-semibold'>Login</Link> </p>
        </div>
    )
}

export default SignupForm