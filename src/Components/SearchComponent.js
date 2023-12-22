import React, { useState } from 'react'
import DisplaySearchForm from './DisplaySearchForm';

const SearchComponent = (props) => {

    const [searchbydropdown,setsearchbydropdown]=useState("");


    const handlesearchby=(event)=>{
      
      setsearchbydropdown(event.target.value)

     
      
    }

  return (
    <>
            <div className="searchFunc">

                    <h2>Search Hotels</h2>
                    <hr style={{width:"85%"}}/>

                      <form >
                            <table>
                              <tr>
                                <td>Search By : </td>
                                <td><select name="cars" id="cars" required="required" onClick={handlesearchby}>
                                          <option value="hotelnamesearch" defaultValue={"hotelnamesearch"}>Hotel Name</option>
                                          <option value="hotelcitysearch">City Name</option>
                                        
                                          
                                    </select></td>
                                
                              </tr>


                            </table>


                           <DisplaySearchForm data={searchbydropdown}/>

                    

                      </form>

            </div>
    </>
  )
}

export default SearchComponent
