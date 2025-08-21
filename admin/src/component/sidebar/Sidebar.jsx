import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar d-flex flex-column  gap-4 p-4'>
        <NavLink to='/addorder' className='nav-link'>
              <i class="bi bi-cart-plus"/>
              <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className='nav-link'>
              <i class="bi bi-cart-check"/>
              <p>List Items</p> 
        </NavLink>
        <NavLink to='/order' className='nav-link'>
              <i class="bi-bag-check"/>
              <p>Orders</p>
        </NavLink>
    </div>
  )
}

export default Sidebar