import React from 'react'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
  const navigate =useNavigate();
  return (
    <div>
      <h1>WELCOME TO HOME PAGE</h1>
      <button onClick={()=>{
        navigate('/login')
      }} >Login</button>
      <button onClick={()=>{
        navigate('/register')}}>Register</button>
    </div>
  )
}

export default HomePage
