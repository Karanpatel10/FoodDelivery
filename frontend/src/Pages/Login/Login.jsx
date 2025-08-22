import React, { useContext, useState } from 'react'
import { Col, Container,Row } from 'react-bootstrap'
import './LoginStyle.css'
import { StoreContext } from '../Context/StoreContext'
import axios from 'axios'
import {toast} from 'react-toastify'


const Login = ({setShowLogin}) =>{

  
  const {url,setToken}=useContext(StoreContext)
  const [currstate,SetcurrState]=useState('Login');
  const[data,setData]=useState({
    name:'',
    email:'',
    password:'',
  })

  const onchangehandler=(event)=>{
    const name=event.target.name
    const value=event.target.value
    setData((data)=>({...data,[name]:value}));
    }

  const onLogin=async(event)=>{
    event.preventDefault()
    let newUrl=url;
    newUrl += currstate === 'Login' ? 'api/user/login' : 'api/user/register';
   
    
   try{
          const response=await axios.post(newUrl,data);
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("username",response.data.user?.name||data.name)
          if(response.data.user.role === 'admin')
          {
                          
                  const link_main_page="http://localhost:5174";
                   window.location.href=link_main_page;
                   localStorage.removeItem("token");
    
          }
          toast.success( currstate=='Login'?'Login successfully':'Create account successfully');
          setTimeout(()=>{setShowLogin(false)},300)
      
      }
      }catch(error){
         toast.warning(error.response.data.message);
      }
    
    
    
  }

  return (
    <>
   
      <section className='Login_fullarea'>
            <div className='Login_mainarea rounded-4'>
              <form onSubmit={onLogin} className='Login_popup_container p-4'>
                <div className='d-flex justify-content-between mb-4'>
                    <h2>{currstate}</h2>
                    <i className="bi bi-x-lg" onClick={()=>{setShowLogin(false)}}></i>
                </div>
                <div className='Login_section d-flex flex-column '>
                    {currstate==='Login'?<></>:<input name='name' onChange={onchangehandler} value={data.name} type='text' placeholder='Your Name' required/>}
                    <input name='email' onChange={onchangehandler} value={data.email} type='email' placeholder='Your Email' required/>
                    <input name='password' onChange={onchangehandler} value={data.password} type='password' placeholder='Your Password' required/>
                    <button type='submit' className='login_btn btn cart_btn'>{currstate==='Sign Up'?'Create account':'Login'}</button>
                </div>
        
                <div className='py-2'>
                    <input type='checkbox' required/>
                    <p className='ms-2'>By Continuing, i agree to the terms of use & privacy policy</p>
                </div>
                <div>
                    {
                    currstate==='Login'?
                    <p>Create a new account?<span onClick={()=>SetcurrState('Sign Up')}>&nbsp;Click here</span></p>:
                    <p>Already have an account?<span onClick={()=>SetcurrState('Login')}>&nbsp;Login here</span></p>
                    }
                </div>
              </form>
            </div>
        
        
      </section>
    </>
  )
}

export default Login