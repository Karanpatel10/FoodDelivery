import React from 'react'
import { Button, Col, Container,Row } from 'react-bootstrap'
import delicious_burger from '../../assets/image/assets/hero/delicious_burger.png'
import hil_price from '../../assets/image/assets/hero/price-badge-yellow.png'
import { Link } from 'react-router'

const Section1 = () => {
  return (
    <>
    <section className='SectionFull_mainarea px-5'>
        <Container fluid>
            <Row className='align-items-center'>
                <Col sm={12} md={6}>
                    <img src={delicious_burger} className='d_burger' alt='burger_main'/>
                    
                </Col>
                <Col sm={12} md={6} className='text-center text-white py-5'>
                    <div className='hi_light_price d-flex flex-row align-items-start'>
                        <img src={hil_price} alt='helight_Price' className='hi_light_img'/>
                        <h1 className='hi_light_value'>Only <br/>$ 6.99</h1>
                    </div>
                    <h1 className='fw-bold'>New Burger</h1>
                    <h3 className='fw-bold'>With onion</h3>
                    <p className='py-5'>Get ready to crave every bite — our new Signature Onion Burger is here to steal the show. Loaded with a juicy, flame-grilled patty, layered with melty cheese, fresh toppings, and crowned with crispy, golden-fried onions, it's the ultimate flavor explosion. One bite, and you'll know — this isn’t just a burger, it’s a game-changer.</p>
                    <Link to="/cart"><Button className='order_now rounded-2'>Order Now</Button></Link>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default Section1