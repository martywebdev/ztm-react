import React from 'react'
import '../../styles/RootLayout.scss'
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