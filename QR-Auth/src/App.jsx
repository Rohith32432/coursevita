// src/App.js
import React from 'react';
import QrScanner from './Components/Test';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Reg from './Components/Register';
// import Login from './Components/QR';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/reg' element={<Reg/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
    </Routes>

    </div>
  );
}

export default App;
