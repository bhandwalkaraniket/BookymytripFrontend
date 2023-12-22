import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const DisplaySearchForm = (props) => {



    const[HotelName,setHotelName]=useState("")
    const[HotelCitySearch,setHotelCitySearch]=useState("")


    const navigate = useNavigate();

    const bynamesearch=()=>{
        Cookies.set("hotname",HotelName)
        navigate("/bynamesearch")
    }


    const HotelCitySearchfun=(e)=>{
        setHotelCitySearch(e.target.value)
        console.log(HotelCitySearch)
    }




    const handleHotelName=(e)=>{
                setHotelName(e.target.value)
                console.log(HotelName)
    }



    const bycitysearch=()=>{

        Cookies.set("hotcity",HotelCitySearch,{expires:7})
        navigate('/HotelCitySearch')
    }



    if(props.data==="hotelnamesearch")
    {
  return (
<>
    <div className='searchByName' style={{marginTop:"20px"}}>
        <form >
                <table>
                    <tr>
                        <td>
                            <h5>Hotel Name</h5>
                        </td>
                        <td>:</td>
                        <td>
                            <input type="text" onChange={handleHotelName}/>
                        </td>
                    </tr>
                    
                    <tr>
                        <td></td>
                        <td>
                        
                            <button style={{marginTop:"20px", backgroundColor:"black" , color:"white" , padding:"10px", borderRadius:"10px"}} onClick={bynamesearch}>Search</button>
                        </td>
                    </tr> 
                </table>
        </form>
    </div>
    </>
  )
}

if(props.data==="hotelcitysearch")
{
    return (
        <>
            <div className='searchByName' style={{marginTop:"20px"}}>
                <form >
                        <table>
                            <tr>
                                <td>
                                    <h5>City Name</h5>
                                </td>
                                <td>:</td>
                                <td>
                                    <input type="text" onChange={HotelCitySearchfun}/>
                                </td>
                            </tr>
                            
                            <tr>
                                <td></td>
                                <td>
                                
                                    <button style={{marginTop:"20px", backgroundColor:"black" , color:"white" , padding:"10px", borderRadius:"10px"}} onClick={bycitysearch}>Search</button>
                                </td>
                            </tr> 
                        </table>
                </form>
            </div>
            </>
          )

}



}

export default DisplaySearchForm
