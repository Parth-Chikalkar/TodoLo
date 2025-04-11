import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import axios from 'axios';

function Card({color , elem}) {

    const created = elem.createdAt.split('T')[0];
    const due = elem.DueDate.split('T')[0];
    const handleDelete = async (id)=>{
    const token = sessionStorage.getItem('Token')
    const res = await axios.post('http://localhost:3000/api/deleteTask',{id,token});
    alert(res.data.message);
    window.location.reload();
    }
    const handleEditPrompt = async (bool,id) => {
      if(bool){
        alert('Cannot edit completed task ! ');
        return ;
      }
      const token = sessionStorage.getItem('Token');
    
      const newTitle = prompt("Enter new Task Title:", elem.taskTitle);
      if (!newTitle) return;
    
      const newDesc = prompt("Enter new Task Description:", elem.taskDescription);
      if (newDesc === null) return;
    
      const newDueDate = prompt("Enter new Due Date (YYYY-MM-DD):", elem.DueDate.split('T')[0]);
      if (!newDueDate) return;
    
      const res = await axios.post('http://localhost:3000/api/editTask', {
        id,
        token,
        newTitle,
        newDesc,
        newDueDate,
      });
    
      alert(res.data.message);
      window.location.reload();
    };
    const isComplete = async (id,bool)=>{
      if(bool){
        return;
      }
      const token = sessionStorage.getItem('Token')
      const res = await axios.post('http://localhost:3000/api/completed',{id,token})
      alert(res.data.message);
      window.location.reload();
   
    }
    
  return (
    <div className={`${color} min-h-40 rounded-lg p-4 w-72 `}>
       <div className='w-full flex items-center justify-between'>
       <h1 className={`text-xl ${elem.isCompleted ? "line-through" : "no-underline"} leading-tight font-semibold`}>{elem.taskTitle} </h1>
       <h1 className='text-sm font-semibold py-1 px-2 whitespace-nowrap bg-red-500 shadow rounded-lg '>{due}</h1>
       </div>
        <p className='text-sm font-thin leading-tight mt-4'>{elem.taskDescription}</p>
        <h1 className='mt-2 font-thin'>Created On {created}</h1>
        <div className=' w-full  gap-3 mt-1  items-end flex '>
        <MdDeleteOutline onClick={()=>handleDelete(elem._id)} className=' scale-150 px-1 py-1 rounded-full bg-white/20 hover:cursor-pointer' />
        <CiEdit onClick={()=>handleEditPrompt(elem.isCompleted,elem._id)} className='scale-150 px-1 py-1 bg-white/20 rounded-full hover:cursor-pointer' />
        </div>
        <div onClick={()=>isComplete(elem._id,elem.isCompleted)} className='w-full flex items-center bg-white/20 justify-center h-10  rounded-md border mt-4 hover:cursor-pointer'>
          {!elem.isCompleted ?<h1>Mark As Done</h1> : <h1>Completed ✔️</h1>}
        </div>
    </div>
  )
}

export default Card