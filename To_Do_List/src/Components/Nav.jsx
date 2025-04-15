import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { CiDark, CiLight } from "react-icons/ci";
function Nav({username}) {
  const[bool,setbool] = useState(false);
  return (
    <div className='w-full h-16 px-5 flex justify-between items-center bg-white/5 '>
       <h1 className='text-xl font-semibold'>Hello👋 <span className='text-sm px-2 py-1 rounded-md bg-red-600 font-semibold'>{username}</span></h1>
       <div className='flex gap-3 item-center justify-center'>
       <Link to='/addTask'> <button  className='text-sm whitespace-nowrap px-2 py-1 rounded-md hover:cursor-pointer hover:scale-105 transition bg-blue-500 font-semibold'>Add A Task +</button></Link>
        
       <button onClick={()=>{sessionStorage.clear();window.location.reload()}} className='text-sm px-2 py-1 rounded-md hover:cursor-pointer hover:scale-105 flex items-center justify-center transition whitespace-nowrap bg-red-600 font-semibold'>Logout ☹️</button>
       <div onClick={()=>setbool(!bool)} className=' hover:cursor-pointer h-full rounded-full my-auto'>{!bool ? <CiDark /> : <CiLight />}</div>
       </div>
    </div>
  )
}

export default Nav