import React from 'react'
import "./footer.scss"

const footer = () => {
  return (
    <div>
        <div className="footer-nav">
        <ul className='footer-list'>
            <li>ALL PRODUCTS</li>
            <li>ABOUT SEEDRA</li>
            <li>OUR BLOG</li>
            <li>
                <img height={"25px"} src="Frame.svg" alt="" />
            </li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
        </ul>
    </div>
    <div className="social-footer">
        <div className="social">
            <img src="ant-design_instagram-filled-green.png" alt="" />
            <img src="akar-icons_facebook-fill-green.png" alt="" />
        </div>
        <p className="footer-text">All rights reserved</p>
    </div>
    </div>
  )
}

export default footer