import React from 'react'
import { useAuth } from '../Context/UserContext'
import { Outlet } from 'react-router-dom'

function Reqried() {
    const {user}=useAuth()
  return (

    <>
    {
        user ?
        <Outlet/>
        :   <h1 className="text-3xl font-bold mb-6 text-red-600 text-center m-5">Please Login</h1>
        
        
    }
    
    </>
    
  )
}

export default Reqried