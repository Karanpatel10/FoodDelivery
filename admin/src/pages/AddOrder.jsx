import React, { useState } from 'react'
import { assets } from '../assets/image/admin_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';

const AddOrder = ({URL}) => {

 
  const[image,setImage]=useState(false);
  const[data,setData]=useState({
    name: '',
    description:'',
    price:'',
    category:'',
  })

const onchnagehandler=(event)=>{
    const name =event.target.name;
    const value=event.target.value;
    setData((prevData)=>({...prevData,[name]:value}));
}

const onSubmitHandler=async(event)=>{
  event.preventDefault();
  const formData=new FormData();
  formData.append('name',data.name);
  formData.append('description',data.description);
  formData.append('price',Number(data.price));
  formData.append('category',data.category);
  formData.append('image',image);

  const response=await axios.post(`${URL}/api/food/add`,formData)

  if(response.data.success){
      setData({
        name: '',
        description:'',
        price:'',
        category:'',
      })
      setImage(false);
      toast.success(response.data.message);
  }else{
    toast.error(response.data.message);
  }

}

  return (
    <div>
      <form className='d-flex flex-column gap-4  container-fluid' onSubmit={onSubmitHandler}>
          <div className='d-flex flex-column gap-2'>
            <p>Upload image</p>
            <label htmlFor='image'>
               <img src={ image?window.URL.createObjectURL(image):assets.upload_area} alt='upload_image' style={{width:'10rem',height:'10rem',cursor:'pointer'}}/>
            </label>
            <input type='file' onChange={(e)=>setImage(e.target.files[0])} id='image' required hidden/>
          </div>
          <div className='d-flex flex-column gap-2'>
            <label htmlFor='name'>Product Name</label>
            <input onChange={onchnagehandler} type='text' name='name' value={data.name} id='name' placeholder='Type here' className='p-2'/>
          </div>
          <div className='d-flex flex-column gap-2'>
            <label htmlFor='description'>Product description</label>
            <textarea onChange={onchnagehandler} placeholder='Write content here' name='description' value={data.description} id='description' className='p-2'/>
          </div>
          <div className='d-flex gap-5'>
                <div className='d-flex flex-column gap-2'>
                  <label>Product Category</label>
                  <select name='category' onChange={onchnagehandler} className='p-2'>
                    <option value=''>-- Select Category --</option>
                    <option value='Salad'>Salad</option>
                    <option value='Rolls'>Rolls</option>
                    <option value='Deserts'>Deserts</option>
                    <option value='Sandwich'>Sandwich</option>
                    <option value='Cake'>Cake</option>
                    <option value='Pure Veg'>Pure Veg</option>
                    <option value='Pasta'>Pasta</option>
                    <option value='Noodles'>Noodles</option>
                  </select>
                </div>
                <div className='d-flex flex-column gap-2'>
                  <label htmlFor='price'>Product Price</label>
                  <input onChange={onchnagehandler} type='Number' name='price' value={data.price} id='price' placeholder='$20' className='p-2'/>
                </div>
                <div className='d-flex flex-column gap-2'>
                  <label>Rating</label>
                  <select name='rating' onChange={onchnagehandler} className='p-2'>                  <option value=''>-- Select Rating --</option>
                    <option value='0.5'>0.5</option>
                    <option value='1'>1.0</option>
                    <option value='1.5'>1.5</option>
                    <option value='2'>2.0</option>
                    <option value='2.5'>2.5</option>
                    <option value='3'>3.0</option>
                    <option value='3.5'>3.5</option>
                    <option value='4'>4.0</option>
                    <option value='4.5'>4.5</option>
                    <option value='5'>5.0</option>
                  </select>
                </div>
          </div>
          <div>
            <button className='btn btn-dark' type='submit'>Add Order</button>
          </div>
          
      </form>
    </div>
  )
}

export default AddOrder