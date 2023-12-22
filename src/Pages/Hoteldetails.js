import React, { useEffect, useState } from 'react'
import UserNav from '../Components/UserNav'
import "../Components/Styles/hoteldetails.css"
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Hoteldetails = () => {


  const[hotelinfoo,sethotelinfoo]=useState([])

  const hotelid=Cookies.get('hotelidd');

  const username=Cookies.get("username")
    const password=Cookies.get("password")
    const myname=Cookies.get("myname")
    const myid=Cookies.get("myid")




  //"http://localhost:8080/api/user/hotel/id/"+hotelid

  const fetchdata =()=>{
    
    const err =  axios.
    get("http://localhost:8080/api/user/hotel/id/"+hotelid, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          },
      auth: {
        username: username,
        password: password 
      }
     
    }).then(res=>{console.log(res.data);
      sethotelinfoo(res.data);


    }).catch(err=>console.log(err))
   
 }

  useEffect(()=>{
    fetchdata();
  },[])

  const navigate=useNavigate();

  const bookhotelpage=(event)=>{
    event.preventDefault();
    navigate("/bookhotelpage")
    

  
  }

  let info;

  

  const handlemyreq=(event)=>{
    
    info=event.target.value;
    Cookies.set('hotelidd',info, {expires:7})
  

    console.log(info)
  }



  return (
    <>
     <UserNav /> 

        <div className="deschotel">
            <h2>Name : {hotelinfoo.hotelName}</h2>
            <h4>city : {hotelinfoo.hotelCity}</h4>
            <h4>HOTEL Address : {hotelinfoo.hotelAddress}</h4>
            <h3 style={{color:"green"}}>Price : {hotelinfoo.hotelPrice}</h3>
            <h4>Hotel Description</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ratione ullam corrupti non ea inventore ducimus rerum recusandae iste iure accusamus unde, commodi asperiores, error quasi nulla saepe eum sunt.</p>
            <form onSubmit={bookhotelpage}>
            <button type="submit" style={{color:"white", backgroundColor:"black", padding:"5px", borderRadius:"20px"}} value={[hotelinfoo.hotelId]} onClick={handlemyreq}>Book</button>
            </form>
            </div>
    </>
  )
}

export default Hoteldetails
