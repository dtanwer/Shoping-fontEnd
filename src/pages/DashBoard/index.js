import { useState, useEffect } from 'react';
import { Modal, Badge } from 'antd';
import './index.css'
import { Button, Col, Row, Statistic } from 'antd';
import ProductForm from '../../componets/productForm';
import ViewOrders from '../../componets/viewOrders';
import ViewProducts from '../../componets/viewProducts';
import { getOrders, getProducts } from '../../services/product.service';
import { useSelector } from 'react-redux';
import { getAllUser, getAllVendor } from '../../services/auth.service';
import ViewClients from '../../componets/viewClients';
const DashBoard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [addProduct, setAddProduct] = useState(false);
    const [view, setView] = useState(false);
    const [order, setOrders] = useState(false);
    const [client, setClient] = useState(false);
    const [oderNum, setOderNum] = useState(0);
    const [productNum, setProductNum] = useState(0);
    const [money, setMoney] = useState(0);
    const showModel = (mode) => {
        setModalOpen(true)
        if (mode === 'add') {
            setView(false);
            setOrders(false)
            setClient(false);
            setAddProduct(true);
        }
        else if (mode === 'view') {
            setAddProduct(false)
            setOrders(false)
            setClient(false);
            setView(true);
        }
        else if (mode === 'client') {
            setAddProduct(false)
            setView(false);
            setOrders(false);
            setClient(true);
        }
        else {
            setAddProduct(false)
            setView(false);
            setClient(false);
            setOrders(true)
        }
    }
    const user = useSelector((state) => state.auth.user);
    const [data, setData] = useState([]);

    const getOrdersForVender = async () => {
        try {
            const res = await getOrders(user._id);
            console.log(res.data)
            setOderNum(res.data.length)
            res?.data?.map((item) => {
                setMoney(money + parseInt(item.price));
            })
        } catch (error) {
            console.log(error)
        }
    }
    const getproductsForVender = async () => {
        try {
            const res = await getProducts(user._id);
            console.log(res.data)
            setProductNum(res.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrdersForVender()
        getproductsForVender()
    }, [])

    return (
        <div className='dashBoard'>
            <h1>DashBoard</h1>
            <div className="cards">
                <div className="addProduct item" onClick={() => showModel("add")}>
                    <img src="https://cdn4.iconfinder.com/data/icons/online-shopping-32/64/add-product-boxes-unbox-package-warehouse-512.png" alt="add product" />
                    <h2>Add Products</h2>
                </div>
                <div className="ViewProduct item" onClick={() => showModel("view")}>
                    <Badge count={productNum}>
                        <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/product-view-3-1146772.png" alt="add product" />
                        <h2>View Products</h2>
                    </Badge>
                </div>
                <div className="Orders item" onClick={() => showModel("order")}>
                    <Badge count={oderNum}>
                        <img src="https://icon-library.com/images/orders-icon/orders-icon-12.jpg" alt="add product" />
                        <h2>View Orders</h2>
                    </Badge>
                </div>
                {user.type === 'admin' && <div className="Orders item" onClick={() => showModel("client")}>
                    <img src="https://images.hiverhq.com/blog/wp-content/uploads/2017/08/tr:pr-true/Delivering-Personalized-Customer-Service.png" alt="User Vendor" />
                    <h2>User & Vendor</h2>
                </div>}

            </div>
            <Modal
                title="Add Products"
                style={{ top: 0 }}
                width={1000}
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
            >
                {addProduct && <ProductForm update={false} />}
                {order && <ViewOrders />}
                {view && <ViewProducts />}
                {client && <ViewClients />}

            </Modal>
            {user.type !== 'admin' && <div className='earnings'>
                <h3>Total Earnings</h3>
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="Total Orders" value={oderNum} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Account Balance (RS)" value={money} precision={2} />
                    </Col>
                </Row>
            </div>}

        </div>
    )
}

export default DashBoard
