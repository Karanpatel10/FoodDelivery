
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router'




const Section2 = () => {
  return (
    <>
    <section className='d-flex justify-content-center my-5 py-5'>
        <Container className='section1_mainarea'>
            <Row>
                <Col lg={7} >
                   <div className='subsection text-white lh-lg p-5 d-flex flex-column justify-content-center'>
                        <h1>Order your favourite food here</h1>
                        <p className='lh-base'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate  your dining experience, one delicious meal at a time</p>
                        <Link to='/contact_us'><button className='w-25 viewmenu_btn btn'>Contact Us</button></Link>
                        
                   </div>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default Section2