import React from 'react'
import { Link } from 'react-router-dom';

function Nav({username}) {
  return (
    <div className='w-full h-16 px-5 flex justify-between items-center bg-white/5 '>
       <h1 className='text-xl font-semibold'>Hello👋 <span className='text-sm px-2 py-1 rounded-md bg-red-600 font-semibold'>{username}</span></h1>
       <div className='flex gap-3 item-center justify-center'>
       <Link to='/addTask'> <button  className='text-sm  px-2 py-1 rounded-md hover:cursor-pointer hover:scale-105 transition bg-blue-500 font-semibold'>Add A Task +</button></Link>
       <button onClick={()=>{sessionStorage.clear();window.location.reload()}} className='text-sm px-2 py-1 rounded-md hover:cursor-pointer hover:scale-105 transition bg-red-600 font-semibold'>Logout ☹️</button>
       </div>
    </div>
  )
}

export default Nav