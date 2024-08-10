import React from 'react'
import { Link } from 'react-router-dom'
import CrwnLogo from '../assets/crown.svg?react'

const Navbar = () => {
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to={'/'}>
           <CrwnLogo className='logo' />       
        </Link>
        <div className="nav-links-container">
          <Link className='nav-link' to={'shop'}>
            Shop
          </Link>
          <Link className='nav-link' to={'login'}>
            Login
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar