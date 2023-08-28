import React from 'react'
import "./Footer.css"
const Footer = () => {
  return (
    <div className='footer-main'>
        <div className="footer">
            <div className="copy"><p>&copy; 2023 Awais Tahseen. All rights reserved.</p></div>
            <div className="logos">
            <a href="#" className="logo"><i class="fa-brands fa-linkedin"></i></a>
            </div>
            <a href="#" className="logo"><i class="fa-brands fa-facebook"></i></a>
            <a href="#" className="logo"><i class="fa-brands fa-github"></i></a>
        </div>
    </div>
  )
}

export default Footer