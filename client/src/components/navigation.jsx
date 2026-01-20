import React, { useEffect, useState, useParams } from 'react'
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {motion, transform} from 'framer-motion'
import { useBasketContext } from './modalWindows/BasketContext';
import { useReportContext } from './modalWindows/ReportContext';
import { useResultContext } from './modalWindows/resultContext';

const Navigation = () => {
    
    const {openBasketModal, reqBasket} = useBasketContext();
    
    const [checkToken, setCheckToken] = useState();
    const [stateSearch, setStateSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    
    const navigate = useNavigate()
    const {openReport} = useReportContext();
    const {openResultModal, setNameResult, setDescResult} = useResultContext();

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
                    <li className="nav-list"><button>ALL PRODUCTS</button></li>
                    <li className="nav-list"><Link to={'/aboutSeedra'}>ABOUT SEEDRA</Link></li>
                    <li className="nav-list"><Link to={'/ourBlog'}>OUR BLOG</Link></li>
                    {checkToken ? (
                      <li className="nav-list"><button onClick={()=>openReport("OTHER", checkToken.id)}>SUPPORT</button></li>
                    ):(
                      <li className="nav-list"><button onClick={()=>{
                        setNameResult("Помилка")
                        setDescResult("Треба бути заєстрованим")
                        openResultModal('error')
                      }}>SUPPORT</button></li>
                    )}
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
                        <button className='p-3 border bg-white text-sm z-10 hover:bg-gray-300' onClick={()=>{
                              navigate(`/search?type=user&text=${searchText}`)
                              setSearchText('')
                              setStateSearch(false)
                            }}
                          >Search among users</button>
                        <button className='p-3 border bg-white text-sm z-10 hover:bg-gray-300' onClick={()=>{
                            navigate(`/search?type=product&text=${searchText}`)
                              setSearchText('')
                              setStateSearch(false)
                          }}
                          >Search among products</button>
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