import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './CardDStyle.css'
import { StoreContext } from '../Pages/Context/StoreContext';

const starRating=(rating)=>{
  const stars=[];

  for(let i=1;i<=5;i++)
  {
    if(rating>=i)
    {
      stars.push(<span key={i}><i className="bi bi-star-fill text-warning"></i></span>)
    }else if(rating>=i-0.5)
    {
      stars.push(<span key={i}><i className="bi bi-star-half text-warning"></i></span>)
    }else{
      stars.push(<span key={i}><i className="bi bi-star text-warning"></i></span>)
    }
  }
  return stars
}

const CardDesgin = ({item,showReview=true,showPrice=true}) => {
  const{url}=useContext(StoreContext);
  // const imageSrc = item.image.startsWith("/src") ? item.image : `${url}/images/${item.image}`; 

  const{cartItem,addtoCart,removetoCart}=useContext(StoreContext);

  return (
    <>    
              <Card key={item._id} className='custom_Card'>
                  <div className='card_wrapper'>
                    <Card.Img className='card_img' variant="top" src={imageSrc} />
                    {
                      !cartItem[item._id]?<div className='card_add'><i className="bi bi-plus-circle-fill fs-5 text-white" onClick={() =>addtoCart(item._id)}/></div>:
                      <div className='card_incdec'>
                        <i className="bi bi-dash-circle-fill fs-5 text-danger" onClick={()=>removetoCart(item._id)}></i> 
                        <p>{cartItem[item._id]}</p>
                         <i className="bi bi-plus-circle-fill fs-5 text-success" onClick={()=>addtoCart(item._id)}></i>
                      </div>
                    }
                  </div>
                  
                  <Card.Body className='d-flex flex-column gap-2 my-3'>
                    <Card.Title>{item.name}</Card.Title>
                    {showReview && (<div className='d-flex gap-1'>{starRating(item.rating)}</div>)}
                    <Card.Text>
                        {item.description}
                    </Card.Text>
                    <Card.Text className='d-flex justify-content-between align-items-center'>
                      {showPrice && (<h5>$&nbsp;{item.price.toFixed(2)}</h5>)}
                      <button className='ms-auto btn cart_btn' onClick={()=>addtoCart(item._id)}>Add to Cart</button>
                    </Card.Text>
                  </Card.Body>
             </Card>
      </>
  )
}


export default CardDesgin