import React, { useContext } from 'react'
import { useState } from 'react';
import {Container,Row,Col,Form,Button,Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import sec_bg from '../assets/image/assets/contact_us/contact_sec1_bg.webp'
import { toast } from 'react-toastify';
import axios from 'axios';
import { StoreContext } from './Context/StoreContext';


const mockdata=[
  {
    "id": 1,
    "name": "Report an Experience",
    "description":"you can report a resturant or order experience or pay us a compliment online via our handy form",
    "btn_icon": "view form",
    "icon":<i class="bi bi-pc-display-horizontal"></i>
  },
  {
     "id": 2,
    "name": "Arby's chat",
    "description":"chat with chatbot to help you find what you need",
    "btn_icon": "start chat",
    "icon":<i class="bi bi-chat"></i>
  },
  {
    "id": 3,
    "name": "still need help",
    "description":"we're here for you. Our service hours are 8:00 AM - midnight EST",
    "btn_icon": "call us",
    "icon":<i class="bi bi-telephone"></i>
  }
];




const Contact_us = () => {

    const {url}=useContext(StoreContext);
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    subject:'',
    message:'',
  })

  const handleChange=async(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const response=await axios.post(`${url}/api/contactus`,{name:formData.name,email:formData.email,subject:formData.subject,message:formData.message});
      if(response.data.success){
       alert("Message sent successfully");
       setFormData({name:'',email:'',subject:'',message:''})   
      }else{
        alert("Failed to send message. Try again");
      }
    }catch(error){
      console.log(error);
      toast.error("Somthing went wrong");
    }
  }

  return (
    <>
    <style>
      {
        `
          .contact_banner {
          background-size: cover;
          background-position: center;
          padding: 3rem;
          color: var(--white);
           background-color: var(--violeat);
        }

         .box_mainarea {
          background-color:var(--light-pink);
          padding: 2rem;
          border-radius: 10px;
          position: relative;
          z-index: 2;
        `
      }
    </style>
    <section>
      <Container fluid className='py-5' >
        <Row className='p-0 p-md-5 m-0 m-md-5 text-white'>
          <Col className='p-5 m-0 m-md-5' style={{ backgroundImage: `url(${sec_bg})`, backgroundSize: 'cover', backgroundPosition: 'center',width:'100%',height:'30rem' }}>
          <h2 className='py-5'>Get in Touch</h2>
          <h4>how can we help?</h4>
          <p>search the site Help Center,take a survey, ask our community.The answer you are looking for are right at your fingertips!</p>
          <input type="search" placeholder='Ask us anything' className='p-3 w-50'/>
          </Col>
        </Row>
        <Row  className='justify-content-center'>
          <h1 className='p-5 fw-bold'>Contact Us</h1>
          {mockdata.map((data,idx)=>{
            return(
              <Col sm={12} md={3} key={idx} className='p-5 m-0 m-md-5 contact_banner text-center'>
                <h1 className='py-3'>{data.icon}</h1>
                <h2>{data.name}</h2>
                <p>{data.description}</p>
                <Button className='btn order_btn btn_red'>{data.btn_icon}</Button>
              </Col>
            )
          })}
        </Row>

        <Row className='p-5 my-5 justify-content-center'>
          <Col sm={10} md={6} className='rounded-5 box_mainarea'>

          <Form className='p-2 p-md-5' onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter your name'
                required
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                required
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formSubject'>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type='text'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                placeholder='Subject'
                required
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formMessage'>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as='textarea'
                rows={5}
                name='message'
                value={formData.message}
                onChange={handleChange}
                placeholder='Write your message here...'
                required
              />
            </Form.Group>

            <Button type='submit' variant='danger'>Send Message</Button>
          </Form>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}

export default Contact_us