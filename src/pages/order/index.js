import React, { useEffect, useState } from 'react'
import './index.css'
import { useSelector } from 'react-redux'
import { getOrdersForUser } from '../../services/product.service';
import OrderCard from '../../componets/orderCard';
import { Empty } from 'antd';
const Orders = () => {
  const user = useSelector((state) => state.auth.user);
  const [order, setOrder] = useState([]);
  const getUserOrders = async () => {
    try {
      const res = await getOrdersForUser(user._id);
      setOrder(res.data)
      // console.log(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserOrders();
  }, [])
  return (
    <div className='userOrder'>
      {
        order?.map((item) => {
          return (<OrderCard key={item?._id} data={item} />)
        })
      }
      {
        order.length === 0 && <Empty description="Cart is Empty" />
      }
    </div>
  )
}

export default Orders
