import { useState, useEffect } from 'react'
import { getProduct, removeToCart } from '../../services/product.service';
import './index.css';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { removeUserCart, setCartQuantity, setTotalCart } from '../../features/auth/auth.slice';
function CartCard({ id, checkOut, user, cart }) {
    const [messageApi, contextHolder] = message.useMessage();

    // const success = (msg) => {
    //     messageApi.open({
    //         type: 'success',
    //         content: msg,
    //         style:{fontSize:"20px" , marginTop:"8vh"}
    //     });
    // };
    const warning = (msg) => {
        messageApi.open({
            type: 'warning',
            content:msg,
            style:{fontSize:"20px",marginTop:"8vh"}
        });
    };
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(parseInt(cart?.quantity??0));
    const dispatch = useDispatch();
    const getUserProduct = async () => {
        try {
            const res = await getProduct(id);
            setProduct(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserProduct();

    }, [])
    const handelIncrement = () => {
        if (quantity < parseInt(product?.stock)) {
            dispatch(setCartQuantity({ ...cart, quantity: quantity + 1 }))
            setQuantity(quantity + 1)
        }
        else {
            warning(`Can not add more then ${quantity}`)
        }

        dispatch(setTotalCart(parseInt(product.price)))
    }
    const handelDecrement = () => {
        if (quantity > 1) {

            dispatch(setCartQuantity({ ...cart, quantity: quantity - 1 }))
            setQuantity(quantity - 1)
        }
        else {
            warning(`Can't Do quantity 0 :)`)
        }
    }
    const handelRemoveCart = async () => {
        message.success('Product Removed!');
        try {
            await removeToCart(user._id, { id })
            dispatch(removeUserCart({ id }))
            dispatch(setTotalCart(parseInt(quantity) * -parseInt(product?.price)))
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='cartCard'>
            {contextHolder}
            <div className="img">
                <img src={product?.img} alt="product Img" />
                {!checkOut && <div className="quantity">
                    <button onClick={handelDecrement}>-</button>
                    <input type="number" value={quantity} />
                    <button onClick={handelIncrement}>+</button>
                </div>}
            </div>
            <div className="details">
                <h2>{product?.title}</h2>
                <div className="price">
                    <h1>₹ {product?.price}  <span className='MRP'>{product?.mrp}</span>   <span style={{ color: "green" }}>{product?.discountPercentage}%</span></h1>
                </div>
                {!checkOut && <button className='button-13' onClick={handelRemoveCart}>Remove</button>}
            </div>
        </div>
    )
}

export default CartCard