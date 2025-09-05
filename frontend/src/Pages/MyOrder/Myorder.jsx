import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/image/frontend_assets/assets';
import Stepper from 'react-stepper-horizontal';

const Myorder = () => {

    const{url,token}=useContext(StoreContext);
    const [data,setData]=useState([]);

    const fetchorder=async()=>{
        const response=await axios.post(url+"/api/order/userorder",{},{headers:{token:token}});
        console.log(response);
        setData(response.data.data);
    }

    const steps=[
        {title:'Processing order'},
        {title:'Shipped'},
        {title:'Delivered'},
    ];

    const getStepIndex=(status)=>{
        switch(status){
            case 'Processing order': return 0;
            case 'Shipped': return 1;
            case 'Delivered': return 2;
            default:return 0;
        }
    };

    useEffect(()=>{
        if(token){
            fetchorder();
        }
    },[token])

    
  return (
    
    <>
    <section>
        <Container className='py-5'>
            <Row className='py-5'>
                <Col className='py-5'>
                <h2 className='pb-5'>My Order</h2>
                <table className='table border align-middle'>
                    <thead>
                        <tr className='text-center'>
                        <th className='d-none d-sm-table-cell'>Title</th>
                         <th>Product</th>
                         <th className='d-none d-sm-table-cell'>items</th>
                        <th>Amount</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className='border'>
                        
                    {
                        data.length === 0? (
                            <tr>
                            <td colSpan="5" className='text-center py-5 fs-2' style={{border:"none"}}>No order found</td>
                            </tr>
                        ):(
                            data.map((product,index)=>(
                                <tr key={index} className='text-center'>
                                    <td className='d-none d-sm-table-cell'><img src={assets.parcel_icon} alt='parcel_icon'/></td>
                
                                            <td>{product.item.map((pro,idx)=>(<p key={idx}>{pro.name}&nbsp;x&nbsp;{pro.quantity}</p>))}</td>
                                            <td className='d-none d-sm-table-cell'>{product.item.reduce((total,pro)=>total+pro.quantity,0)}</td>
                                            
                                    <td><p>$&nbsp;{product.amount.toFixed(2)}</p></td>
                                    <td><p><Stepper  steps={steps} activeStep={getStepIndex(product.status)} activeColor="#198754" completeColor="#198754" defaultColor="#f59301"/></p></td>
                                </tr>
                            )
                        ))
                    }
                    
                    </tbody>
                </table>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default Myorder