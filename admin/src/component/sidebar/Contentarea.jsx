import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'



const Contentarea = ({URL}) => {

  const [totalItem,setTotalItem]=useState(0);
  const [totalOrder,setTotalOrder]=useState(0);

const fetchData=async()=>{
  
  try{
    const resItem= await axios.get(URL+'/api/food/list/count');
    setTotalItem(resItem.data.f_count);
    const resOrder=await axios.get(URL+'/api/order/list/ordercount');
    setTotalOrder(resOrder.data.o_count);
  }catch(error){
    console.log("Error fetching count",error);
  }
}

useEffect(()=>{
  fetchData();
},[])

  return (
    
   <section>
      <Container>
        <Row className="g-4">
          <Col md={3}>
            <Card className="p-3 text-center" style={{backgroundColor:'#b47373',color:'#fff'}}>
              <h5>Total Orders</h5>
              <h2>{totalOrder}</h2>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 text-center" style={{backgroundColor:'#73b499',color:'#fff'}}>
              <h5>Total Items</h5>
              <h2>{totalItem}</h2>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>


  )
}

export default Contentarea