import React, { useEffect } from 'react'
import ProductCard1 from '../productCard1'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../../features/userSlice'
import { getProductsForUsers } from '../../services/product.service'

const TopProduct = () => {
    const dispatch = useDispatch();
    const products=useSelector((state)=>state.auth.products)

    const getTopProducts = async () => {
        try {
            const res = await getProductsForUsers();
            dispatch(setProducts(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTopProducts();
    }, [])
    
    return (
        <div className='topProduct' >
            {
                products.map((item, i) => {
                    if(!item.isDelete)
                    return (
                        <ProductCard1 data={item} key={i} />
                    )
                })
            }
        </div >
    )
}

export default TopProduct
