// src/App.js
import React from 'react';
import QrScanner from './Components/Test';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Orders from './Components/Orders';
import Reg from './Components/Register';
import UserProvider from './Context/UserContext';

function App() {
  return (
    <div className="App">

<UserProvider>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
    
      <Route path='/reg' element={<Reg/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
    </Routes>
</UserProvider>
    </div>
  );
}

export default App;
