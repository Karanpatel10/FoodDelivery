import React from 'react'
import { Col, Container,Row } from 'react-bootstrap'
import PromotionImage from '../../assets/image/assets/promotion/pro.png'
import Rellax from 'rellax'

const Section7 = () => {

  return (
    <>
    <section>
        <Container>
            <Row className='align-items-center py-5'>
                <Col sm={12} md={6}>
                <img src={PromotionImage} className='img-fluid ' alt='promotion'/>
                </Col>
                <Col sm={12} md={6} className='px-5'>
                            <h2>Nothing brings people together like a good burger</h2>
                            <p>It’s the perfect way to enjoy delicious flavors without 
                                breaking the bank. Whether you’re with friends or family, 
                                a tasty burger always makes moments special. Our limited-time
                                offer makes it even better to share and savor. Don’t miss out
                                on the chance to satisfy your cravings at a great price!
                            </p>
                            <ul>
                                <li>
                                    <p>
                                        Savor our delicious burgers, now on special promotion.
                                        Great taste and value all in one bite!
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Bring your friends and enjoy together.
                                        Nothing beats a burger shared with loved ones.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Made with fresh, quality ingredients.
                                        Every bite bursts with bold flavors.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Hurry, this offer won’t last long!
                                        Get your favorite burger before it’s gone.
                                    </p>
                                </li>
                            </ul>
                        </Col>
                    </Row>
        </Container>
    </section>

    <section className='bg_parallax_scroll img-fluid'>
        
    </section>
    </>
  )
}

export default Section7