import React, { useEffect, useState, useParams } from 'react'
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {motion, transform} from 'framer-motion'
import { useBasketContext } from './modalWindows/BasketContext';

const Navigation = () => {
    
    const {openBasketModal, reqBasket} = useBasketContext();
    
    const [checkToken, setCheckToken] = useState();
    const [stateSearch, setStateSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get("https://localhost:3000/user-data",{
            withCredentials: true
        })
        .then(res=>{setCheckToken(res.data)})
        .catch(err=>{console.error("Немає токену або що:", err)})
    },[])

    const searchByUser = ()=>{
        console.log("Знайти чувака за таким ім'ям:", searchText)

        axios.get(`https://localhost:3000/search/user?q=${encodeURIComponent(searchText)}`      
        ).then(res=>{
            setSearchResult(res.data)
            setResultSearch(openBasket)
        });
    }

    const searchByProduct = ()=>{
        console.log("Знайти товар за такою назвою:", searchText)

        axios.get(`https://localhost:3000/search/product?q=${encodeURIComponent(searchText)}`      
        ).then(res=>{
            setSearchResult(res.data)
            console.log(res.data)
            setResultSearch(openBasket)
        });
    }

    function handleLogout() {
        axios.post("https://localhost:3000/logout", {}, {withCredentials: true})
        .then(() => {
            setCheckToken(null);
            console.log("має по ідеї очиститись", checkToken)
            navigate("/");
        })
        .catch(err => console.error("Помилка під час логауту", err));
    }

  return (
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
                <div>
                  <input className="w-50 h-7 mx-15 after:content-['*'] after:ml-0.5 after:text-red-500" placeholder={"Search"} type="text" onInput={()=>setStateSearch(true)} onChange={(e)=> setSearchText(e.target.value)}/>
                  {stateSearch ? (
                    <div className='fixed'>
                      <div className="w-50 flex mx-30 flex-col">
                        <button className='p-3 border bg-white text-sm z-10 hover:bg-gray-300' onClick={searchByUser}>Search among users</button>
                        <button className='p-3 border bg-white text-sm z-10 hover:bg-gray-300' onClick={searchByProduct}>Search among products</button>
                      </div>
                    </div>
                  ):(
                    <p className=''></p>
                  )}
                </div>
                <div className="sort-heart">
                    <img src="Outline-green.png" alt="" />
                </div>
                {!checkToken ? (
                  <>
                    <Link className='nav-list' to={`/`}>Main</Link>
                    <Link className='nav-list' to="/register">Register</Link>
                    <button className='nav-list' onClick={()=>{
                        reqBasket(),
                        openBasketModal()
                      }}>Basket</button>
                    <Link className='nav-list' to="/login">Login</Link>
                  </>
                ) : (
                  <>
                    <Link className='nav-list' to={`/`}>Main</Link>
                    <Link className='nav-list' to={`/profile/${checkToken.id}`}>Profile</Link>
                    <Link className='nav-list' onClick={()=>{handleLogout()}}>Logout</Link>
                    <button className='nav-list' onClick={()=>{
                        reqBasket(),
                        openBasketModal()
                      }}>Basket</button>
                    <Link className='nav-list' to="/addProduct">AddProduct</Link>
                  </>
                )}
            </div>
        </nav>
  )
}

export default Navigation