import React from 'react'
import './RootLayout.scss'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
        
      <Navbar />
      <Outlet />
    </>
  )
}

export default RootLayout