import React, { Component, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './index.css'
import { getBanner } from '../../services/banner.service';
import { useDispatch, useSelector } from 'react-redux';
import { setBanner } from '../../features/userSlice';
const HomeCarousel = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.auth.banner);
    const getBannerData = async () => {
        try {
            const res = await getBanner()
            dispatch(setBanner(res.data[0]))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getBannerData()
    }, [])
    return (
        <Carousel>
            {
               data?.images?.map((item, i) => {
                    return (
                        <div className='myItem' key={i}>
                            <img src={item} alt='banner' />
                        </div>
                    )
                })
            }
        </Carousel>
    )
}

export default HomeCarousel
