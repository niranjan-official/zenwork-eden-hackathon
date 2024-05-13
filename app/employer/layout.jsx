'use client';
import { useAuth } from '@/Functions/auth';
import Menu from '@/components/Menu';
import React from 'react'

const layout = ({children}) => {
    const User = useAuth();
  return (
    <div className="min-h-screen sm:h-screen w-screen flex flex-col sm:flex-row">
      <Menu/>
      <div className="h-full flex flex-grow bg-slate-200 p-4">{children}</div>
    </div>
  )
}

export default layout