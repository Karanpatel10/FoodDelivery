import React, {useContext, useEffect, useState } from 'react'
import { Button, Col, Container,Form,Row } from 'react-bootstrap'
import { StoreContext } from '../Context/StoreContext'
import axios from 'axios';
import {toast} from 'react-toastify'
import {useNavigate } from 'react-router';

const Profile = () => {

    const {url,token,setToken}=useContext(StoreContext);
    const [user,setUser]=useState(null);
    const [editmode,setEditmode]=useState(false);
    const navigate=useNavigate()

    // for get profile details
    const fetchProfile=async()=>{
        try{
            const response= await axios.get(url+'/api/user/login/profile',{headers:{token:token}});
            if(response.data.success)
            {
                setUser(response.data.user);
            }
        }catch(error)
        {
            console.log(error);
        }
    }

    // for update profile details
    const handlesaveprofile=async()=>{
      try{
        const response=await axios.put(url+'/api/user/login/profile/update',{mobile:user.mobile,address:user.address,DOB:user.DOB,gender:user.gender},{headers:{token}});
        if(response.data.success)
        {
          toast.success("Profile updated successfully");
          setEditmode(false);
        }
        else{
          toast.error(response.data.message);
        }
      }catch(error)
      {
        console.log(error);
      }
    }

    // for delete account permantrly
    const handle_delete_acc=async()=>{
      // conform for delete

      const confordelete=window.confirm("Are sure you want delete account")
      if(!confordelete) return;

      try{
        const response=await axios.delete(url+'/api/user/login/profile/delete',{headers:{token:token}});
        toast.warning(response.data.message||"Account deleted permanately");
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/");

      }catch(error){
        console.log(error);
      }

    }

    useEffect(()=>{
        fetchProfile();
    },[])

    if (!user) return <p>Loading profile...</p>;  

  return (
    <>
    <style>
      {
        `
          .contact_banner {
           background-color: var(--light-pink);
          padding: 2rem;
          // box-shadow: 0 0 1rem rgba(0, 0, 0, 1);
          border-radius: 10px;
          position: relative;
          z-index: 2;
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
    <section className='py-5 my-5'>
        <Container className='p-5 my-md-5'>
            <Row className='rounded-5 contact_banner'>
                <Col  lg={6} className='p-2 p-md-5'>
                <h2 className='py-5'>Profile Details</h2>
               <Form>
                {/* read only with hint */}
                 <Form.Group className='lh-lg'>
                  <Form.Label className="fw-bold">Name:</Form.Label>
                  <Form.Control type='text' value={user?.name} plaintext/>
                  <Form.Label className="fw-bold">Email:</Form.Label>
                  <Form.Control type='email' value={user?.email} plaintext/>
                  <Form.Label className="fw-bold">Mobile No:</Form.Label>
                  <Form.Control type='number' value={user?.mobile||""} onChange={(e)=>setUser({...user,mobile:e.target.value})} readOnly={!editmode}/>
                  <Form.Label className="fw-bold">Address:</Form.Label>
                  <Form.Control type='text' value={user?.address||""} onChange={(e)=>setUser({...user,address:e.target.value})} readOnly={!editmode}/>
                  <Form.Label className="fw-bold">Date of Birth:</Form.Label>
                  <Form.Control style={{ width: "150px" }} type='date' value={user?.DOB||""} onChange={(e)=>setUser({...user,DOB:e.target.value})} readOnly={!editmode}/>
                  <Form.Label className="fw-bold">Gender:</Form.Label>
                  <Form.Select style={{ width: "150px" }} type='mobile' value={user?.gender||""} onChange={(e)=>setUser({...user,gender:e.target.value})} disabled={!editmode}>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Select>
                </Form.Group>
               </Form>
                
                
               <div className='py-5 d-flex gap-5'>
                    
                    <Button onClick={()=>editmode?handlesaveprofile():setEditmode(true)}>{editmode ?"Save Profile":"Update Profile"}</Button>
                    {!editmode && <Button variant='danger' onClick={handle_delete_acc}>De-Register Account</Button>}
                    {editmode && <Button variant='primary' onClick={()=>setEditmode(false)}>Cancel</Button>}
                </div>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default Profile