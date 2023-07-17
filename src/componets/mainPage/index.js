import React from 'react'
import Category from '../Category'
import TopProduct from '../TopProduct'
import HomeCarousel from '../HomeCarousel'
import './index.css'

function MainPage() {
  return (
    <div style={{backgroundColor:"rgb(241, 243, 246)"}}>
      <Category />
      <HomeCarousel/>
      <div className="topProducts">
        <h1>Top Products</h1>
      <TopProduct />
      </div>
    </div>
  )
}

export default MainPage