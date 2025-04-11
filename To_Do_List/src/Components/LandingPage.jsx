import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import axios from 'axios'
import Card from './Card';
function LandingPage() {
  const colors = [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
  ];
  const randomIndex = Math.floor(Math.random() * colors.length)
  const color = colors[randomIndex];
  const [loading,setLoading]= useState(true);
  const [data,setData] = useState();
  const getData = async ()=>{
    const token = sessionStorage.getItem('Token');
    const response = await axios.post('http://localhost:3000/api/Data',{token});
     setData(response.data.data);
     setLoading(false);
    
  }
  useEffect(()=>{
    getData();
  },[])
  
  return (
    <>

    {loading ? <p className='text-white text-2xl '>Loading...</p> :  <div className='h-full w-full text-white'>
      
      <Nav username={data.username}/>
      {data.Tasks.length>0 ? 
     ( <div className='flex h-full md:h-auto pb-16 overflow-y-scroll  justify-center w-full ml:px-5 gap-8 flex-wrap mt-2'>{data.Tasks.map((elem,idx)=>{
        return <Card key={idx}   color={color} elem={elem}/>
      })}</div>)
    
      : <p>No Tasks Yet !</p>}

      
    </div> }
    </>
   
  )
}

export default LandingPage