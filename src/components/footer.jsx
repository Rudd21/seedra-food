import React from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { apiRequest } from '../serverRequest';

const Footer = () => {

    const navigation = useNavigate();

  return (
        <footer>
        <div className="text-[#70737C] mx-auto border-b border-[#4FA083] w-[90%] pb-[25px] sticky">
            <ul className='
                grid
                w-[80%] 
                mx-auto 
                mt-4
                content-center

                lg:grid-cols-6
                lg:grid-row-1

                sm:grid-cols-1
                sm:grid-row-6
            '>
                <li className="list-none text-center m-4 px-[15px] 
                    lg:border-r 
                    lg:border-[#4FA083]
                    
                    sm:border-r 
                    sm:border-white-100 
                    ">ALL PRODUCTS</li>
                <li className="list-none text-center m-4 px-[15px]
                    lg:border-r 
                    lg:border-[#4FA083]
                    
                    sm:border-r 
                    sm:border-white-100 
                ">
                    <Link to='/aboutSeedra'>ABOUT SEEDRA</Link>
                </li>
                <li className="list-none text-center m-4 px-[15px] 
                    lg:border-r 
                    lg:border-[#4FA083]
                    
                    sm:border-r 
                    sm:border-white-100 
                ">
                    <Link to='/ourBlog'>OUR BLOG</Link>
                </li>
                <li className="flex list-none items-center m-4 px-[15px] 
                    lg:border-r 
                    lg:border-[#4FA083]
                    
                    
                ">
                    <img className="h-7 m-auto" src={`${apiRequest}/uploads/system/Logo.svg`} alt="logo" />
                </li>
                <li className='m-4 text-center
                    lg:border-r 
                    lg:border-[#4FA083]
                    
                    sm:border-r 
                    sm:border-white-100 
                '><button onClick={()=>navigation('/termsConditions')}>Terms & Conditions</button></li>
                <li className='m-4 text-center'><button onClick={()=>navigation('/privacyPolicy')}>Privacy Policy</button></li>
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