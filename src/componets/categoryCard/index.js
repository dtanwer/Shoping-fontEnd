import React from 'react'
import './index.css'
import { getProductsByCategory, getProductsForUsers } from '../../services/product.service'
import { useDispatch } from 'react-redux';
import { setProducts } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
function CategoryCard({data}) {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const getProductsCategory=async ()=>{
    navigate('/catogory')
    try {
      
      const res=data.name==='All'?await getProductsForUsers():await getProductsByCategory(data.name.toLowerCase());
      dispatch(setProducts(res.data));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='categoryCard' onClick={getProductsCategory}>
        <img src={data.img} alt="imgCard" />
        <h3>{data.name}</h3>
    </div>
  )
}

export default CategoryCard
