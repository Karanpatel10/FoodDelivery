import React, { useContext } from 'react'
import { Row,Col, Container } from 'react-bootstrap'
import Menu from '../Menu'
import CardDesgin from '../../Components/CardDesign'
import { StoreContext } from '../Context/StoreContext'



const Section5 = () => {

  const {food_list}=useContext(StoreContext)

const topRatedItem=(food_list|| []).sort((a,b)=>b.rating-a.rating).slice(0,4);

  return (
    <>
        <section>
            <Container fluid>
                    <Row className='text-center p-0 p-md-5'>
                      <Col className='p-5'>
                      <h1 className='text-danger fw-bold'>Our Crazy Items</h1>
                      <p>Welcome to Crazy Item --- where flavor meets fun! "Big taste,bold combos, and burgers like you're never seen before!</p>
                      </Col>
                    </Row>

                    <Row className='mx-0 gap-5 gap-lg-0 mx-md-5 px-3 px-md-5'>
                      {
                        topRatedItem.map((item,index)=>(
                          <Col key={index} sm={12} md={5} lg={3}>
                            <CardDesgin item={item} showPrice={false}/>
                          </Col>
                        ))
                      } 
                    </Row>
                    
                      <Row className='gap-5 justify-content-center py-5'>
                      <Col sm={12} md={4}>
                        <div className='adv_1 ads_Box p-4'>
                          <h3>get your free</h3>
                          <h1>cheese fries</h1>
                        </div>
                      </Col>
                      <Col sm={12} md={6}>
                      <div className='adv_2 ads_Box p-4'>
                         <h3>get your free</h3>
                          <h1>Cheese burger</h1>
                      </div>
                      </Col>
                       </Row>
                    
            </Container>
        </section>
    </>
  )
}

export default Section5