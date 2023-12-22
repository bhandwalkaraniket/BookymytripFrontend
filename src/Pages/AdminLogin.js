import React, { useState } from 'react'
import LoginNav from '../Components/LoginNav'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminLogin = () => {


  const [uname,setUname] = useState("");
  const [umail,setUmail] = useState("");
  const [upass,setUpass] = useState("");


  const navigate = useNavigate();

  const handleadminlogin=(e)=>{
      e.preventDefault();
try{
      axios.post("http://localhost:8080/api/admin/AdminLogin",{

  
  userEmail:umail,
  userPassword:upass
  },
  {headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
      auth: {
        username: umail,
        password: upass 
}}).then((response)=>{

    console.log(response)

    if(response.status==200)
    {
       if(response.data=="")
       {
        alert("Username or password not authorized")
       }
       else
       {

          

          Cookies.set('username' , umail , {expires:7});
          Cookies.set('password' , upass , {expires:7});
          Cookies.set('myname' , response.data.userName , {expires:7});
          Cookies.set('myid' , response.data.userId , {expires:7});

        navigate("/adminhome")
       }

     

    }
   
    else{

      alert("No such username or Password")
    }
  })
 
  }
  catch(e)
  {
      alert("UnAuthorized")

  }

  }
  

  return (
   <>
    <LoginNav/>
    <h1 style={{ color:"red" , textAlign:"center"}} >Admin Login</h1>
      <hr />
      <div className='registerform'>
   <form className='indexformstyle'>

      <table className='registertable' >

     

      <tr>
        <td>
          Username
        </td>
        <td>:</td>
        <td>
          <input type="email" name="mailid" required="required" placeholder='abc@gmail.com'  value={umail || ""}    onChange={e=>setUmail(e.target.value)}/>

        </td>
      </tr>


      <tr>
        <td>
          Password  
        </td>
        <td>:</td>
        <td>
          <input type="password" required="required" name="pass"  value={upass || "" }    onChange={e=>setUpass(e.target.value)}/>

        </td>
      </tr>


      <tr>
        <td>

        </td>
        <td></td>
        <td>
          <input type="submit" onClick={handleadminlogin}   style={{color:"white" , backgroundColor:"black" , borderRadius:"20px" , padding:"5px"}}/>
        </td>
      </tr>

      </table>

   </form>
   </div>
   </>
  )
}

export default AdminLogin
