import React from 'react'
import Category from '../Category'
import TopProduct from '../TopProduct'
import HomeCarousel from '../HomeCarousel'

function MainPage() {
  return (
    <div>
      <Category />
      <HomeCarousel/>
      <TopProduct />
    </div>
  )
}

export default MainPage