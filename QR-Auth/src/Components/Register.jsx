import axios from 'axios'
import React from 'react'

 function Register() {
 async function handleSubmit(e){
    e.preventDefault()
    const fdata=new FormData(e.target)
    const name=fdata.get('username')
    const pwd=fdata.get('password')
    const mail=fdata.get('email')
    const {data}=await axios.post('http://localhost:5000/api/user/register',{
      username:name,
      password:pwd,
      email:mail
    })
console.log(data);

  }
  return (
    <>
    <form onSubmit={handleSubmit}>
    <div>
        <label>Username:</label>
        <input type="text" name="username" />
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password" />
    </div>
    <div>
        <label>Email:</label>
        <input type="email" name="email" />
    </div>
    <button type="submit">Register</button>
</form>

    </>
  )
}

export default Register