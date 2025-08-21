import React from 'react'
import { Row,Col, Container } from 'react-bootstrap'
import { menu_list } from '../../assets/image/frontend_assets/assets'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useNavigate } from 'react-router-dom'
import { Autoplay } from 'swiper/modules'

const Section4 = () => {
    const navigate=useNavigate();
  return (
    <>
        <section>
            <Container fluid className='section2_mainarea py-5 py-md-5'>
                <Row className='p-md-5'>
                    <div>
                        <h1>Explore our Menu</h1>
                        <p>Choose from a diverse menu faturing a delectable array of dishes</p>
                    </div>
                        <Swiper  spaceBetween={1} loop={true} 
                        modules={[Autoplay]}
                        autoplay={{
                            delay:4000
                        }}
                        breakpoints={{
                            0:{
                                slidesPerView:2,
                            },
                            768:{
                                slidesPerView:3,
                            },
                            1024:{
                                slidesPerView:5,
                            }
                        }}
                        >
                            {
                                menu_list.map((item,index)=>(
                                     <SwiperSlide  key={index} className='text-center'>
                                            <div className='explore_menu' onClick={()=>navigate(`/menu/${encodeURIComponent(item.menu_name)}`)}>
                                                <img src={item.menu_image} className='exp_image' />
                                                <h4>{item.menu_name}</h4> 
                                            </div>    
                                    </SwiperSlide>
                                ))
                             }
                    
                        </Swiper>
                </Row> 
            </Container>
        </section>
    </>
  )
}

export default Section4