import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
     const [username , setusername] = useState();   
  const [password , setpassword] = useState();
         const nav = useNavigate();
 const HandleSubmit = async (e)=>{
e.preventDefault();
const res = await axios.post('http://localhost:3000/api/checkUser',{username,password});

if(res.status==200){
    sessionStorage.setItem('Token',res.data.token);
}
alert(res.data.message);
window.location.reload();
nav('/');
 }
  return (
   <> <h1 className='w-1/2 text-center m-2 text-white italic'>Welcome to <span className='py-1 px-2 rounded-md bg-purple-500 '>ToDoLo</span> where productivity meets simplicity. Organize your tasks effortlessly with a clean, intuitive design that helps you focus on what truly matters</h1>
    <div className=' w-96 text-white bg-linear-to-br flex items-center p-5 flex-col from-purple-400 shadow-lg shadow-zinc-500 to-purple-700 rounded-lg border-1 border-amber-50 '>
      
       <h1 className='text-3xl  font-semibold'>Sign In </h1>
        <form onSubmit={HandleSubmit} className='w-full mt-3 flex flex-col gap-2'>
            <h3 className='font-thin text-sm' >Username</h3>
            <input className='w-full bg-white/40 rounded-md p-2 h-10' onChange={(e)=>setusername(e.target.value)} type="text" required/>
            <h3 className='font-thin text-sm'>Password</h3>
            <input className='w-full bg-white/40 p-2 rounded-md h-10' onChange={(e)=>setpassword(e.target.value)} type="password" required />
            <button type='submit' className='hover:cursor-pointer mt-2 '>Submit</button>
        </form>
        <h2 className='mt-1 text-sm'>New User ? <Link to='/Signup'><span className='text-blue-400 hover:cursor-pointer'>Sign Up</span></Link></h2>
    </div>
    </>
  )
}

export default Login