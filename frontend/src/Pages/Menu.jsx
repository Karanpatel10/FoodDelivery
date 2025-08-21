import React, { useContext } from 'react'
import CardDesgin from '../Components/CardDesign'
import { Col, Container, Row } from 'react-bootstrap'
// import { food_list } from '../assets/image/frontend_assets/assets'
import { useParams } from 'react-router-dom'
import { StoreContext } from './Context/StoreContext'

const Menu = () => {
  const{category}=useParams()
  const {food_list} =useContext(StoreContext)

  let menuItems=food_list

  // Filter menu
 if(category)
  {
    menuItems=food_list.filter(item=>item.category === category);
  }
  
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
                    <p>No Item found for category</p>
                  )
               }
            </Row>
        </Container>
      </section>  
    </>
  )
}

export default Menu