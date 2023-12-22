import React, { useEffect, useState } from 'react'
import UserNav from '../Components/UserNav'
import axios from 'axios';
import HotelShowCard from '../Components/HotelShowCard';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import "../Components/Styles/hotelcardStyle.css"
import { Link, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

const UserAllHotels = () => {

    // headers.set('Authorization', 'Basic ' + base64.encode("pogo1@pogo.com" + ":" + "pogo"));


    const session_url = 'http://localhost:8080/api/getAllHotels';


    //Cookies
    const username=Cookies.get("username")
    const password=Cookies.get("password")
    const myname=Cookies.get("myname")
    const myid=Cookies.get("myid")

    const credentials = btoa('pogo1@pogo.com:pogo');

    let headers = new Headers();
    let authString = `${username}:${password}`
    headers.set('Authorization', 'Basic ' + btoa(authString))

   

    const navigate=useNavigate();

        const handlehotelDetailsPage=(event,hotelid)=>{
            // navigate('/hoteldetailspage/'+hotelid)
            event.preventDefault();
          
            navigate('/hoteldetailspage');
        }

        // const[hotelsinfo,sethotelsinfo]=useState([]);
      
        const[hotelinfo, sethotelinfo]=useState([]);
          

              
        const[hotelidd, sethotelidd]=useState("");



        // const fetchdata =()=>{
        //     fetch("http://localhost:8080/api/getAllHotels").then(resp=>resp.json()).then(resp=> {console.log(resp);
        //      sethotelinfo(resp)})
            
           
        // }

       

        // const fetchdata =()=>{
        //     fetch("http://localhost:8080/api/getAllHotels", { headers: {Authorization : `Basic ${credentials}` } , mode:'no-cors'})
        //       .then(resp=>resp.json()).then(resp=> {console.log(resp);
        //              sethotelinfo(resp)})
        //       .catch(err=>console.log(err.message+" sed"))

           
        //  }

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

            if(username==="")
            {
      
                navigate("/")
                
            }


            fetchdata();
        },[])


        //cookie to handle state
        let hid;
        const handleee=(event)=>{
           
            
          console.log(event.target.value);
          hid=event.target.value
          Cookies.set('hotelidd', hid, { expires: 7 });


        }

  return (
       <>

        <UserNav/>


       {/* style to remove bullets */}

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
                        <form onSubmit={handlehotelDetailsPage}>
                            <button type='submit' value={item.hotelId} onClick={handleee} style={{color:"white", backgroundColor:"black", padding:"5px", borderRadius:"20px"}}>View Details</button>
                        </form>
                        </li>
                        </div>
                    )})
            }

        </ul>
      


    </>
  )
}

export default UserAllHotels
