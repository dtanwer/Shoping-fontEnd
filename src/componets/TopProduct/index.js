import React, { useEffect } from 'react'
// import ProductCard1 from '../productCard1'
import './index.css';
import { Empty } from 'antd';
// import { getTopProductForUser } from '../../services/product.service'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopProducts } from '../../features/product/product.action';
import { useDispatch, useSelector } from 'react-redux';
const TopProduct = () => {
    const dispatch=useDispatch()
    const products=useSelector((state)=>state.product.topProducts)
    // const [products, setProducts] = useState([])
    // const getTopProducts = async () => {
    //     try {
    //         const res = await getTopProductForUser();
    //         setProducts(res.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        // getTopProducts();
        dispatch(getTopProducts())
       
    }, [])
    const navigate=useNavigate();
    return (
        <>



            {
                products.length !== 0 ?  <div className='topProduct' >
                    {
                        products.map((item, i) => {
                            if (!item.isDelete)
                                return (
                                    // <ProductCard1 data={item} key={i} />
                                    <div className='topProductCart' onClick={()=>navigate(`/product/${item._id}`)}  key={i}>
                                        <img src={item.img} alt="img" />
                                        <p>{item.title.slice(0,30)}</p>  
                                        {
                                            item?.discountPercentage ?
                                            <span>{item.discountPercentage}%</span>:
                                            <span>{item.discountPercentage??"Shop Now"}</span>

                                        }
                                    </div>
                                )
                        })
                    }
                </div >:

                    <Empty style={{ marginTop: "20vh" }} />
            }



        </>
    )
}

export default TopProduct
