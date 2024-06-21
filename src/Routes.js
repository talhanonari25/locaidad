import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home'
import Login from './Components/Auth/Login'
import ForgotPass from './Components/Auth/ForgotPass'
import Signup from './Components/Auth/Signup'
import Countdown from './Components/Home/Countdown';

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Home days={120}/>}/>
        <Route path='/countdown' element={<Countdown days={120}/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot' element={<ForgotPass/>}/>
    </Routes>
  )
}

export default Router;