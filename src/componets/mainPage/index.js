import React from 'react'
import Category from '../Category'
import TopProduct from '../TopProduct'

function MainPage() {
  return (
    <div>
      <Category />
      <div style={{margin:"40px",textAlign:"center"}}>
        <h1>Top Products</h1>
      </div>
      <TopProduct />
    </div>
  )
}

export default MainPage