import React, { use, useEffect, useState } from 'react'
// import multer from 'multer';
import "./profile.scss"
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import { userProducts } from '../../../../../api/controllers/userProducts.controller';

const Profile = () => {
  const [checkToken, setCheckToken] = useState();
  const [userCatalog, setUserCatalog] = useState();
  const [productComments, setProductComments] = useState([]);
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
      .then(res=>{
        setUserCatalog(res.data);
        setProductComments(res.data[0][0].comment);
        })
      .catch(err=>{console.error("Помлка при отримані каталогу", err)})

      console.log("Вмістимість каталогу юхера", userCatalog);
  },[])

  const deleteProduct = (productId)=>{
    console.log("deleteProduct:", productId)
    axios.delete(`https://localhost:3000/deleteProduct/${productId}`, {
        withCredentials: true
    })
  }

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
            <div className="flex-col">
                <h3>Інформація про вас:</h3>
                <div className='flex justify-around'>
                    <div className='flex-col'>
                        <div className='border-3 rounded-xl bg-green-200'><img className='m-3 rounded-xl  bg-white' src="user-default.png" alt="" /></div>
                        <button className='bg-green-400 p-3 my-3 mx-10 hover:bg-green-600 transition'>Змінити аватарку</button>
                    </div>
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
            </div>
            <div className="cata_user">
                <h3>Товари користувача:</h3>
                <div className='cata'>
                {userCatalog && userCatalog.length > 0 ? (
                    userCatalog.map((userCata) => (
                    <div>
                        <div data-heart="no" className="product" data-hashtag={userCata.type}>
                            <div className="safe-productaImage">
                                <button value="1" className="heart" type="button"></button>
                                <img src="bungles.png" alt="Product" />
                            </div>
                            <p className="rainting rain-sort">
                                <span className='flex'><p>Rating: </p>{userCata.avgRating}</span>
                            </p>
                            <button className='p-1 bg-red-400 hover:bg-red-700 transition' onClick={()=>deleteProduct(userCata[0].id)}>Видалити товар</button>
                            <h3 className='cardName' key={userCata.id}>{userCata.name}</h3>
                            <div className="footer-card">
                                <div className="price-card">$<span className="sort-price">{userCata.price}</span></div>
                                <img className="basket-product" src="basket.png" alt="Basket" />
                            </div>
                        </div>
                    </div>
                ))) : (
                    <p className='mx-5 my-10 text-center underline text-gray-400'>...Товарів поки немає...</p>
                )}
                </div>
            </div>
            <div className="comment_user">
                <h3>Коментарі щодо товарів:</h3>
                <div className='comments'>
                    {productComments && productComments.length > 0 ? (
                        productComments.map((comment) => (
                        <div key={comment.id} className='flex m-5 p-5 border'>
                        <img className='w-25' src="user-default.png" alt="" />
                        <div className='flex mx-5 flex-col justify-center'>
                            <p><strong>User ID:</strong> {comment.userId}</p>
                            <p><strong>Username:</strong> {comment.name}</p>
                            <p><strong>Rating:</strong> {comment.rating}</p>
                            <p><strong>Feedback:</strong>{comment.text}</p>
                        </div>
                        </div>
                        ))
                    ) : (
                        <p className='mx-5 my-10 text-center underline text-gray-400'>...Коментарів поки немає...</p>
                    )}
                </div>
            </div>
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

export default Profile