import { useEffect, useState } from 'react'
import './index.css'
import { Space, Table, Button, Popconfirm } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getAllOrders, getOrders, updateOrder } from '../../services/product.service';
import { message, Tag, Select } from 'antd';
import { colors } from '@mui/material';
const ViewOrders = ({setIsChange1,isChange1}) => {
  const [isChange, setIsChange] = useState(false)
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
      render: (text) => <span>
        {text==='ordered'&&<Tag color="cyan">{text}</Tag>}
        {text==='shipped'&&<Tag color="purple">{text}</Tag>}
        {text==='delivered'&&<Tag color="green">{text}</Tag>}
        {text==='cancel'&&<Tag color="red">{text}</Tag>}
      </span>
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
        <Space size="middle" style={{ "color": "red" }}>
          <Select
            defaultValue={record.status}
            style={{ width: 120 }}
            onChange={(v) => handleChange(v, record._id)}
            disabled={record.status === 'cancel' || record.status === 'delivered'}
            options={[
              { value: 'ordered', label: 'Order', disabled: true },
              { value: 'shipped', label: 'Shipped' },
              { value: 'delivered', label: 'Delivered' },
              { value: 'cancel', label: 'Cancel', },
            ]}
          />
        </Space>
      ),
    },
  ];
  const handleChange = (value, id) => {
    handelStatus(id, value);
    setIsChange1(!isChange1);
  };

  const handelStatus = async (id, status) => {
    try {
      const res = await updateOrder(id, { status });
      info(`Oder ${status}`);
      setIsChange(!isChange)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

  }

  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);

  const getOrdersForVender = async () => {
    try {
      const res = user.type === 'admin' ? await getAllOrders() : await getOrders(user._id);
      console.log(res.data)
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getOrdersForVender()
  }, [isChange])
  const [messageApi, contextHolder] = message.useMessage();
  const info = (msg) => {
    messageApi.info({
      type: 'success',
      style: { fontSize: "20px", marginTop: "20px" },
      content: msg
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