import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register'
import { BrowserRouter,Route,Routes } from "react-router";
import Login from './pages/Login'
import HomePage from './pages/HomePage'
function App() {
  

  return (
    <>
   <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
   </BrowserRouter>
      
    </>
  )
}

export default App
