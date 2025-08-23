import React, { useContext } from 'react'
import CardDesgin from '../Components/CardDesign'
import { Col, Container, Row } from 'react-bootstrap'
// import { food_list } from '../assets/image/frontend_assets/assets'
import { useParams } from 'react-router-dom'
import { StoreContext } from './Context/StoreContext'

const Menu = () => {
  const{category}=useParams()
  const {food_list} =useContext(StoreContext)


  // Filter menu
  if (!food_list || food_list.length === 0) {
    return (
      <h3 className='py-5 d-flex justify-content-center'>Loading menu...</h3>
    );
  }

let menuItems = category 
    ? food_list.filter(item => item.category === category) 
    : food_list;
  console.log(food_list);
  
  return (
    <>
      <section>
        <Container className='py-5'>
           <Row className='py-5'>
               {
                  menuItems.length>0?(
                    menuItems.map((item,index)=>(
                    <Col key={index} sm={12} md={6} lg={3} className='g-5'>
                      <CardDesgin item={item} showReview={false}/>
                    </Col>
                  ))
                  ):(
                    <h2 className='py-5 d-flex justify-content-center'>No Item found for category</h2>
                  )
               }
            </Row>
        </Container>
      </section>  
    </>
  )
}

export default Menu