import React from 'react'
import './PageError.css'
import { NavLink } from 'react-router-dom'
import Home from './Home'
const PageError = () => {
  return (
    <div className="wrapper">
    <img src={require('../src/images/DWO5Hzg.png')} className='image-error' />
    <div className="info-error">
        <h3>This page could not be found</h3>
    </div>
    <NavLink to="/" className="visit-button">Go to Home</NavLink>
</div >
  )
}

export default PageError