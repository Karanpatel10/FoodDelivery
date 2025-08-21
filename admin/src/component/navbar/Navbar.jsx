import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/image/admin_assets/assets'
import { NavLink } from 'react-router-dom'


const Navbar = () => {

  const link_main_page="http://localhost:5173";

  const handlelogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem("username");
    window.location.href=link_main_page
    
  }
  return (
    <div className='d-flex justify-content-between p-3'>
      <NavLink to='/'><img src={assets.logo} alt=' admin_logo' role='Link' /></NavLink>
      <img src={assets.profile_image} role='button' onClick={handlelogout}/>
    </div>
  )
}

export default Navbar