import React, { useEffect } from 'react'
import AdminNav from '../Components/AdminNav'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const EditHotelDetails = () => {

    const username=Cookies.get("username")
    const password=Cookies.get("password")
    const myname=Cookies.get("myname")
    const myid=Cookies.get("myid")



    const[honame,sethoname]=useState("")
    const[hocity,sethocity]=useState("")
    const[hoadd,sethoadd]=useState("")
    const[hoprice,sethoprice]=useState("")
    const[horooms,sethorooms]=useState("")
    

    const[hotelinfoo,sethotelinfoo]=useState([])

        const navigate=useNavigate()

        const hotelId=Cookies.get("hotelId")

        const fetchdata =()=>{
    
            const err =  axios.
            get("http://localhost:8080/api/user/hotel/id/"+hotelId, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                  },
              auth: {
                username: "adwait@gmail.com",
                password: "1234" 
              }
             
            }).then(res=>{console.log(res.data);
                sethotelinfoo(res.data);
                

                sethoname(hotelinfoo.hotelName)
                sethocity(hotelinfoo.hotelCity)
                sethoadd(hotelinfoo.hotelAddress)
                sethoprice(hotelinfoo.hotelPrice)
                sethorooms(hotelinfoo.noOfRooms)
              
            }).catch(err=>console.log(err))
           
         }

        useEffect(()=>{

                    if(username=="")
                    {
                        navigate("/")
                    }


            fetchdata();
            

               

        },[])



        const handleedit=(e)=>{
                e.preventDefault()

                axios.put("http://localhost:8080/api/admin/editHotel",{

                hotelId:hotelId,
                hotelName:honame,
                hotelCity:hocity,
                hotelAddress:hoadd,
                hotelPrice:hoprice,
                noOfRooms:horooms,
                },
                {headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
                    auth: {
                   username: username,
                    password: password 
              }}).then((response)=>{
              
                  console.log(response)
                    alert("Details Updated successfully")
                  
                }).catch(e=>{
                    alert("Error Occured")
                })

        }




        const handleDelete=(e)=>{

            e.preventDefault()

            if(window.confirm(` 🗑️ Are you sure you want to delete the hotel ?`)===true)
            {
                axios.delete("http://localhost:8080/api/admin/deletehotel/"+hotelId, {
                    headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
                    auth: {
                   username: username,
                    password: password 
              }}).then((response)=>{
              
                  console.log(response)
                    alert("Hotel Deleted !")
                  
                }).catch(e=>{
                    alert("Error Occured")
                })
 

            }

        }

  return (
    <>
    <AdminNav/>
    <div className="deschotel">
                   
                    <form>
                      <table style={{marginLeft:"485px"}}>
            <tr>
                <td>
                Hotel Name
                </td>
                <td> <input type="text" placeholder={hotelinfoo.hotelName}  onChange={(e)=>{sethoname(e.target.value)}}  /></td>
            </tr>
            <tr>
                <td>
                Hotel City
                </td>
                <td> <input type="text" placeholder={hotelinfoo.hotelCity} onChange={(e)=>{sethocity(e.target.value)}}/></td>
            </tr>
            <tr>
                <td>
                Hotel Address
                </td>
                <td> <textarea type="text" placeholder={hotelinfoo.hotelAddress} onChange={(e)=>{sethoadd(e.target.value)}}/></td>
            </tr>
            <tr>
                <td>
                Hotel Price
                </td>
                <td> <input type="text" placeholder={hotelinfoo.hotelPrice} onChange={(e)=>{sethoprice(e.target.value)}}/></td>
            </tr>
            <tr>
                <td>
                No. Of Rooms
                </td>
                <td> <input type="text" placeholder={hotelinfoo.noOfRooms} onChange={(e)=>{sethorooms(e.target.value)}}/></td>
            </tr>

          
                   
            
        </table>
            
        <br />


        <button  style={{padding:"5px", borderRadius:"5px", color:"white", backgroundColor:"black"}}    onClick={handleedit}>Save changes</button>


             <br />


          <hr />
          <hr />

          <br />
          <br />    
        </form>
      
        <button  style={{padding:"5px", borderRadius:"5px", color:"white", backgroundColor:"red"}}    onClick={handleDelete}>Delete Hotel</button>

    </div>
      
    </>
  )
}

export default EditHotelDetails
