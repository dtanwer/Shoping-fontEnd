import React, { useEffect, useState } from 'react';
import './index.css';
import { Space, Table, message } from 'antd';
import moment from 'moment';
import { Tabs } from 'antd';
import { getAllUser, getAllVendor } from '../../services/auth.service';
import { updateUser } from '../../services/client.service';


const ViewClients = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [rec, setRecord] = useState({});
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => <span>{moment(date).format("dddd, MMMM Do YYYY, h:mm a")}</span>,
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (src) => <img src={src} alt="no img" style={{ width: "50px", height: "50px" }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {
            record?.isActive ?
            <a onClick={() => updateClient(record._id,false)}  className='deleted'>Disable</a>:
            <a style={{'color':"gray" ,"cursor":"not-allowed"}}>Disable</a>
          }
          {
            record?.isActive ?
            <a style={{'color':"gray" ,"cursor":"not-allowed"}}>Enable</a>:
            <a onClick={() => updateClient(record._id,true)}  className='deleted'>Enable</a>
          }
        </Space>
      ),
    },
  ];
  const [isChange, setChange] = useState(false);
  const [users, setUsers] = useState([]);
  const [vendor, setVendor] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const getAllUsersForAdmin = async () => {
    try {
        const res = await getAllUser();
        setUsers(res.data);
    } catch (error) {
        console.log(error)
    }
}
const updateClient=async (id,isActive)=>{
    try {
        const res=await updateUser({isActive},id);
        info("Client Updated!!")
        setChange(!isChange);
    } catch (error) {
        console.log(error)
    }
}
const getAllVendorForAdmin = async () => {
    try {
        const res = await getAllVendor();
        setVendor(res.data)
    } catch (error) {
        console.log(error)
    }
}


  useEffect(() => {
    getAllUsersForAdmin()
    getAllVendorForAdmin()
  }, [isChange])

  const info = (msg) => {
    messageApi.info(msg);
  };
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: `Users`,
      children: <Table columns={columns}  dataSource={users} />,
    },
    {
      key: '2',
      label: `Vendor`,
      children: <Table columns={columns} dataSource={vendor} />,
    }
  ];

  return (

    <div>
      {contextHolder}
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default ViewClients