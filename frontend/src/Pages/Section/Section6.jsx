import React from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Col, Container, Row } from 'react-bootstrap'
import { Swiper,SwiperSlide } from 'swiper/react'
import user_1 from '../../assets/image/assets/blog/review-author-1.jpg'
import user_2 from '../../assets/image/assets/blog/review-author-2.jpg'
import user_3 from '../../assets/image/assets/blog/review-author-3.jpg'
import user_4 from '../../assets/image/assets/blog/review-author-4.jpg'
import { Navigation,Pagination,Autoplay } from 'swiper/modules'

const reviewData=[
   {
        id:1,
        img_src:user_1,
        paragraph:`I ordered the Crazy Burger and wow — it exceeded all my expectations! 
                    The patty was juicy and perfectly seasoned, the buns were soft and fresh, 
                    and the toppings were stacked just right. I especially loved the special sauce
                    — it added the perfect kick. Fries were crispy and hot too! Definitely coming back
                    for more. Highly recommend!`,
        alt:`user_1`,
        name:'William Tony'

    },
    {
        id:2,
        img_src:user_2,
        paragraph:`The Spicy Deluxe Burger was an explosion of flavor! 
        The jalapeños gave it the perfect heat, and the melted pepper jack
        cheese pulled everything together. The beef patty was thick and juicy,
         and the toasted bun held up perfectly. Loved the attention to detail.
          Will be trying the BBQ one next!`,
        alt:`user_2`,
        name:"John Smith"

    },
    {
        id:3,
        img_src:user_3,
        paragraph:`Tried the Classic Cheeseburger and I was genuinely impressed. 
        The meat was cooked just right — juicy and flavorful without being greasy. 
        The veggies were crisp, the cheese was perfectly melted, and the burger overall
         felt really balanced. Tastes like a gourmet burger at a great price!`,
        alt:`user_3`,
        name:"Sayna Roy"

    },
    {
        id:4,
        img_src:user_4,
        paragraph:`Hands down one of the best burgers I’ve had in a long time. 
        I got the Mushroom Swiss Burger and every bite was rich and savory. 
        The sautéed mushrooms were buttery, the Swiss cheese was gooey, and 
        the whole thing came together like magic. Highly recommend it for any burger lover!`,
        alt:`user_4`,
        name:'Robert Harris'

    }
]

const Section6 = () => {
  return (
    <>
    <style>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: white !important;
          }
      `}</style>
        <section className='section4_mainarea'>
            <Container fluid>
                <Row className='justify-content-center'>
                    <Col md={10} className='text-center'>
                    <Swiper
                    modules={[Navigation,Pagination,Autoplay]}
                    slidesPerView={1}
                    loop={true}
                    navigation={true}
                    pagination={{clickable:true}}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                    }}
                    >
                      <>
                        {
                          reviewData.map((review, index) => {
                            return (
                              <SwiperSlide key={index}>
                              <div  className='text-white p-5'>
                                <img src={review.img_src} alt={review.alt} className="img-fluid rounded-circle"/>
                                <p className='col-md-8 mx-auto'>{review.paragraph}</p>
                                <div className='d-flex justify-content-center gap-3 blog_star fs-1'>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </div>
                                <h1>{review.name}</h1>
                              </div>
                              </SwiperSlide>
                            )
                          }
                        )
                        }
                      </>
                    </Swiper>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Section6