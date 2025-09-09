import React, { useContext, useState,useEffect} from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import { CartSummary } from './Cart'
import { StoreContext } from '../Context/StoreContext'
import axios from 'axios'
import {Country,State,City} from 'country-state-city'

const CartDelivery = () => {
    
const {getTotalCartAmount,token,food_list,cartItem,url,promo}=useContext(StoreContext)

const[country,setCountry]=useState("");
const[state,setState]=useState("");
const[city,setCity]=useState("");

const countries=Country.getAllCountries();
const states=country?State.getStatesOfCountry(country):[];
const cities=state?City.getCitiesOfState(country,state):[];


const [data,setData]=useState({
firstName:"",
lastName:"",
email:"",
street:"",
city:"",
state:"",
zipcode:"",
country:"",
phone:"",
})

const onChangehandler=(event)=>{
const name=event.target.name;
const value=event.target.value;
setData(data=>({...data,[name]:value}))
}

const placeOrder=async(event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
        if((cartItem[item._id] || 0) >0)
        {
            let itemInfo=item;
            itemInfo["quantity"]=cartItem[item._id];
            orderItems.push(itemInfo);
        }
    })
    let orderData={
    address:data,
    items:orderItems,
    amount:parseFloat(getTotalCartAmount()+2-(promo?.type === "success" ? promo.discount : 0)).toFixed(2),
    promo: promo?.type === "success" ? promo : null,
    discount: promo?.type === "success" ? promo.discount : 0
    }
   
    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}})
   
    if(response.data.success)
    {
        const{session_url}=response.data;
        window.location.replace(session_url);
    }else{
        alert("Error");
    }
}

useEffect(()=>{
console.log("update data",data);
},[data])



  return (
    <>
        <section>
            <Container fluid className='p-0 p-md-5 m-0 m-md-5'>
                <Row className='p-5 d-flex justify-content-between'>
                    <Col sm={12} md={5}>
                        <form  onSubmit={placeOrder}>
                           <div className='d-flex flex-column gap-4'>
                                <h2>Delivery Information</h2>
                                <div className='col-md-12 d-flex gap-3'>
                                    <input type='text' name="firstName" onChange={onChangehandler} value={data.firstName} placeholder='First Name' className='form-control' required/>
                                    <input type='text' name='lastName' onChange={onChangehandler} value={data.lastName} placeholder='Last Name' className='form-control' required/>
                                </div>
                                <input type='email' name='email' onChange={onChangehandler} value={data.email} placeholder='Email address' className='form-control' required/>
                                <input type='text' name='street' onChange={onChangehandler} value={data.street} placeholder='Street' className='form-control' required/>
                                <div className='col-md-12 d-flex gap-3'>
                                     
                                      <select className='form-control' value={country} onChange={(e)=>{const selectedCountry = countries.find(c => c.isoCode === e.target.value);setCountry(e.target.value);setData({...data,country:selectedCountry?.name||""})}} required>
                                        <option value="">--- select Country ---</option>
                                        {countries.map((c)=>(
                                            <option key={c.isoCode} value={c.isoCode}>
                                                {c.name}
                                            </option>
                                        ))}  
                                        </select>

                                        <select className='form-control' value={state} onChange={(e)=>{const selectedState = states.find(s => s.isoCode === e.target.value);setState(e.target.value);setData({...data,state:selectedState?.name||""})}} required>
                                        <option value="">--- select state ---</option>
                                        {states.map((s)=>(
                                            <option key={s.isoCode} value={s.isoCode}>
                                                {s.name}
                                            </option>
                                        ))}  
                                        </select>

                                    
                                </div>
                                <div className='col-md-12 d-flex gap-3'>
                                   
                                    <select className='form-control' value={city} onChange={(e)=>{setCity(e.target.value);setData({...data,city:e.target.value})}} required>
                                        <option value="">--- select city ---</option>
                                        {
                                            cities.map((ct)=>(
                                                <option key={ct.name} value={ct.name}>
                                                    {ct.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    <input type='text' name='zipcode' onChange={onChangehandler} value={data.zipcode} placeholder='Zip Code' className='form-control' required/>

                                </div>
                                <input type='tel' name='phone' onChange={onChangehandler} value={data.phone} placeholder='Phone' className='form-control' required/>
                            </div>
                            <button type='submit' className='btn cart_btn my-5'>Proced to Checkout</button>
                        </form>
                    </Col>
                    <Col sm={12} md={5} className='mt-sm-5 mt-md-0 p-5'>
                        <CartSummary />
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default CartDelivery