import React, { useContext, useState } from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import { CartSummary } from './Cart'
import { StoreContext } from '../Context/StoreContext'
import axios from 'axios'

const CartDelivery = () => {
    
const {getTotalCartAmount,token,food_list,cartItem,url}=useContext(StoreContext)

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
        if(cartItem[item._id]>0)
        {
            let itemInfo=item;
            itemInfo["quantity"]=cartItem[item._id];
            orderItems.push(itemInfo);
        }
    })
    let orderData={
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2,
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




  return (
    <>
        <section>
            <Container fluid className='p-0 p-md-5 m-0 m-md-5'>
                <Row className='p-5 d-flex justify-content-between'>
                    <Col sm={12} md={5} className='p-5'>
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
                                    <input type='text' name='city' onChange={onChangehandler} value={data.city} placeholder='City' className='form-control' required/>
                                    <input type='text' name='state' onChange={onChangehandler} value={data.state} placeholder='State' className='form-control' required/>
                                </div>
                                <div className='col-md-12 d-flex gap-3'>
                                    <input type='text' name='zipcode' onChange={onChangehandler} value={data.zipcode} placeholder='Zip Code' className='form-control' required/>
                                    <input type='text' name='country' onChange={onChangehandler} value={data.country} placeholder='Country' className='form-control' required/>
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