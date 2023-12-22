import React, { useEffect, useState } from 'react'
import UserNav from '../Components/UserNav'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const HotelCitySearch = () => {


        const cityname=Cookies.get("hotcity")
        const password=Cookies.get("password")
        const username=Cookies.get("username")
        const[hotelsss,sethotelsss]=useState([])

        useEffect(()=>{

            axios.get("http://localhost:8080/api/user/cityHotels/"+cityname,{
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                  },
              auth: {
                username: username,
                password: password 
              }

            }).then(res=>{
                console.log(res)
                sethotelsss(res.data)
            }).catch(err=>{
                console.log(err)
            })

        },[])

        const navigate=useNavigate();

        const handlehotelDetailsPage=(event,hotelid)=>{
          // navigate('/hoteldetailspage/'+hotelid)
          event.preventDefault();
        
          navigate('/hoteldetailspage');
      }

      const handleee=(event)=>{
           
            
        console.log(event.target.value);
        const hid=event.target.value
        Cookies.set('hotelidd', hid, { expires: 7 });


      }

  return (
    <>
      
      <UserNav/>
          <ul style={{listStyleType:"none"}}>
            {

              hotelsss.map((item,i)=>{
                return(
                  <div className='hotelcard'>

                      <li key={i}>
                      <h2>{item.hotelName}</h2>
                        <h4>City : {item.hotelCity}</h4>
                        <h5>Address :{item.hotelAddress}</h5>
                        <h5>Rooms available : {item.noOfRooms}</h5>
                        <h4 style={{color:"green"}}>Price : ₹ {item.hotelPrice}</h4>
                        
                        <form onSubmit={handlehotelDetailsPage}>
                            <button type='submit' value={item.hotelId} onClick={handleee} style={{color:"white", backgroundColor:"black", padding:"5px", borderRadius:"20px"}}>View Details</button>
                        </form>

                      </li>
                    
                    </div>
                )
              })

            }
            </ul>
    </>
  )
}

export default HotelCitySearch
