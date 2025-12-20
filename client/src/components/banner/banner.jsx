import React, { useEffect, useState } from 'react'
import "./banner.scss"
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

const banner = () => {
  const [checkToken, setCheckToken] = useState();
  const navigate = useNavigate()

  useEffect(()=>{
      axios.get("https://localhost:3000/user-data",{
        withCredentials: true
      })
      .then(res=>{setCheckToken(res.data)})
      .catch(err=>{console.error("Немає токену або що:", err)})
  },[])

  function handleLogout() {
    axios.post("https://localhost:3000/logout", {}, {withCredentials: true})
    .then(() => {
      setCheckToken(null);
      console.log("має по ідеї очиститись",checkToken)
      navigate("/");
    })
    .catch(err => console.error("Помилка під час логауту", err));
  }
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
                <input className='h-7 mx-30' placeholder={"Search"} type="text" />
                <div className="sort-heart">
                    <img src="Outline-green.png" alt="" />
                </div>
                {!checkToken ? (
                  <>
                    <Link className='nav-list' to="/register">Register</Link>
                    <Link className='nav-list' to="/login">Login</Link>
                  </>
                ) : (
                  <>
                    <Link className='nav-list' to="/profile">Profile</Link>
                    <Link className='nav-list' to="/addProduct">AddProduct</Link>
                  </>
                )}
            </div>
        </nav>

<main>
  <div className="banner">
  <div className="background-leafs">
    <img className='background-leaf leaf-1' src="leaf2.png" alt="" />
    <img className='background-leaf leaf-2' src="leaf1.png" alt="" />
    <img className='background-leaf leaf-3' src="leaf2.png" alt="" />
    <img className='background-leaf leaf-4' src="leaf1.png" alt="" />
    <img className='background-leaf leaf-5' src="leaf2.png" alt="" />
    <img className='background-leaf leaf-6' src="leaf1.png" alt="" />
    <img className='background-leaf leaf-7' src="leaf2.png" alt="" />
    <img className='background-leaf leaf-8' src="leaf1.png" alt="" />
  </div>
    <div className="text-banner">
      <h1>SEEDRA Basil Seeds for Indoor and Outdoor Planting</h1>
      <p className="description-site">
        Be sure of our quality - the freshest batches of this season. Non-GMO, Heirloom - our seeds were tested and have the best germination ratings. Your easy growing experience is our guarantee
      </p>
      <div className="price-banner">
        <img src="fire (2).png" alt="" />
        <p className="price-text-banner">$12.56</p>
        <p className="grey-price-text-banner">
          <s>$15.56</s>
        </p>
      </div>
      <div className="button-banner">
        <button className="banner-button1">Add to card</button>
        <button className="banner-button2">Discover</button>
      </div>
    </div>
    <img className="product-banner" src="bungles.png" alt="" />
  </div>
  
  <div className="banner-footer">
    <div className="banner-footer-text">
      <h2>We sell seeds</h2>
      <p>that always sprout and gardening supplies which never break</p>
    </div>
  </div>
</main>
    </div>
  )
}

export default banner