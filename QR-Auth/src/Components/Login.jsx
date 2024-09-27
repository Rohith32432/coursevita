import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  async function handleLogin(e) {
    e.preventDefault();
    const fdata = new FormData(e.target);
    const email = fdata.get('username');
    const pwd = fdata.get('password');
    
    try {
      const res = await axios.post('http://localhost:5000/api/user/login', {
        email: email,
        password: pwd
      });
      
      console.log(res);
      
      if (res.status === 200) {
        localStorage.setItem('hack', res.data.token);
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setMessage(err.response.statusText)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              type="email"
              name="username"
              id="username"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
          {message && (
          <div className="mt-4 text-center text-red-500 font-bold">
            {message}
          </div>
        )}
        </form>
      </div>
    </div>
  );
}

export default Login;
