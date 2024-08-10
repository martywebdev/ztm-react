import React from 'react'
import '../App.scss'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <>
        
      <Navbar />
      <Outlet />
    </>
  )
}

export default Root