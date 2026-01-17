import React from 'react'

const Footer = () => {
  return (
        <footer>
        <div className="text-[#70737C] mx-auto border-b border-[#4FA083] w-[90%] pb-[25px] sticky">
            <ul className='flex w-[80%] mx-auto mt-4 justify-between'>
                <li className="list-none px-[15px] border-r border-[#4FA083]">ALL PRODUCTS</li>
                <li className="list-none px-[15px] border-r border-[#4FA083]">ABOUT SEEDRA</li>
                <li className="list-none px-[15px] border-r border-[#4FA083]">OUR BLOG</li>
                <li className="list-none px-[15px] border-r border-[#4FA083]">
                    <img className='h-7' src="Frame.svg" alt="" />
                </li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="flex w-[80%] mx-auto mt-4 justify-between">
            <div className="social">
                <img src="ant-design_instagram-filled-green.png" alt="" />
                <img src="akar-icons_facebook-fill-green.png" alt="" />
            </div>
            <p className="footer-text">All rights reserved</p>
        </div>
        </footer>
  )
}

export default Footer