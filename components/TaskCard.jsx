'use client'
import React, { useEffect, useState } from 'react'
import { Progress } from './ui/progress'
import { doc, updateDoc, writeBatch } from "firebase/firestore";
import { db } from '@/firebase/config';

const TaskCard = ({ taskDetails, email ,taskId}) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (progress === 100) {
            updateCompletion();
        }
    }, [progress])

    const updateCompletion = async () => {
        try {
            if (email) {
                const washingtonRef = doc(db, "users", email);
                // Set the "capital" field of the city 'DC'
                await updateDoc(washingtonRef, {
                    active: true,
                });
                alert("task completed")
                const batch = writeBatch(db);
                batch.update(washingtonRef, {
                    active: true,
                    completionTime: new Date()
                });

                const docRef = doc(db, "tasks", taskId);
                batch.update(docRef, {
                    completion: true
                });
                await batch.commit();
            }
        } catch (error) {

        }
    }
    return (
        <div className='w-full h-fit flex bg-blue-200 rounded-xl p-4'>
            <div className='w-full flex flex-col gap-2'>
                <h3 className='text-2xl'>{taskDetails.title}</h3>
                <p className='w-full sm:w-4/5 text-sm'>{taskDetails.description}</p>
                <span className=' font-semibold'>Deadline: {taskDetails.deadline}</span>
            </div>
            <span className='h-full'>|</span>
            <div className='w-full flex flex-col items-center'>
                <h3 className='text-2xl text-center'>Completion Status</h3>
                <Progress className="w-2/3 bg-slate-200 mt-4" value={progress} />
                <div className='flex gap-10 mt-4'>
                    <button onClick={() => setProgress(prevCount => prevCount - 10)} className='size-10 bg-primary rounded-full text-white flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-minus">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                        </svg>
                    </button>
                    <button onClick={() => setProgress(prevCount => prevCount + 10)} className='size-10 bg-primary rounded-full text-white flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default TaskCard