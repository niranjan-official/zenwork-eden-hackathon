'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import TableStructure from '@/components/TableStructure'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { assignTask, calculateNumber, findOptimalPair } from '@/Functions/function'


const page = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [skill, setSkill] = useState('');
    const [deadline, setDeadline] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const [load, setLoad] = useState(false);

    const handleADD = async (e) => {
        e.preventDefault();
        setLoad(true);
        const formData = {
            title: title,
            description: description,
            skill: skill,
            deadline: deadline,
            difficulty: difficulty
        };
        console.log(formData);
        // Clear form inputs
        setTitle('');
        setDescription('');
        setSkill('');
        setDeadline('');
        setDifficulty('');

        let listPair = [];
        const list = await getEmployeeList();
        let newEmp = [];
        for (let i = 0; i < list.length; i++) {
            const empData = list[i].data;
            if (empData.active) {
                newEmp.push({ email: empData.email, name: empData.name });
                if (empData.completionTime === 0) {
                    listPair.push([0, 0]);
                } else {
                    const idilTime = calculateNumber(empData.completionTime)
                    listPair.push([idilTime,empData.lastWorkLevel]);
                }
            }
        }
        const bestPair = findOptimalPair(listPair);
        console.log("Best suitable: ", newEmp[bestPair.bestIndex]);
        const TaskData = {
            title: title,
            description: description,
            skill: skill,
            deadline: deadline,
            difficulty: difficulty
        }
        const status = await assignTask(newEmp[bestPair.bestIndex], TaskData);
        if (status) {
            alert("Task Added Succesfully !")
        } else {
            alert("something error occured..")
        }
        setLoad(false);

    };
    const getEmployeeList = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const teamMembers = []; // Initialize an empty array

            querySnapshot.forEach((doc) => {
                // Push each document's data to the array
                if (doc.data().position === 'employee') {
                    teamMembers.push({
                        id: doc.id,
                        data: doc.data()
                    });
                }
            });
            console.log(teamMembers);

            return teamMembers;
        } catch (error) {
            console.error("Error getting team members: ", error);
            return []; // Return an empty array if there's an error
        }
    };
    return (
        <div className='w-full flex flex-col'>
            <div className='w-full flex h-fit items-center justify-between'>
                <h3 className='text-3xl font-semibold'>Sample Project</h3>
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
                            <input
                                placeholder='Title'
                                className='p-2 border border-black '
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <input
                                placeholder='Description'
                                className='p-2 border border-black '
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            <select
                                className='border border-black p-2'
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                required
                            >
                                <option value="">Select the skills required</option>
                                <option value="Design">Design</option>
                                <option value="Tester">Tester</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="Frontend Developer">Frontend Developer</option>
                            </select>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="">Deadline:</label>
                                <input
                                    type="date"
                                    className='text-black p-2 border border-black'
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="">Difficulty:</label>
                                <div className='flex gap-5'>
                                    <div className='flex gap-1'>
                                        <input
                                            name='difficulty'
                                            style={{ accentColor: 'yellow' }}
                                            type="radio"
                                            value="Easy"
                                            checked={difficulty === "Easy"}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                            required
                                        />
                                        <span>Easy</span>
                                    </div>
                                    <div className='flex gap-1'>
                                        <input
                                            name='difficulty'
                                            style={{ accentColor: 'orange' }}
                                            type="radio"
                                            value="Medium"
                                            checked={difficulty === "Medium"}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                            required
                                        />
                                        <span>Medium</span>
                                    </div>
                                    <div className='flex gap-1'>
                                        <input
                                            name='difficulty'
                                            style={{ accentColor: 'red' }}
                                            type="radio"
                                            value="Hard"
                                            checked={difficulty === "Hard"}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                            required
                                        />
                                        <span>Hard</span>
                                    </div>
                                </div>
                            </div>
                        
                            <button
                                type='submit'
                                disabled={load}
                                className='w-fit flex gap-2 items-center bg-primary p-2 px-10 text-white rounded-[0.4rem] hover:bg-black mt-2'
                            >
                                ADD
                                {
                                    load && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 3a9 9 0 1 0 9 9" />
                                        </svg>
                                    )
                                }
                            </button>
                        </form>
                    </DialogContent>
                </Dialog>

            </div>
            <hr className='border border-black my-4' />
            <div className='w-full flex flex-1 pt-10 sm:px-16'>
                <TableStructure />
            </div>
        </div>
    )
}

export default page