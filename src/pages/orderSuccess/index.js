import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const OrderSuccess=()=> {
    const navigate=useNavigate();
  return (
    <Result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button key="buy" onClick={()=>navigate('/')}>Buy Again</Button>,
    ]}
  />
  )
}

export default OrderSuccess