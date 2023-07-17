import React, { useEffect } from 'react'
import ProductCard1 from '../productCard1'
import './index.css';
import { Empty } from 'antd';
import { getTopProductForUser } from '../../services/product.service'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const TopProduct = () => {
    const [products, setProducts] = useState([])
    const getTopProducts = async () => {
        try {
            const res = await getTopProductForUser();
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTopProducts();
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
                                    <div className='topProductCart' onClick={()=>navigate(`/product/${item._id}`)}>
                                        <img src={item.img} alt="img" />
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
