import axios from 'axios'
import React, { useState } from 'react'
import { data, useNavigate } from 'react-router-dom'

function Signup() {
     // Input Handling ! 
     const [username , setusername] = useState();
     const [email , setemail] = useState();
     const [password , setpassword] = useState();
const nav = useNavigate();
 const HandleSubmit = async (e)=>{
e.preventDefault();
const res = await axios.post('http://localhost:3000/api/create',{username,password,email});
alert(res.data.message);
if(res.status==200){
    sessionStorage.setItem('Token',res.data.token);
}
nav('/');
 }
 
   
  return (
    <div className='bg-zinc-900 flex items-center justify-center w-full h-screen '>
         <div className=' w-96 text-white bg-linear-to-br flex items-center p-5 flex-col from-purple-400 shadow-lg shadow-zinc-6=500 to-purple-700 rounded-lg border-1 border-amber-50 '>
       <h1 className='text-3xl  font-semibold'>Sign In </h1>
        <form action="" className='w-full mt-3 flex flex-col gap-2' onSubmit={HandleSubmit}>
            <h3 className='font-thin text-sm' >Username</h3>
            <input onChange={(e)=>setusername(e.target.value)} className='w-full bg-white/40 rounded-md p-2 h-10' type="text" required/>
            <h3 className='font-thin text-sm' >Email</h3>
            <input onChange={(e)=>setemail(e.target.value)} className='w-full bg-white/40 rounded-md p-2 h-10'  type="email" required/>
            <h3 className='font-thin text-sm'>Password</h3>
            <input className='w-full bg-white/40 p-2 rounded-md h-10' onChange={(e)=>setpassword(e.target.value)} type="password" required />
            <button type='submit' className='hover:cursor-pointer mt-2 '>Sign Up</button>
        </form>
       
    </div>
    </div>
  )
}

export default Signup