import React from 'react'

export const DiscountNotification = (props) => {


    const discount=props.data;


    if(discount==0)
    {
        return (



           <>
           </>
          
          
            )
    }

    else
    return (



    <div ><h4> 🎉 OFFER 🎉: you are eligible for {props.data}% discount on any one booking </h4></div>
  
  
    )
}
