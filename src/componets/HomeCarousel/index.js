import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import './index.css'
const HomeCarousel=()=>{
    return (
        <Carousel>
            <div className='myItem'>
                <img src="https://marketplace.canva.com/EAE1gjmdjkQ/3/0/1600w/canva-yellow-and-black-super-weekend-sale-banner-qccqCrq6Umg.jpg" />
            </div>
            <div className='myItem'>
                <img src="https://marketplace.canva.com/EAFLtJa7Jqo/1/0/1600w/canva-red-creative-sale-promo-banner-A_Te0b9wP9o.jpg" />
            </div>
            <div className='myItem'>
                <img src="https://images.template.net/108414/fashion-sale-banner-template-85svg.jpg" />
            </div>
        </Carousel>
    )
}

export default HomeCarousel
