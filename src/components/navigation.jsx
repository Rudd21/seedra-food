import React, { useEffect, useState, useParams, useRef } from 'react'
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {motion, transform} from 'framer-motion'
import { apiRequest } from '../serverRequest';
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
    const [menuOpen, setMenuOpen] = useState(false)
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
            navigate("/");
        })
        .catch(err => console.error("Помилка під час логауту", err));
    }

  return (
        <nav className='z-3 h-[100px]' ref={searchRef}>
          <div className="mx-auto flex items-center lg:text-[14px] justify-between px-4 py-3">

            {/* LOGO */}
            <img className="h-7" src={`${apiRequest}/uploads/system/Logo.svg`} alt="logo" />

            {/* DESKTOP MENU */}
            <ul className="hidden items-center gap-6 lg:flex lg:font-bold lg:text-gray-400">
              <li><Link className='p-2 hover:text-[#359740] transition' to="/#catalog">ALL PRODUCTS</Link></li>
              <li><Link className='p-2 hover:text-[#359740] transition' to="/aboutSeedra">ABOUT SEEDRA</Link></li>
              <li><Link className='p-2 hover:text-[#359740] transition' to="/ourBlog">OUR BLOG</Link></li>

              {checkToken ? (
                <li>
                  <button className='p-2 hover:text-[#359740] transition' onClick={() => openReport("OTHER", checkToken.id)}>SUPPORT</button>
                </li>
              ) : (
                <li>
                  <button className='p-2 hover:text-[#359740] transition' onClick={() => {
                    setNameResult("Помилка")
                    setDescResult("Треба бути зареєстрованим")
                    openResultModal('error')
                  }}>SUPPORT</button>
                </li>
              )}
            </ul>

            {/* SEARCH (desktop) */}
            <div className="relative hidden lg:block">
              <input
                className="h-8 w-52 rounded-[10px] border-gray-300 p-3 border px-2 text-sm"
                placeholder="Search"
                onInput={() => setStateSearch(true)}
                onChange={(e) => setSearchText(e.target.value)}
              />

              {stateSearch && (
                <div className="absolute top-full z-20 flex w-full flex-col border bg-white">
                  <button
                    className="p-3 text-sm hover:bg-gray-200"
                    onClick={() => {
                      navigate(`/search?type=user&text=${searchText}`)
                      setStateSearch(false)
                    }}
                  >
                    Search among users
                  </button>
                  <button
                    className="p-3 text-sm hover:bg-gray-200"
                    onClick={() => {
                      navigate(`/search?type=product&text=${searchText}`)
                      setStateSearch(false)
                    }}
                  >
                    Search among products
                  </button>
                </div>
              )}
            </div>
            <div className="hidden flex flex-row gap-2 bg-white px-4 py-4 lg:block lg:justify-between lg:text-gray-400 font-bold">

              {!checkToken ? (
                <>
                  <Link className='p-2 hover:text-[#359740] transition' to="/register">Register</Link>
                  <Link className='p-2 hover:text-[#359740] transition' to="/login">Login</Link>
                </>
              ) : (
                <Link className='p-2 hover:text-[#359740] transition' to={`/profile/${checkToken.id}`}>Profile</Link>
              )}

              <button className='p-2 hover:text-[#359740] transition' onClick={() => {
                reqBasket()
                openBasketModal()
              }}>Basket</button>

              <button className='p-2 hover:text-[#359740] transition' onClick={() => {
                reqOrder()
                openOrderModal()
              }}>Order</button>
            </div>

            {/* BURGER */}
          <div className="relative gap-3 flex lg:hidden">
            <input
              className="h-8 w-40 rounded-[10px] border-gray-300 p-3 border px-2 text-sm"
              placeholder="Search"
              onInput={() => setStateSearch(true)}
              onChange={(e) => setSearchText(e.target.value)}
            />

            {stateSearch && (
              <div className="absolute top-full z-20 flex w-40 flex-col border bg-white">
                <button
                  className="p-3 text-sm hover:bg-gray-200"
                  onClick={() => {
                    navigate(`/search?type=user&text=${searchText}`)
                    setStateSearch(false)
                  }}
                >
                  Search among users
                </button>
                <button
                  className="p-3 text-sm hover:bg-gray-200"
                  onClick={() => {
                    navigate(`/search?type=product&text=${searchText}`)
                    setStateSearch(false)
                  }}
                >
                  Search among products
                </button>
              </div>
            )}
                        <button
              className="text-[20px] lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
          </div>

          {/* MOBILE MENU */}
          {menuOpen && (
            <div className="flex flex-col gap-4 border p-2 bg-white fixed mt-[200%] w-[50%] lg:px-4 lg:py-4 lg:hidden lg:my-[0%]">
              <Link className='p-3 text-center bg-gray-300' to="/#catalog">All products</Link>
              <Link className='p-3 text-center bg-gray-300' to="/aboutSeedra">About</Link>
              <Link className='p-3 text-center bg-gray-300' to="/ourBlog">Blog</Link>

              {!checkToken ? (
                <>
                  <Link className='p-3 text-center bg-gray-300' to="/register">Register</Link>
                  <Link className='p-3 text-center bg-gray-300' to="/login">Login</Link>
                </>
              ) : (
                <Link className='p-3 text-center bg-gray-300' to={`/profile/${checkToken.id}`}>Profile</Link>
              )}

              <button className='p-3 text-center bg-gray-300' onClick={() => {
                reqBasket()
                openBasketModal()
              }}>Basket</button>

              <button className='p-3 text-center bg-gray-300' onClick={() => {
                reqOrder()
                openOrderModal()
              }}>Order</button>
                {checkToken ? (
                  <>
                    <button className='p-3 text-center bg-red-300 hover:text-[#359740] transition' onClick={() => openReport("OTHER", checkToken.id)}>Support</button>
                  </>
                ) : (
                  <>
                    <button className='p-2 bg-red-300 hover:text-[#359740] transition' onClick={() => {
                      setNameResult("Помилка")
                      setDescResult("Треба бути зареєстрованим")
                      openResultModal('error')
                    }}>Support</button>
                  </>
                )}
              <button
                className="bg-red-500"
                onClick={() => setMenuOpen(false)}
              >
                x
              </button>
            </div>
          )}
        </nav>
  )
}

export default Navigation