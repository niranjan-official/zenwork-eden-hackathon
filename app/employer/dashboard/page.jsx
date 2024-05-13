'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import TableStructure from '@/components/TableStructure'


const page = () => {

    const handleADD = () =>{
        required
    }
    // const [projectData, setProjectData] = useState({
    //     title: '',
    //     description: '',
    // });
    // const [onSubmit, setOnSubmit] = useState(false)

    // useEffect(() => {

    //     const storedData = localStorage.getItem('projectdata');
    //     if (storedData) {
    //         try {
    //             const parsedData = JSON.parse(storedData);
    //             setProjectData(parsedData);
    //         } catch (error) {
    //             console.error('Error parsing localStorage data:', error);
    //         }
    //     }

    // }, []);

    // const handleSubmit = () => {
    //     e.preventDefault();
    //     console.log(projectData);
    //     const jsonString = JSON.stringify(projectData);
    //     localStorage.setItem('projectdata', jsonString);
    //     setOnSubmit(true);
    // }
    // const updateValue = (event) => {
    //     const { name, value } = event.target;
    //     const updatedObject = { ...projectData, [name]: value };
    //     setProjectData(updatedObject);
    // };

    return (
        <div className='w-full flex flex-col'>
            <div className='w-full flex h-fit items-center justify-between'>
                <h3 className='text-3xl font-semibold'>Project Name</h3>
                <Dialog>
                    <DialogTrigger asChild>
                        <button className='flex items-center gap-1 bg-primary text-white p-1 sm:p-2 rounded-3xl sm:rounded-[0.7rem]'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus w-8 h-8">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                <path d="M9 12h6" />
                                <path d="M12 9v6" />
                            </svg>
                            <span className='max-sm:hidden'>
                                Create Task
                            </span>
                        </button>

                    </DialogTrigger>
                    <DialogContent className={'bg-gray-100'}>
                        <form onSubmit={handleADD} className='w-full flex flex-col gap-3'>
                            <h3 className='text-2xl first-letter font-semibold'>
                                ADD TASK
                            </h3>
                            <input placeholder='Title' className='p-2 border border-black ' type="text" required/>
                            <input placeholder='Description' className='p-2 border border-black ' type="text" required/>
                            <select className='border border-black p-2' required>
                                <option value="">Select the skills required</option>
                                <option value="option1">Design</option>
                                <option value="option2">Tester</option>
                                <option value="option3">Backend Developer</option>
                                <option value="option4">Frontend Developer</option>
                            </select>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="">Deadline:</label>
                            <input type="date" className='text-black p-2 border border-black' required/>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="">Difficulty:</label>
                                <div className='flex gap-5'>
                                    <div className='flex gap-1'>
                                        <input name='difficiulty' style={{accentColor: 'yellow'}} type="radio" required/>
                                        <span>Easy</span>
                                    </div>
                                    <div className='flex gap-1'>
                                        <input name='difficiulty' style={{accentColor: 'orange'}} type="radio" required/>
                                        <span>Medium</span>
                                    </div>
                                    <div className='flex gap-1'>
                                        <input name='difficiulty' style={{accentColor: 'red'}} type="radio" required/>
                                        <span>Hard</span>
                                    </div>
                                </div>
                            </div>
                            <button className='p-2 px-4 text-white bg-primary'>ADD</button>
                        </form>
                    </DialogContent>
                </Dialog>

            </div>
            <hr className='border border-black my-4' />
            <div className='w-full flex flex-1 items-center px-4'>
                <TableStructure/>
            </div>
        </div>
    )
}

export default page