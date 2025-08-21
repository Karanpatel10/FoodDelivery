import React, { useEffect } from 'react'
import {Col,Row,Container, Dropdown} from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'


const Order = ({URL}) => {

     const [orders, setOrders] = useState([]);

     const del_status_option=['Processing order','Shipped','Delivered'];
    
    const fetchAllOrders=async() => {
        const response= await axios.get(URL+"/api/order/list");
        if(response.data.success)
        {
            setOrders(response.data.data);
            console.log(response.data.data);
        }else{
            console.log(response.data.message);
        }
    }

    const orderstatushandler=async(orderId,status)=>{
        const response=await axios.put(URL+"/api/order/orderstatus",{orderId:orderId,status:status});
        if(response.data.success)
            {
                fetchAllOrders();
                console.log(response.data.data);
            }
            else{
                console.log(response.data.message);
                }

    }
    const getdeliveredinfo=(status)=>{
        switch(status)
        {
            case "Processing order":
                return "primary";
            case "Shipped":
                return "warning";
            case "Delivered":
                return "success";
        }
    }

    useEffect(()=>{
        fetchAllOrders();
    },[])

  return (

     
    <div className='container-fluid'>
    <Container>
        <Row>
            <Col>
            <h3>Orders</h3>
            </Col>

            <table>
                <thead>
                    <tr className='border bg-light'>
                        <th>Order</th>
                        <th>Customer Info</th>
                        <th>Item</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index} className='border'>
                            
                                <td> {order._id}<br/>
                                {new Date(order.date).toLocaleString()}</td>
                        
                                 <td>{order.address.firstName+" "+order.address.lastName}<br/>
                                 {order.address.street+" "+order.address.city+" "+order.address.state+" "+order.address.zipcode}</td>
                            
                                <td>{order.item.reduce((sum,product)=>sum+product.quantity,0)}</td>

                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle className={`bg-${getdeliveredinfo(order.status)}`}>
                                            {order.status}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                        del_status_option.map((data)=>{
                                            return(
                                                <Dropdown.Item key={data} onClick={()=>orderstatushandler(order._id,data)}>{data}</Dropdown.Item>
                                            )
                                        })
                                    }
                                    </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Row>
    </Container>


    </div>
  )
}

export default Order