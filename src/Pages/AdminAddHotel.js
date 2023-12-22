import React, { useState } from 'react'
import AdminNav from '../Components/AdminNav'
import { left } from '@popperjs/core'
import Cookies from 'js-cookie'
import axios from 'axios'
const AdminAddHotel = () => {



    const username=Cookies.get("username")
    const password=Cookies.get("password")


    const[hotname,sethotname]=useState("");
    const[city,Setcity]=useState("");
    const[add,setadd]=useState("");
    const[pri,setpri]=useState(0);
    const[noroom,setnoroom]=useState(0);


    const handleadd=(e)=>{

            e.preventDefault()

            axios.post("http://localhost:8080/api/admin/addHotel",{

            hotelName:hotname,
            hotelCity:city,
            hotelAddress:add,
            hotelPrice:pri,
            noOfRooms:noroom
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
    alert("Hotel Added")
  
  }).catch(e=>{console.log(e)})
            
    }


  return (
   
    <>
            <AdminNav/>
            <div className="deschotel">
                <h1>Add Hotel</h1>
                <hr />
                <br />
                <div >      
                    <form>
                    
                      <table style={{marginLeft:"485px"}}>
            <tr>
                <td>
                Hotel Name
                </td>
                <td> <input type="text" placeholder  onChange={(e)=>{sethotname(e.target.value)}} /></td>
            </tr>
            <tr>
                <td>
                Hotel City
                </td>
                <td> <input type="text" placeholder  onChange={(e)=>{Setcity(e.target.value)}}/></td>
            </tr>
            <tr>
                <td>
                Hotel Address
                </td>
                <td> <textarea type="text" placeholder  onChange={(e)=>{setadd(e.target.value)}}/></td>
            </tr>
            <tr>
                <td>
                Hotel Price
                </td>
                <td> <input type="number" placeholder  onChange={(e)=>{setpri(e.target.value)}}/></td>
            </tr>
            <tr>
                <td>
                No. Of Rooms
                </td>
                <td> <input type="number" placeholder  onChange={(e)=>{setnoroom(e.target.value)}}/></td>
            </tr>
                        
           
                   
        </table>

        <br />
        <button onClick={handleadd} style={{padding:"5px", borderRadius:"5px", color:"white", backgroundColor:"green"}}>Add Hotel</button>
               
        </form>
        </div>


    </div>

    </>
  )
}

export default AdminAddHotel
