import React from 'react'
import {  Link  } from "react-router-dom";
import "../Components/Styles/LoginNav.css"
import { Button } from 'bootstrap';
import "../images/logo.png"


const LoginNav = () => {
  return (
    <>
      
    <div className='mylognav'>
    <div className='loginnavlog'>
      <div className="navlogo">
     <h4 style={{color:"red"}}>BookMyTrip
    </h4>
           </div>
      </div>

    <div className='loginnav'>
   
    <Link to="/" >  User Login </Link>
    
      </div>

  <div className='loginnav'>
      <Link to="/userRegister">User Signup</Link>
      </div>
     <div className='loginnav'>
      <Link to="/AdminLogin"> Admin Login</Link>
      </div>
   <div className='loginnav'>
      <Link to="/AdminRegister">Admin Signup</Link>
    
      </div>

      

      </div>
      <hr />
      
  </>
  )
}

export default LoginNav

