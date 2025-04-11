import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Signup from './Components/Signup'
import Add from './Components/Add'
function App() {
  
  //  const getData =async ()=>{
  //   const res= await axios.get('http://localhost:3000/api/token');
  //   sessionStorage.setItem("Token",res.data.token);
  //  }
  //  useEffect(()=>{getData()},[]);
  return (
      <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/AddTask' element={<Add/>} />
      </Routes>


      </>
  )
}

export default App