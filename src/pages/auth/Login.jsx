import React from 'react'
import './login.scss'

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="title">Login</h1>
        <form className="form">
          {/* <div className="form-group">
            <label htmlFor="name" className="label">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="input"
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="input"
            />
          </div>
          <div className="button-group">
            <button
              type="submit"
              className="btn btn-email"
            >
              Sign up with email
            </button>
            <button
              type="button"
              className="btn btn-google"
            >
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login