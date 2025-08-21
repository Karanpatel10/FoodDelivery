import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import { Link } from 'react-router'
import './FooterStyle.css'


const Footer = () => {
  return (
    <>
      <footer>
        <Container>
          {/* Row 1.0 */}
          <Row className='text-center'>
            <Col sm={6} lg={3}>
              <div>
                <h5>Location</h5>
                <div className='py-4'>
                  <p>5505 Waterford District</p>
                  <p> Dr. Miami FL 33126</p>
                  <p>United states</p>
                </div>
              </div>
            </Col>
            <Col sm={6} lg={3}>
                <div>
                  <h5>Working Hours</h5>
                  <div className='py-4'>
                    <p>Mon-Fri: 9:00AM - 10:00PM</p>
                    <p>saturday: 10:00AM - 8:30PM</p>
                    <p>Sunday: 12:00PM - 5:00PM</p>
                  </div>
                </div>
            </Col>
            <Col>
                <div>
                  <h5>Order Now</h5>
                    <div className='py-4'>
                      <p>Call us or visit our store to place your order</p>
                      <p style={{color:'var(--yellow)'}} className='fs-3 py-2'><Link to="tel:9999887777">999-888-7777</Link></p>
                    </div>
                </div>
            </Col>
            <Col sm={6} lg={3}>
              <div>
                <h5>Follow Us</h5>
                  <div className='d-flex justify-content-center align-items-center gap-3 fs-2 py-4'>
                    <p><a href="https://facebook.com" target="_blank" ><i class="bi bi-facebook"></i></a></p>
                    <p><a href="https://instagram.com" target="_blank" ><i class="bi bi-instagram"></i></a></p>
                    <p><a href="https://twitter.com" target="_blank" ><i class="bi bi-twitter"></i></a></p>
                    <p><a href="https://youtube.com" target="_blank" ><i class="bi bi-youtube"></i></a></p>
                  </div>
              </div>
            </Col>
          </Row>

          <hr/>

          {/* Row 2.0 */}
          <Row>
              <Col>
                <div >
                  <ul className='list-unstyled text-center'>
                    <li>&copy;2023 <span style={{color:'var(--light-red)'}}>Code43</span> All Rights Reserved</li>
                    <li>
                      <Link to='/about'>About Us</Link>
                    </li>
                    <li>
                      <Link to='/terms_of_use'>Terms of Use</Link>
                    </li>
                    <li>
                      <Link to='/privacy_policy'>Privacy Policy</Link>
                    </li>
                  </ul>
                </div>
              </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer