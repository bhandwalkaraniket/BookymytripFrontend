import React, { useEffect, useState } from 'react'
import UserNav from '../Components/UserNav'
import Cookies from 'js-cookie'
import SearchComponent from '../Components/SearchComponent'
import { useNavigate } from 'react-router-dom'
import "../Components/Styles/searchFunc.css"
import { DiscountNotification } from '../Components/DiscountNotification'
import axios from 'axios'

const HomePage = () => {


    const username=Cookies.get("username")
    const password=Cookies.get("password")
    const myname=Cookies.get("myname")
    const myid=Cookies.get("myid")

    const[count,setcount]=useState(0);

    const navigate= useNavigate()

    
    useEffect(()=>{

      if(username==="")
      {

          navigate("/")
          
      }


      
      axios.post("http://localhost:8080/api/user/bookDiscount",{

       
      userId:myid
      },
      {headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      },
          auth: {
            username:username,
            password:password
    }}).then((response)=>{
      
      setcount(response.data)


    }).catch(e=>alert(e))


    },[])

  return (
    <>
    
    <UserNav />
    <DiscountNotification data={count}/>
    <hr />
    <SearchComponent mydata={myname}/>
    
    </>
    
  )
}

export default HomePage
