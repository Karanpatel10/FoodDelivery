import React from 'react'
import terms_of_uses from '../../DataDetails/Terms_Of_Use'
import { Col, Container, Row } from 'react-bootstrap'

const Terms_Of_Use = () => {
  return (
     <>
        <section className='lh-lg'>
            <Container className='py-5'>
                <Row className='py-5'>
                    <Col className='py-5'>
                    <h2>Terms of Use</h2>
                    {
                        terms_of_uses.map((items,index)=>(
                            <div key={index}>
                               {items.title && <h3>{items.title}</h3>} 
                                <p style={{textAlign:'justify'}}>{items.paragraph}</p>
                            </div>
                        ))
                    }
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Terms_Of_Use