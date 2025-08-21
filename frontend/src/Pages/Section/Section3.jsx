import React from 'react'
import { Col, Container, NavLink, Row } from 'react-bootstrap'
import delivery_bike from '../../assets/image/assets/about/delivery-bike.png'
import pizza_logo from '../../assets/image/assets/about/pizza.png'
import salad_logo from '../../assets/image/assets/about/salad.png'
import { Link } from 'react-router'

const mockData=[
    {
        image:pizza_logo,
        title:"Original",
        paragraph:"Authentic, oven-baked pizza made with love and the finest ingredients.From crispy crusts to melty cheese, every slice is a taste of perfection."
    },
    {
        image:salad_logo,
        title:"Quality Food",
        paragraph:"Fresh, vibrant, and full of flavor — our salads are a celebration of health.Crisp greens, colorful veggies, and bold dressings in every refreshing bite."
    },
    {
        image:delivery_bike,
        title:"Fastest Delivery",
        paragraph:"Craving something delicious? We deliver it hot and fast — right to your door.Lightning-fast delivery so your food arrives fresh, every single time."
    }
]

const Section3 = () => {
  return (
    <>
    <section className='about_info_section'>
            <Container>
                <Row>
                    <Col lg={{span:8,offset:2}} className="text-center">
                        <h2>The burger tastes better when you eat it with your family</h2>
                        <p className='py-5'>
                            Savor the bold taste of our handcrafted burgers made fresh every day.
                            From classic cheeseburgers to unique gourmet creations, there’s something for everyone.
                            Each bite is packed with flavor, quality, and a whole lot of satisfaction.
                        </p>
                        <div className='d-flex justify-content-center'>
                             <Link to="/menu" className='btn order_now btn_red'>Explore Full MENU</Link>
                        </div>
                        

                    </Col>
                </Row>
            </Container>
        </section>

        
          <section className='about_wrapper'>
            <Container>
                <Row className='py-5'>
                    {mockData.map((CardData,index)=>(
                        <Col sm={12} md={4} key={index} className=''>
                            <div className='about_box text-center gap-5'>
                                    < img src={CardData.image} className='img-fluid about_icon pb-5' alt='icon'/>                      
                                <h4>{CardData.title}</h4>
                                <p>{CardData.paragraph}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
            </section>
    </>
  )
}

export default Section3