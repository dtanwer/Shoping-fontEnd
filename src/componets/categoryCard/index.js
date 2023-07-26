import React from 'react'
import './index.css'
import { useDispatch} from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { getProducts} from '../../features/product/product.action';
function CategoryCard({ data }) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handelClickCategory = async () => {
    navigate('/catogory')
    dispatch(getProducts(data.name.toLowerCase()))
  }

  return (
    <div className='categoryCard' onClick={handelClickCategory}>
      <img src={data.img} alt="imgCard" />
      <h3>{data.name}</h3>
    </div>
  )
}

export default CategoryCard
