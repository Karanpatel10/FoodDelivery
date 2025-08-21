import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { assets } from '../../assets/image/frontend_assets/assets'
import e_shop from '../../assets/image/assets/shop/e-shop.png'

const Section9 = () => {
  return (
    <>
        <section className='appDload_mainarea'>
            <Container fluid>
                <Row className='p-0 px-md-5'>
                    <Col sm={12} md={6} className='d-flex flex-column align-items-center mb-sm-1 p-5 align-items-md-start'>
                        <h5>Download mobile App and</h5>
                        <h1 className='appDload_font fw-bold'>Save up to 20%</h1>
                        <p className='py-4'>Donwload our mobile app today and unlock exlusive discounts. Enjoy seamless ordering right from your phone. Save up 20% on your favourite meals with evry order. Experience conveience and great deals all in one Place </p>
                        <div className='d-flex gap-5'>
                            <img src={assets.play_store} className='app_logo' alt='play store'/>
                            <img src={assets.app_store}  className='app_logo' alt='app store' />
                        </div>
                        
                    </Col>
                    <Col sm={12} md={6} className='d-flex flex-column align-items-center p-5'>
                        <img src={e_shop} alt='app design' className='app_logo2'/>    
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}
export default Section9