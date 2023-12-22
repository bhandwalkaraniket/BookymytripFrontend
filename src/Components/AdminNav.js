import React from 'react'
import "../Components/Styles/AdminNav.css"
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'


const AdminNav = () => {

    const myname=Cookies.get("myname")

    const navigate=useNavigate();



    const handlelogout=(e)=>{
            e.preventDefault()

            if(window.confirm("Are you sure you want to logout ?")===true)
                {
                    Cookies.set("username","");
                    Cookies.set("password","");
                    Cookies.set("myname","")
                    Cookies.set("myid","")
                    alert("Thanks for visiting !.......You have been logged out !")
                    navigate("/")
                }
            else
            {
                alert("You are still logged in.")
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
       
        <Link to="/adminhome" >  Home </Link>
        
          </div>

          <div className='loginnav'>
          <Link to="/adminaddhotel">ADD Hotels</Link>
          </div>


    
      <div className='loginnav'>
          <Link to="/adminallbookings">All Bookings</Link>
          </div>
         <div className='loginnav'>
          <Link to="/adminallhotels">All Hotels</Link>
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

export default AdminNav
