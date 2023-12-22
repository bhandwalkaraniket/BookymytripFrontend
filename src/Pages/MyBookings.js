import React, { useEffect, useState } from 'react'
import UserNav from '../Components/UserNav'
import axios from 'axios'
import Cookies from 'js-cookie'
import "../Components/Styles/hotelcardStyle.css"
import { useNavigate } from 'react-router-dom'
import jsPDF from "jspdf"

const MyBookings = () => {
  
  
        const myid=Cookies.get("myid");
        const username=Cookies.get("username")
        const password=Cookies.get("password")
        const[bookings, setbookings]= useState([])

        const navigate= useNavigate()

        useEffect(()=>{

            if(username==="")
            {

                navigate("/")
                
            }



            axios.get("http://localhost:8080/api/user/bookings/"+myid,{
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                  },
              auth: {
                username: username,
                password: password 
              }

            }).then(res=>{
                console.log(res.data)
                setbookings(res.data)
            }).catch(err=>{
                console.log(err)
            })

        },[])
  
  
    return (
    <>
       <UserNav />
            <ul style={{listStyleType:"none"}} >

                {


                    bookings.map((item,i)=>{


                        const DownloadPDF=(e)=>{
                                e.preventDefault();
                                
                                const pdf=new jsPDF()

                                pdf.text("BookMyTrip",90,10)
                                pdf.text("---------------------------------------------------------------------------------------",20,20)
                                pdf.text(`Booking ID :  ${bookings[i].bookingId}`,20,30)
                                pdf.text(`From : ${bookings[i].fromDate}`,20,40)
                                pdf.text(`To : ${bookings[i].toDate}`,20,50)
                                pdf.text(`Hotel Name : ${bookings[i].hotelE.hotelName}`,20,60)
                                pdf.text(`No of Days Booked : ${bookings[i].noOfDays}`,20,70)
                                pdf.text(`No of Rooms Booked : ${bookings[i].noroomsbooked}`,20,80)
                                pdf.text(`Booked By : ${bookings[i].userE.userName}`,20,90)
                                pdf.text("---------------------------------------------------------------------------------------",20,100)
                                pdf.text(`Total Amount Paid :  Rs.${bookings[i].amountPaid}/-`,20,110)
                                pdf.text("---------------------------------------------------------------------------------------",20,120)
                                pdf.save("bookmytrip.pdf")

                                

                        }

                        return(
                            <li key={i} >
                                 <div className='hotelcard'>
                                      
                                            <h5> Booking ID :  {bookings[i].bookingId} </h5>   
                                            <hr />
                                            <p>From : {bookings[i].fromDate}</p>
                                            <p>To : {bookings[i].toDate}</p>
                                            <h6>Hotel Name : {bookings[i].hotelE.hotelName}</h6>
                                            <hr />
                                            <p>No of Days Booked : {bookings[i].noOfDays}</p>
                                            <p>No of Rooms Booked : {bookings[i].noroomsbooked}</p>
                                            <p>Booked By : {bookings[i].userE.userName}</p>
                                            <h6 style={{color:"green"}}>Total Amount Paid :  ₹{bookings[i].amountPaid}</h6>
                                            <br />
                                            <button style={{padding:"5px", borderRadius:"10px" , color:"white", backgroundColor:"black"}} onClick={DownloadPDF} >Download Receipt</button>
                                               
                                            
                            </div>

                            </li>
                        )
                    })

       
    }
        </ul>
    </>
  )
}

export default MyBookings
