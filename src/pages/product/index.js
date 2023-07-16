import React, { useEffect, useState } from 'react'
import CarouselProduct from '../../componets/Carousel'
import ProductDetails from '../../componets/productDetails'
import './index.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { addToCart, getProduct } from '../../services/product.service';
import { notification } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { setAddCart,setProductPrice,setTotalCart } from '../../features/userSlice';
const Product = () => {
    const [api, contextHolder] = notification.useNotification();
    const user=useSelector((state)=>state.auth.user);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const openNotification = (placement) => {
        api.info({
            message: `Notification ${placement}`,
            description: 'Product Added To Cart',
            placement,
        });
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
    const addProducTtoCart=async ()=>{
        try {
            await addToCart(user._id,{id:product._id});
            dispatch(setAddCart({id:product._id}));
            dispatch(setTotalCart(parseInt(product.price)))
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserProduct();
    })
    const handelAddCart =  () => {
        openNotification('topRight')
        addProducTtoCart();

    }
    const handelBuy =  ()=>{
        navigate(`/cart/${data._id}`)
        
        dispatch(setProductPrice(parseInt(data.price)))
    }
    const data = product;
    return (
            <div className='product'>
                <div className="productDetail">
                    {contextHolder}
                    <div>
                        <CarouselProduct data={data?.images} />
                        {data.stock==='0'&& <span className='outofStock1' >Out Of Stock</span>}
                        <div className="buyingBtns">
                            <button className='cartBtn' onClick={handelAddCart} disabled={data.stock==='0'}>Add To Cart</button>
                            <button className='buyBtn' onClick={handelBuy} disabled={data.stock==='0'}>Buy Now</button>
                        </div>
                    </div>
                    <div>
                        <ProductDetails data={data}/>
                    </div>
                </div>
                <div className="Suggestion">

                </div>

            </div>
    )
}

export default Product
