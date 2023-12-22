import React, { useState } from 'react'
import LoginNav from '../Components/LoginNav'
import axios from 'axios';

const AdminSignUp = () => {


        const[aname,setAname]=useState("");
        const[Amail,setAmail]=useState("");
        const[apass,setapass]=useState("");


        const handleAdminreg=(e)=>{


            e.preventDefault();

          axios.post("http://localhost:8080/api/admin/save",{

          userName:aname,
          userEmail:Amail,
          userPassword:apass
          },
          {headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          },
              auth: {
            // username: 'pogo@pogo.com',
            //  password: 'pogo' 
        }}).then((response)=>{
        
            console.log(response)
        
            if(response.status===200 && response.data != "Some error has occured")
            {
              alert("user added successfully")
            }
            else{
        
              alert("Error occured, Email should be unique")
            }
          })

        }

  return (
    <>
        <LoginNav/>

        <h1 style={{textAlign:"center", color:"red"}}>Admin Register</h1>
        <hr />
        <div className='registerform'>
   <form onSubmit={handleAdminreg} className='indexformstyle'>

      <table className='registertable'>

      <tr>
        <td>
          Name 
        </td>
        <td>:</td>
        <td >
          <input type="text" name='username' value={aname || ""}  required="required"     onChange={e=>setAname(e.target.value)}/>

        </td>
      </tr>

      <tr>
        <td>
          Email Id 
        </td>
        <td>:</td>
        <td>
          <input type="email" name="mailid" required="required"  value={Amail || ""}    onChange={e=>setAmail(e.target.value)}/>

        </td>
      </tr>


      <tr>
        <td>
          Password  
        </td>
        <td>:</td>
        <td>
          <input type="password" required="required" name="pass" value={apass || "" }    onChange={e=>setapass(e.target.value)}/>

        </td>
      </tr>


      <tr>
        <td>

        </td>
        <td></td>
        <td>
          <input type="submit" style={{color:"white" , backgroundColor:"black" , borderRadius:"20px" , padding:"5px"}}/>
        </td>
      </tr>

      </table>

   </form>
   </div>
    </>
  )
}

export default AdminSignUp
