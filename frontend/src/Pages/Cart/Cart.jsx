import React, { Fragment, useContext, useEffect } from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import { StoreContext } from '../Context/StoreContext'
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import {toast} from 'react-toastify'




const CartSummary=()=>{

    const {getTotalCartAmount}=useContext(StoreContext);
    

    return (
      <>
        <h3 className="pb-4">Cart Totals</h3>
        <div className="d-flex justify-content-between">
          <p>Subtotal</p>
          <span>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount().toFixed(2)}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <p>Delivery Fee</p>
          <span>${getTotalCartAmount() === 0 ? 0 : (2).toFixed(2)}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <p>Total</p>
          <span>${getTotalCartAmount() === 0? 0: (getTotalCartAmount() + 2).toFixed(2)}
          </span>
        </div>
      </>
    );
}



const Cart = ({setShowLogin}) => {

    const{cartItem,food_list,removetoCart,url,token,getTotalCartAmount}=useContext(StoreContext);
    const filteredCartItems=food_list.filter(item=>cartItem[item._id]>0);

    const navigate=useNavigate();

    const handleCheckout=()=>{
      if(!token)
      {
        setShowLogin(true);
      }else if(getTotalCartAmount() === 0)
      {
        toast.warning("you cart is empty");
      }
      else{
        navigate('/cart/delivery');
      }
    }

  return (
    <>
        <section>
            <Container className='my-5'>
                <h2 className='pb-5'>Order Summary</h2>
                <Row className='text-center'>
                    
                        <Col>Items</Col>
                        <Col>Title</Col>
                        <Col>Price</Col>
                        <Col>Quantity</Col>
                        <Col>Total</Col>
                        <Col>Remove</Col>
                
                    {
                        filteredCartItems.length === 0?
                        (
                            <>
                            <hr/>
                            <h3 className='py-5'>No Item in Cart</h3>
                            </>
                        ):
                        (
                            filteredCartItems.map((item)=>{
                                return(
                                        <div key={item._id}>
                                        <hr/>
                                        <Row className='text-center'>
                                            <Col><img src={item?.image?.startsWith('/')? item.image: `${url}/image/${item.image}`}  style={{ width: '5rem', height: '5rem', objectFit: 'cover' }}/></Col>
                                            <Col>{item.name}</Col>
                                            <Col>&#8377;{item.price.toFixed(2)}</Col>
                                            <Col>{cartItem[item._id]}</Col>
                                            <Col>&#8377;{(item.price*cartItem[item._id]).toFixed(2)}</Col>
                                            <Col><i className="bi bi-x text-danger" onClick={()=>removetoCart(item._id)} role='button'></i></Col>
                                        </Row>
                                        </div>
                                    )
                                  
                                }
                            )
                        )
                    }
                </Row>

                <Row className='my-5 py-5 flex-md-row flex-column-reverse'>
                    
                        <Col sm={12} md={6}>
                           <CartSummary/>
                           
                             <button className="my-5 fs-5 btn cart_btn" onClick={handleCheckout}>Checkout</button>
                           
                        </Col>
                        
                       
                        <Col sm={12} md={6} className='py-5 py-md-0 d-flex justify-content-center'>
                            <div className='d-flex flex-column col-sm-12 col-md-6'>
                                 <p>If you have a promo code, Enter  here</p>
                                 <div className='d-flex'>
                                    <input type='text' placeholder='promo code' className='form-control' style={{backgroundColor:'rgba(219,219,219,0.8)'}}/>
                                    <button className='btn btn-dark rounded-0'>submit</button>
                                </div>
                            </div>
                        </Col> 
                        
                            
                    
                </Row>
            </Container>
        </section>
    </>
  )
}

export {CartSummary}
export default Cart