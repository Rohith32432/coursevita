import React, { useEffect, useState } from 'react';
import QR from './QR';
import axios from 'axios';
import QrScanner from './Test';
import Orders from './Orders';
function Home() {
  const [status, setStatus] = useState(false);
  const [user, setuser] = useState({});
  const token = localStorage.getItem('hack') || '';

  const authorize = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      
      if(response.status==200) setStatus(true)
        setuser(response.data)
    } catch (error) {
      console.error('Authorization error:', error);
      setStatus(false);  
    }
  };

  useEffect(() => {
    authorize();
  }, []);

  return (
    <>
      <h1>Home</h1>
      {status ?
      <div>

        <h2> HI - {user?.username}</h2>
        <h2>{user?.email}</h2>
        {/* <QR /> */}
        <QrScanner user={user}/>

        <Orders user={user}/>
      </div>
      
      :
      <h2>please Login</h2>
      }
    </>
  );
}

export default Home;
