import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CrwnLogo from '../assets/crown.svg?react'
import { getAuth, signOut } from 'firebase/auth'
import { app } from '../config/firebase/firebaseConfig'

const Navbar = () => {

  const auth = getAuth(app)
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/login')
      // Sign-out successful.
    }).catch((error) => {
      console.log(error)
      // An error happened.
    });
  }
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
          <Link className='nav-link' to={'register'}>
            Register
          </Link>
          <Link className='nav-link' to={'login'}>
            Login
          </Link>
          <a className='nav-link' role='button' onClick={handleSignOut}>
            Signout 
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar