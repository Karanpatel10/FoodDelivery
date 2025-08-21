import React from 'react'
import {Container,Col,Row} from 'react-bootstrap'
import { Link } from 'react-router'


const Section8 = () => {
  return (
    <>
    <section className="section5_mainarea">
        <Container>
          <Row className='p-5 text-center justify-content-center'>
            <Col sm={12} md={8} className=' py-0 py-md-5'>
            <h4>We Guarantee</h4>
            <h1 className='fw-bold'>30 minutes delivery!</h1>
            <p className='p-3'>We are commited to delivering your order 30 minutes of receiving it. If we fail to meet this commitment,  you will be eligible for a full refund or a discount on your next order.</p>
            <Link to='' className='btn btn_red fs-4 p-3'>Call: 999-888-7777</Link>
            </Col>
          </Row>
        </Container>
    </section>
    </>
  )
}

export default Section8