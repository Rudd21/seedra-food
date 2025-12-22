import React, {useState} from 'react'
import "./register.scss"
import { Link, useNavigate} from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const addProduct = (e) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
    const handleSubmit = async (e) => {
        e.preventDefault();        
        try{
            const hashedPassword = await bcrypt.hash(formData.password, 10)

            const dataToSend = {
                ...formData,
                password: hashedPassword
            };
            
            const response = await axios.post('https://localhost:3000/register', dataToSend, {
                withCredentials: true
            });
            console.log("Користувач успішно зарегіструвався!")
            navigate("/login")
        }catch(err){
            console.log(err)
        }
  };
  return (
    <div>
        <nav>
            <div className="text-nav">
                <img className='h-7' src="Frame.svg" alt="" />
                <ul className="nav-ul">
                    <li className="nav-list">ALL PRODUCTS</li>
                    <li className="nav-list">ABOUT SEEDRA</li>
                    <li className="nav-list">OUR BLOG</li>
                    <li className="nav-list">SUPPORT</li>
                </ul>
                <div className="social-top">
                    <a href="#"><img src="ant-design_instagram-filled.png" alt="" /></a>
                    <a href="#"><img src="akar-icons_facebook-fill.png" alt="" /></a>
                </div>
                <div className="search-block">
                    <img src="icon_search.png" alt="" />
                    <input placeholder="Search" type="text" />
                </div>
                <div className="sort-heart">
                    <img src="Outline-green.png" alt="" />
                </div>
                <Link to="/">Back</Link>
            </div>
        </nav>
        <main className='formRegister'>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className='form'>
            <div className="flex flex-col items-center">
            <label>
                    <p>Username:</p>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                </label>
                <br />
                <label>
                    <p>Email:</p>
                    <input
                    className='bg-blue'
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                </label>
                <br />
                <label>
                    <p>Password:</p>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                </label>
            </div>
                {/* <br />
                <label>
                    Product Image:
                    <input
                    type="file"
                    name="image"
                    // required
                    />
                </label>
                <br /> */}
                <button className='bg-[#eaf1eb] cursor-pointer hover:bg-[#67AE6E] transition duration-300' type="submit">Submit</button>
            </form>
        </main>
        <div className="footer-nav">
        <ul className='footer-list'>
            <li>ALL PRODUCTS</li>
            <li>ABOUT SEEDRA</li>
            <li>OUR BLOG</li>
            <li>
                <img className='h-7' src="Frame.svg" alt="" />
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

export default addProduct