import React from 'react'
import style from './LayOut.module.css'
import { Outlet } from 'react-router-dom'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
export default function LayOut() {
  return <>
  <Navbar/>
  <div className='flow '>

<Outlet/>
  </div>

<Footer/>
  </>

}
