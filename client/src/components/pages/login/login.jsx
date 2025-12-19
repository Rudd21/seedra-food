import React, {useState} from 'react'
import "./login.scss"
import { Link, useNavigate} from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import axios from 'axios';

const addProduct = (e) => {
    // const response = await fetch('/addProduct', {
    //   method: 'POST',
    //   body: data,
    // });
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('https://localhost:3000/login', formData, {
                withCredentials: true
            });
            console.log("Користувач успішно залогінився!")

            navigate("/")
        }catch(err){
            console.log(err)
        }
  };
  return (
    <div className='container'>
        <nav>
            <div className="text-nav">
                <img height={"25px"} src="Frame.svg" alt="" />
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
            <div className="inputs">
            <label>
                    <p>Email:</p>
                    <input
                    type="text"
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
                <button type="submit">Submit</button>
            </form>
        </main>
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

export default addProduct