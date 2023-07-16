import React from 'react'
import './index.css'
import Rate from '../../assets/Rating'
import { useNavigate } from 'react-router-dom'

function ProductCard1({data}) {
    const navigate=useNavigate();
    const handelOpenProduct=()=>{
      navigate(`/product/${data._id}`)
    }
  return (
    <div className='productCard1' onClick={handelOpenProduct}>
        <div className="img">
            <img src={data.img} alt="thumbnail" />
        </div>
        <div className="content">
            <span className='name'>{data.description} </span>
            <span>{data.brand}</span>
            <div className="productRating">
            <Rate data={data.rating}/>
            {data.stock==='0'&& <span className='outofStock'>Out Of Stock</span>}
            </div>

            <span className='price'>₹ {data.price} <span className='MRP'>{data.mrp}</span></span> <span className='discount'>{data.discountPercentage}%</span>
        </div>
    </div>
  )
}

export default ProductCard1
