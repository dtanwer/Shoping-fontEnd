import React, { useEffect } from 'react'
import ProductCard1 from '../productCard1'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../features/product/product.action'
import { Empty } from 'antd'
const CategoryProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products)
    useEffect(() => {
        dispatch(getProducts());
    }, [])
    return (
        <>
            {
                Object.keys(products).length !== 0 ?
                    <div className='topProduct' >
                        {
                            products.map((item, i) => {
                                if (!item.isDelete)
                                    return (
                                        <ProductCard1 data={item} key={i} />
                                    )
                            })
                        }
                    </div > :
                        <Empty style={{marginTop:"20vh"}} />
            }


        </>
    )
}

export default CategoryProductList;
