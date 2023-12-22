import React, { useEffect, useState } from 'react'
import UserNav from '../Components/UserNav'
import Cookies from 'js-cookie';
import "../Components/Styles/bookingcard.css"
import "../Components/Styles/Bookselectionform.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
const Bookhotelpage = () => {

  //cookies
  const username=Cookies.get("username")
  const password=Cookies.get("password")
  const myname=Cookies.get("myname")
  const myid=Cookies.get("myid")


  const[discount,setdiscount]=useState(0)


  //----------------------------------------------------------


    const[hotelinfoo,sethotelinfoo]=useState([])

    //js-cookies
    let hotelinfor=Cookies.get('hotelidd');

        //"http://localhost:8080/api/user/hotel/id/"+hotelinfor


        const fetchdata =()=>{
    
          const err =  axios.
          get("http://localhost:8080/api/user/hotel/id/"+hotelinfor, {
              headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
            auth: {
              username: username,
              password: password 
            }
           
          }).then(res=>{console.log(res.data);
            sethotelinfoo(res.data);
      
      
          }).catch(err=>console.log(err))
         
       }
      
      useEffect(()=>{
        fetchdata();

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
        
        setdiscount(response.data)


      }).catch(e=>alert(e))



                  
                 let pric=hotelinfoo.hotelPrice - (discount/100)
                 setamount(pric)
                 setnoofrooms(1)

      },[])

      //-------------------------------------------------------------------------------------------------
      //Bookselecctionform logic

      let pric=hotelinfoo.hotelPrice
      const[noofrooms,setnoofrooms]=useState(1);
      const[amount,setamount]=useState(pric)
      const[noofpeople,setnoofpeople]=useState(1)
      const[fromdate,setfromdate]=useState();
      const[todate,settodate]=useState();
      const[noofdays,setnoofdays]=useState(0);
      const[mindate, setmindate]=useState();
      const[minfromDate, setminfromDate]=useState();
      const[check,setcheck]=useState(false)


      const setamt=()=>{
        setamount(pric)
      }

      const handlepeop=(event)=>{
        setnoofpeople(event.target.value)
      }
        
      const roomshandle=(event)=>{

          setnoofrooms(event.target.value)
          console.log(new Date())
          setamount(event.target.value*pric)
      }

      const[noofbook,setnoofbook]=useState(0);

      const handlegetBookings=()=>{


        axios.post("http://localhost:8080/api/user/ondate",{

        hotelid:hotelinfor ,
	      fromDate:mindate
  
        }
        ,{headers: {
  
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        
        },
            auth: {
          username: username,
           password: password 
    }})
    .then((res)=>{
  
          console.log(res.data.length)
          if(res.status==200)
          {
            setnoofbook(res.data.length)
          }
          else
          {
            alert("Error ")
          }
  
        }).catch(e=>{console.log(e)})

      }


      useEffect(()=>{
        handlegetBookings();
        
      },[fromdate])

      
      const handlefromdate=(event)=>{

        setfromdate(event.target.value)
        
        var mind=new Date(fromdate);
        mind.setDate(mind.getDate())
       
        setmindate(mind)


       
        
      } 



      const handletodate=(event)=>{
        settodate(event.target.value)

        
        
      }

     

    

     useEffect(()=>{
      var date1=new Date(fromdate);
      var date2=new Date(todate);

      var differenceInTime= date2-date1;

      var differenceInDays=differenceInTime/(1000*3600*24)

      // console.log("diff in days"+differenceInDays)

      // console.log(fromdate +"ignore")
      // console.log(todate +"ignore")
     
      
      console.log("asfassfdsdf"+ mindate)
      
      setnoofdays(differenceInDays)
     },[fromdate,todate,mindate])



     useEffect(()=>{



                         

                 

      
      var Date1= new Date();
      Date1.setDate(Date1.getDate()+1)
      console.log(Date1)
      setmindate(Date1)
      setnoofdays(1)
      setnoofrooms(1)
      setnoofpeople(1)
      setamount(hotelinfoo.hotelPrice )

     },[])



     const handleclickcheck=(event)=>{
      setamount((pric*noofdays*noofrooms)-(pric*(discount/100)));

      

     }

     //axios to save all the data in booking entity table in DB*****************************************************************


     const handlecheckout =()=>{

      console.log(noofpeople)

     }

     const navigate=useNavigate()

     const submitcheckout=()=>{
      

      if(hotelinfor===null || hotelinfor=="")
      {
          alert("Fill up the details")
          navigate("/home")

      }
      else{
      console.log("*********************************************************")
      console.log(fromdate)
      console.log(todate)
      console.log(noofdays)
      console.log(amount)
      console.log()


      axios.post("http://localhost:8080/api/user/makeBooking",{

      userId:myid,
      hotelid:hotelinfor,
      noOfDays:noofdays,
      amountPaid:amount,
      fromDate:fromdate,
      toDate:todate,
      noroomsbooked:noofrooms

      }
      ,{headers: {

        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      
      },
          auth: {
        username: username,
         password: password 
  }})
  .then((res)=>{

        console.log(res)
        if(res.status==200)
        {
          alert("booking Confirmed")
        }
        else
        {
          alert("Error , Booking Failed")
        }

      }).catch((err)=>{
        alert("Error , Booking Failed")
      })

   }
  }


  // stripe api -------------------------------------------------------------------

   function handleToken(token) {
    console.log(token.id);
     axios
      .post("http://localhost:8080/payment",  {
        
      
        amount:amount,
        token:token.id
      
       
        
      },
      {
        auth :{
          username:username,
          password:password
      }
      }
      )
      .then((res) => {
        
        console.log(res)
        alert("Payment Success");
        if(res.status===200)
        {
          submitcheckout();
        }
        else{
          alert("Booking failed")
        }
        
      })
      .catch((error) => {
        alert(error);
      });
  }


  return (
    <>

    <UserNav />
    <div className="bookingcard">
        <h1 style={{color:"rgb(231, 135, 135)"}}>Selected Hotel Details</h1>
        <br />
        <hr />
        <table style={{margin:'auto'}}>
          <tr >
            <td><h2>Hotel</h2></td>
            <td><h2>:</h2></td>
            <td><h2>{hotelinfoo.hotelName}</h2></td>
          </tr>

          <tr>
            <td><h4>City</h4></td>
            <td><h4>:</h4></td>
            <td><h4>{hotelinfoo.hotelCity}</h4></td>
          </tr>

          <tr>
            <td><h4>Address</h4></td>
            <td><h4>:</h4></td>
            <td><h4>{hotelinfoo.hotelAddress}</h4></td>
          </tr>

          <tr>
            <td><h4 style={{color:"green"}}>Price</h4></td>
            <td><h4 style={{color:"green"}}>:</h4></td>
            <td><h4 style={{color:"green"}}>{hotelinfoo.hotelPrice}</h4></td>
          </tr>
        </table>
    
  
    <hr />
    <hr />
        <div className="Bookselectionform">
        {/* onSubmit={submitcheckout} */}
          <form >
            <table>
              <tr>
                <td>Number of Rooms</td>
                <td>:</td>
                <td>
                <input type="number" name="roomsno" id=""  max={5} min={1} defaultValue={1} onChange={roomshandle} style={{width:"100%", textAlign:"center", borderRadius:"20px"} } required="required" disabled={check}/>
                  </td>
              </tr>
              <tr>
               
              </tr>

                <tr>
                  <td>
                    Number of People
                  </td>
                  <td>:</td>
                  <td>
                    {/* max no of rooms * 2 people can book the hotel; */}
                  <input type="number" name="peopleno" onChange={handlepeop} disabled={check} id="" max={parseInt(noofrooms)*2} min={1} defaultValue={1} style={{width:"100%", textAlign:"center",borderRadius:"20px"}} required="required" />
                  </td>
                </tr>
                  <tr>
                    <td>From Date</td>
                    <td>:</td>
                    <td>
                        <input type="date" style={{borderRadius:"20px"}} required="required" onChange={handlefromdate} min={minfromDate} disabled={check}/>
                    </td>
                  </tr>

                  <tr>
                    <td>To Date</td>
                    <td>:</td>
                    <td>
                        <input type="date" style={{borderRadius:"20px"}} required="required" onChange={handletodate} defaultValue={fromdate} min={fromdate} disabled={check}/>
                    </td>
                  </tr>

            </table>
                  <br />
                  <br />
              <input type="checkbox" name="" id="" required="required" onClick={handleclickcheck} onChange={()=>{setcheck(!check)}} /> <small>click here to agree</small>
            <hr />
        <hr />


        <h3>Total  Amount to be paid</h3>
        <h4 style={{color:"green"}} onLoad={setamt}>₹ {amount}</h4>

        
          {/* <button style={{color:"white", backgroundColor:"black", padding:"5px", borderRadius:"20px"}} onClick={handlecheckout} >checkout</button> */}
         <br />

        
    <hr />

      <StripeCheckout
          amount={amount*100}
          
        token={handleToken}
        stripeKey="pk_test_51NihodSEh35AhV87k4mArqvTT5nnkkb353JjYJmNfjlbGQStgA2HPTYFdYlMmpV3Hch8ecyV6dTHyDq0Gh6VGzps00NWgsRCDw"
        currency="INR"
        name="BookMyTrip"
      >
        <button type="submit" style={{color:"white", backgroundColor:"black", padding:"5px", borderRadius:"20px"}} onClick={(e)=>{e.preventDefault()}}> CheckOut </button>
      </StripeCheckout>
        


        
          </form>

          

        </div>
       
 
       <h5>Number of days : {noofdays}</h5>
        
       <h4>No of Rooms available on selected day : {hotelinfoo.noOfRooms-noofbook } </h4>

    </div>

      
    
    </>
  )
}

export default Bookhotelpage
