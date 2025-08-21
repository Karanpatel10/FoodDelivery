import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

const Layout = ({ShowLogin,setShowLogin}) => {
  return (
    <>
       
        
        <Header setShowLogin={setShowLogin}/>
        <div>
            <Outlet/>
        </div>
        <Footer/>
        
       
        
       
    </>
  )
}

export default Layout