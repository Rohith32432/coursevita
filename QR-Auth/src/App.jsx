// src/App.js
import React from 'react';
import QrScanner from './Components/Test';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Orders from './Components/Orders';
import Reg from './Components/Register';
import MakePayment from './Components/MakePayment';
import UserProvider from './Context/UserContext';
import NavBar from './Components/NavBar';
import QR from './Components/QR';

function App() {
  return (
    <div className="App">
  <NavBar/>
<UserProvider>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
    
      <Route path='/reg' element={<Reg/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/order' element={<Orders/>}></Route>
      
      <Route path='/payment' element={<MakePayment/>}></Route>
    </Routes>
</UserProvider>
    </div>
  );
}

export default App;
