import React, { useEffect, useState } from 'react'
import "./profile.scss"
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

const Profile = () => {
  const [checkToken, setCheckToken] = useState();
  const [userCatalog, setUserCatalog] = useState();
  const navigate = useNavigate()

  useEffect(()=>{
      axios.get("https://localhost:3000/user-data",{
        withCredentials: true
      })
      .then(res=>{setCheckToken(res.data)})
      .catch(err=>{console.error("Немає токену або що:", err)})

      axios.get("https://localhost:3000/userProducts",{
        withCredentials: true
      })
      .then(res=>{setUserCatalog(res.data)})
      .catch(err=>{console.error("Помлка при отримані каталогу", err)})
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
                {!checkToken ? (   
                    navigate("/register")         
                ) : (
                  <>
                    <Link className='nav-list' to="/">Main</Link>
                    <Link className='nav-list' to="/addProduct">AddProduct</Link>
                  </>
                )}
            </div>
        </nav>
        <main>
            <div className="info_user">
                <h3>Інформація про вас:</h3>
                <div className="data_user">
                    <p className="username">Ваш username: {checkToken?.name}</p>
                    <p className='id_user'>Ваш id: {checkToken?.id}</p>
                    <p className="email">Ваш email: {checkToken?.email}</p> 
                </div>
                <div className="edit_data_user">
                    <button>Змінити username</button>
                    <button>Змінити пароль</button>

                    <button onClick={handleLogout}>Log out</button>
                </div>
            </div>
            <div className="cata_user">
                <h3>Товари користувача:</h3>
                <div className='cata'>
                {userCatalog?.map((userCata) => (
                    <div data-heart="no" className="product" data-hashtag={userCata.type}>
                        <div className="safe-productaImage">
                            <button value="1" className="heart" type="button"></button>
                            <img src="bungles.png" alt="Product" />
                        </div>
                        <p className="rainting rain-sort">
                            <img src="user-rainting.png" alt="Rating" />
                            <span>5.2</span>
                        </p>
                        <h3 className='cardName' key={userCata.id}>{userCata.name}</h3>
                        <div className="footer-card">
                            <div className="price-card">$<span className="sort-price">12.56</span></div>
                            <img className="basket-product" src="basket.png" alt="Basket" />
                        </div>
                    </div>
                ))}
                </div>
            </div>
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

export default Profile