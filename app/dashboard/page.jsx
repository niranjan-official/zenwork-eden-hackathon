'use client'
import { getData } from '@/Functions/function';
import TaskCard from '@/components/TaskCard';
import React, { useEffect, useLayoutEffect, useState } from 'react'

const page = () => {
  const [email, setEmail] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [taskId, setTaskId] = useState('');
    useLayoutEffect(()=>{
        const userData = JSON.parse(localStorage.getItem("userData"));
        if(userData){
          setEmail(userData.email);
        }
      },[])

      useEffect(()=>{
        if(email){
          getUserData(email);
        }
      },[email])
      const getUserData = async(email) =>{
        const userData = await getData("users",email);
        console.log(userData);
        if(!userData.active){
          setTaskId(userData.taskId.toString());
          const taskData = await getData("tasks",userData.taskId.toString());
          setTaskDetails(taskData)
        }
        
      }
      return (
        <div className='w-full flex flex-col'>
        <h3 className='text-3xl font-semibold'>Your Assigned Task</h3>
        <hr className='border border-black my-4' />
        <div className='w-full flex flex-1'>
          {
            taskDetails && (
              <TaskCard taskDetails={taskDetails} email={email} taskId={taskId} />
            )
          }
        </div>
    </div>
  )
}

export default page