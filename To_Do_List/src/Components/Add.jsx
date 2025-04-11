
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Add() {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
    const [title,settitle]=useState();
    const [des,setdes]=useState();
    const [date,setdate]=useState();
    const nav = useNavigate();
    const handleSub = async (e)=>{
        e.preventDefault();
        const token = sessionStorage.getItem('Token');
        const res = await axios.post(`${baseURL}/api/edit`,{title,des,date,token});
        alert(res.data.message);
        nav('/');
    }

  return (
    <div className='w-full flex items-center justify-center flex-col   h-screen bg-zinc-900'>
        <h1 className='text-xl font-mono text-white m-2'>Add Your Task Details 🤖</h1>
         <div className='w-96  rounded-lg p-4 flex   items-center flex-col text-white border bg-linear-to-br from-orange-400 to-red-600'>
            <h1 className='text-xl font-mono underline'>Task</h1>
            <form onSubmit={handleSub} className='w-full flex flex-col gap-2 '>
            <h4 className='font-thin text-sm'>Task Title</h4>
            <input type="text" onChange={(e)=>settitle(e.target.value)} className='bg-white/40 rounded-md p-2 w-full h-10' />
            <h4 className='font-thin text-sm'> Task Description</h4>
            <textarea onChange={(e)=>setdes(e.target.value)} className='bg-white/40 resize-none rounded-md p-2 w-full h-20' ></textarea>
            <h4 className='font-thin text-sm'>Task Due </h4>
            <input className='bg-white/40 rounded-md p-2 w-full h-10' onChange={(e)=>setdate(e.target.value)} type="date" />
            <button type='submit' className='text-shadow-lg hover:cursor-pointer mt-1' >Create Task</button>
            <Link to='/' className="text-sm w-full underline justify-between px-auto flex items-center text-blue-400 " >Home</Link>
            </form>
         </div>

    </div>
  )
}

export default Add