import {useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { getBannerHome } from '../../features/banner/banner.action';
const HomeCarousel = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.banner.banner);
    
    useEffect(() => {
       dispatch(getBannerHome())
    }, [])
    return (
        <Carousel>
            
            {
               data[0]?.images?.map((item, i) => {
                console.log(item,"img")
                    return (
                        <div className='myItem' key={i}>
                            <img src='http://localhost:5000/1690199733608-3.jpg' alt='banner' />
                        </div>
                    )
                })
            }
        </Carousel>
       
    )
}

export default HomeCarousel
