import React from 'react'
import './index.css'
import Navbar from '../../componets/Navbar'
import Category from '../../componets/Category'
import TopProduct from '../../componets/TopProduct'
import Product from '../product'
import { Outlet } from 'react-router-dom'
const Home=()=> {
  return (
    <div className='home'>
      <div className="nav">
        <Navbar/>
      </div>
      <Outlet/>
      
    </div>
  )
}

export default Home