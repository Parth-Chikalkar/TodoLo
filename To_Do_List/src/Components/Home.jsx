import React, { useEffect, useState } from 'react'
import Login from './Login';
import LandingPage from './LandingPage';

function Home() {
   
    const [hasToken, setHasToken] = useState(false);


  useEffect(() => {
    const token = sessionStorage.getItem('Token');
    setHasToken(!!token && token.length > 0 && token !='undefined');
  }, []); 

   

  return (
    <div className='bg-zinc-900  overflow-hidden flex flex-col items-center justify-center w-full h-screen '>
       
        {hasToken ? <LandingPage/> : <Login/>}
    </div>
  )
}

export default Home