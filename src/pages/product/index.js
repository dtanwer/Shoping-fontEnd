import React, { useEffect, useState } from 'react'
import CarouselProduct from '../../componets/Carousel'
import ProductDetails from '../../componets/productDetails'
import './index.css'
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart, getProduct } from '../../services/product.service';
import { notification, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setAddCart, setProductPrice, setTotalCart } from '../../features/userSlice';
import { Padding } from '@mui/icons-material';
import { getUser } from '../../services/auth.service';
const Product = () => {
    const [api, contextHolder1] = notification.useNotification();
    const [messageApi, contextHolder2] = message.useMessage();

    const isLogin = useSelector((state) => state.auth.login);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartAlready, setCartAllready] = useState(false);
    const openNotification = (placement) => {
        api.info({
            message: `Notification ${placement}`,
            description: 'Product Added To Cart',
            placement,
        });
    };
    const warning = (msg) => {
        messageApi.open({
            type: 'warning',
            content: msg,
            style: {
                marginTop: '7vh',
                fontSize:"18px",
                padding:"10px"
            },
        },

        );
    };



    const [product, setProduct] = useState({});
    const { id } = useParams();
    const getUserProduct = async () => {
        try {
            const res = await getProduct(id);
            setProduct(res.data);

        } catch (error) {
            console.log(error)
        }
    }
    const addProducTtoCart = async () => {
        if (!isLogin) {
            warning("Please Login For Adding in Cart")
            return;
        }
        try {
            await addToCart(user._id, { id: product._id, quantity: "1", price: product.price });
            dispatch(setAddCart({ id: product._id, quantity: "1", price: product.price }));
            dispatch(setTotalCart(parseInt(product.price)))
            openNotification('topRight')

        } catch (error) {
            console.log(error)
        }
    }


    
    useEffect(() => {
        getUserProduct();
        console.log(user.cart, id);
        user?.cart?.map((item) => {
            if (id === item?.id) {
                setCartAllready(true);
            }
        })
    }, [])
   
    const handelAddCart = () => {
        addProducTtoCart();
        setCartAllready(true);

    }
    const handelBuy = () => {
        navigate(`/cart/${data._id}`)

        dispatch(setProductPrice(parseInt(data.price)))
    }
    const data = product;
    return (
        <div className='product'>
            <div className="productDetail">
                {contextHolder1}
                {contextHolder2}
                <div>
                    <CarouselProduct data={data?.images} />
                    {data.stock === '0' && <span className='outofStock1' >Out Of Stock</span>}
                    <div className="buyingBtns">
                        {cartAlready ? <button className='cartBtn' onClick={() => navigate('/cart')} disabled={data.stock === '0'}>Go To Cart</button> :
                            <button className='cartBtn' onClick={handelAddCart} disabled={data.stock === '0'}>Add To Cart</button>}
                        <button className='buyBtn' onClick={handelBuy} disabled={data.stock === '0'}>Buy Now</button>
                    </div>
                </div>
                <div>
                    <ProductDetails data={data} />
                </div>
            </div>
            <div className="Suggestion">

            </div>

        </div>
    )
}

export default Product
