import React, { useEffect, useState } from 'react'
import "./banner.scss"
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {motion, transform} from 'framer-motion'

const banner = () => {
  const closeBasket = "w-100 h-200 mx-[75%] my-[-44%] bg-[#eaf1eb] fixed z-1 transition translate-x-full"
  const openBasket = "w-100 h-200 mx-[75%] my-[-44%] bg-[#eaf1eb] fixed z-1 transition translate-x-0"
  
  const [checkToken, setCheckToken] = useState();
  const [userBasket, setUserBasket] = useState([]);
  const [stateBasket, setStateBasket] = useState(closeBasket);
  const navigate = useNavigate()

  useEffect(()=>{
      axios.get("https://localhost:3000/user-data",{
        withCredentials: true
      })
      .then(res=>{setCheckToken(res.data)})
      .catch(err=>{console.error("Немає токену або що:", err)})
  },[])

  function reqBasket() {
    setStateBasket(openBasket)

    axios.get("https://localhost:3000/reqBasket", {
      withCredentials: true
    }).then(res => {
      setUserBasket(res.data)
    })
    .catch(err => console.error("Помилка при отримані корзини", err));
  }

  useEffect(()=>{
    console.log("Оновилось?:", userBasket)
  }, [userBasket])

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
                    <button className='nav-list' onClick={reqBasket}>Basket</button>
                    <Link className='nav-list' to="/login">Login</Link>
                  </>
                ) : (
                  <>
                    <Link className='nav-list' to="/profile">Profile</Link>
                    <Link className='nav-list' to="/basket">Basket</Link>
                    <Link className='nav-list' to="/addProduct">AddProduct</Link>
                  </>
                )}
            </div>
        </nav>
        <main>
          <div className="p-0 m-0 banner">
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
        <div className={stateBasket}>
                <h1 className='m-5'>Basket:</h1>
                {/* <p>{userBasket}</p> */}
                {userBasket.map((productBasket)=>(
                  <div key={productBasket.id} className='m-5 p-3 border'>
                    <h1>{productBasket.name}</h1>
                    <p>{productBasket.description}</p>
                    <p>${productBasket.price}</p>
                    <a className='bg-green-700 p-1 rounded' href={`https://localhost:5000/productPage/${productBasket.id}`}>Детальніше</a>
                  </div>
                ))}
                <button className='m-5 bg-green-700' onClick={()=> setStateBasket(closeBasket)}>Close</button>
        </div>
    </div>
  )
}

export default banner