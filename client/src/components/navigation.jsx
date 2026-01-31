import React, { useEffect, useState, useParams, useRef } from 'react'
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {motion, transform} from 'framer-motion'
import { apiRequest } from '../../apiRequest';
import { useBasketContext } from './modalWindows/BasketContext';
import { useReportContext } from './modalWindows/ReportContext';
import { useResultContext } from './modalWindows/resultContext';
import { useOrderContext } from './modalWindows/OrderContext';

const Navigation = () => {
    
    const {openBasketModal, reqBasket} = useBasketContext();
    const {openOrderModal,reqOrder} = useOrderContext();
    
    const [checkToken, setCheckToken] = useState();
    const [stateSearch, setStateSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const searchRef = useRef(null);
    
    const navigate = useNavigate()
    const {openReport} = useReportContext();
    const {openResultModal, setNameResult, setDescResult} = useResultContext();

    useEffect(()=>{
      function handleClickOutside(e){
        if(searchRef.current && !searchRef.current.contains(e.target)){
          setStateSearch(false)
        }
      }
    
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    useEffect(()=>{
        axios.get(`${apiRequest}/user-data`,{
            withCredentials: true
        })
        .then(res=>{setCheckToken(res.data)})
        .catch(err=>{console.error("Немає токену або що:", err)})
    },[])

    function handleLogout() {
        axios.post(`${apiRequest}/logout`, {}, {withCredentials: true})
        .then(() => {
            setCheckToken(null);
            console.log("має по ідеї очиститись", checkToken)
            navigate("/");
        })
        .catch(err => console.error("Помилка під час логауту", err));
    }

  return (
        <nav className='z-3' ref={searchRef}>
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
                <div className='mx-10'>
                  <input className="w-50 h-7 after:content-['*'] after:ml-0.5 after:text-red-500" placeholder={"Search"} type="text" onInput={()=>setStateSearch(true)} onChange={(e)=> setSearchText(e.target.value)}/>
                  {stateSearch && (
                    <div className='absolute w-50 flex flex-col'>
                        <button className='p-3 border bg-white text-sm hover:bg-gray-300' onClick={()=>{
                              navigate(`/search?type=user&text=${searchText}`)
                              setSearchText('')
                              setStateSearch(false)
                            }}
                          >Search among users</button>
                        <button className='p-3 border bg-white text-sm hover:bg-gray-300' onClick={()=>{
                            navigate(`/search?type=product&text=${searchText}`)
                              setSearchText('')
                              setStateSearch(false)
                          }}
                          >Search among products</button>
                    </div>
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
                    <button className='nav-list' onClick={()=>{
                        reqOrder(),
                        openOrderModal()
                      }}>Order</button>
                    <Link className='nav-list' to="/login">Login</Link>
                  </>
                ) : (
                  <>
                    <Link className='nav-list' to={`/`}>Main</Link>
                    <Link className='nav-list' to={`/profile/${checkToken.id}`}>Profile</Link>
                    <button className='nav-list' onClick={()=>{
                        reqBasket(),
                        openBasketModal()
                      }}>Basket</button>
                    <button className='nav-list' onClick={()=>{
                        reqOrder(),
                        openOrderModal()
                      }}>Order</button>
                  </>
                )}
            </div>
        </nav>
  )
}

export default Navigation