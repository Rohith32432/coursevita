import axios from 'axios'
import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'

function Login() {
const navigate=useNavigate()
 async function handleLogin(e){
  e.preventDefault()
    const fdata=new FormData(e.target)
    const email=fdata.get('username')
    const pwd=fdata.get('password')
    const res=await axios.post('http://localhost:5000/api/user/login',{
      email:email,
      password:pwd
    })
  // console.log(data);
  console.log(res);
  
    if(res.status==200){
      localStorage.setItem('hack',res.data.token)
      navigate('/home')
    }
  }
 
  return (
    < >
    <form onSubmit={handleLogin}>
    <div>
        <label>Username:</label>
        <input type="email" name="username" />
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password" />
    </div>
    <button type="submit">Login</button>
</form>

    </>
  )
}

export default Login