import React, { useEffect, useState } from 'react'
import UserNav from '../Components/UserNav'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const BynameSearch = () => {

    const username=Cookies.get("username")
    const password=Cookies.get("password")
  
    const[searchhoteldetail,setsearchhotelDetail]=useState([])

    const navigate= useNavigate();

    const handlebook=(e)=>{

        Cookies.set('hotelidd',e.target.value,{expires:7})
        navigate("/bookhotelpage")
    }


    useEffect(()=>{

         const hotname= Cookies.get("hotname")
            
         axios.get("http://localhost:8080/api/user/hotel/"+hotname,{
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          },
      auth: {
        username: username,
        password: password 
      }
         }).then(res=>{console.log(res)
         
          setsearchhotelDetail(res.data)}

         ).catch(err=>console.log(err))


    },[])

  return (
    <>
    <UserNav />
      
        <h2>{searchhoteldetail.hotelName}</h2>


        <button onClick={handlebook} value={searchhoteldetail.hotelId}>Book</button>
    </>
  )
}

export default BynameSearch
