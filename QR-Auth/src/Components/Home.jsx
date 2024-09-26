import React, { useEffect, useState } from 'react';
import QR from './QR';
import axios from 'axios';
import QrScanner from './Test';
import Orders from './Orders';
import { useAuth } from '../Context/UserContext';
function Home() {
  const [status, setStatus] = useState(false);
 
    const {user} =useAuth()
    useEffect(()=>{
  if(user) setStatus(true)

  },[])
  
 
  return (
    <>
      <h1>Home</h1>
      {status ?
      <div>

        <h2> HI - {user?.username}</h2>
        <h2>{user?.email}</h2>
        {/* <QR /> */}
        <QrScanner  />
        <Orders/>
  
      </div>
      
      :
      <h2>please Login</h2>
      }
    </>
  );
}

export default Home;
