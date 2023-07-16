import React, { useEffect, useState } from 'react';
import './index.css';
import { Space, Table, Modal, message } from 'antd';
import moment from 'moment';
import { Tabs } from 'antd';
import { getDraftProducts, getProducts, getProductsForUsers, updateMyProduct } from '../../services/product.service.js';
import { useSelector } from 'react-redux';
import ProductForm from '../productForm/index.js';


const ViewProducts = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [rec, setRecord] = useState({});
  const columns = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => <span>{moment(date).format("dddd, MMMM Do YYYY, h:mm a")}</span>,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
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
          {record?.isDraft|| user.type==='admin' && <a onClick={() => handelEdit(record)}>Edit {record.title}</a>}
          {
            record?.isDelete ?
            <a style={{'color':"gray" ,"cursor":"not-allowed"}}>Make Stock Out</a>:
            <a onClick={() => setOutOfStock(record._id)}  className='deleted'>Make Stock Out</a>
          }
          {
            record?.isDelete ?
            <a style={{'color':"gray" ,"cursor":"not-allowed"}}>Delete</a>:
            <a onClick={() => setDeleteProduct(record._id)} >Delete</a>
          }
        </Space>
      ),
    },
  ];
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);
  const [draftData, setdraftData] = useState([]);
  const [isChange, setChange] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const getproductsForVender = async () => {
    try {
      const res = user.type==='admin'?await getProductsForUsers() : await getProducts(user._id);
      // console.log(res.data)
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getDraftproductsForVender = async () => {
    try {
      const res = await getDraftProducts(user?._id);
      console.log(res.data)
      setdraftData(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const setOutOfStock = async (id) => {
    try {
      const res = await updateMyProduct({ stock: "0" },id)
      setChange(!isChange);
      info("Now Product is OUT OF STOCK !")
    } catch (error) {
      console.log(error)
    }
  }
  const setDeleteProduct = async (id) => {
    try {
      const res = await updateMyProduct({isDelete:true },id)
      console.log(res.data)
      setChange(!isChange);
      info("Prdoucted is Deleted !")
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getproductsForVender()
    getDraftproductsForVender()
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
      label: `Products`,
      children: <Table columns={columns} dataSource={data} />,
    },
    {
      key: '2',
      label: `Draft Products`,
      children: <Table columns={columns} dataSource={draftData} />,
    }
  ];

  const handelEdit = (record) => {
    // console.log(record)
    setRecord(record);
    setModalOpen(true)
  }






  return (

    <div>
      {contextHolder}
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <Modal
        title="Add Products"
        style={{ top: 0 }}
        width={700}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <ProductForm data={rec} update={true} />
      </Modal>
    </div>
  )
}

export default ViewProducts