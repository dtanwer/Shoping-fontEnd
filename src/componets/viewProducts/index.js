import React, { useEffect, useState } from 'react';
import './index.css';
import { Space, Table, Modal, message, Tag } from 'antd';
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
          {<a onClick={() => handelEdit(record)}> <Tag color="blue">Edit</Tag></a>}
          {
            record?.stock !== "0" &&
            <a a onClick={() => setOutOfStock(record._id)} > <Tag color="red"> Make Stock Out</Tag></a>
          }
          <a onClick={() => addStock(record._id,record?.stock)}> <Tag color="green">Add 10 Stock</Tag> </a> 
        
          <a onClick={() => setDeleteProduct(record._id)} > <Tag color="red">Delete</Tag></a>
        </Space >
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
      const res = user.type === 'admin' ? await getProductsForUsers() : await getProducts(user._id);
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
      const res = await updateMyProduct({ stock: "0" }, id)
      setChange(!isChange);
      info("Now Product is OUT OF STOCK !")
    } catch (error) {
      console.log(error)
    }
  }
  const addStock = async (id,stock) => {
    const newStock=(parseInt(stock)+10).toString();
    try {
      const res = await updateMyProduct({ stock:newStock}, id)
      setChange(!isChange);
      info("10 Stock is Added !")
    } catch (error) {
      console.log(error)
    }
  }
  const setDeleteProduct = async (id) => {
    try {
      const res = await updateMyProduct({ isDelete: true }, id)
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
  }, [isChange,modalOpen])

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
        width={1000}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[]}
      >
        <ProductForm data={rec} update={true} setModalOpen={setModalOpen} />
      </Modal>
    </div>
  )
}

export default ViewProducts