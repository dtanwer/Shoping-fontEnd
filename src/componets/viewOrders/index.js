import {useEffect,useState} from 'react'
import './index.css'
import { Space, Table } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getAllOrders, getOrders, updateOrder } from '../../services/product.service';
import { message } from 'antd';
import { colors } from '@mui/material';
const ViewOrders = () => {
  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => <span>{moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle" style={{"color":"red"}}>
         
         
          {
            record?.status!=='ordered' ?
            <a style={{'color':"gray" ,"cursor":"not-allowed"}}>Make Oder Deleverd {record.name}</a>:
            <a onClick={()=>handelStatus(record._id,'delivered')}>Make Oder Deleverd {record.name}</a>
          }
          {
            record?.status!=='ordered'?
            <a style={{'color':"gray" ,"cursor":"not-allowed"}}>Cancel</a>:
            <a onClick={()=>handelStatus(record._id,'cancel')}>Cancel</a>
          }
        </Space>
      ),
    },
  ];
  
  const handelStatus =async (id,status)=>{
    try {
       const res=await updateOrder(id,{status});
       info(`Oder ${status}`);
       console.log(res.data);
    } catch (error) {
     console.log(error); 
    }
    
  }

  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);

  const getOrdersForVender = async () => {
    try {
      const res = user.type==='admin'? await getAllOrders() : await getOrders(user._id);
      console.log(res.data)
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getOrdersForVender()
  }, [])
  const [messageApi, contextHolder] = message.useMessage();
  const info = (msg) => {
    messageApi.info({
      type: 'success',
      style:{fontSize:"20px",marginTop:"20px"},
      content:msg
    });
  };
  return (
    <div className='viewOrders'>
      {contextHolder}
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default ViewOrders