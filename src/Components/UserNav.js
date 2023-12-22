import React from 'react'
import {  Link, useNavigate  } from "react-router-dom";
import "../Components/Styles/LoginNav.css"
import { Button } from 'bootstrap';
import "../images/logo.png"
import Cookies from 'js-cookie';


const UserNav = () => {

    
    const myname = Cookies.get("myname")

    const navigate =useNavigate();

    const handlelogout=()=>{
      
      if (window.confirm(`${myname} are you sure you want to logout ?`)==true)
      {
        Cookies.set("username","")
        Cookies.set("password","")
        Cookies.set("myname","")
        Cookies.set("myid","")
       
        alert("you have been logged out")
       navigate("/")
      } 
      else{

        alert("you are still logged in out")
        navigate("/home")

      }
     
     

      

    }


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
   
    <Link to="/home" >  Home </Link>
    
      </div>

  <div className='loginnav'>
      <Link to="/myBooking">My Bookings</Link>
      </div>
     <div className='loginnav'>
      <Link to="/allHotels">All Hotels</Link>
      </div>
  
      <div className='loginnav'> 
      <button style={{textDecoration:"none" , backgroundColor:"white" , border:"none"}}  onClick={handlelogout}>Logout</button>
      </div>

      </div>
      <hr />
      <h6>Welcome, {myname}</h6>
      <hr />
  </>
  )
}

export default UserNav
