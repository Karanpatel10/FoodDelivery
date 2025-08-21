import React, { useContext, useEffect, useState } from 'react'
import { Row,Col, Container, Spinner,Card,Button } from 'react-bootstrap'
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../Context/StoreContext';
// import { logo } from '../../assets/image/assets//brands/brand-11.png';
import '../Login/LoginStyle.css';
import axios from 'axios';

const Verify = () => {

  const [searchParam,setSearchParam]=useSearchParams();
  const[loading,setLoading]=useState(true);
  const[paymentStatus,setPaymentStatus]=useState(null);


  const success=searchParam.get("success");
  const orderId=searchParam.get("orderId");

  const {url}=useContext(StoreContext);
  const navigate=useNavigate();
  console.log(success,orderId);

  const verifyPayment=async()=>{
    try{
        const response=await axios.post(url+"/api/order/verify",{success,orderId});
        setPaymentStatus(response.data.success?"success":"failed");
    }catch(error){
      console.log(error);
      setPaymentStatus("failed");
    }finally{
      
     setLoading(false);
    }
  }

  useEffect(()=>{
    verifyPayment();
  },[])

  useEffect(()=>{
    if(!paymentStatus) return;
         const redirectPath= paymentStatus ==="success"?"/myorder":"/";
         const timer=setTimeout(()=>navigate(redirectPath),5000);
        return ()=>clearTimeout(timer);
   
  },[paymentStatus,navigate]);

  

  if(loading)
  {
    return(
      <>
      <section className='Login_fullarea'>
        <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
          <Row>
            <Col>
            <Spinner animation='border' variant='info' className='fs-2' style={{height:'5rem',width:'5rem'}}/>
            <p className="mt-3 fs-5">Verifying Payment...</p>
            </Col>
          </Row>
        </Container>
      </section>
      </>
    );
  }

  return (
    
    <>
    <section className='Login_fullarea'>
        <Container className='Login_mainarea rounded'>
          
              <Card  className='d-flex flex-column align-items-center p-4 text-center'>
                {paymentStatus === "success" && (
                    <>
                        <h1>✅</h1>
                        <h2 style={{ color: "#28a745"}}> Payment Successful</h2>
                        {/* <img src={logo}/> */}
                        <p>Thank you for your payment. Your order is being processed.</p>
                        <p>Order ID: {orderId}</p>
                        <p>Redirecting to My Orders in 5 seconds...</p>
                        <Button variant="primary" onClick={() => navigate("/myorder")}>View Orders Now</Button>
                   </>
                  )
                }
                {paymentStatus === "failed" && (
                    <>
                          <h1>❌</h1>
                          <h2 style={{ color: "#dc3545" }}> Payment Failed</h2>
                          <p>Your payment could not be processed.</p>
                          <p>Please try again or use a different payment method.</p>
                          <p>Redirecting to Home in 5 seconds...</p>
                          <Button variant="danger" onClick={() => navigate("/")}>Go to Home Now</Button>
          
                    </>
                  )
                }
              </Card>
            
        </Container>
    </section>
    
    </>
  
)
}

export default Verify