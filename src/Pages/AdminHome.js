import React from 'react'
import AdminNav from '../Components/AdminNav'


const AdminHome = () => {
  return (
    <>
      <AdminNav/>
      <div className='hotelcard'>
      <h1 style={{color:"red"}}>CDAC PROJECT</h1>
      <hr /><hr />
       <h2>Members</h2>
       <hr />
       <div className='hotelcard'>
       <h5>Adwait Gawade</h5>
       <h5>Abhijeet Patil</h5>
       <h5>Aniket Bhandwalkar</h5>
       <h5>Saurav Bhosale</h5>
       <h5>Sahil Kadam</h5>
       </div>
    </div>
    </>
  )
}

export default AdminHome
