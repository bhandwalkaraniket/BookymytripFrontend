import React, { useState } from 'react'
import AdminNav from '../Components/AdminNav'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const AdminAllHotels = () => {

    const username=Cookies.get("username")
    const password=Cookies.get("password")
    const myname=Cookies.get("myname")
    const myid=Cookies.get("myid")


    const navigate=useNavigate()

    const[hotelinfo,sethotelinfo]=useState([])


    const fetchdata =()=>{
        const err =  axios.
        get('http://localhost:8080/api/getAllHotels', {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
              },
          auth: {
            username: username,
            password: password 
          }
         
        }).then(res=>{console.log(res.data);
        sethotelinfo(res.data);


        }).catch(err=>console.log(err))




       
     }




    // componentDidMount and componentDidYpdate combination hook
    useEffect(()=>{

            if(username=="")
            {
                navigate("/")
            }


        fetchdata();
    },[])



    const handleedit=(e)=>{

        e.preventDefault()

        Cookies.set("hotelId",e.target.value)
        navigate("/edithoteldetails")

    }



  return (

    

    <>
      <AdminNav/>

      <ul style={{listStyleType:"none"}}>
            {
                hotelinfo.map((item,i)=>{
                    return (
                        <div className='hotelcard'>
                    <li key={i} >
                        <h2>{item.hotelName}</h2>
                        <hr />
                        <h4>City : {item.hotelCity}</h4>
                        <h5>Address :{item.hotelAddress}</h5>
                        <h5>Rooms available : {item.noOfRooms}</h5>
                        <h4 style={{color:"green"}}>Price : ₹ {item.hotelPrice}</h4>
                        <hr />
                        <form >
                            <button type='submit' onClick={handleedit} value={item.hotelId}  style={{color:"white", backgroundColor:"black", padding:"5px", borderRadius:"20px"}}>Edit</button>
                        </form>
                        </li>
                        </div>
                    )})
            }

        </ul>

    </>
  )
}

export default AdminAllHotels
