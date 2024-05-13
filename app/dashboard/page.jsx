'use client'
import React, { useLayoutEffect } from 'react'

const page = () => {
    useLayoutEffect(()=>{
        const userData = JSON.parse(localStorage.getItem("studentData"));
        if(userData){
          setEmail(userData.email);
        }
      },[])
  return (
    <div>
        Welcome to Employee page
    </div>
  )
}

export default page